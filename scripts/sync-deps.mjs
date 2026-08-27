/**
 * `npm run deps:sync`
 *
 * Paket sürümlerini SDK'nın beklediği yere çeker. Kimse elle sürüm numarası
 * yazmıyor — hepsi npm registry'den geliyor.
 *
 * Expo'nun kendi aracı `npx expo install --fix` bunu yapıyor ama api.expo.dev'e
 * çıkıyor ve bazı ağlarda (bu konteynerdeki proxy dahil) kapalı:
 * `HTTP Proxy Network Error: Forbidden`. Oysa asıl bilgi orada değil — her expo
 * sürümü beklediği paket listesini kendi içinde `bundledNativeModules.json`
 * olarak taşıyor. Registry açıksa bu liste de açık demektir.
 *
 * İşleyiş:
 *   1. registry'den SDK'nın **en son yaması** bulunuyor (57.0.12 → 57.0.17)
 *   2. o sürüm kuruluyor
 *   3. beraberinde gelen listedeki sürümler package.json'a yazılıyor
 *   4. tekrar kuruluyor
 *
 * SDK **majoru atlanmıyor**: 57'den 58'e geçmek bir yükseltme projesi, yama
 * değil. Major'ü package.json'daki mevcut aralık belirliyor.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'package.json';

function read() {
  return readFileSync(FILE, 'utf8');
}

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
        'Sürümler registry\'den geliyor; ağ olmadan bu komut çalışamaz. ' +
        'Ağ açık bir yerde çalıştırın.',
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

function install() {
  console.log('  npm install…');
  npm(['install'], { stdio: ['ignore', 'ignore', 'pipe'] });
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
  install();
  raw = read();
}

// Beklenen sürümler kurulu expo'nun içinden geliyor: expo'nun kendisi
// güncellendikten **sonra** okunuyor, yoksa dünkü beklentiler okunurdu.
const bundled = JSON.parse(readFileSync('node_modules/expo/bundledNativeModules.json', 'utf8'));
const have = deps(raw);

const changes = Object.entries(bundled)
  .filter(([name, want]) => have[name] && have[name] !== want)
  .map(([name, want]) => ({ name, from: have[name], to: want }));

if (!changes.length) {
  console.log('Diğer paketler zaten SDK ile uyumlu.');
} else {
  for (const { name, from, to } of changes) {
    console.log(`${name} ${from} → ${to}`);
    raw = setRange(raw, name, to);
  }
  writeFileSync(FILE, raw);
  install();
}

console.log('\nBitti. `npm run check:release` ile doğrulayın.');
