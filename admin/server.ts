/**
 * Kulüp yönetim paneli — etkinlik girme ve kayıtları görme.
 *
 *   ADMIN_PASSWORD=... npm run admin
 *
 * Neden var: etkinlik girmek Firebase Console'dan pratikte yapılamıyor. Bir
 * ClubEvent on yedi alan taşıyor ve bunların yarısı `startsAt` ile yerden
 * türeyen görüntü metinleri — konsolda elle girildiğinde ilk etkinlik
 * ertelendiğinde tarih bir alanda değişip diğer beşinde kalıyor.
 *
 * Bu panel hiçbir şeyi iki kez sormuyor: tarih, bitiş saati ve yer alınıyor,
 * gerisi `src/eventSchema.ts` içindeki `buildEvent` ile türetiliyor. Yani
 * Firestore'a ulaşan her etkinlik uygulamanın beklediği şekilde.
 *
 * `registrations` istemciye kapalı olduğu için (öyle kalmalı) panel Admin SDK
 * kullanıyor — `npm run push` ve `npm run export` ile aynı servis hesabı
 * anahtarı.
 */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import type { ClubEvent } from '../src/data';
import { buildEvent, joinLocal, splitLocal, toInput, type EventInput } from '../src/eventSchema';
import {
  csvColumns,
  DEFAULT_FIELDS,
  maskName,
  validateFields,
  type Raffle,
  type RaffleField,
  type RaffleFieldType,
} from '../src/raffleSchema';
import { esc, eventForm, loginPage, page, raffleForm, winnersForm } from './views';

const PORT = Number(process.env.ADMIN_PORT ?? 4000);
const PASSWORD = process.env.ADMIN_PASSWORD ?? '';
const COOKIE = 'kyk_admin';
/** Yeniden başlatınca herkes düşer — küçük bir panel için doğru varsayılan. */
const SECRET = randomBytes(32);

if (!PASSWORD) {
  console.error(
    'ADMIN_PASSWORD tanımlı değil.\n\n' +
      'Panel açık bir sunucuda çalışacak ve kayıtlara erişiyor; varsayılan parola\n' +
      'ile başlatmıyorum. .env dosyanıza uzun ve rastgele bir değer koyun:\n' +
      '  ADMIN_PASSWORD=...\n',
  );
  process.exit(1);
}

function loadServiceAccount() {
  const path = resolve(process.env.FIREBASE_SERVICE_ACCOUNT ?? './service-account.json');
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    console.error(
      `Servis hesabı anahtarı okunamadı: ${path}\n` +
        'Firebase Console → Project settings → Service accounts → Generate new key',
    );
    process.exit(1);
  }
}

initializeApp({ credential: cert(loadServiceAccount()) });
const db = getFirestore();

const app = express();
app.use(express.urlencoded({ extended: false }));

// ---------------------------------------------------------------- oturum

function sign(value: string): string {
  return createHmac('sha256', SECRET).update(value).digest('hex');
}

/** Zaman sabiti karşılaştırma: uzunluk farkı da sızıntıdır, önce eşitliyoruz. */
function sameSecret(a: string, b: string): boolean {
  const ab = Buffer.from(sign(a));
  const bb = Buffer.from(sign(b));
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

function readCookie(req: Request): string | null {
  const raw = req.headers.cookie;
  if (!raw) return null;
  for (const part of raw.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === COOKIE) return rest.join('=');
  }
  return null;
}

function authed(req: Request): boolean {
  const token = readCookie(req);
  return !!token && token === sign('ok');
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (authed(req)) return next();
  res.redirect('/login');
}

app.get('/login', (req, res) => {
  if (authed(req)) return res.redirect('/');
  res.type('html').send(loginPage());
});

