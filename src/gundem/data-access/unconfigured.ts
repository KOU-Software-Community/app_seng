import { err, type Result } from '../domain/errors';
import type {
  Article,
  DigestSnapshot,
  EnrichmentResult,
  Page,
  Source,
} from '../domain/types';
import { REPOSITORY_CONTRACT_VERSION, type Repositories } from './repositories';

/**
 * Yapılandırılmamış modun depo kümesi: her çağrı aynı tipli hatayı döndürüyor.
 *
 * Bu, kaynak uygulamada olmayan üçüncü bir adaptör ve varlık sebebi tek bir
 * cümle: **eksik yapılandırma fixture göstermemeli.** Orada eksik yapılandırma
 * `mock`'a düşüyordu; burada mock verisi uydurma haber başlıkları demek ve
 * mağaza sürümünde gerçek gibi görünürdü.
 *
 * Fırlatmıyor: fırlatmak ekranı bir hata sınırına düşürüp beyaz sayfa
 * gösterirdi. Bunun yerine `Result` kanalından, ekranda gösterilebilir bir
 * mesajla dönüyor — `env.problem` hangi değişkenin eksik olduğunu adıyla
 * söylüyor.
 *
 * `retryable: false`: yeniden denemek aynı sonucu verir. Eksik olan ağ değil,
 * derleme zamanında pakete girmemiş bir değişken.
 */
export function createUnconfiguredRepositories(problem: string): Repositories {
  const fail = <T>(): Result<T> => err<T>('not_implemented', problem, { retryable: false });

  return {
    version: REPOSITORY_CONTRACT_VERSION,
    // Küme "supabase" gibi davranmıyor ve "mock" da değil; mod alanı hangi
    // adaptörün konuştuğunu söylüyor ve buradaki cevap "hiçbiri".
    mode: 'supabase',
    feed: {
      version: REPOSITORY_CONTRACT_VERSION,
      async listArticles(): Promise<Result<Page<Article>>> {
        return fail();
      },
      async getArticle(): Promise<Result<Article>> {
        return fail();
      },
      async searchArticles(): Promise<Result<Page<Article>>> {
        return fail();
      },
    },
    sources: {
      version: REPOSITORY_CONTRACT_VERSION,
      async listSources(): Promise<Result<Source[]>> {
        return fail();
      },
      async addSourceByUrl(): Promise<Result<Source>> {
        return fail();
      },
    },
    digest: {
      version: REPOSITORY_CONTRACT_VERSION,
      async getLatestDigest(): Promise<Result<DigestSnapshot>> {
        return fail();
      },
    },
    enrichment: {
      version: REPOSITORY_CONTRACT_VERSION,
      async requestEnrichment(): Promise<Result<EnrichmentResult>> {
        return fail();
      },
    },
  };
}
