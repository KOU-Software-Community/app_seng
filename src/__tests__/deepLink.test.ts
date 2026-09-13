import { safeNext } from '../deepLink';

describe('safeNext', () => {
  it('uygulama içi yolu geçiriyor', () => {
    expect(safeNext('/kayit/git-atolyesi')).toBe('/kayit/git-atolyesi');
    expect(safeNext('/(tabs)/hesap')).toBe('/(tabs)/hesap');
  });

  it('dış adresi reddediyor', () => {
    expect(safeNext('https://evil.example')).toBeNull();
    expect(safeNext('kykapp://giris')).toBeNull();
    expect(safeNext('javascript:alert(1)')).toBeNull();
  });

  // Tek eğik çizgi kontrolünden geçen iki biçim — asıl yakalaması gereken bunlar.
  it('protokol-göreli adresi reddediyor', () => {
    expect(safeNext('//evil.example/giris')).toBeNull();
    expect(safeNext('/\\evil.example')).toBeNull();
  });

  it('yol olmayanı reddediyor', () => {
    expect(safeNext(undefined)).toBeNull();
    expect(safeNext('')).toBeNull();
    expect(safeNext(['/a'])).toBeNull();
  });
});