app.post('/login', (req, res) => {
  const given = String(req.body.password ?? '');
  if (!sameSecret(given, PASSWORD)) {
    return res.status(401).type('html').send(loginPage('Parola yanlış.'));
  }
  // SameSite=Strict siteler arası POST'ların çerezi taşımasını engelliyor, bu
  // ölçekte CSRF için yeterli koruma. HttpOnly çerezi JS'ten okunamaz kılıyor.
  res.setHeader(
    'Set-Cookie',
    `${COOKIE}=${sign('ok')}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200`,
  );
  res.redirect('/');
});

app.post('/logout', (_req, res) => {
  res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`);
  res.redirect('/login');
});

app.use(requireAuth);

// ------------------------------------------------------------- etkinlikler

/**
 * Tarih ve saat formdan ayrı ayrı geliyor (`<input type="date">` +
 * `<input type="time">`). Saat dilimi hiç sorulmuyor; `joinLocal` +03:00 ile
 * ISO'yu kuruyor. Elle ISO yazılan hâlde en sık yapılan hata saat dilimini
 * unutmaktı ve o dizge her okuyanın kendi saat dilimine göre başka bir an
 * demek — artık yapılabilir bir hata değil.
 */
function formDateTime(body: Record<string, unknown>): { date: string; time: string } {
  return {
    date: String(body.startsAtDate ?? '').trim(),
    time: String(body.startsAtTime ?? '').trim(),
  };
}

function formToInput(body: Record<string, unknown>): EventInput {
  const s = (k: string) => String(body[k] ?? '').trim();
  const { date, time } = formDateTime(body);
  return {
    id: s('id'),
    startsAt: joinLocal(date, time),
    endsAt: s('endsAt'),
    venue: s('venue'),
    venueShort: s('venueShort'),
    title: s('title'),
    tag: s('tag'),
    desc: s('desc'),
    capacity: s('capacity'),
    speaker: s('speaker'),
    speakerRole: s('speakerRole'),
    tags: s('tags').split(',').map((t) => t.trim()).filter(Boolean),
    soon: !!body.soon,
    badge: s('badge'),
    attendance: s('attendance'),
  };
}

/**
 * Formda gösterilecek hâli — `tags` dizisi virgüllü metne, `startsAt` tarih ve
 * saat seçicilerine ayrılır.
 *
 * `raw` doğrulama hatasından sonra veriliyor: kişi tarihi seçip saati boş
 * bıraktıysa `startsAt` boş kalır, dolayısıyla ondan türetilen tarih de boş
 * gelirdi ve form seçilmiş tarihi silerdi.
 */
function inputToForm(
  input: EventInput,
  raw?: { date: string; time: string },
): Record<string, unknown> {
  const split = splitLocal(input.startsAt);
  return {
    ...input,
    tags: input.tags.join(', '),
    startsAtDate: raw?.date || split.date,
    startsAtTime: raw?.time || split.time,
  };
}

app.get('/', async (_req, res) => {
  const snap = await db.collection('events').get();
  const events = snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<ClubEvent, 'id'>) }))
    .sort((a, b) => String(a.startsAt).localeCompare(String(b.startsAt)));

  const rows = events
    .map(
      (e) => `<tr>
        <td><strong>${esc(e.title)}</strong><br><span class="hint">${esc(e.short)}</span></td>
        <td>${esc(e.tag)}</td>
        <td><code>${esc(e.id)}</code></td>
        <td style="white-space:nowrap">
          <a class="btn btn-ghost" style="padding:6px 12px;font-size:13px" href="/events/${encodeURIComponent(e.id)}">Düzenle</a>
          <form method="post" action="/events/${encodeURIComponent(e.id)}/delete" style="display:inline"
                onsubmit="return confirm('${esc(e.title)} silinsin mi? Geri alınamaz.')">
            <button class="btn-danger" style="padding:6px 12px;font-size:13px">Sil</button>
          </form>
        </td>
      </tr>`,
    )
    .join('');

  res.type('html').send(
    page(
      'Etkinlikler',
      `<div class="card">
         <div style="display:flex;align-items:center;margin-bottom:16px">
           <h2 style="margin:0">Etkinlikler</h2>
           <a class="btn" style="margin-left:auto" href="/events/new">Yeni etkinlik</a>
         </div>
         ${
           events.length
             ? `<table><thead><tr><th>Etkinlik</th><th>Kategori</th><th>Kimlik</th><th></th></tr></thead><tbody>${rows}</tbody></table>`
             : `<p class="empty">Henüz etkinlik yok. Uygulamada takvim boş görünüyor.</p>`
         }
       </div>`,
    ),
  );
});

/**
 * Bir etkinliğin gerçek kayıt sayısı — `registrations` koleksiyonundan, Admin
 * SDK ile. Uygulamanın gördüğü sayı `eventSeats`'ten geliyor; ikisi ayrıştığı
 * an doğru olan bu.
 */
async function trueRegisteredCount(eventId: string): Promise<number> {
  const snap = await db.collection('registrations').where('eventId', '==', eventId).count().get();
  return snap.data().count;
}

/**
 * Koltuk dokümanını gerçek kayıtlardan yeniden kurar.
 *
 * Uygulama koltuğu kaydın kimliğiyle `arrayUnion` ediyor, yani normal şartlarda
 * ayrışmaz. Ayrışabileceği iki yol var: kuralları geçen ama kayıt yazmayan
 * elle atılmış bir istek, ve panelden silinen bir kayıt. İkisi de burada
 * düzeliyor.
 */
async function rebuildSeats(eventId: string): Promise<number> {
  const snap = await db.collection('registrations').where('eventId', '==', eventId).get();
  // Doküman kimliği değil, kaydın kendi koltuk jetonu: kimlikte öğrenci
  // numarası geçiyor ve bu liste herkese açık.
  const seatIds = snap.docs
    .map((d) => (d.data() as { seatId?: unknown }).seatId)
    .filter((id): id is string => typeof id === 'string' && id.length > 0);
  await db.collection('eventSeats').doc(eventId).set({ eventId, seatIds });
  return seatIds.length;
}

app.get('/events/new', (_req, res) => {
  res.type('html').send(eventForm({}, {}, { editing: false }));
});

app.post('/events/new', async (req, res) => {
  const input = formToInput(req.body);
  const built = buildEvent(input);

  if (!built.ok) {
    return res
      .status(400)
      .type('html')
      .send(eventForm(inputToForm(input, formDateTime(req.body)), built.errors, { editing: false }));
  }

  const ref = db.collection('events').doc(built.event.id);
  if ((await ref.get()).exists) {
    return res
      .status(409)
      .type('html')
      .send(
        eventForm(
          inputToForm(input, formDateTime(req.body)),
          { id: 'Bu kimlik zaten kullanılıyor.' },
          { editing: false },
        ),
      );
  }

  const { id, ...rest } = built.event;
  // Koltuk dokümanı etkinlikle birlikte doğuyor. Uygulama ona `merge` ile
  // yazıyor, yani yokken de çalışırdı — ama o zaman kural "var olan sayıya +1"
  // diyemezdi ve ilk kaydı doğrulayamazdı.
  await Promise.all([
    ref.set({ ...rest, published: true }),
    db.collection('eventSeats').doc(id).set({ eventId: id, seatIds: [] }),
  ]);
  res.redirect('/');
});

app.get('/events/:id', async (req, res) => {
  const doc = await db.collection('events').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).type('html').send(page('Bulunamadı', '<div class="card">Etkinlik bulunamadı.</div>'));

  const event = { id: doc.id, ...(doc.data() as Omit<ClubEvent, 'id'>) } as ClubEvent;
  const seats = await db.collection('eventSeats').doc(req.params.id).get();
  const shown = (seats.data()?.seatIds as string[] | undefined)?.length ?? 0;

  res.type('html').send(
    eventForm(inputToForm(toInput(event)), {}, {
      editing: true,
      registered: await trueRegisteredCount(req.params.id),
      shown,
    }),
  );
});

app.post('/events/:id', async (req, res) => {
  // Kimlik dokümanın kendisi; formdan gelene güvenmiyoruz.
  const input = { ...formToInput(req.body), id: req.params.id };
  const built = buildEvent(input);

  if (!built.ok) {
    return res
      .status(400)
      .type('html')
      .send(eventForm(inputToForm(input, formDateTime(req.body)), built.errors, { editing: true }));
  }

  const { id, ...rest } = built.event;
  await db.collection('events').doc(id).set({ ...rest, published: true });
  res.redirect('/');
});

app.post('/events/:id/delete', async (req, res) => {
  await Promise.all([
    db.collection('events').doc(req.params.id).delete(),
    // Sahipsiz koltuk dokümanı bırakmıyoruz: aynı kimlikle yeni bir etkinlik
    // açılırsa eski kayıtların koltuklarıyla dolu başlardı.
    db.collection('eventSeats').doc(req.params.id).delete(),
  ]);
  res.redirect('/');
});

/** Uygulamanın gördüğü sayıyı gerçek kayıtlara eşitler. */
app.post('/events/:id/seats', async (req, res) => {
  await rebuildSeats(req.params.id);
  res.redirect(`/events/${encodeURIComponent(req.params.id)}`);
});

// ---------------------------------------------------------------- kayıtlar

type RegistrationDoc = {
  eventId?: string;
  code?: string;
  name?: string;
  studentNo?: string;
  department?: string;
  year?: string;
  createdAt?: { toDate?: () => Date };
};

async function loadRegistrations(eventId?: string) {
  let query = db.collection('registrations') as FirebaseFirestore.Query;
  if (eventId) query = query.where('eventId', '==', eventId);
  const snap = await query.get();
  return snap.docs
    .map((d) => d.data() as RegistrationDoc)
    .sort((a, b) => String(a.studentNo).localeCompare(String(b.studentNo), 'tr'));
}

app.get('/registrations', async (req, res) => {
  const eventId = req.query.event ? String(req.query.event) : undefined;
  const [registrations, eventsSnap] = await Promise.all([
    loadRegistrations(eventId),
    db.collection('events').get(),
  ]);

  const options = eventsSnap.docs
    .map((d) => {
      const title = String((d.data() as { title?: unknown }).title ?? d.id);
      const selected = d.id === eventId ? ' selected' : '';
      return `<option value="${esc(d.id)}"${selected}>${esc(title)}</option>`;
    })
    .join('');

  const rows = registrations
    .map(
      (r) => `<tr>
        <td>${esc(r.studentNo)}</td>
        <td>${esc(r.name)}</td>
        <td>${esc(r.department)}</td>
        <td>${esc(r.year)}</td>
        <td><code>${esc(r.code)}</code></td>
        <td>${esc(r.eventId)}</td>
      </tr>`,
    )
    .join('');

  const csvHref = `/registrations.csv${eventId ? `?event=${encodeURIComponent(eventId)}` : ''}`;

  res.type('html').send(
    page(
      'Kayıtlar',
      `<div class="card">
         <h2>Kayıtlar</h2>
         <form method="get" class="row" style="margin-bottom:18px">
           <label style="margin:0">Etkinlik
             <select name="event" onchange="this.form.submit()">
               <option value="">Tümü</option>
               ${options}
             </select>
           </label>
           <div style="flex:0 0 auto">
             <a class="btn btn-ghost" href="${esc(csvHref)}">CSV indir</a>
           </div>
         </form>

         ${
           registrations.length
             ? `<p class="hint">${registrations.length} kayıt, öğrenci numarasına göre sıralı.</p>
                <table><thead><tr><th>Öğrenci no</th><th>Ad</th><th>Bölüm</th><th>Sınıf</th><th>Kod</th><th>Etkinlik</th></tr></thead><tbody>${rows}</tbody></table>`
             : `<p class="empty">Bu seçimde kayıt yok.</p>`
         }
       </div>`,
    ),
  );
});

app.get('/registrations.csv', async (req, res) => {
  const eventId = req.query.event ? String(req.query.event) : undefined;
  const registrations = await loadRegistrations(eventId);

  const columns = ['eventId', 'code', 'name', 'studentNo', 'department', 'year', 'createdAt'];
  const cell = (v: unknown) => {
    if (v === null || v === undefined) return '';
    const text = String(v);
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const body = registrations
    .map((r) =>
      columns
        .map((c) => {
          const value = (r as Record<string, unknown>)[c];
          if (c === 'createdAt' && value && typeof (value as any).toDate === 'function') {
            return (value as any).toDate().toISOString();
          }
          return cell(value);
        })
        .join(','),
    )
    .join('\r\n');

  const name = eventId ? `kayitlar-${eventId}.csv` : 'kayitlar.csv';
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
  // BOM olmadan Excel UTF-8'i Windows-1254 sanıp Türkçe karakterleri bozuyor.
  res.send('﻿' + [columns.join(','), body].filter(Boolean).join('\r\n'));
});

// ---------------------------------------------------------------- çekilişler

/** Formdaki satırlardan alan tanımlarını toplar; anahtarı boş olan satır atlanır. */
function formToFields(body: Record<string, unknown>): RaffleField[] {
  const fields: RaffleField[] = [];
  for (let i = 0; i < 40; i += 1) {
    const key = String(body[`key_${i}`] ?? '').trim();
    if (!key) continue;
    const type = String(body[`type_${i}`] ?? 'text') as RaffleFieldType;
    const options = String(body[`options_${i}`] ?? '')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
    fields.push({
      key,
      label: String(body[`label_${i}`] ?? '').trim(),
      type,
      required: !!body[`required_${i}`],
      ...(type === 'select' ? { options } : {}),
    });
  }
  return fields;
}

async function loadRaffle(eventId: string): Promise<Raffle | null> {
  const doc = await db.collection('raffles').doc(eventId).get();
  if (!doc.exists) return null;
  return { eventId: doc.id, ...(doc.data() as Omit<Raffle, 'eventId'>) };
}

async function loadEventTitle(eventId: string): Promise<string | null> {
  const doc = await db.collection('events').doc(eventId).get();
  if (!doc.exists) return null;
  return String((doc.data() as { title?: unknown }).title ?? eventId);
}

async function countEntries(eventId: string): Promise<number> {
  const snap = await db.collection('raffleEntries').where('eventId', '==', eventId).get();
  return snap.size;
}

app.get('/raffles', async (_req, res) => {
  const [eventsSnap, rafflesSnap] = await Promise.all([
    db.collection('events').get(),
    db.collection('raffles').get(),
  ]);
  const hasRaffle = new Set(rafflesSnap.docs.map((d) => d.id));

  const rows = eventsSnap.docs
    .map((d) => ({ id: d.id, ...(d.data() as { title?: unknown; tag?: unknown }) }))
    .map((e) => {
      const defined = hasRaffle.has(e.id);
      return `<tr>
        <td><strong>${esc(e.title)}</strong><br><span class="hint">${esc(e.tag)}</span></td>
        <td>${defined ? 'Tanımlı' : '<span class="hint">Tanımsız</span>'}</td>
        <td style="white-space:nowrap">
          <a class="btn btn-ghost" style="padding:6px 12px;font-size:13px" href="/raffles/${encodeURIComponent(e.id)}">
            ${defined ? 'Düzenle' : 'Çekiliş yap'}
          </a>
        </td>
      </tr>`;
    })
    .join('');

  res.type('html').send(
    page(
      'Çekilişler',
      `<div class="card">
         <h2>Çekilişler</h2>
         <p class="hint">
           Çekiliş ayrı bir kayıt değil, bir etkinliğin üstüne eklenen tanım.
           Aşağıdan bir etkinlik seçip hangi bilgilerin sorulacağını belirleyin.
         </p>
         ${
           eventsSnap.size
             ? `<table><thead><tr><th>Etkinlik</th><th>Durum</th><th></th></tr></thead><tbody>${rows}</tbody></table>`
             : '<p class="empty">Önce bir etkinlik oluşturun.</p>'
         }
       </div>`,
    ),
  );
});

app.get('/raffles/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  const [title, raffle, entryCount] = await Promise.all([
    loadEventTitle(eventId),
    loadRaffle(eventId),
    countEntries(eventId),
  ]);
  if (!title) return res.status(404).type('html').send(page('Bulunamadı', '<div class="card">Etkinlik bulunamadı.</div>'));

  // Yeni çekiliş varsayılan alanlarla başlıyor; kulübün her seferinde sorduğu dörtlü.
  const closes = raffle?.entriesCloseAt ?? '';
  res.type('html').send(
    raffleForm(
      {
        eventId,
        eventTitle: title,
        winnerCount: raffle?.winnerCount ?? 1,
        entriesCloseDate: closes.slice(0, 10),
        entriesCloseTime: closes.slice(11, 16) || '23:59',
        fields: raffle?.fields ?? DEFAULT_FIELDS,
      },
      {},
      entryCount,
    ),
  );
});

app.post('/raffles/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  const title = (await loadEventTitle(eventId)) ?? eventId;
  const fields = formToFields(req.body);
  const errors = validateFields(fields);

  const winnerCount = Number(req.body.winnerCount);
  if (!Number.isInteger(winnerCount) || winnerCount < 1) {
    errors.winnerCount = 'En az 1 olmalı.';
  }

  const date = String(req.body.entriesCloseDate ?? '');
  const time = String(req.body.entriesCloseTime ?? '');
  // Saat dilimi kullanıcıdan istenmiyor; kulüp Türkiye'de ve Türkiye kalıcı
  // olarak UTC+3. Biçim hatası yapması imkânsız hâle geliyor.
  const entriesCloseAt = date && time ? `${date}T${time}:00+03:00` : '';
  if (!entriesCloseAt) errors.entriesCloseAt = 'Son katılım tarihi ve saati gerekli.';

  if (Object.keys(errors).length) {
    return res.status(400).type('html').send(
      raffleForm(
        { eventId, eventTitle: title, winnerCount, entriesCloseDate: date, entriesCloseTime: time, fields },
        errors,
        await countEntries(eventId),
      ),
    );
  }

  const existing = await loadRaffle(eventId);
  await db.collection('raffles').doc(eventId).set({
    fields,
    winnerCount,
    entriesCloseAt,
    // Kazananlar ayrı ekrandan giriliyor; tanımı kaydetmek onları silmemeli.
    winners: existing?.winners ?? [],
    drawnAt: existing?.drawnAt ?? '',
  });
  res.redirect('/raffles');
});

async function loadEntries(eventId: string) {
  const snap = await db.collection('raffleEntries').where('eventId', '==', eventId).get();
  return snap.docs
    .map((d) => d.data() as { entryId?: string; values?: Record<string, string>; createdAt?: { toDate?: () => Date } })
    .sort((a, b) => String(a.entryId).localeCompare(String(b.entryId)));
}

app.get('/raffles/:eventId/entries', async (req, res) => {
  const eventId = req.params.eventId;
  const [raffle, entries, title] = await Promise.all([
    loadRaffle(eventId),
    loadEntries(eventId),
    loadEventTitle(eventId),
  ]);
  if (!raffle) return res.redirect(`/raffles/${encodeURIComponent(eventId)}`);

  const head = raffle.fields.map((f) => `<th>${esc(f.label)}</th>`).join('');
  const rows = entries
    .map(
      (e) =>
        `<tr>${raffle.fields.map((f) => `<td>${esc(e.values?.[f.key] ?? '')}</td>`).join('')}</tr>`,
    )
    .join('');

  res.type('html').send(
    page(
      'Katılımlar',
      `<div class="card">
         <div style="display:flex;align-items:center;margin-bottom:16px">
           <h2 style="margin:0">${esc(title ?? eventId)} — katılımlar</h2>
           <a class="btn" style="margin-left:auto" href="/raffles/${encodeURIComponent(eventId)}/entries.csv">CSV indir</a>
         </div>
         ${
           entries.length
             ? `<p class="hint">${entries.length} katılım.</p><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`
             : '<p class="empty">Henüz katılım yok.</p>'
         }
       </div>`,
    ),
  );
});

app.get('/raffles/:eventId/entries.csv', async (req, res) => {
  const eventId = req.params.eventId;
  const [raffle, entries] = await Promise.all([loadRaffle(eventId), loadEntries(eventId)]);
  if (!raffle) return res.redirect(`/raffles/${encodeURIComponent(eventId)}`);

  const cell = (v: unknown) => {
    if (v === null || v === undefined) return '';
    const t = String(v);
    return /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
  };

  const columns = csvColumns(raffle.fields);
  const body = entries
    .map((e) => {
      const created = e.createdAt?.toDate ? e.createdAt.toDate().toISOString() : '';
      return [
        cell(e.entryId),
        cell(eventId),
        ...raffle.fields.map((f) => cell(e.values?.[f.key] ?? '')),
        cell(created),
      ].join(',');
    })
    .join('\r\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="cekilis-${eventId}.csv"`);
  // BOM olmadan Excel UTF-8'i Windows-1254 sanıp Türkçe karakterleri bozuyor.
  res.send('\ufeff' + [columns.join(','), body].filter(Boolean).join('\r\n'));
});

