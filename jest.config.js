/**
 * Yalnızca AI Gündem bölümü.
 *
 * `testMatch` bilerek `src/gundem/**` ile sınırlı: bu deponun geri kalanı
 * `scripts/check-*.ts` ile sınanıyor ve o dosyalar Jest'in bulacağı bir şey
 * değil. Sınırı kaldırmak, iki farklı sınama disiplinini birbirine karıştırırdı.
 *
 * `jest-expo` preset'i React Native ortamını kuruyor — P2'nin saf modülleri için
 * gerekmiyor ama P3/P4'ün bileşen testleri için gerekecek ve iki ayrı proje
 * tanımlamaktansa baştan doğru preset'le başlamak daha az iş.
 */
module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/src/gundem/**/__tests__/**/*.test.ts?(x)'],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
