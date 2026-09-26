import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { gradientDirection, gradients, type GradientStops } from '../theme';
import { PixelIcon } from './Pixel';
import { PixelTxt } from './ui';

/**
 * Stand-in for event and archive photography.
 *
 * The design left these slots empty so real photos could be dropped in later, so
 * this renders a branded gradient placeholder until a `uri` is supplied. Once the
 * archive is wired to a backend, pass the photo URL and the placeholder drops out.
 *
 * Logolar `contain` kullanıyor: kırpılan bir logo başka bir marka gibi okunur.
 */
export function PhotoSlot({
  uri,
  label,
  gradient = gradients.photo,
  showLabel = true,
  resizeMode = 'cover',
  style,
  children,
}: {
  uri?: string;
  label?: string;
  gradient?: GradientStops;
  showLabel?: boolean;
  resizeMode?: 'cover' | 'contain';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  return (
    <View style={[styles.root, style]}>
      {uri ? (
        <Image source={{ uri }} style={StyleSheet.absoluteFill} resizeMode={resizeMode} />
      ) : (
        <LinearGradient
          colors={gradient}
          start={gradientDirection.diagonal.start}
          end={gradientDirection.diagonal.end}
          style={[StyleSheet.absoluteFill, styles.placeholder]}
        >
          {showLabel ? (
            <>
              <PixelIcon name="grid" size={16} color="rgba(255,255,255,0.5)" />
              {label ? (
                <PixelTxt size={6} color="rgba(255,255,255,0.55)" style={styles.label}>
                  {label}
                </PixelTxt>
              ) : null}
            </>
          ) : null}
        </LinearGradient>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { overflow: 'hidden' },
  placeholder: { alignItems: 'center', justifyContent: 'center', gap: 8 },
  label: { letterSpacing: 1 },
});
