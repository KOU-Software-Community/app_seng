/**
 * Vitrin — ana sayfanın slider'ı ve sponsorlar, panel tarafı.
 *
 * İki koleksiyon aynı iş akışını paylaşıyor: sıralı liste, form, görsel, silme.
 * Sıra 1…n ve boşluksuz, her değişiklik listenin tamamını yeniden numaralıyor
 * (`ordering.ts`). Doğrulama uygulamanın okumasıyla aynı modülden
 * (`src/vitrinSchema.ts`): panelin kaydettiğini uygulama okuyabilmeli.
 *
 * Rotalar `app.use(requireAuth)`'tan SONRA kuruluyor; `check:release` tutuyor.
 * Kaydetme sırası etkinlik formuyla aynı: doğrula → yükle → yaz → eski görseli
 * sil. Ters olsaydı geçersiz formda dosya Storage'a gider, yetim kalırdı.
 */
import type { Express, NextFunction, Request, Response } from 'express';
import type { Firestore, QueryDocumentSnapshot, WriteBatch } from 'firebase-admin/firestore';
import type multer from 'multer';

import { fetchAnnouncements } from '../src/announcementApi';
import type { ClubEvent } from '../src/data';
import { splitByDate, todayLocal } from '../src/eventSchema';
import {
  buildSlide,
  buildSponsor,
  byOrder,
  expiredSlideIds,
  isOrder,
  type SlideTarget,
} from '../src/vitrinSchema';
import { moveBy, placeAt, sameMembers } from './ordering';
import { MAX_UPLOAD_BYTES, PhotoUploadError, deleteFolder, deletePhotos, uploadPhoto } from './photos';
import { esc, page } from './views';
import { formatDay, slideForm, sponsorForm, vitrinList, type ChoiceRow } from './vitrinView';

type Kind = { base: '/slider' | '/sponsorlar'; col: 'slides' | 'sponsors' };
const SLIDER: Kind = { base: '/slider', col: 'slides' };
const SPONSORS: Kind = { base: '/sponsorlar', col: 'sponsors' };

/** Saatte bir. Bitiş tarihi gün sınırında, uygulama da kendi süzmesini yapıyor. */
const SWEEP_MS = 60 * 60_000;

const today = () => todayLocal(new Date());

/** Formdan gelen tekil ya da çoklu alan → dizi. */
function list(v: unknown): string[] {
  return (Array.isArray(v) ? v : v === undefined ? [] : [v]).map(String).filter(Boolean);
}

/** Dokümanlar sırasıyla. Sırası bozuk olanlar (Console'dan elle girilmiş) sona. */
async function orderedDocs(db: Firestore, col: string): Promise<QueryDocumentSnapshot[]> {
  const snap = await db.collection(col).get();
  const key = (d: QueryDocumentSnapshot) => {
    const order = d.get('order');
    return { id: d.id, order: isOrder(order) ? order : Number.MAX_SAFE_INTEGER };
  };
  return [...snap.docs].sort((a, b) => byOrder(key(a), key(b)));
}

/** `ids` sırasını 1…n yazar. `skip` aynı batch'te ayrıca `set` edilen doküman. */
function renumber(db: Firestore, batch: WriteBatch, col: string, ids: string[], skip?: string): void {
  ids.forEach((id, i) => {
    if (id !== skip) batch.update(db.collection(col).doc(id), { order: i + 1 });
  });
}

/** Tek görsel alanı. Hata olursa ne olduğunu söyleyen bir sayfa; form yeniden çizilmiyor. */
function oneImage(upload: multer.Multer, field: string, back: string) {
  return (req: Request, res: Response, next: NextFunction) =>
    upload.single(field)(req, res, (err: unknown) => {
      if (!err) return next();
      const code = (err as { code?: string }).code;
      const message =
        code === 'LIMIT_FILE_SIZE'
          ? `Görsel çok büyük — en fazla ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB.`
          : err instanceof Error
            ? err.message
            : 'Görsel yüklenemedi.';
      console.error('[panel] vitrin görseli reddedildi:', err);
      res
        .status(400)
        .type('html')
        .send(
          page(
            'Görsel yüklenemedi',
            `<div class="card">
               <div class="banner">${esc(message)}</div>
               <p class="hint">Formdaki diğer bilgiler kaydedilmedi.</p>
               <div class="actions"><a class="btn btn-ghost" href="${back}">Geri dön</a></div>
             </div>`,
          ),
        );
    });
}

