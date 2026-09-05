import { WORDS_PER_MINUTE, readingTimeTr, toParagraphs, wordCount } from '../readingText';

/**
 * Okuma yüzeyinin ekrandan ayrılabilen yarısı.
 *
 * Ekran "güzel duruyor mu" sorusunu bir test cevaplayamaz; ama metnin
 * paragraflara **ayrıldığını** cevaplayabilir, ve duvar hissinin sebebi tam
 * olarak buydu.
 */

describe('toParagraphs — how the wall becomes prose', () => {
  it('splits on blank lines', () => {
    expect(toParagraphs('Birinci paragraf.\n\nİkinci paragraf.')).toEqual([
      'Birinci paragraf.',
      'İkinci paragraf.',
    ]);
  });

  /**
   * Boş satır ayırıcıyken, paragrafın içindeki tek satır sonu yumuşak sarmadır.
   * Katlanmazsa metin, sütun genişliğiyle alakasız yerlerden kırılmış görünür —
   * "txt dosyası" hissinin yarısı bu.
   */
  it('folds soft wraps inside a paragraph into spaces', () => {
    expect(toParagraphs('Bir cümlenin\nortasından kırılmış hâli.\n\nSonraki.')).toEqual([
      'Bir cümlenin ortasından kırılmış hâli.',
      'Sonraki.',
    ]);
  });

  /**
   * Diğer yarısı: bazı çıkarıcılar hiç boş satır göndermiyor. O metinde tek
   * satır sonu **paragraf** ayırıcısıdır; yumuşak sarma sayılırsa metnin
   * tamamı tek bir dev paragrafa iner.
   */
  it('treats single newlines as paragraphs when there is no blank line anywhere', () => {
    expect(toParagraphs('Birinci.\nİkinci.\nÜçüncü.')).toEqual(['Birinci.', 'İkinci.', 'Üçüncü.']);
  });

  it('handles CRLF, which is what half the feeds send', () => {
    expect(toParagraphs('Bir.\r\n\r\nİki.')).toEqual(['Bir.', 'İki.']);
  });

  it('drops blank paragraphs instead of rendering empty gaps', () => {
    expect(toParagraphs('Bir.\n\n\n\n   \n\nİki.')).toEqual(['Bir.', 'İki.']);
  });

  it('collapses runs of spaces and tabs', () => {
    expect(toParagraphs('Bir     iki\t\tüç.')).toEqual(['Bir iki üç.']);
  });

  it('is empty for an empty body, so the screen can say so', () => {
    expect(toParagraphs('')).toEqual([]);
    expect(toParagraphs('   \n\n  ')).toEqual([]);
  });

  it('keeps a single paragraph a single paragraph', () => {
    expect(toParagraphs('Tek bir paragraf, hiç satır sonu yok.')).toHaveLength(1);
  });
});

describe('readingTimeTr', () => {
  const words = (n: number) => Array.from({ length: n }, (_, i) => `kelime${i}`).join(' ');

  it('reports whole minutes at the assumed pace', () => {
    expect(readingTimeTr(words(WORDS_PER_MINUTE * 4))).toBe('4 dk okuma');
  });

  /**
   * "0 dk okuma", olmayan bir sürenin bildirimidir. Kısa bir metin bir
   * dakikadır.
   */
  it('never says zero minutes for text that exists', () => {
    expect(readingTimeTr('üç kelimelik metin')).toBe('1 dk okuma');
  });

  it('says nothing at all when there is nothing to read', () => {
    expect(readingTimeTr('')).toBeNull();
    expect(readingTimeTr('   ')).toBeNull();
  });

  it('counts words, not characters', () => {
    expect(wordCount('bir  iki\núç')).toBe(3);
    expect(wordCount('')).toBe(0);
  });
});
