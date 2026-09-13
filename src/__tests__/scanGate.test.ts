import { taramaKarari } from '../scanGate';

describe('taramaKarari', () => {
  it('kayıtlı kişinin doğru kodunu gönderiyor', () => {
    expect(taramaKarari({ okunanEtkinlik: 'atolye', kayitliMi: true })).toEqual({ tur: 'gonder' });
  });

  it('kaydı olmayanı kayıt ekranına yolluyor', () => {
    expect(taramaKarari({ okunanEtkinlik: 'atolye', kayitliMi: false })).toEqual({
      tur: 'kayit-gerek',
    });
  });

  it('etkinlik ekranından gelindiğinde başka kodu reddediyor', () => {
    expect(
      taramaKarari({ okunanEtkinlik: 'baska', hedefEtkinlik: 'atolye', kayitliMi: true }),
    ).toEqual({ tur: 'yanlis-etkinlik' });
  });

  /**
   * Sıranın kendisi bir iddia.
   *
   * İki dal da tetiklenebilir durumdayken "yanlış etkinlik" kazanmak zorunda:
   * tersi, yanlış kodu okutan kişiyi o kodun etkinliğine kaydolmaya
   * yönlendirirdi. Sırayı değiştirince bu test kırmızı veriyor, öteki üçü
   * vermiyor — ölçüldü.
   */
  it('yanlış etkinlik, kayıt eksikliğinden önce geliyor', () => {
    expect(
      taramaKarari({ okunanEtkinlik: 'baska', hedefEtkinlik: 'atolye', kayitliMi: false }),
    ).toEqual({ tur: 'yanlis-etkinlik' });
  });
});
