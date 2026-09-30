import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Linking, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import type { IconName } from '../icons';
import { colors, gradients, shadow } from '../theme';
import { useAutoAdvance } from '../useAutoAdvance';
import { useOpenEvent } from '../useOpenEvent';
import type { Kicker, Slide } from '../vitrinSchema';
import { PhotoSlot } from './PhotoSlot';
import { PixelBadge, Txt } from './ui';

export { SLIDE_INTERVAL_MS } from '../useAutoAdvance';

const SIDE = 20;
const GAP = 12;
const HEIGHT = 190;

/**
 * Rozet ASCII yazıyor (tasarımın dili); ekran okuyucu ise doğru Türkçeyi
 * okumalı — "BUGUN" harf harf ya da yanlış telaffuzla okunurdu.
 */
const KICKER: Record<Kicker, { icon: IconName; spoken: string }> = {
  BUGUN: { icon: 'cal', spoken: 'Bugün' },
  CEKILIS: { icon: 'gift', spoken: 'Çekiliş' },
  DUYURU: { icon: 'star', spoken: 'Duyuru' },
};

/**
 * Ana sayfanın slider'ı.
 *
 * Kart genişliği ekran − 40 ve kaydırma `snapToInterval` ile: `pagingEnabled`
 * ekran genişliğinde sayfalıyor, 20px kenar boşluğuyla uyuşmuyor. Otomatik geçişin
 * kuralları `useAutoAdvance`'te.
 */
export function HomeSlider({ slides }: { slides: Slide[] }) {
  const { width } = useWindowDimensions();
  const cardWidth = width - SIDE * 2;
  const step = cardWidth + GAP;
  const router = useRouter();
  const openEvent = useOpenEvent();
  const count = slides.length;
  const { list, current, go, onScrollBeginDrag, onScrollEndDrag, onMomentumScrollEnd } =
    useAutoAdvance<Slide>(count, step);

  if (!count) return null;

  const open = (s: Slide) => {
    const t = s.target;
    if (t.type === 'event') openEvent(t.id);
    else if (t.type === 'announcement') router.navigate(`/duyuru/${t.id}`);
    else void Linking.openURL(t.url).catch(() => {});
  };

  return (
    <View style={styles.root}>
      <FlatList
        ref={list}
        data={slides}
        keyExtractor={(s) => s.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={step}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SIDE }}
        ItemSeparatorComponent={Separator}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item }) => <SlideCard slide={item} width={cardWidth} onPress={() => open(item)} />}
      />

      {count > 1 ? (
        <View style={styles.dots}>
          {slides.map((s, i) => (
            <Pressable
              key={s.id}
              onPress={() => go(i)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`${i + 1}. slayta git`}
              accessibilityState={{ selected: i === current }}
              style={[styles.dot, i === current && styles.dotActive]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

function Separator() {
  return <View style={{ width: GAP }} />;
}

function SlideCard({ slide, width, onPress }: { slide: Slide; width: number; onPress: () => void }) {
  const kicker = slide.kicker ? KICKER[slide.kicker] : null;
  const heading = kicker ? `${kicker.spoken}: ${slide.title}` : slide.title;
  const label = slide.meta ? `${heading}. ${slide.meta}` : heading;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={slide.target.type === 'url' ? 'link' : 'button'}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.card, { width, opacity: pressed ? 0.92 : 1 }]}
    >
      <PhotoSlot uri={slide.image} showLabel={false} style={styles.photo}>
        <LinearGradient colors={gradients.slideShade} locations={[0.35, 1]} style={StyleSheet.absoluteFill} />
        <View style={styles.caption}>
          {slide.kicker && kicker ? (
            <PixelBadge icon={kicker.icon} label={slide.kicker} bg={colors.blue500} fg={colors.white} />
          ) : null}
          <Txt
            weight="extrabold"
            size={18}
            color={colors.white}
            tracking={-0.3}
            numberOfLines={2}
            style={{ marginTop: 8 }}
          >
            {slide.title}
          </Txt>
          {slide.meta ? (
            <Txt size={12} color={colors.onNavy} numberOfLines={1} style={{ marginTop: 4 }}>
              {slide.meta}
            </Txt>
          ) : null}
        </View>
      </PhotoSlot>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { marginTop: 20 },
  // Gölge dışta: `overflow: hidden` (PhotoSlot'ta) iOS'ta gölgeyi keserdi.
  card: { height: HEIGHT, borderRadius: 16, backgroundColor: colors.navy900, ...shadow.card },
  photo: { flex: 1, borderRadius: 16 },
  caption: { position: 'absolute', left: 16, right: 16, bottom: 14 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.dotIdle },
  dotActive: { width: 20, backgroundColor: colors.blue500 },
});
