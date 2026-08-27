/**
 * Release guard — `npm run check:release`
 *
 * Every check here exists because the thing it guards actually went wrong once.
 * This is not a general lint pass; do not add speculative rules to it. When a
 * regression escapes, add the check that would have caught it and confirm the
 * check fails before the fix.
 *
 * Runs on plain node, no dependencies, so it works before `npm install` in CI.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));

const results = [];
/** @param {string} name @param {string} why @param {() => string | null} run */
function check(name, why, run) {
  let problem;
  try {
    problem = run();
  } catch (err) {
    problem = `kontrol çalıştırılamadı: ${err.message}`;
  }
  results.push({ name, why, problem });
}

/**
 * firestore.rules içindeki tek bir `match` bloğunu ayıklar.
 *
 * Dosyanın tamamında regex aramak yetmiyor: aynı satır birden çok blokta
 * geçiyor ve bir bloktan silinse bile kontrol öbüründe bulup yeşil veriyordu.
 * Bir kere tam olarak bu oldu.
 */
function rulesBlock(collection) {
  const rules = read('firestore.rules');
  const start = rules.indexOf(`match /${collection}/`);
  if (start < 0) return '';
  const next = rules.indexOf('\n    match /', start + 1);
  return rules.slice(start, next < 0 ? rules.length : next);
}

const app = json('app.json').expo;
const pkg = json('package.json');
const store = read('src/store.tsx');

check(
  'demo kaydı yok',
  'Sabit bir demo kaydı ("Elif Yılmaz") her kuruluma gidiyordu; yeni kullanıcı ' +
    'başkasının kaydını görüyordu.',
  () => {
    // Matches `registrations: []` with any whitespace, including across lines.
    const empty = /registrations:\s*\[\s*\]/.test(store);
    if (!empty) return 'defaultState.registrations boş değil';
    return null;
  },
);

check(
  'ana ekranda sabit isim yok',
  'Uygulama girişsiz; kullanıcının adını bilemez. Başlık herkese "Merhaba Elif" diyordu.',
  () => {
    const home = read('app/(tabs)/index.tsx');
    if (/Merhaba\s+[A-ZÇĞİÖŞÜ]/.test(home)) return 'başlıkta sabit bir isim var';
    return null;
  },
);

check(
  'iOS deployment target override edilmemiş',
  'deploymentTarget "18.7.8" idi. Bu alan minimum sürüm; listelemeyi neredeyse ' +
    'hiçbir cihaza bırakmıyordu.',
  () => {
    const raw = read('app.json');
    if (raw.includes('deploymentTarget')) return 'app.json hâlâ deploymentTarget taşıyor';
    return null;
  },
);

check(
  'sürüm iki dosyada aynı',
  'app.json 1.0.1, package.json 1.0.0 diye ayrışmıştı. runtimeVersion appVersion ' +
    'politikasında olduğu için sürüm dizgesi OTA eşleşmesini de belirliyor.',
  () => (app.version === pkg.version ? null : `app.json ${app.version} ≠ package.json ${pkg.version}`),
);

check(
  'uygulama kimliği iki platformda aynı',
  'com.akadirr1.sengkou her iki mağazada kayıtlı ve ilk yayından sonra değiştirilemez.',
  () => {
    const ios = app.ios?.bundleIdentifier;
    const android = app.android?.package;
    if (ios !== 'com.akadirr1.sengkou') return `ios.bundleIdentifier beklenmedik: ${ios}`;
    if (android !== ios) return `android.package (${android}) ios ile aynı değil`;
    return null;
  },
);

check(
  'yerel sürüm sayaçları app.json’da değil',
  'appVersionSource "remote"; sayaçları EAS tutuyor. app.json’da bir kopya kalırsa ' +
    'hangisinin geçerli olduğu karışır.',
  () => {
    if (json('eas.json').cli?.appVersionSource !== 'remote') return 'eas.json remote demiyor';
    if (app.ios?.buildNumber !== undefined) return 'app.json hâlâ ios.buildNumber taşıyor';
    if (app.android?.versionCode !== undefined) return 'app.json hâlâ android.versionCode taşıyor';
    return null;
  },
);

check(
  'bekleyen kayıtlar yeniden gönderiliyor',
  'syncPending() bir yorumda söz veriliyordu ama hiç yazılmamıştı; gönderilemeyen ' +
    'kayıt sessizce kayboluyordu.',
  () => {
    if (!/const syncPending\s*=\s*useCallback/.test(store)) {
      return 'syncPending tanımlı değil (yorumda geçmesi sayılmaz)';
    }
    if (!/AppState\.addEventListener/.test(store)) {
      return 'AppState tetikleyicisi yok — öne gelişte yeniden deneme çalışmaz';
    }
    if (!/syncPending\(\)/.test(store)) return 'syncPending hiçbir yerden çağrılmıyor';
    return null;
  },
);

