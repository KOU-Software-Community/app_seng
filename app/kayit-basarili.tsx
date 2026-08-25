import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { PixelLoader } from '../src/components/Pixel';
import { PixelTxt, Txt } from '../src/components/ui';
import { useEvent } from '../src/content';
import { ICON } from '../src/icons';
import { useAppStore } from '../src/store';
import { colors, gradientDirection, gradients } from '../src/theme';

export default function RegistrationDoneRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const event = useEvent(id);
  const { registrationFor, syncPending, notifications } = useAppStore();

  const registration = registrationFor(event.id);
  // The code is real and the club will get it — but saying "yerin ayrıldı"
  // before the write lands would be a promise we have not kept yet.
  const pending = !!registration && !registration.synced;
  // Only promise the reminder we will actually schedule. Both switches gate it,
  // and src/notifications.tsx reads exactly the same two.
  const remindersOn = notifications.master && notifications.categories['Hatırlatma'] !== false;

  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [scale, opacity]);

  return (
    <LinearGradient
      colors={gradients.success}
      start={gradientDirection.vertical.start}
      end={gradientDirection.vertical.end}
      style={styles.root}
    >
      <PixelLoader
        size={12}
        gap={26}
        duration={1400}
        colors={['#93CBDC', '#D2E7EC', '#93CBDC', '#D2E7EC']}
        style={[styles.confetti, { top: insets.top + 60 }]}
      />

      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <Svg width={104} height={104} viewBox="0 0 8 8">
          <Path d={ICON.check} fill={colors.blue200} />
        </Svg>
      </Animated.View>

      <Txt weight="extrabold" size={26} color="#fff" tracking={-0.5} style={styles.title}>
        {pending ? 'Kaydın hazır' : 'Kaydın alındı!'}
      </Txt>

      <Txt size={14.5} leading={1.6} color={colors.blue200} style={styles.body}>
        {pending
          ? `${event.title} için kaydın telefonunda duruyor ama kulübe henüz ulaşmadı. Bağlantı gelir gelmez otomatik gönderilecek; kodunu saklaman yeterli.`
          : remindersOn
            ? `${event.title} için yerin ayrıldı. Etkinlikten ${notifications.reminder} hatırlatacağız.`
            : `${event.title} için yerin ayrıldı. Hatırlatma almak istersen bildirim ayarlarından açabilirsin.`}
      </Txt>

      <View style={styles.codeBox}>
        <Txt weight="semibold" size={11} color={colors.blue200} tracking={0.4}>
          KAYIT KODU
        </Txt>
        <PixelTxt size={15} color="#fff" style={styles.code}>
          {registration?.code ?? '—'}
        </PixelTxt>
      </View>

      <View style={[styles.actions, { marginBottom: insets.bottom }]}>
        {pending ? (
          <Pressable
            onPress={syncPending}
            accessibilityRole="button"
            accessibilityLabel="Kaydı şimdi tekrar göndermeyi dene"
            style={({ pressed }) => [
              styles.outlineBtn,
              pressed && { backgroundColor: 'rgba(255,255,255,0.08)' },
            ]}
          >
            <Txt weight="semibold" size={14.5} color={colors.onNavy}>
              Şimdi tekrar dene
            </Txt>
          </Pressable>
        ) : null}

        <Pressable
          onPress={() => router.replace('/(tabs)')}
          accessibilityRole="button"
          style={({ pressed }) => [styles.solidBtn, pressed && { opacity: 0.9 }]}
        >
          <Txt weight="bold" size={15} color={colors.navy700}>
            Ana sayfaya dön
          </Txt>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/(tabs)/takvim')}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.outlineBtn,
            pressed && { backgroundColor: 'rgba(255,255,255,0.08)' },
          ]}
        >
          <Txt weight="semibold" size={14.5} color={colors.onNavy}>
            Takvimime ekle
          </Txt>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  confetti: { position: 'absolute' },
  title: { marginTop: 26, marginBottom: 8, textAlign: 'center' },
  body: { textAlign: 'center' },
  codeBox: {
    marginTop: 26,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(147,203,220,0.45)',
    borderRadius: 14,
    paddingHorizontal: 26,
    paddingVertical: 16,
  },
  code: { marginTop: 8, letterSpacing: 1 },
  actions: { marginTop: 32, width: '100%', gap: 10 },
  solidBtn: {
    backgroundColor: '#fff',
    borderRadius: 13,
    paddingVertical: 16,
    alignItems: 'center',
  },
  outlineBtn: {
    borderWidth: 1.5,
    borderColor: 'rgba(147,203,220,0.5)',
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: 'center',
  },
});
