#!/usr/bin/env node
/**
 * `npm run check:bundle`
 *
 * Paketi derler ve **içinde gerçekten ne olduğunu** okur. Kaynağı greplemek bu
 * soruyu cevaplayamıyor: `EXPO_PUBLIC_*` değerleri derleme anında gömülüyor, yani
 * ortamdan gelen bir değer kaynakta hiç görünmüyor ama pakette duruyor. Yanlış
 * önekli bir anahtar bir lint sorunu değil, yayınlanmış bir kimlik bilgisidir.
 *
 * Bu depoda korunacak üç sınır var:
 *
 *   1. Panelin sırları uygulamaya **hiç** girmemeli — `SUPABASE_SERVICE_ROLE_KEY`,
 *      `FIREBASE_SERVICE_ACCOUNT`, `ADMIN_PASSWORD`, servis hesabının özel
 *      anahtarı. Bunlar sunucuda kalıyor; pakette görünmeleri sızıntıdır.
 *   2. Gömülü bir Supabase JWT'si varsa yalnızca **anon** olabilir. service_role
 *      anahtarı da bir JWT, yani metin araması ikisini ayırt edemiyor — yükü
 *      çözmek gerekiyor. En pahalı sızıntı bu ve düz grep tam olarak bunu kaçırıyor.
 *   3. Yapılandırma verildiyse AI Gündem okuma yolu pakette **olmalı**. P1'de
 *      ölçüldü: hiçbir ekran çağırmazken Metro veri katmanını komple ağaçtan
 *      siliyordu ve `expo export` yine 0 dönüyordu. Yeşil bir export, uygulamanın
 *      backend'e ulaşabildiğinin kanıtı değil.
 *
 * Neden web paketi: uygulama EAS ile iOS/Android olarak yayınlanıyor ama
 * `EXPO_PUBLIC_*` gömme işini babel yapıyor ve platformdan bağımsız. Web çıktısı
 * düz JavaScript, Hermes bytecode değil — yani okunabiliyor ve aynı gömülü
 * değerleri taşıyor.
 *
 * Node ve bağımlılık yok. Export'u kendisi çalıştırıyor ki sınadığı paket,
 * kendi ürettiği paket olsun.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

/**
 * Aranan belirteçler.
 *
 * `credential` gerçek bir sızmış değerin şekli — kütüphane kodundaki çıplak bir
 * kelime sır değil, ardından anahtar malzemesi gelen bir kelime sırdır.
 * Credential şeklinde olmayan her isabet `known` listesindeki gerekçelerden
 * birine uymak zorunda; uymayan yeni bir isabet, sessizce yutulmak yerine
 * kontrolü kırmızıya çeviriyor.
 */
