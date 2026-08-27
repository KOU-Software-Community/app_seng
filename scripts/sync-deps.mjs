/**
 * `npm run deps:sync`
 *
 * Paket sürümlerini SDK'nın beklediği yere çeker. Kimse elle sürüm numarası
 * yazmıyor — hepsi npm registry'den geliyor.
 *
 * Expo'nun kendi aracı `npx expo install --fix` bunu yapıyor ama api.expo.dev'e
 * çıkıyor ve bazı ağlarda (bu depoyu yazan konteynerdeki proxy dahil) kapalı:
 * `HTTP Proxy Network Error: Forbidden`. Oysa asıl bilgi orada değil — her expo
 * sürümü beklediği paket listesini kendi içinde `bundledNativeModules.json`
 * olarak taşıyor. Registry açıksa bu liste de açık demektir.
 *
 * ## Listenin kimden geldiği her şeyi belirliyor
 *
 * Beklenen sürümler **kurulu** expo'nun içinden okunuyor. Yani node_modules
 * eskiyse liste de eski olur ve script paketleri düzeltmek yerine **geri
 * düşürür**. Bu tam olarak yaşandı: `git pull` package.json'ı günceller,
 * node_modules'e dokunmaz — ve o aradaki hâlde çalıştırılan ilk sürüm
 * package.json'daki doğru sürümleri dünkü listeye göre eskiye çekti.
 *
 * Bu yüzden liste okunmadan önce kurulu expo'nun hedeflenen sürüm olduğu
 * **doğrulanıyor**; değilse kuruluyor. Sonunda da kurulu sürümler tek tek
 * kontrol ediliyor: "npm install çalıştırdım" ile "sonuç doğru" aynı şey değil.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'package.json';

const read = () => readFileSync(FILE, 'utf8');

function deps(raw) {
  const pkg = JSON.parse(raw);
  return { ...pkg.dependencies, ...pkg.devDependencies };
}

/** Bir bağımlılığın aralığını yerinde değiştirir. Dosyanın biçimi bozulmasın diye metin üzerinden. */
function setRange(raw, name, version) {
  const re = new RegExp(`("${name}": )"[^"]+"`);
  if (!re.test(raw)) throw new Error(`package.json içinde bulunamadı: ${name}`);
  return raw.replace(re, `$1"${version}"`);
}

function npm(args, opts = {}) {
  return execFileSync('npm', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts });
}

/** Kurulu sürüm; paket yoksa null. */
function installed(name) {
  try {
    return JSON.parse(readFileSync(`node_modules/${name}/package.json`, 'utf8')).version;
  } catch {
    return null;
  }
}

/**
 * registry'den bir paketin sürüm listesi.
 *
 * Ağ kapalıysa burası **gürültüyle** durmalı. Sessizce boş liste dönmek
 * "her şey güncel" demek olurdu — yani ağ hatasını başarı diye raporlamak.
 */
function versions(name) {
  let out;
  try {
    out = npm(['view', name, 'versions', '--json']);
  } catch (err) {
    const detail = String(err.stderr || err.stdout || err.message).trim().split('\n').slice(0, 4).join('\n');
    throw new Error(
      `npm registry'ye ulaşılamadı (${name}).\n${detail}\n\n` +
        "Sürümler registry'den geliyor; ağ olmadan bu komut çalışamaz.",
    );
  }
  const list = JSON.parse(out);
  return Array.isArray(list) ? list : [list];
}

/** `~57.0.12` → 57 */
function majorOf(range) {
  const m = /(\d+)\./.exec(range ?? '');
  if (!m) throw new Error(`expo aralığı okunamadı: ${range}`);
  return Number(m[1]);
}

function compare(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i += 1) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
}

/** Aynı major içindeki en son kararlı yama. Canary/beta (`-` taşıyanlar) elenir. */
function latestPatch(list, major) {
  const stable = list.filter((v) => !v.includes('-') && Number(v.split('.')[0]) === major);
  if (!stable.length) throw new Error(`registry'de ${major}.x kararlı sürümü yok`);
  return stable.sort(compare).at(-1);
}

