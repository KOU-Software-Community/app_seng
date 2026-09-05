import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { useContent } from './content';
import type { DeviceRecord } from './firebase';
import type { ClubEvent } from './data';
import { isFirebaseConfigured } from './firebaseConfig';
import { planNotifications } from './notificationPlan';
import { NotificationPrefs, Registration, useAppStore } from './store';
import { colors } from './theme';

/**
 * Notifications, in two halves that share the same settings screen:
 *
 *   Push      — club announcements, sent from `npm run push`. Needs a token in
 *               Firestore, which is what the `devices` collection is for.
 *   Reminders — "your event is tomorrow". Scheduled locally on the device from
 *               the event's own start time, so they work with no server, no
 *               network and no token. The club never sends these.
 *
 * Both respect the same four preferences, so every toggle on the settings screen
 * now changes something real.
 */

/** Foreground behaviour. `shouldShowAlert` is deprecated in SDK 57. */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/** Android shows nothing at all without a channel. */
async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('default', {
    name: 'Kulüp bildirimleri',
    importance: Notifications.AndroidImportance.DEFAULT,
    lightColor: colors.blue500,
  });
}

/**
 * Asks for permission and returns an Expo push token, or null when there will
 * never be one: a simulator, a refused prompt, or a build without push
 * credentials. Callers treat null as "push is unavailable", not as an error.
 */
export async function requestPushToken(): Promise<string | null> {
  // The iOS Simulator has no APNs, so a token can never be issued there and
  // asking only produces a confusing error. An Android emulator with Play
  // Services does receive FCM, so it is worth trying — the catch below handles
  // the ones that cannot. Blocking every emulator, as this used to, ruled out
  // the only way to test push without a physical device.
  if (!Device.isDevice && Platform.OS === 'ios') return null;

  const existing = await Notifications.getPermissionsAsync();
  let granted = existing.granted;
  if (!granted && existing.canAskAgain) {
    granted = (await Notifications.requestPermissionsAsync()).granted;
  }
  if (!granted) return null;

  await ensureAndroidChannel();

  try {
    const projectId = Constants.expoConfig?.extra?.eas?.projectId as string | undefined;
    const { data } = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined,
    );
    return data;
  } catch (err) {
    // No APNs key or FCM credentials on this build. Local reminders still work.
    console.log(`[bildirim] push token alınamadı: ${String(err)}`);
    return null;
  }
}

/**
 * Rebuilds the whole local reminder schedule from current state.
 *
 * Cancel-then-reschedule rather than diffing: this app is the only thing
 * scheduling notifications, the list is a handful of events, and a diff would be
 * one more place for the schedule to drift out of sync with the settings.
 */
/**
 * Cihazdaki bütün yerel bildirim programını sıfırdan kurar.
 *
 * Fark alıp güncellemek yerine hepsini iptal edip yeniden kurmak: bu uygulama
 * bildirim kuran tek şey ve liste birkaç kalem. Ama artık **iki** kaynak var —
 * etkinlik hatırlatmaları ve AI Gündem bülteni — ve `cancelAll` ikisini birden
 * siliyor. Bu yüzden ne kurulacağına tek bir yerde karar veriliyor
 * (`notificationPlan.ts`) ve burası yalnızca o listeyi uyguluyor. İki ayrı
 * zamanlayıcı olsaydı biri diğerini sessizce silerdi.
 */
export async function rescheduleReminders(
  events: ClubEvent[],
  registrations: Registration[],
  prefs: NotificationPrefs,
): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  for (const item of planNotifications({ events, registrations, prefs })) {
    await Notifications.scheduleNotificationAsync({
      content: { title: item.title, body: item.body, data: item.data },
      trigger:
        item.kind === 'digest'
          ? {
              type: Notifications.SchedulableTriggerInputTypes.DAILY,
              hour: item.daily.hour,
              minute: item.daily.minute,
            }
          : { type: Notifications.SchedulableTriggerInputTypes.DATE, date: item.date },
    });
  }
}

/**
 * Wiring. Rendered inside both providers so it can see events, registrations and
 * preferences at once; renders nothing.
 */
