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
