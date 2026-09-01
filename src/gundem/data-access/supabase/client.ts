/**
 * AI Gündem'in Supabase istemcisi.
 *
 * Bu, panelin görsel deposundaki istemciyle **aynı şey değil**: farklı proje,
 * farklı hesap, farklı anahtar sınıfı. Panel sunucuda `service_role` ile yazıyor
 * (`admin/photos.ts`); burası uygulamanın içinde, anon anahtarla ve yalnızca
 * okuyor. İkisini tek modülde toplamak, gizli anahtarın uygulama paketine
 * girmesine giden en kısa yol olurdu.
 *
 * Kimlik yok: bu sürümde kullanıcı hesabı yok, istemci hiç oturum açmıyor,
 * oturum saklamıyor ve jeton yenilemiyor. Her istek anon JWT taşıyor; koruma
 * kimlikte değil, RLS'te.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { env } from '../../config/env';
import { err, type DataError, type Result } from '../../domain/errors';

/**
 * Okuma yüzeyi `public` şemasında. `aigundem` şeması PostgREST'e açılmadığı için
 * (ölçüldü: `Accept-Profile: aigundem` → `PGRST106`) migration 0006'nın
 * `public.aigundem_*` shim'leri kullanılıyor. Şema açılırsa burası değişir,
 * çağıranlar değişmez.
 */
export const FEED_VIEW = 'aigundem_feed_articles_v1';
export const SEARCH_RPC = 'aigundem_search_articles_v1';

let client: SupabaseClient | null = null;

/**
 * Yapılandırma eksikse `null` — fırlatmıyor.
 *
 * Fırlatmak, ekranı bir hata sınırına düşürüp kullanıcıya beyaz sayfa
 * gösterirdi. `env.problem` zaten sebebi taşıyor ve ekranda gösterilecek olan o;
 * burası sadece "istemci yok" diyor.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;
  if (env.mode !== 'supabase' || !env.supabaseUrl || !env.supabaseAnonKey) return null;

  client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: { 'X-Client-Info': 'kyk-aigundem' },
    },
  });
  return client;
}

/** Test ve mod değişimi için: hafızadaki istemciyi düşürür. */
export function resetSupabaseClient(): void {
  client = null;
}

/**
 * Adaptörün kullandığı, fırlatan sürüm.
 *
 * `getSupabaseClient` `null` dönüyor çünkü çağıranların çoğu bunu ekranda
 * gösterilecek bir duruma çevirebiliyor. Supabase adaptörü çeviremez: fabrika
 * onu yalnızca mod `supabase` iken kuruyor, yani buradaki `null` bir
 * yapılandırma eksiği değil, programlama hatası olurdu.
 */
export function requireSupabaseClient(): SupabaseClient {
  const client = getSupabaseClient();
  if (!client) {
    // Değişkenleri her durumda adıyla anıyor: `env.problem` yalnızca reddedilen
    // bir yapılandırmada dolu, ama buraya mod elle 'supabase' verilerek de
    // gelinebiliyor (testler böyle yapıyor) ve o zaman da soru aynı: hangisi eksik.
    throw new Error(
      '[gundem] Supabase istemcisi kurulamadı: ' +
        (env.problem ??
          'EXPO_PUBLIC_AIGUNDEM_SUPABASE_URL ve EXPO_PUBLIC_AIGUNDEM_SUPABASE_ANON_KEY tanımlı değil.'),
    );
  }
  return client;
}

/** PostgREST hata şekli — güvendiğimiz kadarı. */
export type PostgrestErrorLike = {
  code?: string | null;
  message?: string | null;
  details?: string | null;
  hint?: string | null;
};

/**
 * PostgREST hatasını seam'in `DataError`'ına çevirir. Adı anılmaya değer kodlar,
 * bu akşam gerçekten karşılaşılacak olanlar: `PGRST205`/`PGRST106` nesnenin ya
 * da şemanın açılmadığı anlamına geliyor — kullanıcı hatası değil, kurulum
 * eksiği, ve mesaj bunu "bilinmeyen hata" demek yerine söylüyor.
 */
export function toDataError(error: PostgrestErrorLike, context: string): DataError {
  const code = error.code ?? '';
  const message = error.message ?? 'Bilinmeyen PostgREST hatası';

  if (code === 'PGRST205' || code === 'PGRST106') {
    return {
      code: 'not_implemented',
      retryable: false,
      message: `${context}: ${message}. Okuma yüzeyi PostgREST'e açılmamış.`,
      details: { postgrestCode: code },
    };
  }
  if (code === 'PGRST116') {
    return { code: 'not_found', retryable: false, message: `${context}: eşleşen kayıt yok.` };
  }
  if (code === '42501') {
    return {
      code: 'server',
      retryable: false,
      message: `${context}: RLS ya da yetkiler reddetti.`,
      details: { postgrestCode: code },
    };
  }
  return {
    code: 'server',
    retryable: true,
    message: `${context}: ${message}`,
    ...(code ? { details: { postgrestCode: code } } : {}),
  };
}

/** Fırlatan/reddeden taşıma hatası — ağ yok, DNS, abort. */
export function toNetworkError<T = never>(error: unknown, context: string): Result<T> {
  return err<T>('network', `${context}: ${error instanceof Error ? error.message : String(error)}`, {
    retryable: true,
  });
}
