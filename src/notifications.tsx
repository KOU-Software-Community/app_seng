import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

import { useContent } from './content';
import type { ClubEvent } from './data';
import { isFirebaseConfigured } from './firebaseConfig';
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

/** Matches the `Hatırlatma` entry in NOTIFICATION_CATEGORIES. */
const REMINDER_CATEGORY = 'Hatırlatma';

/** Nothing fires between 23:00 and 08:00 when quiet hours are on. */
const QUIET_START_HOUR = 23;
const QUIET_END_HOUR = 8;

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

/** REMINDER_OPTIONS entries mapped to milliseconds before the event. */
function reminderOffsetMs(option: string): number {
  if (option.startsWith('1 saat')) return 60 * 60 * 1000;
  if (option.startsWith('3 gün')) return 3 * 24 * 60 * 60 * 1000;
  return 24 * 60 * 60 * 1000; // "1 gün önce" — the default in the store.
}

/** Moves a night-time reminder to 08:00 so quiet hours mean something. */
function applyQuietHours(when: Date): Date {
  const hour = when.getHours();
  if (hour >= QUIET_END_HOUR && hour < QUIET_START_HOUR) return when;

  const shifted = new Date(when);
  // 23:00–23:59 waits for the next morning; 00:00–07:59 uses the same one.
  if (hour >= QUIET_START_HOUR) shifted.setDate(shifted.getDate() + 1);
  shifted.setHours(QUIET_END_HOUR, 0, 0, 0);
  return shifted;
}

/**
 * Rebuilds the whole local reminder schedule from current state.
 *
 * Cancel-then-reschedule rather than diffing: this app is the only thing
 * scheduling notifications, the list is a handful of events, and a diff would be
 * one more place for the schedule to drift out of sync with the settings.
 */
export async function rescheduleReminders(
  events: ClubEvent[],
  registrations: Registration[],
  prefs: NotificationPrefs,
): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const wanted = prefs.master && prefs.categories[REMINDER_CATEGORY] !== false;
  if (!wanted) return;

  const offset = reminderOffsetMs(prefs.reminder);
  const now = Date.now();

  for (const registration of registrations) {
    const event = events.find((e) => e.id === registration.eventId);
    if (!event) continue;

    const startsAt = new Date(event.startsAt);
    if (Number.isNaN(startsAt.getTime())) continue;

    let when = new Date(startsAt.getTime() - offset);
    if (prefs.quietHours) when = applyQuietHours(when);

    // A reminder in the past is noise, and one that quiet hours pushed past the
    // event itself is worse than none.
    if (when.getTime() <= now || when >= startsAt) continue;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: event.title,
        body: `${event.time} · ${prefs.reminder} hatırlatma. Kayıt kodun: ${registration.code}`,
        data: { eventId: event.id },
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: when },
    });
  }
}

/**
 * Wiring. Rendered inside both providers so it can see events, registrations and
 * preferences at once; renders nothing.
 */
export function NotificationSync() {
  const router = useRouter();
  const { events } = useContent();
  const { registrations, notifications, onboardingSeen, hydrated } = useAppStore();

  const token = useRef<string | null>(null);

  // Ask only once the user has been through onboarding — a permission prompt on
  // the very first frame, before anything has been explained, gets refused.
  useEffect(() => {
    if (!hydrated || !onboardingSeen) return;
    let cancelled = false;
    void requestPushToken().then((value) => {
      if (!cancelled) token.current = value;
    });
    return () => {
      cancelled = true;
    };
  }, [hydrated, onboardingSeen]);

  // The device document is what `npm run push` reads to decide who gets what.
  // Rewritten whenever the preferences change so the two never drift apart.
  useEffect(() => {
    if (!hydrated || !token.current || !isFirebaseConfigured) return;
    const record = {
      token: token.current,
      platform: Platform.OS,
      master: notifications.master,
      categories: notifications.categories,
      reminder: notifications.reminder,
      quietHours: notifications.quietHours,
    };
    void import('./firebase')
      .then(({ upsertDevice }) => upsertDevice(record))
      .catch((err: unknown) => {
        // Not fatal: the next preference change tries again, and local reminders
        // are unaffected.
        console.log(`[bildirim] cihaz kaydı yazılamadı: ${String(err)}`);
      });
  }, [hydrated, notifications]);

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
      const eventId = response.notification.request.content.data?.eventId;
      if (typeof eventId === 'string') router.push(`/etkinlik/${eventId}`);
    });
    return () => sub.remove();
  }, [router]);

  return null;
}
