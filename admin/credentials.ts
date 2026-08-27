/**
 * Firebase Admin SDK servis hesabı anahtarını çözer.
 *
 * Yerelde bu bir dosya: `./service-account.json`. Sunucuda değil — Render, Fly,
 * Railway gibi yerlerde diske dosya koymak ya mümkün değil ya da her deploy'da
 * kayboluyor. Oralarda tek taşıma yolu ortam değişkeni.
 *
 * Üç biçim de kabul ediliyor:
 *   1. Dosya yolu           `FIREBASE_SERVICE_ACCOUNT=./service-account.json`
 *   2. JSON'un kendisi      `FIREBASE_SERVICE_ACCOUNT={"type":"service_account",…}`
 *   3. base64'lenmiş JSON   `FIREBASE_SERVICE_ACCOUNT=eyJ0eXBlIjoi…`
 *
 * Üçüncüsü işe yaramaz görünüyor ama gerekiyor: anahtarın `private_key` alanı
 * gerçek satır sonları taşıyor ve birçok panel çok satırlı değeri kırpıyor ya da
 * `\n` kaçışlarını bozuyor. base64 tek satır olduğu için o sorunu tamamen
 * ortadan kaldırıyor.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type ServiceAccount = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

/** JSON gibi mi görünüyor? */
function asJson(value: string): string | null {
  return value.startsWith('{') && value.endsWith('}') ? value : null;
}

/** base64 çözülünce JSON çıkıyor mu? Çıkmıyorsa değer bir yol demektir. */
function asBase64Json(value: string): string | null {
  // Yol karakterleri base64 alfabesinde yok; bunlar varsa uğraşmıyoruz.
  if (/[/\\.]/.test(value) || value.length < 40) return null;
  try {
    const decoded = Buffer.from(value, 'base64').toString('utf8');
    return asJson(decoded.trim());
  } catch {
    return null;
  }
}

/**
 * Değeri servis hesabı nesnesine çevirir.
 *
 * Bulunamama ve çözülememe ayrı ayrı anlatılıyor: ikisi de "anahtar yok" diye
 * özetlenirse yönetici hangisini düzelteceğini bilemiyor.
 */
export function parseServiceAccount(value: string | undefined): ServiceAccount {
  const raw = (value ?? './service-account.json').trim();

  const inline = asJson(raw) ?? asBase64Json(raw);
  if (inline) {
    try {
      return JSON.parse(inline) as ServiceAccount;
    } catch (err) {
      throw new Error(
        'FIREBASE_SERVICE_ACCOUNT bir JSON gibi görünüyor ama çözülemedi: ' +
          `${err instanceof Error ? err.message : String(err)}\n` +
          'Çok satırlı değerler panolarda bozulabiliyor — base64 olarak verin:\n' +
          '  base64 -i service-account.json | tr -d "\\n"',
      );
    }
  }

  const path = resolve(raw);
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as ServiceAccount;
  } catch {
    throw new Error(
      `Servis hesabı anahtarı okunamadı: ${path}\n\n` +
        'Firebase Console → Project settings → Service accounts → Generate new key.\n' +
        'FIREBASE_SERVICE_ACCOUNT üç biçimi de kabul ediyor:\n' +
        '  dosya yolu   ./service-account.json\n' +
        '  JSON         {"type":"service_account",…}\n' +
        '  base64       base64 -i service-account.json | tr -d "\\n"\n\n' +
        'Sunucuda dosya koyamıyorsanız base64 olanı kullanın: tek satır olduğu ' +
        'için private_key’in satır sonları bozulmuyor.',
    );
  }
}