app.get('/raffles/:eventId/winners', async (req, res) => {
  const eventId = req.params.eventId;
  const [raffle, title] = await Promise.all([loadRaffle(eventId), loadEventTitle(eventId)]);
  if (!raffle) return res.redirect(`/raffles/${encodeURIComponent(eventId)}`);
  res.type('html').send(winnersForm(eventId, title ?? eventId, raffle.winners ?? [], raffle.drawnAt ?? ''));
});

app.post('/raffles/:eventId/winners', async (req, res) => {
  const eventId = req.params.eventId;
  // Maskeleme burada, yazma anında yapılıyor: uygulamaya tam ad hiç ulaşmıyor,
  // dolayısıyla bir ekranın yanlışlıkla tam adı göstermesi mümkün değil.
  const winners = String(req.body.winners ?? '')
    .split('\n')
    .map((line) => maskName(line))
    .filter(Boolean);

  await db.collection('raffles').doc(eventId).set(
    { winners, drawnAt: winners.length ? new Date().toISOString() : '' },
    { merge: true },
  );
  res.redirect(`/raffles/${encodeURIComponent(eventId)}`);
});

/**
 * Son çare hata yakalayıcı.
 *
 * Bu olmadan express varsayılan davranışına düşüyor ve tarayıcıya tam yığın
 * izini basıyor: mutlak dosya yolları, paket sürümleri, Firestore hata
 * ayrıntıları. Panel açık bir sunucuda çalışacağı için bunların hepsi keşif
 * bilgisi. Ayrıntı sunucu günlüğüne gidiyor, kullanıcı sade bir sayfa görüyor.
 */
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[panel] istek başarısız:', err);
  if (res.headersSent) return;
  res.status(500).type('html').send(
    page(
      'Hata',
      `<div class="card">
         <h2>Bir şeyler ters gitti</h2>
         <p class="hint">
           İstek tamamlanamadı. Ayrıntı sunucu günlüğünde; genellikle sebebi
           Firestore'a ulaşılamaması ya da servis hesabı anahtarının geçersiz
           olması oluyor.
         </p>
         <div class="actions"><a class="btn btn-ghost" href="/">Etkinliklere dön</a></div>
       </div>`,
    ),
  );
});

app.listen(PORT, () => {
  console.log(`Yönetim paneli: http://localhost:${PORT}`);
});
