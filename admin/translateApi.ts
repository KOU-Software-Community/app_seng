/**
 * `POST /api/gundem/ceviri` — uygulamanın Azure'a giden tek kapısı.
 *
 * **Neden bir uç nokta var:** Azure anahtarı uygulamaya konamıyor (bkz.
 * `azureTranslate.ts` başlığı). Uygulama panele soruyor, panel Azure'a
 * soruyor, anahtar sunucuda kalıyor.
 *
 * **Neden kimlik istemiyor:** AI Gündem herkese açık, oturum gerektirmiyor.
 * Buraya jeton şartı koymak, giriş yapmamış kullanıcının çevirisini
 * öldürürdü — ve bu, Apple 5.1.1(v)'nin yasakladığı şeyin (hesap tabanlı
 * olmayan içeriği duvarın arkasına koymak) tam örneği olurdu.
 *
 * **Kalan risk, ve neden kapatılmadı:** uç nokta açık olduğu için bir
 * saldırgan kulübün ücretsiz kotasını tüketebilir. Kapatan bir sayaç YOK, ve
 * bu bilerek: cihaz kimliği uydurmak bedava, dolayısıyla cihaz başına kova
 * bu deponun kendi kuralına göre ("sayılan şeyin maliyeti sıfırsa sayaç bir
 * sınır değil") sınır sayılmaz — yalnızca kod ve yanlış bir güven duygusu
 * eklerdi. IP kovası bir botnet'i durdurmuyor ama sıradan kötüye kullanımı
 * durduruyor, ve F0 katmanı SERT TAVANLI: aşıldığında para harcanmıyor,
 * yalnızca o saat çeviri gelmiyor. Yani en kötü sonuç geçici bir özellik
 * kaybı, fatura değil. Gerçek koruma istenirse cevap Firebase App Check;
 * bu defterde aynı karar `registrations` için zaten yazılı.
 */
import type { Express, Request, Response } from 'express';
import { azureCevir, azureConfig, AZURE_MAX_CHARS, type AzureConfig } from './azureTranslate';
import { clientIp, loginLimiter } from './session';

/** Uygulamanın tek bir haberi çevirmesi bir istek; 40/saat gerçek kullanımın çok üstünde. */
export const CEVIRI_IP_LIMITI = 40;
export const CEVIRI_PENCERE_MS = 60 * 60_000;

/**
 * İstemcinin gönderebileceği en uzun metin.
 *
 * Azure'un sınırı 50.000; buradaki tavan daha düşük çünkü bu uç noktadan
 * geçen şey bir HABER GÖVDESİ. Ölçülen beslemede gövdeler 139–1257 karakter
 * (`content:encoded` gönderen tek kaynak Webrazzi). 20.000 normalin çok
 * üstünde ve açık bir uç noktada kotayı tek istekte yakmayı zorlaştırıyor.
 */
export const CEVIRI_MAX_KARAKTER = 20_000;

type Bagimliliklar = {
  env?: NodeJS.ProcessEnv;
  fetchImpl?: typeof fetch;
  now?: () => number;
};

export function registerTranslateApi(app: Express, deps: Bagimliliklar = {}): void {
  const env = deps.env ?? process.env;
  const ipLimiti = loginLimiter(deps.now ?? Date.now, CEVIRI_IP_LIMITI, CEVIRI_PENCERE_MS);

  app.post('/api/gundem/ceviri', async (req: Request, res: Response) => {
    const config: AzureConfig | null = azureConfig(env);
    if (!config) {
      // Yapılandırılmamış olmak bir hata değil, bir durum: uygulama bunu
      // görünce sunucudan gelen AI çevirisine düşüyor ve kullanıcıya hiçbir
      // şey söylemiyor. 200 dönüyor ki istemci bunu ağ hatasıyla karıştırmasın.
      res.json({ durum: 'yapilandirilmamis' });
      return;
    }

    const ip = clientIp(req);
    const kilit = ipLimiti.lockedFor(ip);
    if (kilit > 0) {
      res.status(429).json({ durum: 'hiz', kalanMs: kilit });
      return;
    }

    const metin = String((req.body as { metin?: unknown })?.metin ?? '');
    const kaynakDilHam = (req.body as { kaynakDil?: unknown })?.kaynakDil;
    const kaynakDil = typeof kaynakDilHam === 'string' && /^[a-z]{2,8}(-[A-Za-z]{2,8})?$/.test(kaynakDilHam)
      ? kaynakDilHam
      : null;

    if (metin.trim().length === 0) {
      res.status(400).json({ durum: 'gecersiz', sebep: 'metin boş' });
      return;
    }
    if (metin.length > CEVIRI_MAX_KARAKTER) {
      res.status(400).json({ durum: 'cok-uzun', sinir: CEVIRI_MAX_KARAKTER });
      return;
    }

    // Sayaç ÇAĞRIDAN ÖNCE artıyor. Sonra artsaydı, Azure'a giden ama cevabı
    // gelmeyen istekler hiç sayılmazdı ve kotayı tüketen tam olarak onlar olurdu.
    ipLimiti.fail(ip);

    const sonuc = await azureCevir(metin, {
      config,
      kaynakDil,
      fetchImpl: deps.fetchImpl,
    });

    if (sonuc.durum === 'ok') {
      // Metin LOGLANMIYOR (haber gövdesi), anahtar da hiçbir zaman.
      res.json({ durum: 'ok', metin: sonuc.metin, kaynakDil: sonuc.kaynakDil });
      return;
    }

    // Sebebi ayrı ayrı yazmak şart: "çeviri gelmedi" tek başına kotanın mı
    // bittiğini, hız sınırına mı takıldığını yoksa anahtarın mı reddedildiğini
    // söylemiyor, ve operatörün bakacağı tek yer bu satır.
    console.warn(`[ceviri] azure ${sonuc.durum}`, 'kod' in sonuc ? `(${sonuc.kod}: ${sonuc.mesaj})` : '');
    res.status(sonuc.durum === 'kota' || sonuc.durum === 'hiz' ? 503 : 502).json({ durum: sonuc.durum });
  });
}

/** Panel açılışında hangi modda olduğunu yazan satır. */
export function ceviriDurumSatiri(env: NodeJS.ProcessEnv): string {
  const config = azureConfig(env);
  if (!config) {
    return '[ceviri] Azure Translator YAPILANDIRILMAMIŞ (AZURE_TRANSLATOR_KEY yok). Çeviri yalnızca AI özetiyle gelen metinden.';
  }
  const bolge = config.region ? `bölge: ${config.region}` : 'bölge yok (global kaynak)';
  return `[ceviri] Azure Translator hazır — ${bolge}, tavan ${CEVIRI_MAX_KARAKTER}/istek (Azure sınırı ${AZURE_MAX_CHARS}).`;
}
