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
 * Kapak dâhil hepsi: hero kendiliğinden kaydığı için şerit, hangi fotoğrafların
 * olduğunu bir bakışta gösteren dizin. Tek fotoğrafta şerit yok; hero'ya dokunmak yeter.
 * Önizleme de kırpılmıyor (`contain`).
 */
export function PhotoGallery({ photos, onOpen }: { photos: string[]; onOpen: (index: number) => void }) {
  if (photos.length < 2) return null;

  return (
    <View style={styles.block}>
      <Txt weight="extrabold" size={16} color={colors.navy900} style={styles.title}>
        Fotoğraflar
      </Txt>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.strip}
      >
        {photos.map((uri, i) => (
          <Pressable
            key={`${i}-${uri}`}
            accessibilityRole="button"
            accessibilityLabel={`Fotoğraf ${i + 1}`}
            onPress={() => onOpen(i)}
            style={({ pressed }) => [styles.thumb, { opacity: pressed ? 0.75 : 1 }]}
          >
            <Image source={{ uri }} style={StyleSheet.absoluteFill} contentFit="contain" />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { paddingTop: 22 },
  // Şerit kenara kadar kayıyor, başlık sayfanın geri kalanıyla aynı hizada.
  title: { marginBottom: 10, paddingHorizontal: 20 },
  strip: { paddingHorizontal: 20, gap: 10 },
  thumb: {
    width: 132,
    height: 96,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.blue100,
  },
});
