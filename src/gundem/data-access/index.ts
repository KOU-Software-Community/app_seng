/**
 * The data-access seam's front door. Screens and hooks import `getRepositories()`
 * and the domain DTOs from here; nothing above this layer knows whether the data
 * came from the prototype fixtures or from Supabase.
 */
import { env, type ResolvedMode } from '../config/env';
import { createMockRepositories } from './mock';
import { createSupabaseRepositories } from './supabase';
import { createUnconfiguredRepositories } from './unconfigured';
import type { Repositories } from './repositories';

export * from './repositories';
export type {
  Article,
  ArticleId,
  ArticleSummary,
  Cursor,
  Digest,
  DigestItem,
  DigestSnapshot,
  EnrichmentResult,
  Iso,
  Language,
  Page,
  Source,
  SourceId,
  TranslationState,
} from '../domain/types';
export {
  DataErrorException,
  isDataErrorException,
  type DataError,
  type DataErrorCode,
  type Result,
} from '../domain/errors';

let cached: Repositories | null = null;

/**
 * Bir veri modu için depo kümesini kurar (ya da yeniden kullanır).
 *
 * Varsayılan, doğrulanmış `env.mode`. Küme mod başına hafızada tutuluyor;
 * açık bir mod vermek önbelleği atlıyor — testlerin istediği şey bu.
 *
 * `unconfigured` üçüncü bir dal ve **mock'a düşmüyor**: eksik yapılandırmada
 * fixture göstermek, uydurma haber başlıklarını gerçek gibi sunmak olurdu.
 * O dal her çağrıya `env.problem`'i taşıyan tipli bir hata döndürüyor.
 */
export function getRepositories(mode: ResolvedMode = env.mode): Repositories {
  if (mode === env.mode && cached) return cached;

  let repositories: Repositories;
  if (mode === 'unconfigured') {
    repositories = createUnconfiguredRepositories(
      env.problem ?? 'AI Gündem yapılandırılmamış.',
    );
  } else if (mode === 'supabase') {
    repositories = createSupabaseRepositories();
  } else {
    repositories = createMockRepositories();
  }

  if (mode === env.mode) cached = repositories;
  return repositories;
}

/** Drops the memoised set. Only useful when a test or P6 swaps modes at runtime. */
export function resetRepositories(): void {
  cached = null;
}