/**
 * Cihaz kaydını yazan varsayılan yol.
 *
 * `./firebase` bu depoda her yerde tembel yükleniyor (dört çağrı noktasının
 * dördü de `import()`), böylece Firebase SDK'sı açılışta değil ilk gerçek
 * kullanımda kuruluyor. Deseni bozmuyoruz; ama Jest dinamik `import()`'i
 * çalıştıramadığı için çağrı bir dikişin arkasına alındı.
 */
const lazyUpsertDevice = (record: DeviceRecord): Promise<void> =>
  import('./firebase').then(({ upsertDevice }) => upsertDevice(record));

export function NotificationSync({
  /** Test tohumu. Üretimde `./firebase` tembel yükleniyor. */
  upsertDevice = lazyUpsertDevice,
}: { upsertDevice?: (record: DeviceRecord) => Promise<void> } = {}) {
  const router = useRouter();
  const { events } = useContent();
  const { registrations, notifications, onboardingSeen, hydrated } = useAppStore();

  /**
   * Token **state**, ref değil — ve bu satır bütün push'un çalışıp
   * çalışmamasını belirliyor.
   *
   * Ref olduğu sürece: `hydrated` true olunca aşağıdaki iki efekt de koşuyor,
   * ikincisi o anda `token.current === null` görüp erken dönüyor, token birkaç
   * yüz milisaniye sonra ref'e yazılıyor — ve ref yazmak render tetiklemediği
   * için efekt bir daha koşmuyor. Sonraki açılışta ref yine `null` başlıyor,
   * aynı şey tekrarlanıyor.
   *
   * Yani cihaz dokümanı, kullanıcı token geldikten *sonra* bir bildirim ayarını
   * değiştirmedikçe **hiç yazılmıyordu**. `devices` koleksiyonu push'un kime
   * gideceğini belirleyen tek kaynak; yazılmayan cihaz hiçbir duyuru almıyor.
   * Hiçbir şey hata vermiyor, log bile yok — gelmeyen bir bildirimin eksik
   * olduğu belli olmaz.
   */
  const [token, setToken] = useState<string | null>(null);

  // Ask only once the user has been through onboarding — a permission prompt on
  // the very first frame, before anything has been explained, gets refused.
  useEffect(() => {
    if (!hydrated || !onboardingSeen) return;
    let cancelled = false;
    void requestPushToken().then((value) => {
      if (!cancelled) setToken(value);
    });
    return () => {
      cancelled = true;
    };
  }, [hydrated, onboardingSeen]);

  // The device document is what the push sender reads to decide who gets what.
  // Rewritten whenever the token or the preferences change so the two never
  // drift apart.
  useEffect(() => {
    if (!hydrated || !token || !isFirebaseConfigured) return;
    const record = {
      token,
      platform: Platform.OS,
      master: notifications.master,
      categories: notifications.categories,
      reminder: notifications.reminder,
      quietHours: notifications.quietHours,
    };
    void upsertDevice(record).catch((err: unknown) => {
      // Not fatal: the next preference change tries again, and local reminders
      // are unaffected.
      console.log(`[bildirim] cihaz kaydı yazılamadı: ${String(err)}`);
    });
  }, [hydrated, token, notifications, upsertDevice]);

  // Local reminders are pure device state, so they are rebuilt whenever anything
  // they depend on moves.
  useEffect(() => {
    if (!hydrated) return;
    void rescheduleReminders(events, registrations, notifications).catch((err: unknown) => {
      console.log(`[bildirim] hatırlatmalar kurulamadı: ${String(err)}`);
    });
  }, [hydrated, events, registrations, notifications]);

  // Tapping a notification opens the event it is about.
  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data as
        | { eventId?: unknown; tab?: unknown }
        | undefined;

      // Silinmiş bir etkinliğin kimliği de buradan geçebilir; o rota kendi
      // "bulunamadı" ekranını çiziyor, bu yüzden burada ayrıca kontrol yok.
      if (typeof data?.eventId === 'string') {
        router.push(`/etkinlik/${data.eventId}`);
        return;
      }
      // Bülten bildirimi. Eskiden `data` boştu ve dokunmak hiçbir yere
      // gitmiyordu: kullanıcı uygulamanın kaldığı ekrana düşüyordu.
      if (data?.tab === 'bulten') router.push('/gundem?tab=bulten');
    });
    return () => sub.remove();
  }, [router]);

  return null;
}