const FORBIDDEN = [
  {
    token: 'SUPABASE_SERVICE_ROLE_KEY',
    credential: /SUPABASE_SERVICE_ROLE_KEY/,
    known: [],
  },
  { token: 'FIREBASE_SERVICE_ACCOUNT', credential: /FIREBASE_SERVICE_ACCOUNT/, known: [] },
  { token: 'ADMIN_PASSWORD', credential: /ADMIN_PASSWORD/, known: [] },
  { token: 'BEGIN PRIVATE KEY', credential: /BEGIN PRIVATE KEY/, known: [] },
  { token: 'sk-ant', credential: /sk-ant-[A-Za-z0-9_-]{10,}/, known: [] },
  {
    token: 'sb_secret',
    credential: /sb_secret_[A-Za-z0-9_-]{8,}/,
    known: [
      {
        why: 'supabase-js anahtar biçimi öneki — bir değer değil, bir sabit',
        context: /startsWith\(["']sb_secret_["']\)|["']sb_secret_["']\s*[,)\]}]/,
      },
    ],
  },
  {
    token: 'service_role',
    credential: /service_role["'\s]*[:=]["'\s]*[A-Za-z0-9._-]{20,}/,
    known: [
      {
        why: 'supabase-js kendisine verilen anahtarın rolünü karşılaştırıyor; değer yok',
        context: /role[^"']{0,20}["']service_role["']|["']service_role["']\s*[,)\]}=;]/,
      },
    ],
  },
];

/**
 * AI Gündem okuma yolunun grafikte olduğunun kanıtı. Bu görünüm adını yalnızca
 * `src/gundem/data-access/supabase/client.ts` üretiyor.
 */
const REQUIRED = ['aigundem_feed_articles_v1'];

/** Bir istemci paketinde asla görünmemesi gereken JWT rolleri. */
const FORBIDDEN_JWT_ROLES = ['service_role', 'supabase_admin'];

const argv = process.argv.slice(2);
const skipExport = argv.includes('--no-export');

const url = process.env.EXPO_PUBLIC_AIGUNDEM_SUPABASE_URL?.trim() || null;
const anonKey = process.env.EXPO_PUBLIC_AIGUNDEM_SUPABASE_ANON_KEY?.trim() || null;
/**
 * Yapılandırma yoksa (CI, taze klon) `mock` kipinde koşuyoruz: sızıntı taraması
 * yine yapılıyor, ama "gömüldü mü" ve "adaptör pakette mi" iddiaları atlanıyor
 * ve **atlandığı söyleniyor**. Sessizce atlanan bir iddia, geçmiş gibi görünür.
 */
const mode = url && anonKey ? 'supabase' : 'mock';

const mask = (value) => (value && value.length > 12 ? `${value.slice(0, 6)}…${value.slice(-4)}` : '(kısa)');

function exportBundle() {
  console.log(`check-bundle: ${mode} kipinde web paketi derleniyor…`);
  rmSync(dist, { recursive: true, force: true });
  // `--clear` zorunlu: Metro'nun dönüşüm önbelleği `.env` değişikliğinden sağ
  // çıkıyor ve bu deponun why-log'unda kayıtlı — önbellekli bir derlemeyi ölçmek,
  // eski bir derlemeyi ölçmektir.
  const result = spawnSync('npx expo export --platform web --clear', {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    env:
      mode === 'supabase'
        ? { ...process.env, EXPO_PUBLIC_AIGUNDEM_DATA_MODE: 'supabase' }
        : {
            ...process.env,
            EXPO_PUBLIC_AIGUNDEM_DATA_MODE: 'mock',
            EXPO_PUBLIC_AIGUNDEM_SUPABASE_URL: '',
            EXPO_PUBLIC_AIGUNDEM_SUPABASE_ANON_KEY: '',
          },
  });
  if (result.status !== 0) {
    console.error(`check-bundle BAŞARISIZ: expo export ${result.status} ile çıktı.`);
    process.exit(1);
  }
}

function bundleFiles(dir) {
  const files = [];
  const walk = (current) => {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry);
      if (statSync(full).isDirectory()) walk(full);
      else files.push(full);
    }
  };
  walk(dir);
  return files;
}

const TEXT = /\.(js|html|json|map|css|txt)$/i;
const CONTEXT = 120;

/** `token`'ın her geçtiği yer, karar verilebilsin diye çevresiyle birlikte. */
function occurrences(contents, token) {
  const hits = [];
  let from = 0;
  for (;;) {
    const at = contents.indexOf(token, from);
    if (at === -1) break;
    hits.push({ context: contents.slice(Math.max(0, at - CONTEXT), at + token.length + CONTEXT) });
    from = at + token.length;
  }
  return hits;
}

/** JWT şeklindeki metinleri çözer ve `role` iddiasını bildirir. */
function embeddedJwtRoles(contents) {
  const roles = [];
  for (const match of contents.matchAll(
    /eyJ[A-Za-z0-9_-]{8,}\.eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]+/g,
  )) {
    try {
      const payload = JSON.parse(Buffer.from(match[0].split('.')[1], 'base64url').toString('utf8'));
      roles.push(String(payload.role ?? '(yok)'));
    } catch {
      // Şekli tuttu ama yükü JSON değil; JWT değilmiş.
    }
  }
  return roles;
}

function main() {
  if (!skipExport) exportBundle();

  if (!existsSync(dist)) {
    console.error('check-bundle BAŞARISIZ: dist/ yok.');
    process.exit(1);
  }

  const files = bundleFiles(dist).filter((f) => TEXT.test(f));
  console.log(`\ncheck-bundle: dist/ içinde ${files.length} metin dosyası taranıyor`);

  const problems = [];
  const contentsOf = new Map(files.map((f) => [f, readFileSync(f, 'utf8')]));

  for (const rule of FORBIDDEN) {
    let credential = 0;
    let benign = 0;
    let unknown = 0;

    for (const [file, contents] of contentsOf) {
      const short = file.replace(root, '');
      for (const hit of occurrences(contents, rule.token)) {
        if (rule.credential.test(hit.context)) {
          credential += 1;
          problems.push(`SIZINTI: "${rule.token}" kimlik bilgisi şeklinde — ${short}`);
        } else if (rule.known.some((k) => k.context.test(hit.context))) {
          benign += 1;
        } else {
          unknown += 1;
          problems.push(
            `BİLİNMEYEN "${rule.token}" geçişi — ${short}. Ne kimlik bilgisi şeklinde ne de ` +
              `izin listesinde. Bağlam:\n      …${hit.context.replace(/\s+/g, ' ').slice(0, 200)}…`,
          );
        }
      }
    }

    const total = credential + benign + unknown;
    const verdict = credential || unknown ? 'HATA' : 'tamam';
    console.log(
      `  ${verdict}  yasak "${rule.token}": ` +
        (total === 0
          ? '0 isabet'
          : `${total} isabet (${credential} kimlik bilgisi, ${benign} bilinen zararsız, ${unknown} bilinmeyen)`),
    );
  }

  const present = new Set();
  const roles = [];
  for (const contents of contentsOf.values()) {
    for (const needle of REQUIRED) if (contents.includes(needle)) present.add(needle);
    roles.push(...embeddedJwtRoles(contents));
  }

  for (const needle of REQUIRED) {
    const ok = present.has(needle);
    if (mode === 'mock') {
      console.log(`  atlandı  "${needle}": ${ok ? 'var' : 'yok'} (mock kipinde iddia edilmiyor)`);
      continue;
    }
    console.log(`  ${ok ? 'tamam' : 'HATA'}  gerekli "${needle}": ${ok ? 'var' : 'YOK'}`);
    if (!ok) {
      problems.push(
        `"${needle}" pakette yok — Supabase adaptörü ağaçtan silinmiş, bu derleme backend'e ulaşamaz.`,
      );
    }
  }

  for (const [label, value] of [
    ['proje adresi', url],
    ['anon anahtarı', anonKey],
  ]) {
    if (mode === 'mock') {
      console.log(`  atlandı  gömülü ${label}: yapılandırma verilmedi`);
      continue;
    }
    const found = [...contentsOf.values()].some((c) => c.includes(value));
    console.log(`  ${found ? 'tamam' : 'HATA'}  gömülü ${label} (${mask(value)}): ${found ? 'var' : 'YOK'}`);
    if (!found) {
      problems.push(
        `${label} pakete gömülmemiş — bu derleme çalışırken mock'a düşerdi. Bayat bir Metro ` +
          'önbelleği tam olarak bunu yapıyor; --clear ile derleyin.',
      );
    }
  }

  const distinct = [...new Set(roles)];
  console.log(`  ${distinct.length ? 'tamam' : 'atlandı'}  gömülü JWT rolleri: ${distinct.join(', ') || '(yok)'}`);
  for (const role of roles) {
    if (FORBIDDEN_JWT_ROLES.includes(role)) {
      problems.push(`SIZINTI: gömülü bir JWT "${role}" rolü taşıyor — yalnızca anon anahtarı yayınlanabilir.`);
    }
  }

  if (problems.length > 0) {
    console.error('\ncheck-bundle BAŞARISIZ:');
    for (const problem of problems) console.error(`  ✗ ${problem}`);
    process.exit(1);
  }
  console.log(
    mode === 'mock'
      ? '\ncheck-bundle TAMAM (mock): sır sızmamış. Gömme ve adaptör iddiaları atlandı.'
      : '\ncheck-bundle TAMAM (supabase): sır sızmamış, okuma yolu pakette, yalnızca anon JWT.',
  );
}

main();
