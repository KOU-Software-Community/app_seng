import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius } from '../theme';
import { GlassButton, PixelTxt, Txt } from './ui';

/**
 * Etkinlik galerisi: küçük önizlemeler ve dokununca açılan tam ekran.
 *
 * Arşiv ekranında bir zamanlar bunun sahtesi vardı — her kayıt için "dört
 * fotoğraf" gösteren, arkasında hiçbir şey olmayan bir görüntüleyici. Buradaki
 * sayaç `photos.length`, yani gerçekten var olan dosya sayısı; iki tane varsa
 * "1 / 2" yazıyor.
 *
 * Kapak ayrı çiziliyor (detayın hero'su), o yüzden burada gösterilmiyor.
 */
export function PhotoGallery({ photos }: { photos: string[] }) {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<number | null>(null);

  if (photos.length < 2) return null;
  const rest = photos.slice(1);

  const step = (delta: number) =>
    setOpen((i) => (i === null ? null : (i + delta + photos.length) % photos.length));

  return (
    <View style={styles.block}>
      <Txt weight="extrabold" size={16} color={colors.navy900} style={{ marginBottom: 10 }}>
        Fotoğraflar
      </Txt>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.strip}
      >
        {rest.map((uri, i) => (
          <Pressable
            key={uri}
            accessibilityRole="button"
            accessibilityLabel={`Fotoğraf ${i + 2}`}
            // +1: kapak dizinin başında ve tam ekranda o da geziliyor.
            onPress={() => setOpen(i + 1)}
            style={({ pressed }) => [styles.thumb, { opacity: pressed ? 0.75 : 1 }]}
          >
            <Image source={{ uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        visible={open !== null}
        animationType="fade"
        transparent
        statusBarTranslucent
        onRequestClose={() => setOpen(null)}
      >
        <View style={styles.viewer}>
          <View style={[styles.bar, { paddingTop: insets.top + 12 }]}>
            <GlassButton
              label="✕"
              accessibilityLabel="Kapat"
              onPress={() => setOpen(null)}
              size={36}
              bg="rgba(255,255,255,0.12)"
            />
            <View style={{ flex: 1 }} />
            <PixelTxt size={8} color={colors.blue200}>
              {open === null ? '' : `${open + 1} / ${photos.length}`}
            </PixelTxt>
          </View>

          <View style={styles.stage}>
            {open === null ? null : (
              <Image source={{ uri: photos[open] }} style={styles.full} resizeMode="contain" />
            )}
          </View>

          <View style={[styles.nav, { paddingBottom: insets.bottom + 24 }]}>
            <GlassButton label="‹" accessibilityLabel="Önceki" onPress={() => step(-1)} size={44} />
            <GlassButton label="›" accessibilityLabel="Sonraki" onPress={() => step(1)} size={44} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { paddingTop: 22 },
  strip: { paddingHorizontal: 20, gap: 10 },
  thumb: {
    width: 132,
    height: 96,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.blue100,
  },

  viewer: { flex: 1, backgroundColor: 'rgba(2,10,26,0.94)' },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  stage: { flex: 1, justifyContent: 'center', paddingHorizontal: 12 },
  full: { width: '100%', height: '100%' },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    paddingTop: 18,
  },
});
