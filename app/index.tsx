import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';

import { PixelLoader } from '../src/components/Pixel';
import { Txt } from '../src/components/ui';
import { useAppStore } from '../src/store';
import { gradientDirection, gradients } from '../src/theme';

const HOLD_MS = 1900;

export default function SplashRoute() {
  const router = useRouter();
  const { hydrated, onboardingSeen } = useAppStore();

  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, [scale, opacity]);

  useEffect(() => {
    // Wait for the persisted flag before deciding, otherwise a returning user
    // would flash the onboarding they already finished.
    if (!hydrated) return;
    const t = setTimeout(() => {
      router.replace(onboardingSeen ? '/(tabs)' : '/onboarding');
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [hydrated, onboardingSeen, router]);

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