check(
  'kayıt yeniden gönderimi kopya üretmiyor',
  'pushRegistration `addDoc` kullanıyordu. Yazma Firestore’a ulaşıp `synced` bayrağı ' +
    'diske yazılmadan uygulama ölürse kayıt beklemede görünür ve yeniden gönderilir — ' +
    '`addDoc` her denemede yeni bir doküman üretir, yani öğrenci kayıt listesinde iki ' +
    'kez çıkardı. Çekiliş katılımlarında baştan `setDoc` vardı; kayıtlarda açıktı.',
  () => {
    const fb = read('src/firebase.ts');
    // Yorumlar hariç. Açıklama metinleri `addDoc` ve `increment(1)` diye neyin
    // neden kullanılmadığını anlatıyor; onlara bakarsak kontrol kendi
    // gerekçesini bulup kırmızı kalır.
    const code = fb.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    if (/addDoc/.test(code)) return 'src/firebase.ts hâlâ addDoc kullanıyor';
    if (!/doc\(db, COLLECTIONS\.registrations, payload\.regId\)/.test(fb)) {
      return 'kayıt kendi kimliğine yazılmıyor';
    }
    // Kayıt ve koltuk aynı batch'te olmalı. Ayrı yazılırsa biri gidip öteki
    // gitmeyebilir ve etkinlik dolmadığı hâlde dolmuş görünebilir.
    if (!/writeBatch\(db\)/.test(fb) || !/batch\.commit\(\)/.test(fb)) {
      return 'kayıt ile koltuk aynı batch’te yazılmıyor';
    }
    // arrayUnion idempotent; increment değil. Yeniden gönderim sayıyı
    // şişirmemeli.
    if (/increment\(/.test(code)) {
      return 'koltuk sayısı increment ile artıyor — yeniden gönderimde şişer';
    }
    // Kayıt dokümanının kimliğinde öğrenci numarası var ve koltuk listesi
    // herkese açık. İkisi karışırsa dokuz haneli numaralar kaba kuvvetle
    // çözülebilir hâle gelir.
    if (/arrayUnion\(payload\.regId\)/.test(code)) {
      return 'öğrenci numarası taşıyan kimlik herkese açık listeye giriyor';
    }
    if (!/seatIds: arrayUnion\(payload\.seatId\)/.test(fb)) {
      return 'koltuk jetonu arrayUnion edilmiyor';
    }
    // Kimlik cihazda üretilip saklanmazsa her denemede yenisi çıkar ve setDoc da
    // addDoc gibi davranır.
    const store = read('src/store.tsx');
    if (!/seatId: makeEntryId\(\)/.test(store)) return 'koltuk jetonu cihazda üretilmiyor';
    // Kimlikler sonradan eklendi: onlarsız kaydedilmiş bir kayıt cihazda
    // duruyor olabilir ve kimliksiz gönderilemez.
    if (!/regId: r\.regId \?\?/.test(store) || !/seatId: r\.seatId \?\?/.test(store)) {
      return 'eski kayıtlar için hidrasyon göçü yok';
    }
    if (!/request\.resource\.data\.regId == registrationId/.test(read('firestore.rules'))) {
      return 'kural doküman kimliğinin kaydın kimliği olmasını zorunlu kılmıyor';
    }
    return null;
  },
);

check(
  'aynı öğrenci numarası bir etkinliğe iki kez kaydolamıyor',
  'Kayıt dokümanının kimliği rastgeleydi, yani ikinci bir cihazdan aynı numarayla ' +
    'yeniden kayıt olmak serbestti — hem kontenjandan iki yer götürür hem listede iki ' +
    'kez görünürdü. Cihazdaki kontrol sadece o cihazı kapsıyor; silip yeniden kuran ' +
    'öğrenciyi durdurmuyor.',
  () => {
    const store = read('src/store.tsx');
    if (!/regId: `\$\{input\.eventId\}__\$\{input\.studentNo\}`/.test(store)) {
      return 'kimlik öğrenci numarasından türetilmiyor';
    }
    // Dosyanın tamamında değil, kendi bloğunda arıyoruz: aynı satır
    // raffleEntries bloğunda da var ve orada bulup yeşil vermek işe yaramaz.
    const block = rulesBlock('registrations');
    if (!block) return 'firestore.rules registrations bloğu taşımıyor';
    // Kimliği istemci seçebilseydi benzersizlik diye bir şey kalmazdı.
    if (!/registrationId == request\.resource\.data\.eventId \+ '__' \+ request\.resource\.data\.studentNo/.test(block)) {
      return 'kural doküman kimliğinin numaradan türemesini zorunlu kılmıyor';
    }
    // Update tamamen kapalı olsaydı yeniden gönderim sonsuza kadar reddedilirdi;
    // sınırsız açık olsaydı ikinci cihaz birincinin üzerine yazardı.
    if (!/affectedKeys\(\)\.hasOnly\(\['createdAt'\]\)/.test(block)) {
      return 'yeniden gönderim için dar update dalı yok';
    }
    // Çekiliş katılımları aynı yoldan geçiyor ve aynı deliğe düşerdi.
    if (!/affectedKeys\(\)\.hasOnly\(\['createdAt'\]\)/.test(rulesBlock('raffleEntries'))) {
      return 'çekiliş katılımlarında yeniden gönderim dalı yok';
    }
    // Reddedilen kayıt sonsuza kadar denenirse her açılış bir yazma harcar ve
    // ekranda "Gönderiliyor…" kalır.
    if (!/isRulesRejection/.test(store)) return 'kural reddi ağ hatasından ayrılmıyor';
    if (!/!r\.synced && !r\.blocked/.test(store)) return 'reddedilen kayıt yeniden denenmeye devam ediyor';
    return null;
  },
);

check(
  'kontenjan elle yazılmıyor, kayıtlardan çıkıyor',
  'Kontenjan `spots` diye serbest metindi: "12 / 60 yer kaldı". Kimse kayıt oldukça ' +
    'değişmiyordu, yönetici kontenjanı yükselttiğinde de değişmiyordu — cümleyi ' +
    'yeniden yazmak gerekiyordu. Ve hiçbir şey sınırı uygulamıyordu: dolu bir ' +
    'etkinliğe kayıt olmak serbestti.',
  () => {
    const schema = read('src/eventSchema.ts');
    if (/\bspots\b/.test(schema)) return 'eventSchema hâlâ spots taşıyor';
    if (!/export function seatsLeft/.test(schema)) return 'kalan yer türetilmiyor';

    const detail = read('app/etkinlik/[id].tsx');
    if (!/registeredCount\(/.test(detail)) return 'detay ekranı gerçek kayıt sayısını okumuyor';
    if (!/isFull\(/.test(detail)) return 'dolunca kayıt düğmesi kapanmıyor';
    // Detayda düğme gizlense de forma derin bağlantıyla gelinebiliyor.
    if (!/isFull\(/.test(read('app/kayit/[id].tsx'))) return 'kayıt formunda kontenjan kontrolü yok';

    if (!/COLLECTIONS\.eventSeats/.test(read('src/firebase.ts'))) return 'koltuklar okunmuyor';

    const rules = read('firestore.rules');
    if (!/match \/eventSeats\//.test(rules)) return 'eventSeats kuralı yok';
    // Kimlik silinebilirse dolu bir etkinliğe yer açılabilir.
    if (!/seatIds\.hasAll\(resource\.data\.seatIds\)/.test(rules)) {
      return 'kural koltukların silinmesini engellemiyor';
    }
    return null;
  },
);

check(
  'bildirim wiring bağlı',
  'NotificationSync mount edilmezse token da alınmaz, hatırlatma da kurulmaz — ' +
    'özellik hiçbir hata vermeden ölür.',
  () => {
    if (!/<NotificationSync\s*\/>/.test(read('app/_layout.tsx'))) {
      return '_layout.tsx NotificationSync render etmiyor';
    }
    const notif = read('src/notifications.tsx');
    if (!/addNotificationResponseReceivedListener/.test(notif)) {
      return 'bildirime dokunma dinleyicisi yok — bildirim etkinliği açmaz';
    }
    if (!/scheduleNotificationAsync/.test(notif)) return 'yerel hatırlatma kurulmuyor';
    return null;
  },
);

check(
  'sahte okunmamış rozeti yok',
  'Zildeki kırmızı nokta koşulsuz render ediliyordu; okunmamış bir şey yokken ' +
    'varmış gibi gösteriyordu ve okunma durumunu tutan hiçbir şey yok.',
  () => {
    if (/styles\.bellDot/.test(read('app/(tabs)/index.tsx'))) {
      return 'bellDot hâlâ render ediliyor';
    }
    return null;
  },
);

check(
  'takvim ve arşiv başlığında sabit tarih yok',
  'Takvim başlığı "Mart – Nisan 2026" yazıyordu ve o etkinlikler geçtikten aylar ' +
    'sonra hâlâ oradaydı. Arşiv başlığı da aynısını yapıyordu: "2023’ten bugüne". ' +
    'Tarih aralığı veriden türetilmeli, elle yazılmamalı.',
  () => {
    const bad = ['app/(tabs)/takvim.tsx', 'app/(tabs)/arsiv.tsx']
      .map((f) => {
        // Yorumlar hariç: sabit bir yıl JSX metnine gömülmüş mü?
        const code = read(f).replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
        const year = code.match(/\b(19|20)\d{2}\b/);
        return year ? `${f}: ${year[0]}` : null;
      })
      .filter(Boolean);
    return bad.length ? `başlıkta sabit yıl var — ${bad.join(', ')}` : null;
  },
);

check(
  'arşiv uydurma veri taşımıyor',
  'src/data.ts altı hayali etkinlik ("Kış Kampı: Backend 101") ve iki uydurma sayı ' +
    'taşıyordu: ARCHIVE_TOTALS = { events: 38, photos: 412 }. İkincisi daha kötüydü — ' +
    'uygulamada fotoğraf deposu hiç yok, yani 412 hiçbir şeyi saymıyordu. Demo kaydı ' +
    'ile aynı sınıf hata: kullanıcı gerçek sanıyor.',
  () => {
    const data = read('src/data.ts');
    const code = data.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    if (/ARCHIVE_TOTALS/.test(code)) return 'src/data.ts hâlâ ARCHIVE_TOTALS taşıyor';
    if (/export const ARCHIVE\s*[:=]/.test(code)) return 'src/data.ts hâlâ sabit ARCHIVE dizisi taşıyor';
    // Arşiv geçmiş etkinliklerden türemeli; ayrı bir koleksiyon olarak dönerse
    // aynı etkinlik iki kez giriliyor demektir.
    if (/COLLECTIONS\.archive|archive:\s*'archive'/.test(read('src/firebase.ts'))) {
      return 'istemci hâlâ ayrı bir archive koleksiyonu okuyor';
    }
    if (!/splitByDate/.test(read('src/content.tsx'))) {
      return 'content.tsx arşivi etkinliklerden türetmiyor';
    }
    return null;
  },
);

check(
  'içerik durumu ekranlara bağlı',
  'useContent() `source`, `error`, `loading` ve `refresh` üretiyordu ve hiçbir ekran ' +
    'hiçbirini tüketmiyordu. Firestore erişilemezken kullanıcı boş bir uygulama ' +
    'görüyor, sebebini öğrenemiyor ve uygulamayı kapatmaktan başka bir şey ' +
    'yapamıyordu.',
  () => {
    // Aranan şey JSX'te gerçekten render edilmesi. Sadece isim aramak yetmiyor:
    // import satırı tek başına eşleşiyor, yani bileşen import edilip hiç
    // kullanılmasa da kontrol yeşil verirdi.
    const missing = ['app/(tabs)/takvim.tsx', 'app/(tabs)/index.tsx', 'app/(tabs)/arsiv.tsx']
      .filter((f) => {
        const src = read(f);
        return !/<ContentNotice\b/.test(src) || !/<RefreshControl\b/.test(src);
      });
    return missing.length ? `bağlı değil: ${missing.join(', ')}` : null;
  },
);

check(
  'boş Firestore hata sayılmıyor',
  'Boş koleksiyon `error`’a geliştirici mesajı yazıyordu ("`npm run seed` çalıştırın"). ' +
    'src/data.ts artık boş olduğu için düşülecek yerel içerik de yok — sıradan bir boş ' +
    'takvim kullanıcıya bağlantı sorunu gibi görünüyordu.',
  () => (/npm run seed/.test(read('src/content.tsx')) ? 'content.tsx hâlâ seed mesajını hata olarak yazıyor' : null),
);

check(
  'panel yığın izi sızdırmıyor',
  'Hata yakalayıcı olmadan express varsayılanına düşüp tarayıcıya tam yığın izini ' +
    'basıyordu — mutlak dosya yolları, paket sürümleri, Firestore hata ayrıntıları. ' +
    'Panel açık bir sunucuda çalışıyor.',
  () => {
    const server = read('admin/server.ts');
    if (!/app\.use\(\(err: unknown/.test(server)) return 'admin/server.ts hata yakalayıcı taşımıyor';
    return null;
  },
);

check(
  'panelde tarih elle yazılmıyor',
  'Başlangıç serbest metindi ve saat dilimiyle birlikte tam ISO isteniyordu. Saat ' +
    'dilimi unutulmuş bir dizge her okuyanın kendi diliminde başka bir an demek — ' +
    've hatırlatmalar o değere göre kuruluyor. Panelde yapılabilecek en pahalı ' +
    'yazım hatasıydı; artık yazılmıyor, seçiliyor.',
  () => {
    const views = read('admin/views.ts');
    if (/name="startsAt"/.test(views)) return 'form hâlâ tek parça startsAt alanı taşıyor';
    if (!/type="date" name="startsAtDate"/.test(views)) return 'başlangıç tarihi seçici değil';
    if (!/type="time" name="startsAtTime"/.test(views)) return 'başlangıç saati seçici değil';
    if (!/type="time" name="endsAt"/.test(views)) return 'bitiş saati seçici değil';
    // Seçicinin kendisi yetmez: ISO'yu sunucu kurmazsa saat dilimi yine forma
    // düşer.
    if (!/joinLocal\(date, time\)/.test(read('admin/server.ts'))) {
      return 'sunucu ISO’yu joinLocal ile kurmuyor';
    }
    return null;
  },
);

check(
  'her koleksiyonun bir kuralı var',
  'Kuralı yazılmamış koleksiyon, sonundaki "eşleşmeyen her şey kapalı" bloğuna ' +
    'düşer ve istemci "Missing or insufficient permissions" alır. Kod tarafında ' +
    'hiçbir şey hata vermez; hata ancak uygulama çalışırken görünür. Bu kontrol ' +
    'yayınlanıp yayınlanmadığını söyleyemez — onu yalnızca `npm run rules:deploy` ' +
    'yapar — ama kuralın hiç yazılmamış olduğunu söyler.',
  () => {
    const rules = read('firestore.rules');
    // COLLECTIONS'ın değerleri: `events: 'events',` gibi satırlar.
    const block = read('src/firebase.ts').match(/COLLECTIONS = \{([\s\S]*?)\}/)?.[1] ?? '';
    const names = [...block.matchAll(/:\s*'([^']+)'/g)].map((m) => m[1]);
    // Sayı değil, isim: regex tutmazsa `names` boş kalır ve kontrol hiçbir şey
    // bulmadığı için yeşil verirdi. Bu ikisi hiçbir zaman kaybolmayacak.
    if (!names.includes('events') || !names.includes('registrations')) {
      return `COLLECTIONS okunamadı (bulunan: ${names.join(', ') || 'hiçbiri'})`;
    }

    const missing = names.filter((n) => !new RegExp(`match /${n}/`).test(rules));
    return missing.length ? `firestore.rules kuralsız koleksiyon: ${missing.join(', ')}` : null;
  },
);

check(
  'kural yayınlama tek komut',
  'Kurallar konsola elle yapıştırılıyordu. Kural her değiştiğinde yeniden ' +
    'yapıştırmak gerekiyor ve yapıştırılanın depodakiyle aynı olduğunu hiçbir şey ' +
    'garanti etmiyordu — çekiliş blokları eklendiğinde uygulama tam olarak bu ' +
    'yüzden içerik okuyamadı.',
  () => {
    if (!pkg.scripts?.['rules:deploy']) return 'rules:deploy script’i yok';
    const deploy = read('scripts/deploy-rules.mjs');
    // Proje kimliği uygulamanınkiyle aynı kaynaktan gelmezse, kurallar doğru
    // projede yayınlanmış ama uygulama başka projeye bakıyor olabilir.
    if (!/EXPO_PUBLIC_FIREBASE_PROJECT_ID/.test(deploy)) {
      return 'proje kimliği uygulamanın kullandığı değişkenden okunmuyor';
    }
    if (!json('firebase.json').firestore?.rules) return 'firebase.json firestore.rules’a işaret etmiyor';
    return null;
  },
);

check(
  'servis hesabı anahtarları gitignore’lu',
  'Admin SDK anahtarı firestore.rules’u tamamen bypass eder. Depo public.',
  () => {
    const ignore = read('.gitignore');
    const missing = ['firebase-adminsdk', 'service-account', 'google-services.json'].filter(
      (p) => !ignore.includes(p),
    );
    return missing.length ? `.gitignore eksik desen: ${missing.join(', ')}` : null;
  },
);

const failed = results.filter((r) => r.problem);

for (const r of results) {
  console.log(`${r.problem ? '✗' : '✓'} ${r.name}`);
  if (r.problem) console.log(`    ${r.problem}\n    neden: ${r.why}`);
}

console.log(
  failed.length
    ? `\n${failed.length}/${results.length} kontrol başarısız.`
    : `\n${results.length} kontrolün hepsi geçti.`,
);

process.exit(failed.length ? 1 : 0);
