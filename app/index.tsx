import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';

import { PixelLoader } from '../src/components/Pixel';
import { Txt } from '../src/components/ui';
import { useAppStore } from '../src/store';
import { gradientDirection, gradients } from '../src/theme';

/**
 * Giriş animasyonu. Eskiden buranın yanında `HOLD_MS = 1900` vardı ve
 * hidrasyon bittikten *sonra* iki saniye daha beklenirdi — hiçbir şeyi
 * beklemeyen, sadece bekleten bir sayı.
 *
 * Kalan gecikme animasyonun kendi süresi: logo belirip anında kaybolursa açılış
 * bozuk görünüyor. Yani bekleme artık gerçekten olan bir şeye bağlı.
 */
const INTRO_MS = 500;

export default function SplashRoute() {
  const router = useRouter();
  const { hydrated, onboardingSeen } = useAppStore();

  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: INTRO_MS, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: INTRO_MS, useNativeDriver: true }),
    ]).start(() => setIntroDone(true));
  }, [scale, opacity]);

  useEffect(() => {
    // İki koşul da gerçek: kalıcı bayrak okunmadan karar verilemez (yoksa
    // onboarding'i bitirmiş kullanıcı onu bir an görür), ve animasyon
    // bitmeden geçilirse logo yanıp söner.
    if (!hydrated || !introDone) return;
    router.replace(onboardingSeen ? '/(tabs)' : '/onboarding');
  }, [hydrated, introDone, onboardingSeen, router]);

  return (
    <LinearGradient
      colors={gradients.splash}
      start={gradientDirection.vertical.start}
      end={gradientDirection.vertical.end}
      style={styles.root}
    >
      <DotField />

      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <Image
          source={require('../assets/brand/logo.png')}
          style={styles.logo}
          accessibilityLabel="KOÜ Yazılım Kulübü"
        />
      </Animated.View>

      <PixelLoader
        size={8}
        gap={5}
        duration={1000}
        colors={['#93CBDC', '#93CBDC', '#93CBDC', '#93CBDC']}
        style={styles.loader}
      />

      <Txt
        weight="semibold"
        size={11.5}
        color="rgba(210,231,236,0.6)"
        tracking={2.5}
        style={styles.university}
      >
        KOCAELİ ÜNİVERSİTESİ
      </Txt>
    </LinearGradient>
  );
}

/** The 16px dot grid behind the badge, drawn once as an SVG pattern. */
function DotField() {
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Defs>
        <Pattern id="dots" width={16} height={16} patternUnits="userSpaceOnUse">
          <Circle cx={1.5} cy={1.5} r={1.5} fill="rgba(147,203,220,0.22)" />
        </Pattern>
      </Defs>
      <Rect x={0} y={0} width="100%" height="100%" fill="url(#dots)" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: {
    width: 216,
    height: 216,
    borderRadius: 108,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 60,
    shadowOffset: { width: 0, height: 24 },
  },
  loader: { marginTop: 36 },
  university: { position: 'absolute', bottom: 64 },
});
