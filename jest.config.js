/**
 * Yalnızca AI Gündem bölümü.
 *
 * `testMatch` `src/**` — başta yalnızca `src/gundem/**`'di, P5'te genişledi.
 * Sebep: bildirim planlayıcısı ortak kod. Kulüp hatırlatmaları ve AI Gündem
 * bülteni aynı zamanlayıcıdan geçmek zorunda (biri diğerini iptal ediyor), o
 * yüzden karar `src/notificationPlan.ts`'te ve testi portun isim alanına
 * sığmıyor.
 *
 * `app/**` ve `scripts/**` hâlâ dışarıda: ekranlar `src/gundem/**` altındaki
 * render testlerinden, `scripts/check-*.ts` ise kendi disipliniyle sınanıyor.
 *
 * `jest-expo` preset'i React Native ortamını kuruyor — P2'nin saf modülleri için
 * gerekmiyor ama P3/P4'ün bileşen testleri için gerekecek ve iki ayrı proje
 * tanımlamaktansa baştan doğru preset'le başlamak daha az iş.
 */
module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/src/**/__tests__/**/*.test.ts?(x)'],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
