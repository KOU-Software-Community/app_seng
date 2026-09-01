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

import { env } from '../config/env';

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
