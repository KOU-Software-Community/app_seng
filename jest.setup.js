/**
 * AsyncStorage'ın native modülü Jest'te yok.
 *
 * Paket kendi mock'unu gönderiyor; onu kurmazsak `src/gundem/storage/kv.ts`'i
 * içe aktaran her modül "NativeModule: AsyncStorage is null" ile düşüyor — ve
 * bu, o modülü dolaylı olarak çeken her testi de düşürüyor (deviceId → edge →
 * supabase/repositories → data-access).
 *
 * Kaynak uygulamada bu gerekmiyordu çünkü depo `expo-sqlite/kv-store`'du ve
 * testler onu elle taklit ediyordu. AsyncStorage'a geçmenin bedeli bu tek satır.
 */
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

/**
 * `expo-crypto`'nun native tarafı Jest'te yok ve stub sıfır dolu bir dizi
 * döndürüyor. Bu, `randomUuidV4`'ü her çağrıda aynı uuid'i üretir hâle getirip
 * "iki kimlik farklı" testini sahte bir sebeple kırıyordu.
 *
 * Deterministik ama **değişen** bir kaynak veriliyor: testler tekrarlanabilir
 * kalıyor, üretilen kimlikler birbirinden farklı oluyor, ve koddaki sıfır
 * kontrolü kendi testinde ayrıca sınanabiliyor.
 */
let mockCryptoCounter = 0;
jest.mock('expo-crypto', () => ({
  getRandomValues: (array) => {
    for (let i = 0; i < array.length; i += 1) {
      mockCryptoCounter = (mockCryptoCounter * 1103515245 + 12345) % 2147483648;
      array[i] = (mockCryptoCounter >>> 16) & 0xff;
    }
    return array;
  },
}));
