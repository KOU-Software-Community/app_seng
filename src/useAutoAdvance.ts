import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, type FlatList, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

/** Otomatik geçiş aralığı. */
export const SLIDE_INTERVAL_MS = 4500;

/**
 * Kendi kendine kayan yatay liste: ana sayfanın slider'ı ve etkinlik ekranının
 * fotoğraf hero'su. `step` bir sayfanın kaydırma boyu.
 *
 * Otomatik geçiş beş koşulda duruyor: tek sayfa, ekran odakta değil, kullanıcı
 * kaydırıyor, `paused` (hero'nun açtığı görüntüleyici önde), ya da "hareketi azalt"
 * veya ekran okuyucu açık — kendi kendine kayan içerik ekran okuyucuyla gezeni
 * yerinden eder (WCAG 2.2.2).
 */
export function useAutoAdvance<T>(count: number, step: number, paused = false) {
  const list = useRef<FlatList<T>>(null);
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

  // Yenileme listeyi kısaltırsa kaydırma son sayfaya dayanıyor; nokta da orada.
  const current = count ? Math.min(index, count - 1) : 0;

  const go = useCallback(
    (next: number) => {
      setIndex(next);
      list.current?.scrollToOffset({ offset: next * step, animated: true });
    },
    [step],
  );

  useEffect(() => {
    if (count < 2 || still || !focused || dragging || paused) return;
    const timer = setTimeout(() => go((current + 1) % count), SLIDE_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [count, still, focused, dragging, paused, current, go]);

  return {
    list,
    current,
    go,
    onScrollBeginDrag: () => setDragging(true),
    onScrollEndDrag: () => setDragging(false),
    onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) =>
      setIndex(Math.round(e.nativeEvent.contentOffset.x / step)),
  };
}
