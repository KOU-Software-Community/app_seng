/**
 * `npm run rules:deploy`
 *
 * firestore.rules depoda duruyor ama Firestore onu depodan okumuyor — kurallar
 * projeye yayınlanana kadar Firestore varsayılanı geçerli, o da her şeyi
 * reddediyor. Uygulamanın "Missing or insufficient permissions" demesinin
 * sebebi buydu ve dosyaya bakarak anlaşılmıyor: dosya doğru, yayınlanmamış.
 *
 * Konsola yapıştırmak da işi görür, ama kural her değiştiğinde yeniden
 * yapıştırmak gerekir ve yapıştırılan sürümün depodakiyle aynı olduğunu hiçbir
 * şey garanti etmez. Bu script tek doğru kaynağı dosya yapıyor.
 *
 * Proje kimliği uygulamanın kullandığı değişkenden okunuyor
 * (EXPO_PUBLIC_FIREBASE_PROJECT_ID), böylece kuralların yayınlandığı proje ile
 * uygulamanın bağlandığı proje ayrışamıyor — ayrışırsa hata, doğru projede
 * yayınlanmış ama yanlış projeye bakan bir uygulama olurdu ve bu tam olarak
 * şu anki hatanın aynısına benzerdi.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Expo'nun sırası: .env.local, .env'i ezer. */
function readEnv(name) {
  for (const file of ['.env.local', '.env']) {
    const path = join(root, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const m = /^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
      if (m?.[1] === name) return m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return process.env[name] ?? '';
}

const projectId = readEnv('EXPO_PUBLIC_FIREBASE_PROJECT_ID');

if (!projectId) {
  console.error(
    'EXPO_PUBLIC_FIREBASE_PROJECT_ID bulunamadı (.env.local, .env veya ortam).\n' +
      'Uygulamanın bağlandığı projeyi bilmeden kural yayınlamıyorum — yanlış\n' +
      'projeye yayınlamak, hiç yayınlamamakla aynı sonucu verir ama hata mesajı\n' +
      'her şeyin yolunda olduğunu söyler.',
  );
  process.exit(1);
}

// Hedef önce yazılıyor: hangi projeye yayınlanacağı, herhangi bir şey olmadan
// önce görülebilmeli.
console.log(`firestore.rules → ${projectId}`);

const cli = spawnSync('firebase', ['--version'], { stdio: 'ignore' });
if (cli.status !== 0) {
  console.error(
    '\nfirebase komutu bulunamadı. Kurulum:\n' +
      '  npm install -g firebase-tools\n' +
      '  firebase login\n',
  );
  process.exit(1);
}

const result = spawnSync(
  'firebase',
  ['deploy', '--only', 'firestore:rules', '--project', projectId],
  { cwd: root, stdio: 'inherit' },
);

process.exit(result.status ?? 1);
