import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import type { IconName } from '../icons';
import { colors, gradients, shadow } from '../theme';
import { useOpenEvent } from '../useOpenEvent';
import type { Kicker, Slide } from '../vitrinSchema';
import { PhotoSlot } from './PhotoSlot';
import { PixelBadge, Txt } from './ui';

/** Otomatik geçiş aralığı. */
export const SLIDE_INTERVAL_MS = 4500;

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
 * ekran genişliğinde sayfalıyor, 20px kenar boşluğuyla uyuşmuyor.
 *
 * Otomatik geçiş dört koşulda duruyor: tek slayt, ekran odakta değil, kullanıcı
 * kaydırıyor, ya da "hareketi azalt" veya ekran okuyucu açık — kendi kendine
 * kayan içerik ekran okuyucuyla gezeni yerinden eder (WCAG 2.2.2).
 */
export function HomeSlider({ slides }: { slides: Slide[] }) {
  const { width } = useWindowDimensions();
  const cardWidth = width - SIDE * 2;
  const step = cardWidth + GAP;
  const list = useRef<FlatList<Slide>>(null);
  const router = useRouter();
  const openEvent = useOpenEvent();

  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  // Ayar okunana kadar durgun: ilk kareden kaymaya başlamasın.
  // ponytail: ayar yalnız açılışta okunuyor; uygulama açıkken değişirse bir sonraki açılışta geçerli.
  const [still, setStill] = useState(true);

  useEffect(() => {
    let alive = true;
    Promise.all([AccessibilityInfo.isReduceMotionEnabled(), AccessibilityInfo.isScreenReaderEnabled()])
      .then(([reduce, reader]) => {
        if (alive) setStill(reduce || reader);
      })
      .catch(() => {
        if (alive) setStill(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );

  const count = slides.length;
  // Yenileme listeyi kısaltırsa dizin dışarıda kalmasın.
  const current = count ? index % count : 0;

  const go = useCallback(
    (next: number) => {
      setIndex(next);
      list.current?.scrollToOffset({ offset: next * step, animated: true });
    },
    [step],
  );

  useEffect(() => {
    if (count < 2 || still || !focused || dragging) return;
    const timer = setTimeout(() => go((current + 1) % count), SLIDE_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [count, still, focused, dragging, current, go]);

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
        onScrollBeginDrag={() => setDragging(true)}
        onScrollEndDrag={() => setDragging(false)}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / step))}
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
