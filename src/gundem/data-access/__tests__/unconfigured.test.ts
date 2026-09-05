import { ARTICLES } from '../../data/articles';
import { getRepositories, resetRepositories } from '../index';
import { createUnconfiguredRepositories } from '../unconfigured';
import { REPOSITORY_CONTRACT_VERSION } from '../repositories';

/**
 * Bu dosya kaynak uygulamada yok — sınadığı davranış da yok.
 *
 * Orada eksik yapılandırma `mock`'a düşüyor ve bu, mock verisi bir geliştirme
 * kolaylığı olduğu sürece doğru. Burada değil: mock verisi uydurma haber
 * başlıkları ve mağaza sürümünde gerçek gibi görünürdü. Aşağıdaki testler o tek
 * cümlenin bekçisi — özellikle "fixture dönmüyor" olanı, çünkü diğer her şey
 * doğru çalışırken sessizce bozulabilecek olan o.
 */

const PROBLEM = 'EXPO_PUBLIC_AIGUNDEM_SUPABASE_URL eksik.';

describe('unconfigured repositories', () => {
  afterEach(() => resetRepositories());

  /**
   * Fabrikanın yönlendirmesini sınıyor, adaptörü değil.
   *
   * İlk hâli yalnızca `version` alanına bakıyordu ve mock kümesi de aynı sürümü
   * taşıdığı için, fabrikayı `unconfigured`'da mock kurmaya geri döndürdüğümde
   * test yeşil kaldı — yani hiçbir şeyi korumuyordu. Regresyonun yaşayacağı yer
   * tam olarak burası: adaptör doğru dururken fabrika yanlış olanı seçebilir.
   */
  it('routes the unconfigured mode to a set that fails, not to fixtures', async () => {
    const repos = getRepositories('unconfigured');
    expect(repos.version).toBe(REPOSITORY_CONTRACT_VERSION);

    const feed = await repos.feed.listArticles();
    expect(feed.ok).toBe(false);
    if (feed.ok) return;
    expect(feed.error.retryable).toBe(false);

    const sources = await repos.sources.listSources();
    expect(sources.ok).toBe(false);
  });

  it('fails every read instead of returning fixtures', async () => {
    const repos = createUnconfiguredRepositories(PROBLEM);

    const feed = await repos.feed.listArticles();
    expect(feed.ok).toBe(false);

    const article = await repos.feed.getArticle('any');
    expect(article.ok).toBe(false);

    const search = await repos.feed.searchArticles({ query: 'yapay zekâ' });
    expect(search.ok).toBe(false);

    const sources = await repos.sources.listSources();
    expect(sources.ok).toBe(false);

    const digest = await repos.digest.getLatestDigest();
    expect(digest.ok).toBe(false);

    const enrichment = await repos.enrichment.requestEnrichment('any');
    expect(enrichment.ok).toBe(false);
  });

  /**
   * The one that matters. A regression here does not look like a failure: the
   * feed fills with plausible Turkish AI headlines that nobody wrote.
   */
  it('never hands back a fixture article', async () => {
    const repos = createUnconfiguredRepositories(PROBLEM);
    const feed = await repos.feed.listArticles();

    expect(feed.ok).toBe(false);
    if (feed.ok) {
      const titles = feed.data.items.map((a) => a.title);
      const fixtures = ARTICLES.map((a) => a.title);
      expect(titles.filter((t) => fixtures.includes(t))).toHaveLength(0);
    }
  });

  it('carries the operator-facing problem, and says a retry will not help', async () => {
    const repos = createUnconfiguredRepositories(PROBLEM);
    const feed = await repos.feed.listArticles();

    expect(feed.ok).toBe(false);
    if (feed.ok) return;
    expect(feed.error.message).toBe(PROBLEM);
    expect(feed.error.retryable).toBe(false);
    // Kendi kodu var, `not_implemented` değil: ekranda söylenecek şey
    // bambaşka. Yapılandırması olmadan çıkmış bir derlemede "bağlantını
    // kontrol et" demek, kullanıcıyı düzeltemeyeceği bir yere yollamak.
    expect(feed.error.code).toBe('unconfigured');
  });
});
