import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../theme';
import { PixelLoader } from './Pixel';
import { PixelTxt } from './ui';

/**
 * The pixel "YUKLENIYOR" scrim shown while an event detail is being opened.
 * Rendered above the whole navigator so it survives the screen transition.
 */
export function LoadingOverlay() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.overlay]} pointerEvents="auto">
      <PixelLoader size={10} gap={5} duration={900} />
      <PixelTxt size={8} color={colors.navy700} style={styles.label}>
        YUKLENIYOR
      </PixelTxt>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    zIndex: 90,
    backgroundColor: 'rgba(244,249,251,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  label: { letterSpacing: 1 },
});
