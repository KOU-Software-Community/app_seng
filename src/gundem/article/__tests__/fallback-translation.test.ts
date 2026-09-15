/**
 * `PANEL_BASE_URL` Jest'te boş: `.env` yok, ve boş tabanda `panelCevirisi`
 * haklı olarak hiç istek atmadan dönüyor — React Native göreli adresi
 * çözemiyor ve hata "Network request failed" diye görünür, yani bir
 * yapılandırma eksikliğini bağlantı sorunu gibi gösterirdi. Kablodaki
 * davranışı sınamak için taban adres veriliyor.
 *
 * İlk koşumda altı test bu yüzden kırmızı verdi; fonksiyon doğruydu, testin
 * dünyası eksikti.
 */
jest.mock('../../../data', () => ({
  ...jest.requireActual('../../../data'),
  PANEL_BASE_URL: 'https://panel.test',
}));

import { panelCevirisi } from '../../data-access/translate';
import { yedekGerekli } from '../useFallbackTranslation';
import type { Article, ArticleSummary } from '../../domain/types';

const article = (patch: Partial<Article> = {}): Article =>
  ({
    id: 'a1',
    language: 'en',
    bodyOriginal: 'Hello world.',
    summary: undefined,
    ...patch,
  }) as Article;

const summary = (patch: Partial<ArticleSummary> = {}): ArticleSummary => ({
  bullets: ['a', 'b', 'c'],
  translationTr: null,
  translationState: 'pending',
  ...patch,
});

/** Gövdesi `cevap`, durumu `status` olan sahte fetch. */
const sahteFetch = (cevap: unknown, status = 200, json = true) =>
  (async () =>
    ({
      ok: status < 400,
      status,
      async json() {
        if (!json) throw new SyntaxError('Unexpected token < in JSON');
        return cevap;
      },
    }) as unknown as Response) as unknown as typeof fetch;

describe('yedekGerekli — kota yalnızca gerçekten eksik olana harcanıyor', () => {
  it('çeviri zaten varsa istemiyor', () => {
    expect(yedekGerekli(article(), summary({ translationTr: 'Merhaba dünya.', translationState: 'ready' }))).toBe(
      false,
    );
  });

  it('boşluktan ibaret bir çeviri "var" sayılmıyor', () => {
    expect(yedekGerekli(article(), summary({ translationTr: '   ', translationState: 'ready' }))).toBe(true);
  });

  it('Türkçe haberde istemiyor', () => {
    expect(yedekGerekli(article({ language: 'tr' }), summary())).toBe(false);
  });

  it('sunucu not_required dediyse istemiyor', () => {
    expect(yedekGerekli(article(), summary({ translationState: 'not_required' }))).toBe(false);
  });

  it('çevrilecek gövde yoksa istemiyor', () => {
    expect(yedekGerekli(article({ bodyOriginal: '   ' }), summary())).toBe(false);
  });

  it('çeviri eksik ve gövde varsa istiyor', () => {
    expect(yedekGerekli(article(), summary())).toBe(true);
  });
});

describe('panelCevirisi — 200 tek başına başarı değil', () => {
  /**
   * Bu deponun kayıtlı tuzağı: uç noktayı tanımayan panel isteği `/login`'e
   * yönlendiriyor, `fetch` oraya gidiyor ve elimize **200 + HTML** geliyor.
   * Gövdeye bakmayan istemci bunu "oldu" sayar.
   */
  it('200 + HTML gövdesini başarı saymıyor', async () => {
    const sonuc = await panelCevirisi('Hello', { fetchImpl: sahteFetch(null, 200, false) });
    expect(sonuc).toEqual({ durum: 'yok', sebep: 'taninmayan' });
  });

  it('`durum` taşımayan JSON da tanınmıyor', async () => {
    const sonuc = await panelCevirisi('Hello', { fetchImpl: sahteFetch({ metin: 'Merhaba' }) });
    expect(sonuc).toEqual({ durum: 'yok', sebep: 'taninmayan' });
  });

  /** `durum: 'ok'` diyen ama metni boş bir cevap ekranda boş gövde açardı. */
  it('boş metinli ok cevabını kabul etmiyor', async () => {
    const sonuc = await panelCevirisi('Hello', { fetchImpl: sahteFetch({ durum: 'ok', metin: '   ' }) });
    expect(sonuc).toEqual({ durum: 'yok', sebep: 'taninmayan' });
  });

  it('gerçek cevabı okuyor', async () => {
    const sonuc = await panelCevirisi('Hello', {
      fetchImpl: sahteFetch({ durum: 'ok', metin: 'Merhaba' }),
    });
    expect(sonuc).toEqual({ durum: 'ok', metin: 'Merhaba' });
  });

  it('bilinen sebepleri koruyor, bilinmeyeni "taninmayan"a indiriyor', async () => {
    expect(await panelCevirisi('x', { fetchImpl: sahteFetch({ durum: 'kota' }, 503) })).toEqual({
      durum: 'yok',
      sebep: 'kota',
    });
    expect(await panelCevirisi('x', { fetchImpl: sahteFetch({ durum: 'baska-bir-sey' }, 502) })).toEqual({
      durum: 'yok',
      sebep: 'taninmayan',
    });
  });

  it('ağ hatasını ayrı raporluyor', async () => {
    const patlayan = (async () => {
      throw new TypeError('Network request failed');
    }) as unknown as typeof fetch;
    expect(await panelCevirisi('x', { fetchImpl: patlayan })).toEqual({ durum: 'yok', sebep: 'ag' });
  });
});
