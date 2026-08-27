/**
 * Sunucu tarafı ortam değişkenleri: `.env.local`, sonra `.env`.
 *
 * `import 'dotenv/config'` yalnızca `.env` okuyor. `.env.local` bir Expo/Next
 * geleneği, dotenv'in değil — yani `npm start` onu görüyordu, `npm run admin`
 * görmüyordu. Belgeler "gizli değerler `.env.local`'e" diyordu ve panel onları
 * hiç okumuyordu: anahtar doğru yerde duruyor ve hiçbir şey çalışmıyordu, ortada
 * da bir hata yoktu — sadece tanımsız bir değişken.
 *
 * dotenv zaten tanımlı bir değişkenin üzerine yazmıyor, dolayısıyla **önce
 * yüklenen kazanıyor**. Sıra bilerek Expo'nunkiyle aynı: `.env.local`, `.env`'i
 * eziyor.
 *
 * Kabuktan verilen değer ikisini de eziyor (`ADMIN_PASSWORD=… npm run admin`),
 * çünkü o zaten `process.env`'de.
 */
import { config } from 'dotenv';

for (const path of ['.env.local', '.env']) {
  // `quiet`: dotenv 17 her yüklemede bir başlık basıyor; panelin ilk çıktısı
  // adresi olsun.
  config({ path, quiet: true });
}
