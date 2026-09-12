/**
 * Uygulamanın çağırdığı hesap uç noktaları — kod gönder, kodu doğrula.
 *
 * Panelin geri kalanı yönetici parolasıyla korunuyor; bunlar korunamaz, çünkü
 * çağıran öğrencinin kendisi. Kimlik yerine **Firebase kimlik jetonu**
 * doğrulanıyor (`Authorization: Bearer …`), yani istek ancak gerçekten giriş
 * yapmış bir hesaptan gelebiliyor. Rotalar bu yüzden `app.use(requireAuth)`'tan
 * önce kayıt ediliyor; `check:release` sırayı doğruluyor.
 *
 * Burada yapılan iki iş var ve **ikisi de aynı anda olmak zorunda**:
 * e-postanın doğrulanması ve telefon/öğrenci numarasının sahiplenilmesi.
 * Ayrılsalardı, doğrulanmış ama numarası çakışan bir hesap ortaya çıkardı ve
 * onu kimin düzelteceği belirsiz kalırdı.
 *
 * **Parola sıfırlamanın iki uç noktası kimliksiz** — parolasını unutan kişinin
 * jetonu yok. Onları koruyan şey `kimlikCoz` değil, aşağıdaki dört katman:
 * yalnızca var olan hesaba posta gitmesi, adres başına gönderim sınırı, IP
 * başına istek sınırı ve günlük genel tavan. Hiçbiri tek başına yeterli değil;
 * hangisinin neyi taşıdığı kendi satırında yazıyor.
 */
import type { Express, Request, Response } from 'express';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { FieldValue, type Firestore } from 'firebase-admin/firestore';

import { createHash } from 'node:crypto';

import {
  EMAIL_RE,
  MIN_PASSWORD,
  STUDENT_NO_RE,
  normalizeEmail,
  normalizePhone,
} from '../src/accountSchema';
import { claimIdentity, type Kimlik } from './claims';
import { sendMail, mailReady } from './mail';
import { otpMail, sifreMail } from './mailTemplate';
import {
  OTP_TTL_MS,
  decideSend,
  decideVerify,
  hashCode,
  type OtpRecord,
} from './otp';
import { loginLimiter } from './session';

const OTP_COLLECTION = 'emailOtp';
const RESET_COLLECTION = 'passwordReset';

/**
 * Günde gönderilebilecek toplam sıfırlama postası.
 *
 * IP sınırını dağıtık bir saldırı baypas ediyor ve adres sınırı adres başına
 * olduğu için toplamı sınırlamıyor. Bu tavan Workspace kotasını koruyor — o
 * kota yanarsa **doğrulama postası da ölür**, yani bu sayı sıfırlamanın değil
 * kayıt akışının da sigortası.
 */
const RESET_DAILY_CAP = 200;
const RESET_STATE_DOC = 'pushState/passwordReset';

/**
 * IP başına gönderim sınırı — 20 / saat.
 *
 * Kıt olan kaynak posta kotası, o yüzden sayı buraya konuyor. Kampüs NAT'ı
 * yüzünden cömert; tek başına hiçbir şeye güvenilmiyor (bkz. dosya başlığı).
 */
const sifreGonderLimiti = loginLimiter(Date.now, 20, 60 * 60_000);

/**
 * IP başına kod deneme sınırı — 120 / saat.
 *
 * Kodu tahmin etmenin tavanı zaten kayıttaki `attempts` (5); bu sınır Firestore
 * okuma kotasını koruyor, kodu değil. Bu yüzden altı kat cömert.
 */
const sifreDegistirLimiti = loginLimiter(Date.now, 120, 60 * 60_000);

/**
 * Sıfırlama kaydının kimliği.
 *
 * Ham e-posta kimlik yapılmıyor: doküman adı kişisel veri olurdu ve koleksiyonu
 * listeleyen herkes kimin parola sıfırladığını görürdü (`registrations`'taki
 * `eventId__studentNo` maddesiyle aynı gerekçe). `uid` de kullanılamıyor —
 * sıfırlama anında elde uid yok, ve olsa bile var olmayan adres için doküman
 * yazılamaz, yani "kullanıcı var mı" sorusu kotada ve zamanlamada sızardı.
 */
function resetDocId(email: string): string {
  return createHash('sha256').update(normalizeEmail(email)).digest('hex');
}