let installed_ = false;
function install(why) {
  console.log(`  npm install (${why})…`);
  npm(['install'], { stdio: ['ignore', 'ignore', 'pipe'] });
  installed_ = true;
}

// ---------------------------------------------------------------------------

let raw = read();
const major = majorOf(deps(raw).expo);

console.log(`SDK ${major} için en son yama aranıyor…`);
const target = latestPatch(versions('expo'), major);
const wantExpo = `~${target}`;

if (deps(raw).expo === wantExpo) {
  console.log(`expo zaten ${wantExpo}`);
} else {
  console.log(`expo ${deps(raw).expo} → ${wantExpo}`);
  writeFileSync(FILE, setRange(raw, 'expo', wantExpo));
  raw = read();
}

// package.json doğru olabilir ve node_modules yine de eski olabilir — `git pull`
// sonrası tam olarak bu durumdasınız. Liste kurulu expo'dan okunduğu için
// buradan itibaren kurulu sürümün hedef olduğu garanti edilmeli.
if (installed('expo') !== target) {
  console.log(`kurulu expo ${installed('expo') ?? 'yok'} ≠ ${target}`);
  install('kurulu expo hedefin gerisinde');
}

// Kurulum sessizce başarısız olduysa liste yine dünküdür. Emin olmadan okumak,
// bu script'in bir kez paketleri geri düşürmesinin sebebiydi.
if (installed('expo') !== target) {
  throw new Error(
    `expo ${target} kurulamadı (node_modules'te ${installed('expo') ?? 'yok'}).\n` +
      "Beklenen sürüm listesi kurulu expo'dan okunuyor; yanlış sürümden okumak " +
      'paketleri düzeltmek yerine geri düşürür. Durduruldu.\n' +
      'node_modules bozuk olabilir: `rm -rf node_modules && npm ci` deneyin.',
  );
}

const bundled = JSON.parse(readFileSync('node_modules/expo/bundledNativeModules.json', 'utf8'));
const managed = Object.entries(bundled).filter(([name]) => deps(raw)[name]);

const changes = managed
  .filter(([name, want]) => deps(raw)[name] !== want)
  .map(([name, want]) => ({ name, from: deps(raw)[name], to: want }));

for (const { name, from, to } of changes) {
  console.log(`${name} ${from} → ${to}`);
  raw = setRange(raw, name, to);
}
if (changes.length) writeFileSync(FILE, raw);

/** Kurulu sürüm aralığın istediği yerde mi? `~57.0.15` → 57.0.15 ve üstü kabul. */
function satisfies(version, range) {
  if (!version) return false;
  const bare = range.replace(/^[~^]/, '');
  if (range === bare) return version === bare; // sabit sürüm: birebir
  const [a, b] = [version, bare].map((v) => v.split('.').map(Number));
  if (a[0] !== b[0]) return false;
  if (range.startsWith('~')) return a[1] === b[1] && a[2] >= b[2];
  return compare(version, bare) >= 0;
}

const stale = managed.filter(([name, want]) => !satisfies(installed(name), want));
if (changes.length || stale.length) {
  install(changes.length ? 'package.json değişti' : 'node_modules eski');
}

// Son söz kurulu sürümlerin. "npm install çalıştırdım" bir kanıt değil.
const left = managed
  .filter(([name, want]) => !satisfies(installed(name), want))
  .map(([name, want]) => `${name} ${installed(name) ?? 'yok'} ≠ ${want}`);

if (left.length) {
  console.error('\nHâlâ uyuşmayanlar:\n  ' + left.join('\n  '));
  console.error('\n`rm -rf node_modules && npm ci` deneyin.');
  process.exit(1);
}

console.log(
  installed_
    ? '\nBitti — package.json ve node_modules SDK ile uyumlu.'
    : '\nZaten uyumlu; değişiklik yok.',
);
