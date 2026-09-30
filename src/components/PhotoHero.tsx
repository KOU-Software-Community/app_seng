import { Image } from 'expo-image';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, gradients } from '../theme';
import { useAutoAdvance } from '../useAutoAdvance';
import { PhotoSlot } from './PhotoSlot';

type Props = {
  photos: string[];
  height: number;
  /** Dokunulan fotoğrafın sırası: görüntüleyici oradan açılıyor. */
  onOpen: (index: number) => void;
  /** Görüntüleyici açıkken kendiliğinden kaymıyor. */
  paused: boolean;
  /** Karartma, geri düğmesi, başlık: fotoğrafların üstünde, kaydırmayı kapatmadan. */
  children?: React.ReactNode;
};

/**
 * Etkinlik ekranının ana fotoğrafı: yüklenen fotoğraflar sayfa sayfa, kendiliğinden
 * kayıyor (kuralları `useAutoAdvance`'te). Dokunulan fotoğraf tam ekranda açılıyor.
 * Fotoğraf yoksa bugünkü yer tutucu.
 */
export function PhotoHero({ photos, height, onOpen, paused, children }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const n = photos.length;
  const { list, current, go, onScrollBeginDrag, onScrollEndDrag, onMomentumScrollEnd } =
    useAutoAdvance<string>(n, width, paused);

  if (!n) {
    return (
      <PhotoSlot label="Etkinlik görseli" gradient={gradients.hero} showLabel={false} style={{ height }}>
        {children}
      </PhotoSlot>
    );
  }

  return (
    <View style={{ height, backgroundColor: colors.navy900 }}>
      <FlatList
        ref={list}
        data={photos}
        keyExtractor={(uri, i) => `${i}-${uri}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item, index: i }) => (
          <Pressable
            onPress={() => onOpen(i)}
            accessibilityRole="imagebutton"
            accessibilityLabel={`Fotoğraf ${i + 1} / ${n}, büyüt`}
            style={{ width, height }}
          >
            <Image source={{ uri: item }} style={StyleSheet.absoluteFill} contentFit="cover" />
          </Pressable>
        )}
      />

      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {children}
      </View>

      {n > 1 ? (
        <View style={[styles.dots, { top: insets.top + 26 }]}>
          {photos.map((uri, i) => (
            <Pressable
              key={`${i}-${uri}`}
              onPress={() => go(i)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`${i + 1}. fotoğrafa git`}
              accessibilityState={{ selected: i === current }}
              style={[styles.dot, i === current && styles.dotActive]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  dots: { position: 'absolute', right: 20, flexDirection: 'row', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.dotIdle },
  dotActive: { width: 20, backgroundColor: colors.blue500 },
});
