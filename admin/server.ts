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
import { buildEvent, toInput, type EventInput } from '../src/eventSchema';
import { esc, eventForm, loginPage, page } from './views';

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

function formToInput(body: Record<string, unknown>): EventInput {
  const s = (k: string) => String(body[k] ?? '').trim();
  return {
    id: s('id'),
    startsAt: s('startsAt'),
    endsAt: s('endsAt'),
    venue: s('venue'),
    venueShort: s('venueShort'),
    title: s('title'),
    tag: s('tag'),
    desc: s('desc'),
    spots: s('spots'),
    speaker: s('speaker'),
    speakerRole: s('speakerRole'),
    tags: s('tags').split(',').map((t) => t.trim()).filter(Boolean),
    soon: !!body.soon,
    badge: s('badge'),
  };
}

/** Formda gösterilecek hâli — `tags` dizisi virgüllü metne döner. */
function inputToForm(input: EventInput): Record<string, unknown> {
  return { ...input, tags: input.tags.join(', ') };
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

app.get('/events/new', (_req, res) => {
  res.type('html').send(eventForm({}, {}, { editing: false }));
});

app.post('/events/new', async (req, res) => {
  const input = formToInput(req.body);
  const built = buildEvent(input);

  if (!built.ok) {
    return res.status(400).type('html').send(eventForm(inputToForm(input), built.errors, { editing: false }));
  }

  const ref = db.collection('events').doc(built.event.id);
  if ((await ref.get()).exists) {
    return res
      .status(409)
      .type('html')
      .send(
        eventForm(inputToForm(input), { id: 'Bu kimlik zaten kullanılıyor.' }, { editing: false }),
      );
  }

  const { id, ...rest } = built.event;
  await ref.set({ ...rest, published: true });
  res.redirect('/');
});

app.get('/events/:id', async (req, res) => {
  const doc = await db.collection('events').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).type('html').send(page('Bulunamadı', '<div class="card">Etkinlik bulunamadı.</div>'));

  const event = { id: doc.id, ...(doc.data() as Omit<ClubEvent, 'id'>) } as ClubEvent;
  res.type('html').send(eventForm(inputToForm(toInput(event)), {}, { editing: true }));
});

app.post('/events/:id', async (req, res) => {
  // Kimlik dokümanın kendisi; formdan gelene güvenmiyoruz.
  const input = { ...formToInput(req.body), id: req.params.id };
  const built = buildEvent(input);

  if (!built.ok) {
    return res.status(400).type('html').send(eventForm(inputToForm(input), built.errors, { editing: true }));
  }

  const { id, ...rest } = built.event;
  await db.collection('events').doc(id).set({ ...rest, published: true });
  res.redirect('/');
});

app.post('/events/:id/delete', async (req, res) => {
  await db.collection('events').doc(req.params.id).delete();
  res.redirect('/');
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

app.listen(PORT, () => {
  console.log(`Yönetim paneli: http://localhost:${PORT}`);
});
