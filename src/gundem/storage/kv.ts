/**
 * AI Gündem'in cihaz deposu — anahtar/değer, tek yer.
 *
 * Kaynak uygulama burada `expo-sqlite/kv-store` kullanıyordu ve web için ayrı
 * bir `localStorage` dalı, ayrıca modül şeklini doğrulayan bir çözücü taşıyordu
 * (230 satır). Bu depoda AsyncStorage **zaten var** — `src/store.tsx` kulüp
 * durumunu onunla saklıyor — ve web'de kendisi `localStorage`'a düşüyor. Yani o
 * üç dal tek bir bağımlılığa iniyor ve `expo-sqlite` hiç girmiyor: bir native
 * modül, bir prebuild riski eksik.
 *
 * Hafızaya düşüş korunuyor: bir okuma asla fırlatmıyor. Ama sessizce de
 * düşmüyor — kalıcı olmayan bir depo, çalışan bir depoya birebir benziyor ve
 * fark ancak uygulama yeniden açıldığında ortaya çıkıyor.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export type KvStore = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

const memory = new Map<string, string>();

/** Test ve son çare deposu. Kalıcı değil. */
export const memoryStore: KvStore = {
  async getItem(key) {
    return memory.get(key) ?? null;
  },
  async setItem(key, value) {
    memory.set(key, value);
  },
  async removeItem(key) {
    memory.delete(key);
  },
};

let warned = false;
function warnFallback(reason: string): void {
  if (warned) return;
  warned = true;
  console.warn(`[gundem/kv] kalıcı depo kullanılamıyor (${reason}); bellek kullanılıyor.`);
}

/** Test seam: uyarının bir kez verildiğini sınayabilmek için. */
export function resetKvWarningForTests(): void {
  warned = false;
}

/**
 * AsyncStorage, hatası yutulmuş hâliyle.
 *
 * Yutuluyor çünkü bir tercih yazamamak uygulamayı düşürmemeli; ama okuma
 * `null` dönerken yazma sessizce kaybolursa iki davranış tutarsız olurdu, o
 * yüzden ikisi de belleğe düşüyor ve bir kez uyarıyor.
 */
export function createAsyncStorageStore(storage: KvStore = AsyncStorage): KvStore {
  return {
    async getItem(key) {
      try {
        return await storage.getItem(key);
      } catch (error) {
        warnFallback(String(error));
        return memoryStore.getItem(key);
      }
    },
    async setItem(key, value) {
      try {
        await storage.setItem(key, value);
      } catch (error) {
        warnFallback(String(error));
        await memoryStore.setItem(key, value);
      }
    },
    async removeItem(key) {
      try {
        await storage.removeItem(key);
      } catch (error) {
        warnFallback(String(error));
        await memoryStore.removeItem(key);
      }
    },
  };
}

export const kv: KvStore = createAsyncStorageStore();

/**
 * Uygulamanın sahip olduğu depo anahtarları. Tek yerde durmaları greplenebilir
 * kalmaları için; her yeni tüketici kendi anahtarını buraya ekliyor.
 *
 * `v1:` öneki kasıtlı: değerler JSON ve şekilleri depo sözleşmesinin sürümüne
 * bağlı. Şekil değişirse `v2:` altına yazılır ve eski blob yanlış çözülmek
 * yerine yok sayılır.
 *
 * `kyk.` öneki de kasıtlı: AsyncStorage bu uygulamada kulüp tarafıyla ortak
 * (`kyk.state.v1`), iki bölümün anahtarları aynı isim alanında yaşıyor.
 */
export const KV_KEYS = {
  /** uuid v4, kurulum başına bir kez üretiliyor. */
  deviceId: 'v1:kyk.gundem.device_id',

  /** TanStack Query'nin kalıcı önbellek blob'u. */
  queryCache: 'v1:kyk.gundem.query-cache',

  /** Cihaza özel kullanıcı durumu — hiçbiri sunucuya gitmiyor. */
  enabledSourceIds: 'v1:kyk.gundem.user.enabled_sources',
  savedArticles: 'v1:kyk.gundem.user.saved',
  readArticles: 'v1:kyk.gundem.user.read',
  settings: 'v1:kyk.gundem.user.settings',
  recentSearches: 'v1:kyk.gundem.user.recent_searches',
} as const;
