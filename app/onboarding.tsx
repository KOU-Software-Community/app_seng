import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PixelArt } from '../src/components/Pixel';
import { PixelTxt, PrimaryButton, Txt } from '../src/components/ui';
import { ONBOARDING } from '../src/data';
import { ONBOARDING_ART } from '../src/icons';
import { useAppStore } from '../src/store';
import { colors, gradientDirection, gradients } from '../src/theme';

export default function OnboardingRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAppStore();
  const [index, setIndex] = useState(0);

  const page = ONBOARDING[index];
  const artOpacity = useRef(new Animated.Value(1)).current;

  const finish = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  const next = () => {
    if (index >= ONBOARDING.length - 1) {
      finish();
      return;
    }
    setIndex(index + 1);
    // Re-run the pop-in so each page's artwork lands rather than swapping flatly.
    artOpacity.setValue(0);
    Animated.timing(artOpacity, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={gradients.onboarding}
        start={gradientDirection.vertical.start}
        end={gradientDirection.vertical.end}
        style={styles.hero}
      >
        <Pressable
          onPress={finish}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.skip,
            { top: insets.top + 14, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Txt weight="semibold" size={12.5} color={colors.onNavy}>
            Atla
          </Txt>
        </Pressable>

        <Animated.View style={{ opacity: artOpacity }}>
          {page.art === 'logo' ? (
            <Image
              source={require('../assets/brand/mascot.png')}
              style={styles.mascot}
              resizeMode="contain"
              accessibilityLabel="KOÜ Yazılım Kulübü maskotu"
            />
          ) : (
            <PixelArt layers={ONBOARDING_ART[page.art]} width={164} height={128} />
          )}
        </Animated.View>
      </LinearGradient>

      <View style={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
        <PixelTxt size={8} color={colors.blue500} style={styles.kicker}>
          {page.kicker}
        </PixelTxt>

        <Txt weight="extrabold" size={27} leading={1.2} color={colors.navy900} tracking={-0.6} style={styles.title}>
          {page.title}
        </Txt>

        <Txt size={15} leading={1.6} color={colors.muted}>
          {page.body}
        </Txt>

        <View style={styles.spacer} />

        <View style={styles.footer}>
          <View style={styles.dots}>
            {ONBOARDING.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === index
                    ? { width: 22, backgroundColor: colors.blue500 }
                    : { width: 7, backgroundColor: colors.dotIdle },
                ]}
              />
            ))}
          </View>

          <PrimaryButton label={page.cta} onPress={next} contentStyle={styles.cta} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  hero: {
    flex: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  skip: {
    position: 'absolute',
    right: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  // No drop shadow: only iOS follows the image's alpha, so Android and web would
  // draw a shadow around the bounding box instead of the artwork.
  mascot: { width: 232, height: 205 },
  content: { flex: 48, paddingHorizontal: 28, paddingTop: 34 },
  kicker: { letterSpacing: 1 },
  title: { marginTop: 14, marginBottom: 10 },
  spacer: { flex: 1, minHeight: 24 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { height: 7, borderRadius: 4 },
  cta: { paddingHorizontal: 30, paddingVertical: 15 },
});