/** Etkinlik seçenekleri: önce yaklaşanlar, sonra geçmişler; çekilişler işaretli. */
async function eventChoices(db: Firestore): Promise<ChoiceRow[]> {
  const [events, raffles] = await Promise.all([
    db.collection('events').get(),
    db.collection('raffles').get(),
  ]);
  const raffleIds = new Set(raffles.docs.map((d) => d.id));
  const all = events.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ClubEvent, 'id'>) }) as ClubEvent);
  const { upcoming, past } = splitByDate(all, today());
  return [
    ...upcoming.map((e) => ({ id: e.id, label: `${e.title} · ${e.day} ${e.mon}`, raffle: raffleIds.has(e.id) })),
    ...past.map((e) => ({ id: e.id, label: `${e.title} · ${e.day} ${e.mon} (geçmiş)`, raffle: raffleIds.has(e.id) })),
  ];
}

/** Duyuru seçenekleri kulüp sitesinden. Site yanıt vermezse null: form bunu söylüyor. */
async function announcementChoices(): Promise<ChoiceRow[] | null> {
  try {
    return (await fetchAnnouncements()).map((a) => ({ id: a.id, label: a.title }));
  } catch (err) {
    console.error('[panel] duyurular alınamadı:', err);
    return null;
  }
}

function targetLabel(target: SlideTarget | undefined, titles: Map<string, string>): string {
  if (!target) return 'hedef yok';
  if (target.type === 'event') return `etkinlik: ${titles.get(target.id) ?? target.id}`;
  if (target.type === 'announcement') return 'duyuru';
  return 'bağlantı';
}

const notFound = (what: string) =>
  page('Bulunamadı', `<div class="card">${esc(what)} bulunamadı.</div>`);

/** Süresi dolan slaytları ve görsellerini siler, kalanları 1…n numaralar. */
export async function runSlideSweep(db: Firestore, day: string): Promise<string[]> {
  const docs = await orderedDocs(db, 'slides');
  const expired = expiredSlideIds(docs.map((d) => ({ id: d.id, endsAt: d.get('endsAt') })), day);
  if (!expired.length) return [];

  const gone = new Set(expired);
  const batch = db.batch();
  for (const id of expired) batch.delete(db.collection('slides').doc(id));
  renumber(db, batch, 'slides', docs.map((d) => d.id).filter((id) => !gone.has(id)));
  await batch.commit();
  // Kayıttan sonra: silme düşseydi görseli olmayan bir slayt kalırdı.
  await Promise.all(expired.map((id) => deleteFolder('slides', id)));
  console.log(`[vitrin] süresi dolan ${expired.length} slayt silindi.`);
  return expired;
}

/** Panelin dördüncü yoklayıcısı: açılışta bir kez, sonra saatte bir. */
export function startSlideSweeper(db: Firestore): void {
  const tick = () => {
    runSlideSweep(db, today()).catch((err) => console.error('[vitrin] slayt temizliği başarısız:', err));
  };
  tick();
  // Tipler DOM'un `setInterval`'ını görüyor; çalışma zamanı Node ve `unref` orada var.
  (setInterval(tick, SWEEP_MS) as unknown as { unref?: () => void }).unref?.();
}

