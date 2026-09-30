import { Image } from 'expo-image';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { colors, radius } from '../theme';
import { Txt } from './ui';

/**
 * Etkinlik galerisinin önizleme şeridi; dokunulan fotoğraf tam ekran
 * görüntüleyicide (`PhotoViewer`, ekranın kendisi açıyor) açılıyor.
 *
 * Arşiv ekranında bir zamanlar bunun sahtesi vardı — her kayıt için "dört
 * fotoğraf" gösteren, arkasında hiçbir şey olmayan bir görüntüleyici. Buradaki
 * önizlemeler gerçekten var olan dosyalar.
 *
 * Kapak ayrı çiziliyor (detayın hero'su), o yüzden burada gösterilmiyor.
 */
export function PhotoGallery({ photos, onOpen }: { photos: string[]; onOpen: (index: number) => void }) {
  if (photos.length < 2) return null;
  const rest = photos.slice(1);

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
            onPress={() => onOpen(i + 1)}
            style={({ pressed }) => [styles.thumb, { opacity: pressed ? 0.75 : 1 }]}
          >
            <Image source={{ uri }} style={StyleSheet.absoluteFill} contentFit="cover" />
          </Pressable>
        ))}
      </ScrollView>
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
});
