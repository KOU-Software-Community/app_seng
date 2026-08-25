import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { MONTHS_LONG } from './eventSchema';

/**
 * Kulüp duyuruları — kulübün kendi web sitesinin API'sinden.
 *
 * Etkinliklerden farklı olarak bu veri Firestore'da değil: duyurular zaten
 * sitede yazılıyor ve orada yayınlanıyor, ikinci bir yerde tekrar girilmeleri
 * ikisinin sapması demek olurdu. Uygulama okuyucu taraf, yazan taraf değil.
 *
 * Dış bir servis olduğu için buradaki her şey savunmacı: yanıtın şekli
 * doğrulanıyor, bozuk kayıtlar tüm listeyi düşürmek yerine atlanıyor, ve istek
 * zaman aşımına uğruyor. Kulüp sitesinin bakıma girmesi uygulamanın ana
 * sayfasını kilitlememeli.
 */

const BASE_URL = 'https://api.kouseng.com';
/** Sunucu yanıt vermezse ana sayfa bu kadar bekler. */
const TIMEOUT_MS = 10_000;

export type Announcement = {
  id: string;
  title: string;
  /** Düz metin özet — listelerde bunu gösteriyoruz. */
  summary: string;
  /** HTML gövde. src/html.ts ile çizilebilir bloklara çevriliyor. */
  content: string;
  category: string;
  author: string;
  /** ISO 8601, UTC. */
  createdAt: string;
};

/** Bilinmeyen bir gövdeden güvenle metin çeker. */
function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/**
 * Tek bir kaydı doğrular. `_id` ve `title` olmadan kayıt işe yaramaz — listede
 * neye dokunulacağı ve ne yazılacağı belirsiz kalır — o yüzden bunlar zorunlu,
 * gerisi eksikse boş geçiliyor.
 */
function toAnnouncement(raw: unknown): Announcement | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const id = str(r._id) || str(r.id);
  const title = str(r.title);
  if (!id || !title) return null;

  return {
    id,
    title,
    summary: str(r.summary),
    content: str(r.content),
    category: str(r.category) || 'Duyuru',
    author: str(r.author),
    createdAt: str(r.createdAt),
  };
}

async function getJson(path: string): Promise<unknown> {
  // AbortController olmadan sunucu yanıt vermediğinde istek belirsiz süre asılı
  // kalıyor ve "yükleniyor" hiç bitmiyor.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: { accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

/** Zarfı açar: `{ success, message, data, count, pagination }`. */
function unwrapList(payload: unknown): Announcement[] {
  const body = (payload ?? {}) as Record<string, unknown>;
  if (body.success === false) throw new Error(str(body.message) || 'İstek reddedildi');
  const data = Array.isArray(body.data) ? body.data : [];
  return data.map(toAnnouncement).filter((a): a is Announcement => a !== null);
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  // İlk sayfa. Yanıt sayfalama taşıyor ama kulüp duyurularında en yeni on tane
  // ana sayfa için fazlasıyla yeterli; gerekirse `?page=` eklenir.
  return unwrapList(await getJson('/announcements'));
}

/**
 * Tek duyuru. Listede olmayan bir kimliğe derin bağlantı geldiğinde (eski bir
 * bildirim, paylaşılan bir link) kullanılıyor.
 */
export async function fetchAnnouncement(id: string): Promise<Announcement | null> {
  const body = (await getJson(`/announcements/${encodeURIComponent(id)}`)) as Record<string, unknown>;
  if (body?.success === false) return null;
  return toAnnouncement(body?.data);
}

/**
 * "20 Eylül 2025".
 *
 * `createdAt` UTC geliyor. Türkiye 2016'dan beri kalıcı olarak UTC+3 ve yaz
 * saati uygulamıyor, dolayısıyla sabit üç saat eklemek doğru sonucu veriyor —
 * ve `Intl` zaman dilimi desteğine bel bağlamıyor, ki Hermes'te garanti değil.
 */
export function formatAnnouncementDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return '';
  const istanbul = new Date(parsed.getTime() + 3 * 60 * 60 * 1000);
  return `${istanbul.getUTCDate()} ${MONTHS_LONG[istanbul.getUTCMonth()]} ${istanbul.getUTCFullYear()}`;
}

type AnnouncementsValue = {
  announcements: Announcement[];
  loading: boolean;
  /** Sadece istek başarısız olduğunda dolu. Boş liste hata değil. */
  error: string | null;
  refresh: () => void;
  get: (id?: string | string[]) => Announcement | undefined;
};

const Ctx = createContext<AnnouncementsValue | null>(null);

export function AnnouncementsProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchAnnouncements()
      .then((list) => {
        if (cancelled) return;
        setAnnouncements(list);
        setError(null);
        console.log(`[duyuru] ${list.length} duyuru alındı.`);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        console.log(`[duyuru] alınamadı: ${message}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const value = useMemo<AnnouncementsValue>(
    () => ({
      announcements,
      loading,
      error,
      refresh: () => setNonce((n) => n + 1),
      get: (id) => {
        const key = Array.isArray(id) ? id[0] : id;
        return announcements.find((a) => a.id === key);
      },
    }),
    [announcements, loading, error],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAnnouncements() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAnnouncements must be used inside <AnnouncementsProvider>');
  return ctx;
}
