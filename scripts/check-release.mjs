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
  'takvim başlığında sabit tarih yok',
  'Başlık "Mart – Nisan 2026" yazıyordu ve o etkinlikler geçtikten aylar sonra hâlâ ' +
    'oradaydı. Tarih aralığı veriden türetilmeli, elle yazılmamalı.',
  () => {
    const takvim = read('app/(tabs)/takvim.tsx');
    // Yorumlar hariç: sabit bir yıl JSX metnine gömülmüş mü?
    const code = takvim.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    const year = code.match(/\b(19|20)\d{2}\b/);
    return year ? `başlıkta sabit yıl var: ${year[0]}` : null;
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
