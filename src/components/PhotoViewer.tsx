import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme';
import { GlassButton, PixelTxt } from './ui';
import { ZoomableImage } from './ZoomableImage';

type Props = {
  photos: string[];
  /** Açılacak fotoğraf; `null` kapalı. */
  index: number | null;
  onClose: () => void;
};

/**
 * Tam ekran galeri: parmakla sayfa sayfa kayıyor, iki parmak ve çift dokunmayla
 * yakınlaşıyor. Tuş yok; hero da alttaki şerit de bunu açıyor.
 *
 * Her açılış dokunulan fotoğraftan başlıyor: içerik `index`'e göre yeniden kuruluyor,
 * sayaç ve yakınlık kalmıyor.
 */
export function PhotoViewer({ photos, index, onClose }: Props) {
  // Kapanırken (index null) içerik son fotoğrafla solarak gidiyor.
  const [last, setLast] = useState(index ?? 0);
  if (index !== null && index !== last) setLast(index);

  return (
    <Modal
      visible={index !== null}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pages key={last} photos={photos} start={last} onClose={onClose} />
    </Modal>
  );
}

function Pages({ photos, start, onClose }: { photos: string[]; start: number; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [current, setCurrent] = useState(start);
  // Yakınken liste duruyor: tek parmak görseli gezdiriyor, sayfayı değiştirmiyor.
  const [zoomed, setZoomed] = useState(false);

  return (
    // Modal uygulamanın kök görünümünün dışında: hareketler kendi kökünü istiyor.
    <GestureHandlerRootView style={styles.viewer}>
      <FlatList
        testID="foto-liste"
        data={photos}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={start}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        scrollEnabled={!zoomed}
        keyExtractor={(uri, i) => `${i}-${uri}`}
        onMomentumScrollEnd={(e) => setCurrent(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item, index: i }) => (
          <ZoomableImage
            uri={item}
            width={width}
            height={height}
            onZoomChange={setZoomed}
            accessibilityLabel={`Fotoğraf ${i + 1} / ${photos.length}`}
            testID={`foto-${i}`}
          />
        )}
      />

      <View style={[styles.bar, { paddingTop: insets.top + 12 }]}>
        <GlassButton
          label="✕"
          accessibilityLabel="Kapat"
          onPress={onClose}
          size={36}
          bg="rgba(255,255,255,0.12)"
        />
        <View style={{ flex: 1 }} />
        <PixelTxt size={8} color={colors.blue200}>
          {`${current + 1} / ${photos.length}`}
        </PixelTxt>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  viewer: { flex: 1, backgroundColor: 'rgba(2,10,26,0.94)' },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
});