export function registerVitrin(app: Express, db: Firestore, upload: multer.Multer): void {
  // Statik yollar `:id`'den ÖNCE: yoksa "sirala" ve "yeni" birer kimlik sanılırdı.
  for (const kind of [SLIDER, SPONSORS]) {
    app.post(`${kind.base}/sirala`, async (req, res) => {
      const posted = String(req.body.ids ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const current = (await orderedDocs(db, kind.col)).map((d) => d.id);
      if (!sameMembers(current, posted)) {
        res
          .status(409)
          .type('html')
          .send(
            page(
              'Sıra kaydedilmedi',
              `<div class="card">
                 <div class="banner">Liste bu arada değişmiş; sıra kaydedilmedi. Sayfayı yenileyip tekrar deneyin.</div>
                 <a class="btn btn-ghost" href="${kind.base}">Listeye dön</a>
               </div>`,
            ),
          );
        return;
      }
      const batch = db.batch();
      renumber(db, batch, kind.col, posted);
      await batch.commit();
      res.redirect(kind.base);
    });
  }

  // ---------------------------------------------------------------- slider

  app.get('/slider', async (_req, res) => {
    const [docs, events] = await Promise.all([orderedDocs(db, 'slides'), db.collection('events').get()]);
    const titles = new Map(events.docs.map((d) => [d.id, String(d.get('title') ?? d.id)]));
    const rows = docs.map((d) => {
      const endsAt = String(d.get('endsAt') ?? '');
      return {
        id: d.id,
        title: String(d.get('title') ?? ''),
        sub: [
          String(d.get('kicker') ?? ''),
          targetLabel(d.get('target') as SlideTarget | undefined, titles),
          endsAt ? `bitiş ${formatDay(endsAt)}` : 'kalıcı',
        ]
          .filter(Boolean)
          .join(' · '),
        image: String(d.get('image') ?? ''),
        active: d.get('active') === true,
      };
    });
    res.type('html').send(vitrinList('slider', rows));
  });

  const slideOpts = async (positions: number, editing: boolean, id?: string) => ({
    editing,
    id,
    positions,
    events: await eventChoices(db),
    announcements: await announcementChoices(),
  });

  app.get('/slider/yeni', async (_req, res) => {
    const docs = await orderedDocs(db, 'slides');
    res
      .type('html')
      .send(slideForm({ position: 1, active: true, targetType: 'event' }, {}, await slideOpts(docs.length + 1, false)));
  });

  async function saveSlide(req: Request, res: Response, editingId: string | null): Promise<void> {
    const docs = await orderedDocs(db, 'slides');
    const existing = editingId ? docs.find((d) => d.id === editingId) : undefined;
    if (editingId && !existing) {
      res.status(404).type('html').send(notFound('Slayt'));
      return;
    }
    const ref = existing ? existing.ref : db.collection('slides').doc();
    const body = req.body as Record<string, unknown>;
    const before = String(existing?.get('image') ?? '');
    const kept = body.dropImage ? '' : before;
    const position = Number(body.position);
    const targetType = String(body.targetType ?? '');
    const values = { ...body, image: kept, position, active: body.active === '1' };
    const opts = () => slideOpts(editingId ? docs.length : docs.length + 1, !!editingId, editingId ?? undefined);

    const checked = buildSlide(
      {
        title: body.title,
        meta: body.meta,
        image: kept,
        kicker: body.kicker,
        targetType,
        targetId: targetType === 'announcement' ? body.announcementId : body.eventId,
        targetUrl: body.targetUrl,
        endsAt: body.endsAt,
        order: position,
        active: body.active === '1',
      },
      today(),
    );
    if (!checked.ok) {
      res.status(400).type('html').send(slideForm(values, checked.errors, await opts()));
      return;
    }

    let uploaded = '';
    if (req.file) {
      try {
        uploaded = await uploadPhoto('slides', ref.id, req.file.buffer);
      } catch (err) {
        if (!(err instanceof PhotoUploadError)) throw err;
        console.error('[panel] slayt görseli yüklenemedi:', err.message);
        // 502 DEĞİL: Cloudflare 502/504 gövdesini yutuyor.
        res.status(503).type('html').send(slideForm(values, { image: err.message }, await opts()));
        return;
      }
    }

    const slide = { ...checked.value, image: uploaded || checked.value.image };
    const ids = placeAt(docs.map((d) => d.id), ref.id, position);
    const batch = db.batch();
    batch.set(ref, { ...slide, order: ids.indexOf(ref.id) + 1 });
    renumber(db, batch, 'slides', ids, ref.id);
    try {
      await batch.commit();
    } catch (err) {
      if (uploaded) await deletePhotos([uploaded]);
      throw err;
    }
    if (before && before !== slide.image) await deletePhotos([before]);
    res.redirect('/slider');
  }

  app.post('/slider/yeni', oneImage(upload, 'image', '/slider'), (req, res) => saveSlide(req, res, null));

  app.get('/slider/:id', async (req, res) => {
    const docs = await orderedDocs(db, 'slides');
    const i = docs.findIndex((d) => d.id === req.params.id);
    if (i < 0) return res.status(404).type('html').send(notFound('Slayt'));
    const d = docs[i];
    const target = (d.get('target') ?? {}) as Partial<{ type: string; id: string; url: string }>;
    res.type('html').send(
      slideForm(
        {
          title: d.get('title'),
          meta: d.get('meta'),
          kicker: d.get('kicker'),
          image: d.get('image'),
          targetType: target.type ?? 'event',
          eventId: target.type === 'event' ? target.id : '',
          announcementId: target.type === 'announcement' ? target.id : '',
          targetUrl: target.type === 'url' ? target.url : '',
          endsAt: d.get('endsAt'),
          position: i + 1,
          active: d.get('active') === true,
        },
        {},
        await slideOpts(docs.length, true, d.id),
      ),
    );
  });

  app.post('/slider/:id', oneImage(upload, 'image', '/slider'), (req, res) =>
    saveSlide(req, res, String(req.params.id)),
  );

  // ------------------------------------------------------------- sponsorlar

  app.get('/sponsorlar', async (_req, res) => {
    const docs = await orderedDocs(db, 'sponsors');
    const rows = docs.map((d) => {
      const events = Array.isArray(d.get('eventIds')) ? (d.get('eventIds') as unknown[]).length : 0;
      return {
        id: d.id,
        title: String(d.get('name') ?? ''),
        sub: [String(d.get('sector') ?? ''), events ? `${events} etkinlik` : ''].filter(Boolean).join(' · '),
        image: String(d.get('logo') ?? ''),
        active: d.get('active') === true,
      };
    });
    res.type('html').send(vitrinList('sponsorlar', rows));
  });

  const sponsorOpts = async (positions: number, editing: boolean, id?: string) => ({
    editing,
    id,
    positions,
    events: await eventChoices(db),
  });

  app.get('/sponsorlar/yeni', async (_req, res) => {
    const docs = await orderedDocs(db, 'sponsors');
    res
      .type('html')
      .send(sponsorForm({ position: docs.length + 1, active: true }, {}, await sponsorOpts(docs.length + 1, false)));
  });

  async function saveSponsor(req: Request, res: Response, editingId: string | null): Promise<void> {
    const docs = await orderedDocs(db, 'sponsors');
    const existing = editingId ? docs.find((d) => d.id === editingId) : undefined;
    if (editingId && !existing) {
      res.status(404).type('html').send(notFound('Sponsor'));
      return;
    }
    const ref = existing ? existing.ref : db.collection('sponsors').doc();
    const body = req.body as Record<string, unknown>;
    const before = String(existing?.get('logo') ?? '');
    const kept = body.dropLogo ? '' : before;
    const position = Number(body.position);
    const eventIds = list(body.eventIds);
    const values = { ...body, logo: kept, eventIds, position, active: body.active === '1' };
    const opts = () => sponsorOpts(editingId ? docs.length : docs.length + 1, !!editingId, editingId ?? undefined);

    const checked = buildSponsor({
      name: body.name,
      sector: body.sector,
      description: body.description,
      url: body.url,
      logo: kept,
      eventIds,
      order: position,
      active: body.active === '1',
    });
    if (!checked.ok) {
      res.status(400).type('html').send(sponsorForm(values, checked.errors, await opts()));
      return;
    }

    let uploaded = '';
    if (req.file) {
      try {
        uploaded = await uploadPhoto('sponsors', ref.id, req.file.buffer);
      } catch (err) {
        if (!(err instanceof PhotoUploadError)) throw err;
        console.error('[panel] sponsor logosu yüklenemedi:', err.message);
        res.status(503).type('html').send(sponsorForm(values, { logo: err.message }, await opts()));
        return;
      }
    }

    const sponsor = { ...checked.value, logo: uploaded || checked.value.logo };
    const ids = placeAt(docs.map((d) => d.id), ref.id, position);
    const batch = db.batch();
    batch.set(ref, { ...sponsor, order: ids.indexOf(ref.id) + 1 });
    renumber(db, batch, 'sponsors', ids, ref.id);
    try {
      await batch.commit();
    } catch (err) {
      if (uploaded) await deletePhotos([uploaded]);
      throw err;
    }
    if (before && before !== sponsor.logo) await deletePhotos([before]);
    res.redirect('/sponsorlar');
  }

  app.post('/sponsorlar/yeni', oneImage(upload, 'logo', '/sponsorlar'), (req, res) => saveSponsor(req, res, null));

  app.get('/sponsorlar/:id', async (req, res) => {
    const docs = await orderedDocs(db, 'sponsors');
    const i = docs.findIndex((d) => d.id === req.params.id);
    if (i < 0) return res.status(404).type('html').send(notFound('Sponsor'));
    const d = docs[i];
    res.type('html').send(
      sponsorForm(
        {
          name: d.get('name'),
          sector: d.get('sector'),
          description: d.get('description'),
          url: d.get('url'),
          logo: d.get('logo'),
          eventIds: Array.isArray(d.get('eventIds')) ? d.get('eventIds') : [],
          position: i + 1,
          active: d.get('active') === true,
        },
        {},
        await sponsorOpts(docs.length, true, d.id),
      ),
    );
  });

  app.post('/sponsorlar/:id', oneImage(upload, 'logo', '/sponsorlar'), (req, res) =>
    saveSponsor(req, res, String(req.params.id)),
  );

  // ------------------------------------------------------- ortak: taşı, sil

  for (const kind of [SLIDER, SPONSORS]) {
    app.post(`${kind.base}/:id/tasi`, async (req, res) => {
      const ids = (await orderedDocs(db, kind.col)).map((d) => d.id);
      const batch = db.batch();
      renumber(db, batch, kind.col, moveBy(ids, String(req.params.id), req.body.yon === 'yukari' ? -1 : 1));
      await batch.commit();
      res.redirect(kind.base);
    });

    app.post(`${kind.base}/:id/sil`, async (req, res) => {
      const id = String(req.params.id);
      const ids = (await orderedDocs(db, kind.col)).map((d) => d.id);
      if (!ids.includes(id)) return res.status(404).type('html').send(notFound('Kayıt'));
      const batch = db.batch();
      batch.delete(db.collection(kind.col).doc(id));
      renumber(db, batch, kind.col, ids.filter((x) => x !== id));
      await batch.commit();
      // Kayıttan sonra: silme düşseydi görseli olmayan bir kayıt kalırdı.
      await deleteFolder(kind.col, id);
      res.redirect(kind.base);
    });
  }
}