/** UTC gün anahtarı. Yerel güne bağlanırsa sayaç sunucunun penceresinden kayar. */
function utcGun(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

/**
 * Günlük tavanı bir artırır; tavan aşılmışsa `false`.
 *
 * İşlem değil, oku + `increment(1)`: sınırda birkaç fazla posta göndermek kabul
 * edilebilir, kotayı yakmak değil.
 */
async function gunlukTavan(db: Firestore, now: number): Promise<boolean> {
  const ref = db.doc(RESET_STATE_DOC);
  const snap = await ref.get();
  const data = snap.data() ?? {};
  const gun = utcGun(now);
  const sayi = data.gun === gun && typeof data.sayi === 'number' ? data.sayi : 0;
  if (sayi >= RESET_DAILY_CAP) return false;
  await ref.set({ gun, sayi: sayi + 1 });
  return true;
}

/** `Authorization: Bearer …` başlığından jetonu çıkarır. */
function bearer(req: Request): string | null {
  const raw = req.header('authorization') ?? '';
  const m = /^Bearer\s+(.+)$/i.exec(raw.trim());
  return m ? m[1] : null;
}

type Kim = { uid: string; email: string; dogrulanmis: boolean };

async function kimlikCoz(
  req: Request,
  res: Response,
  authOf: () => AuthLike,
): Promise<Kim | null> {
  const token = bearer(req);
  if (!token) {
    res.status(401).json({ hata: 'oturum_yok' });
    return null;
  }
  try {
    const decoded = await authOf().verifyIdToken(token);
    return {
      uid: decoded.uid,
      email: decoded.email ?? '',
      dogrulanmis: decoded.email_verified === true,
    };
  } catch {
    // Süresi dolmuş jeton ile sahte jeton ayrılmıyor: ikisinin de cevabı
    // aynı, istemci jetonu tazeleyip yeniden deniyor.
    res.status(401).json({ hata: 'oturum_yok' });
    return null;
  }
}

async function otpOku(db: Firestore, uid: string): Promise<OtpRecord | null> {
  const snap = await db.collection(OTP_COLLECTION).doc(uid).get();
  return snap.exists ? (snap.data() as OtpRecord) : null;
}

/**
 * `registerAccountApi`'nin Auth'tan kullandığı her şey.
 *
 * Üçüncü parametre olmasının tek sebebi `check:panel`: bu uç noktaların
 * korumaları (kayıtlı olmayan adresin birebir aynı cevabı vermesi, yanlış
 * kodun parolayı değiştirmemesi, `revokeRefreshTokens`'ın gerçekten
 * çağrılması) ancak sahte bir Auth ile sınanabiliyor — gerçek Firebase'e
 * bağlanan bir kontrol CI'da hiç koşamaz, koşmayan kontrol de yeşil sayılır.
 */
export type AuthLike = Pick<
  Auth,
  'verifyIdToken' | 'updateUser' | 'getUserByEmail' | 'revokeRefreshTokens'
>;

export function registerAccountApi(
  app: Express,
  db: Firestore,
  authOf: () => AuthLike = getAuth,
): void {
  /**
   * Kod gönder.
   *
   * Sıra: önce kayıt, sonra gönderim — `admin/push.ts`'teki kilit kuralının
   * aynısı. Gönderim patlarsa kayıt **siliniyor**, yoksa kullanıcı hiç posta
   * almadan bir dakika beklemek zorunda kalırdı.
   */
  app.post('/api/hesap/kod', async (req, res) => {
    const kim = await kimlikCoz(req, res, authOf);
    if (!kim) return;
    if (kim.dogrulanmis) return res.json({ durum: 'zaten_dogrulandi' });
    if (!kim.email) return res.status(400).json({ hata: 'eposta_yok' });

    if (!mailReady()) {
      // Sessizce "gönderildi" demek, kullanıcıyı gelmeyecek bir postayı
      // beklemeye mahkûm ederdi.
      return res.status(503).json({ hata: 'posta_yapilandirilmamis' });
    }

    const now = Date.now();
    const karar = decideSend(await otpOku(db, kim.uid), now);
    if (!karar.ok) {
      return res.status(429).json({ hata: karar.reason, saniye: karar.saniye });
    }

    const ref = db.collection(OTP_COLLECTION).doc(kim.uid);
    const kayit: OtpRecord = { ...karar.record, hash: hashCode(kim.uid, karar.code) };
    await ref.set(kayit);

    try {
      const sonuc = await sendMail({
        to: kim.email,
        ...otpMail(karar.code, Math.round(OTP_TTL_MS / 60_000)),
      });
      // BAŞARILI GÖNDERİM DE YAZILIYOR, ve bu bir ayrıntı değil: eskiden
      // yalnızca hata yazılıyordu, dolayısıyla "kod gelmedi" diyen bir
      // kullanıcıda log BOŞTU ve bu "istek hiç ulaşmadı" gibi okunuyordu —
      // oysa gönderim yapılmış olabilir. Kod satıra YAZILMIYOR; yazılan şey
      // postanın kabul edilip edilmediği.
      console.log(
        `[posta] doğrulama kodu → ${kim.email} · kabul: ${sonuc.accepted.join(', ') || 'yok'}` +
          (sonuc.rejected.length ? ` · RED: ${sonuc.rejected.join(', ')}` : '') +
          ` · zarf göndereni: ${sonuc.envelopeFrom}`,
      );
      if (!sonuc.accepted.length) {
        // Sunucu bağlantıyı kabul edip alıcıyı reddettiğinde `sendMail`
        // fırlatmıyor. İstemciye "gönderildi" demek yanlış olurdu.
        await ref.delete().catch(() => {});
        return res.status(502).json({ hata: 'posta_gonderilemedi' });
      }
    } catch (err) {
      await ref.delete().catch(() => {});
      console.error('[posta] doğrulama kodu gönderilemedi:', err);
      return res.status(502).json({ hata: 'posta_gonderilemedi' });
    }

    res.json({ durum: 'gonderildi', saniye: Math.round(OTP_TTL_MS / 1000) });
  });

  /**
   * Kodu doğrula, aynı işlemde telefonu ve öğrenci numarasını sahiplen.
   *
   * Gövde çakışma düzeltmesini de taşıyor (`telefon`, `ogrenciNo`): numarası
   * başkasında olan kullanıcının onu değiştirebileceği başka bir ekran yok, ve
   * olmayan bir ekrana yönlendirmek hesabı kalıcı olarak doğrulanamaz bırakır.
   */
  app.post('/api/hesap/dogrula', async (req, res) => {
    const kim = await kimlikCoz(req, res, authOf);
    if (!kim) return;
    if (kim.dogrulanmis) return res.json({ durum: 'zaten_dogrulandi' });

    const code = String((req.body as Record<string, unknown>)?.code ?? '').trim();
    const ref = db.collection(OTP_COLLECTION).doc(kim.uid);
    const kayit = await otpOku(db, kim.uid);

    const karar = decideVerify(kayit, kim.uid, code, Date.now());
    if (!karar.ok) {
      // Yanlış denemeler sayılıyor; süresi dolmuş ya da hiç olmayan kodda
      // sayacı artırmak anlamsız (artıracak bir kayıt da yok).
      if (karar.reason === 'yanlis' && kayit) {
        await ref.update({ attempts: kayit.attempts + 1 });
      }
      return res.status(400).json({ hata: karar.reason, kalan: karar.kalan });
    }

    // Profil paneldeki kaynaktan okunuyor; gövdeden gelen değerler yalnızca
    // düzeltme. İstemcinin gönderdiğine körü körüne güvenilmiyor, ikisi de
    // burada yeniden doğrulanıyor.
    const kullanici = (await db.collection('users').doc(kim.uid).get()).data() ?? {};
    const govde = req.body as Record<string, unknown>;

    const telefonHam = String(govde.telefon ?? kullanici.telefon ?? '');
    const ogrenciHam = String(govde.ogrenciNo ?? kullanici.ogrenciNo ?? '').trim();

    const telefon = normalizePhone(telefonHam);
    if (!telefon) return res.status(400).json({ hata: 'telefon_gecersiz' });
    if (!STUDENT_NO_RE.test(ogrenciHam)) return res.status(400).json({ hata: 'numara_gecersiz' });

    const yeni: Kimlik = { telefon, ogrenciNo: ogrenciHam };
    const eski: Partial<Kimlik> = {
      telefon: typeof kullanici.telefon === 'string' ? kullanici.telefon : undefined,
      ogrenciNo: typeof kullanici.ogrenciNo === 'string' ? kullanici.ogrenciNo : undefined,
    };

    const sonuc = await claimIdentity(db, kim.uid, yeni, eski);
    if (!sonuc.ok) {
      // Kod TÜKETİLMİYOR: kullanıcı alanı düzeltip aynı kodla tekrar
      // gönderebilmeli, yoksa her çakışmada yeni posta beklemek gerekirdi.
      return res.status(409).json({
        hata: sonuc.alan === 'telefon' ? 'telefon_kullanimda' : 'numara_kullanimda',
      });
    }

    await db.collection('users').doc(kim.uid).set(yeni, { merge: true });
    await authOf().updateUser(kim.uid, { emailVerified: true });
    await ref.delete().catch(() => {});

    res.json({ durum: 'dogrulandi' });
  });

  /**
   * Parola sıfırlama kodu gönder. **Kimliksiz.**
   *
   * Cevap her durumda birebir aynı: aynı kod, aynı gövde, aynı alanlar. Adres
   * kayıtlı olsa da olmasa da kayıt yazılıyor, dolayısıyla ikinci istek de aynı
   * `bekle` cevabını veriyor — oracle sayaçta da yok.
   *
   * **Cevap postadan ÖNCE dönüyor ve bu bilinçli bir ihlal.** `/api/hesap/kod`
   * gönderim patlarsa kaydı siliyor ve 502 dönüyor; orada çağıran zaten kimliği
   * bilinen kişi. Burada gönderimin sonucunu söylemek, adresin kayıtlı olduğunu
   * söylemek demek — üstelik `getUserByEmail` + SMTP el sıkışması "hiçbir şey
   * yapma"dan yüzlerce ms uzun, yani zamanlama tek başına bir oracle olurdu.
   * Karşılığı: gönderim hatası yalnızca panel logunda görünüyor.
   */
  app.post('/api/hesap/sifre-kod', async (req, res) => {
    const ip = req.ip ?? 'bilinmiyor';
    const kilit = sifreGonderLimiti.lockedFor(ip);
    if (kilit > 0) {
      return res.status(429).json({ hata: 'cok_fazla', saniye: Math.ceil(kilit / 1000) });
    }
    sifreGonderLimiti.fail(ip);

    const email = normalizeEmail(String((req.body as Record<string, unknown>)?.email ?? ''));
    if (!EMAIL_RE.test(email)) return res.status(400).json({ hata: 'eposta_gecersiz' });

    // Herkes için aynı cevap, dolayısıyla oracle değil.
    if (!mailReady()) return res.status(503).json({ hata: 'posta_yapilandirilmamis' });

    const now = Date.now();
    const ref = db.collection(RESET_COLLECTION).doc(resetDocId(email));
    const mevcut = (await ref.get()).data() as OtpRecord | undefined;

    const karar = decideSend(mevcut ?? null, now);
    if (!karar.ok) {
      return res.status(429).json({ hata: karar.reason, saniye: karar.saniye });
    }

    // TUZ DOKÜMAN KİMLİĞİ, uid değil: doğrulama kodu ile sıfırlama kodunun
    // birbirini doğrulamasını yapısal olarak imkânsız kılan şey bu (bkz. `otp.ts`).
    await ref.set({
      ...karar.record,
      hash: hashCode(ref.id, karar.code),
      // Yalnızca ileride Firestore TTL politikası için: terk edilmiş kayıtlar
      // (var olmayan adreslere yazılanlar) hiç silinmiyor. Süpürücü yazılmadı,
      // IP sınırı günde ~1000 doküman tavanı bırakıyor.
      expiresAt: new Date(now + OTP_TTL_MS),
    });

    res.json({ durum: 'gonderildi', saniye: Math.round(OTP_TTL_MS / 1000) });

    void (async () => {
      if (!(await gunlukTavan(db, now))) {
        console.warn(
          `[posta] sıfırlama kodu gönderilmedi: günlük tavan (${RESET_DAILY_CAP}) doldu.`,
        );
        return;
      }
      // Kurban kümesini "internetteki her adres"ten "zaten bizde hesabı olan
      // kişiler"e indiren katman bu, ve maliyeti sıfır.
      const kullanici = await authOf()
        .getUserByEmail(email)
        .catch(() => null);
      if (!kullanici) {
        console.log(`[posta] sıfırlama kodu istendi ama hesap yok: ${email}`);
        return;
      }
      const sonuc = await sendMail({
        to: email,
        ...sifreMail(karar.code, Math.round(OTP_TTL_MS / 60_000)),
      });
      console.log(
        `[posta] sıfırlama kodu → ${email} · kabul: ${sonuc.accepted.join(', ') || 'yok'}` +
          (sonuc.rejected.length ? ` · RED: ${sonuc.rejected.join(', ')}` : '') +
          ` · zarf göndereni: ${sonuc.envelopeFrom}`,
      );
    })().catch((err) => console.error('[posta] sıfırlama kodu gönderilemedi:', err));
  });

  /**
   * Kodu doğrula ve parolayı değiştir — **tek istekte.** Kimliksiz.
   *
   * Araya tek kullanımlık bir jeton konmadı: o jeton bu sistemdeki en değerli
   * sır olurdu (herhangi bir parolayı yazabilir), saklanması, kendi TTL'i,
   * tüketildi bayrağı ve loglardan ayıklanması gerekirdi — hepsi bir
   * gidiş-dönüş kazanmak için. Tek istekte "doğrulandı ama parola değişmedi"
   * ara durumu hiç oluşmuyor. `/api/hesap/dogrula` da aynı şekilde çalışıyor.
   *
   * **`emailVerified`'a dokunulmuyor, ve bu bir unutma değil.** Bu dosyanın
   * değişmezi "e-posta doğrulanmış ⇒ telefon ve öğrenci numarası sahiplenilmiş".
   * Sıfırlamada `emailVerified: true` yazmak, hiç sahiplenme yapılmamış bir
   * hesabı doğrulanmış gösterir ve o değişmezi sessizce kırar.
   */
  app.post('/api/hesap/sifre-degistir', async (req, res) => {
    const ip = req.ip ?? 'bilinmiyor';
    const kilit = sifreDegistirLimiti.lockedFor(ip);
    if (kilit > 0) {
      return res.status(429).json({ hata: 'cok_fazla', saniye: Math.ceil(kilit / 1000) });
    }
    sifreDegistirLimiti.fail(ip);

    const govde = req.body as Record<string, unknown>;
    const email = normalizeEmail(String(govde?.email ?? ''));
    const code = String(govde?.code ?? '').trim();
    const parola = String(govde?.parola ?? '');
    if (!EMAIL_RE.test(email)) return res.status(400).json({ hata: 'eposta_gecersiz' });

    const ref = db.collection(RESET_COLLECTION).doc(resetDocId(email));
    const kayit = ((await ref.get()).data() as OtpRecord | undefined) ?? null;

    const karar = decideVerify(kayit, ref.id, code, Date.now());
    if (!karar.ok) {
      if (karar.reason === 'yanlis' && kayit) {
        // `increment` çünkü aynı anda gelen iki yanlış deneme okunmuş değeri
        // aynı görür ve sayaç bir artar — beş deneme sınırı orada delinir.
        await ref.update({ attempts: FieldValue.increment(1) });
      }
      return res.status(400).json({ hata: karar.reason, kalan: karar.kalan });
    }

    // Kullanıcı bulunamadığında da `yanlis` dönüyor ve deneme sayılıyor:
    // burada "hesap yok" demek, kod isteme adımındaki bütün tekdüzeliği son
    // adımda geri açardı.
    const kullanici = await authOf()
      .getUserByEmail(email)
      .catch(() => null);
    if (!kullanici) {
      if (kayit) await ref.update({ attempts: FieldValue.increment(1) });
      return res.status(400).json({ hata: 'yanlis' });
    }

    // İstemcideki kontrol bir ipucu, sınır değil: ham istek onu atlıyor.
    // Kod TÜKETİLMİYOR — kullanıcı parolayı düzeltip aynı kodla tekrar denemeli.
    if (parola.length < MIN_PASSWORD) return res.status(400).json({ hata: 'parola_zayif' });

    // Parola hiçbir log satırına girmiyor.
    await authOf().updateUser(kullanici.uid, { password: parola });

    // Parolasını ÇALINDIĞI İÇİN sıfırlayan kullanıcının asıl istediği bu:
    // aksi hâlde saldırgan hesapta süresiz kalır ve kullanıcı sorunu
    // çözdüğünü sanır. Yenileme jetonlarını geçersizleştiriyor; elde duran
    // ID jetonları süreleri dolana kadar (bir saate kadar) geçerli kalıyor,
    // ve Firestore kuralları iptali görmüyor. Hata yutuluyor: parola gerçekten
    // değişti, "olmadı" demek kullanıcıya işlemi tekrarlatmak olurdu.
    await authOf()
      .revokeRefreshTokens(kullanici.uid)
      .catch((err) => console.error('[hesap] revokeRefreshTokens:', err));

    await ref.delete().catch(() => {});
    res.json({ durum: 'degistirildi' });
  });
}
