/**
 * Azure AI Translator istemcisi — panelin içinde, uygulamanın içinde DEĞİL.
 *
 * **Neden panelde:** Azure abonelik anahtarı yayımlanabilir bir anahtar değil.
 * Bu deponun standing kuralı net: yalnızca publishable/anon anahtarlar
 * uygulamaya giriyor. `EXPO_PUBLIC_*` değerleri derleme anında JS paketine
 * gömülüyor ve `.ipa`'yı açan herkes okuyabiliyor — yani anahtarı uygulamaya
 * koymak onu yayımlamak demek. Panel (Express + Admin SDK) bu deponun
 * "dağıtabildiğimiz sunucu" kutusu; OTP de aynı gerekçeyle oraya taşınmıştı.
 *
 * **Sözleşme tahmin edilmedi, belgeden okundu**
 * (learn.microsoft.com/azure/ai-services/translator, 2026-09 itibarıyla):
 *
 * - `POST https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=tr`
 * - Başlıklar: `Ocp-Apim-Subscription-Key`, bölgesel kaynakta ayrıca
 *   `Ocp-Apim-Subscription-Region`, ve `Content-Type: application/json; charset=UTF-8`
 * - Gövde: `[{ "Text": "..." }]`
 * - Cevap: `[{ "detectedLanguage": {...}, "translations": [{ "text": "...", "to": "tr" }] }]`
 * - Sınırlar: dizi elemanı başına 50.000 karakter, en çok 1.000 eleman,
 *   **istek başına toplam 50.000 karakter**.
 * - F0 (ücretsiz) katman: **saatte 2 milyon karakter** — aylık değil.
 * - `403` ücretsiz kotanın bitmesi, `429` hız sınırı. İkisi ayrı sebepler ve
 *   ayrı ayrı raporlanıyor: "çeviri gelmedi" tek başına hangisi olduğunu
 *   söylemiyor ve bu depoda teşhis edilemeyen bir uyarı, uyarı sayılmıyor.
 */

/** Belgelenmiş istek başına toplam karakter sınırı. */
export const AZURE_MAX_CHARS = 50_000;

/** Varsayılan uç nokta — bölgesel kaynakta bile global ad çalışıyor. */
export const AZURE_ENDPOINT = 'https://api.cognitive.microsofttranslator.com';

export type AzureConfig = {
  key: string;
  /** Bölgesel kaynakta zorunlu, global kaynakta boş. */
  region: string;
  endpoint: string;
};

export type CeviriSonuc =
  | { durum: 'ok'; metin: string; kaynakDil: string | null }
  | { durum: 'yapilandirilmamis' }
  /** 403 — ücretsiz kota bitti. Saat başında geri geliyor. */
  | { durum: 'kota' }
  /** 429 — çok hızlı gönderildi. */
  | { durum: 'hiz' }
  /** Metin sınırın üstünde; kesmek yerine reddediliyor (bkz. aşağıdaki not). */
  | { durum: 'cok-uzun'; sinir: number }
  | { durum: 'hata'; kod: number; mesaj: string };

/**
 * Ortamdan yapılandırmayı okur, eksikse `null`.
 *
 * Boş dize `??` ile yakalanmıyor — bu deponun `ADMIN_PORT` maddesinin aynısı:
 * Coolify'da bir değişkeni tanımlayıp boş bırakmak kolay ve `''` nullish değil.
 */
export function azureConfig(env: NodeJS.ProcessEnv): AzureConfig | null {
  const key = (env.AZURE_TRANSLATOR_KEY ?? '').trim();
  if (!key) return null;
  return {
    key,
    region: (env.AZURE_TRANSLATOR_REGION ?? '').trim(),
    endpoint: (env.AZURE_TRANSLATOR_ENDPOINT ?? '').trim() || AZURE_ENDPOINT,
  };
}

/**
 * Azure'un cevap gövdesini karara çevirir. Saf — ağ yok, test doğrudan çağırıyor.
 *
 * Şekle bakıyor, duruma değil: bu depoda bir kez, sunucunun başarılı cevabı
 * beklenen `status` dizesini taşımadığı için çöpe atılmıştı. Burada da kural
 * aynı — elde dolu bir `translations[0].text` varsa cevap odur.
 */
export function azureCevabiOku(gövde: unknown): CeviriSonuc {
  if (!Array.isArray(gövde) || gövde.length === 0) {
    return { durum: 'hata', kod: 200, mesaj: 'cevap dizi değil ya da boş' };
  }
  const ilk = gövde[0] as {
    translations?: { text?: unknown }[];
    detectedLanguage?: { language?: unknown };
  };
  const metin = ilk?.translations?.[0]?.text;
  if (typeof metin !== 'string' || metin.length === 0) {
    return { durum: 'hata', kod: 200, mesaj: 'translations[0].text boş' };
  }
  const dil = ilk?.detectedLanguage?.language;
  return { durum: 'ok', metin, kaynakDil: typeof dil === 'string' ? dil : null };
}

/** HTTP kodunu karara çevirir. Saf. */
export function azureKodunuOku(kod: number, mesaj = ''): CeviriSonuc | null {
  if (kod === 200) return null; // gövdeye bakılacak
  if (kod === 403) return { durum: 'kota' };
  if (kod === 429) return { durum: 'hiz' };
  return { durum: 'hata', kod, mesaj };
}

/**
 * Bir metni Türkçeye çevirir.
 *
 * **Sınırın üstündeki metin KESİLMİYOR, reddediliyor.** Kesmek sessizce yarım
 * bir çeviri üretirdi ve kullanıcı metnin bittiğini sanırdı — bu depodaki
 * `output_truncated` kayıtlarının tam olarak ürettiği şikâyet. Reddedince
 * çağıran orijinali gösteriyor, ki eksik çeviriden dürüst.
 */
export async function azureCevir(
  metin: string,
  opts: { config: AzureConfig; kaynakDil?: string | null; fetchImpl?: typeof fetch; timeoutMs?: number },
): Promise<CeviriSonuc> {
  const { config } = opts;
  const fetchImpl = opts.fetchImpl ?? fetch;
  if (metin.length > AZURE_MAX_CHARS) return { durum: 'cok-uzun', sinir: AZURE_MAX_CHARS };
  if (metin.trim().length === 0) return { durum: 'ok', metin: '', kaynakDil: null };

  const url = new URL('/translate', config.endpoint);
  url.searchParams.set('api-version', '3.0');
  url.searchParams.set('to', 'tr');
  // `from` verilmezse Azure kendi tespit ediyor. Kaynaktan miras alınan dil
  // yanlış olabiliyor (bu defterde yazılı: dil tespit edilmiyor, beslemeden
  // geliyor), o yüzden yalnızca elimizde bir değer varsa gönderiliyor.
  if (opts.kaynakDil) url.searchParams.set('from', opts.kaynakDil);

  // Azure'un belgelenmiş azami gecikmesi 15 saniye. Süre koymamak, panelin
  // bir isteğini sonsuza kadar açık bırakırdı.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 20_000);
  try {
    const res = await fetchImpl(url.toString(), {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': config.key,
        ...(config.region ? { 'Ocp-Apim-Subscription-Region': config.region } : {}),
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify([{ Text: metin }]),
      signal: controller.signal,
    });
    const koddan = azureKodunuOku(res.status, res.statusText);
    if (koddan) return koddan;
    return azureCevabiOku(await res.json());
  } catch (err: unknown) {
    const mesaj = err instanceof Error ? err.message : String(err);
    return { durum: 'hata', kod: 0, mesaj };
  } finally {
    clearTimeout(timer);
  }
}
