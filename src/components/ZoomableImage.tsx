import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

/** İki parmakla en fazla bu kadar yakınlaşılıyor. */
export const MAX_SCALE = 4;
/** Çift dokunmanın götürdüğü ölçek; ikinci çift dokunma 1×'e döndürüyor. */
export const DOUBLE_TAP_SCALE = 2.5;

/**
 * Yakın görselin bir eksendeki kaydırması, kenarı kadrajın içine girmeyecek kadar.
 *
 * `content` görselin kadrajdaki boyu (`contain` boşlukları hariç), `frame` kadrajın
 * kendisi. Büyütülmüş görsel kadrajdan kısaysa o eksende kaydırma yok, görsel ortada.
 */
export function clampOffset(offset: number, scale: number, content: number, frame = content): number {
  'worklet';
  const limit = Math.max(0, (content * scale - frame) / 2);
  return Math.min(limit, Math.max(-limit, offset));
}

/**
 * Fotoğrafın çevresindeki ölü bant (pt): buradaki dokunuş kapatmıyor, yani kenara yakın
 * ıskalamalar görüntüleyiciyi kapatmıyor. Cihazda dar ya da geniş gelirse bu sayı değişir.
 */
export const BACKDROP_MARGIN = 24;

/**
 * Dokunuş fotoğrafın görünen dikdörtgeninin (kadrajda ortalanmış `content`) en az
 * `margin` kadar dışında mı — soluk alanda mı.
 *
 * `margin`'in varsayılanı yok: worklet'in varsayılan parametresi UI iş parçacığında
 * modülün sabitini görmüyor (`__closure` gövdede açılıyor), dokunuş uygulamayı kapatıyordu.
 */
export function isBackdropTap(
  x: number,
  y: number,
  frameW: number,
  frameH: number,
  contentW: number,
  contentH: number,
  margin: number,
): boolean {
  'worklet';
  const left = (frameW - contentW) / 2 - margin;
  const top = (frameH - contentH) / 2 - margin;
  return x < left || x > frameW - left || y < top || y > frameH - top;
}

type Props = {
  uri: string;
  width: number;
  height: number;
  /** Görüntüleyici yakınken sayfa kaydırmasını kapatıyor: sürükleme görseli gezdirsin. */
  onZoomChange: (zoomed: boolean) => void;
  accessibilityLabel: string;
  /** Hareket kimlikleri bundan türüyor: `-pinch`, `-pan`, `-doubleTap`, `-tap`. */
  testID: string;
  /**
   * Fotoğrafın dışındaki soluk alana tek, temiz dokunuş (1×'te, `BACKDROP_MARGIN`
   * dışında): görüntüleyici kapanıyor.
   */
  onBackdropPress?: () => void;
};

/**
 * Tam ekran galerinin tek sayfası: iki parmakla 1–`MAX_SCALE`× yakınlaşma, yakınken
 * tek parmakla gezinme, çift dokunmayla 1× ↔ `DOUBLE_TAP_SCALE`×.
 *
 * ponytail: yakınlaşma görselin ortasından, parmakların arasından değil; cihazda
 * yetmezse `focalX/Y` ile odak noktası hesabı eklenir.
 */
export function ZoomableImage({
  uri,
  width,
  height,
  onZoomChange,
  accessibilityLabel,
  testID,
  onBackdropPress,
}: Props) {
  // Görselin kadrajdaki boyu en-boy oranından; oran yüklenene dek kadrajın kendisi.
  const [aspect, setAspect] = useState(0);
  const cw = aspect ? Math.min(width, height * aspect) : width;
  const ch = aspect ? Math.min(height, width / aspect) : height;
  // Sürükleme yalnız yakınken açık; kapalıyken yatay kaydırma sayfayı değiştiriyor.
  const [zoomed, setZoomed] = useState(false);

  const scale = useSharedValue(1);
  const saved = useSharedValue(1); // son hareketin bıraktığı ölçek
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const report = (next: boolean) => {
    setZoomed(next);
    onZoomChange(next);
  };

  // Ölçeği oturtur, kaydırmayı yeni sınıra çeker, yakınlığı bildirir.
  const settle = (next: number) => {
    'worklet';
    saved.value = next;
    scale.value = withTiming(next);
    x.value = withTiming(clampOffset(x.value, next, cw, width));
    y.value = withTiming(clampOffset(y.value, next, ch, height));
    scheduleOnRN(report, next > 1);
  };

  const pinch = Gesture.Pinch()
    .withTestId(`${testID}-pinch`)
    // İkinci parmak iner inmez liste dursun. Android'de yatay liste, iki parmak
    // yakınlaşma sayılacak kadar açılmadan (≈24 dp) ilk parmağın 8 dp kaymasıyla
    // dokunmayı alıyor ve bu hareketi iptal ediyor.
    .onTouchesDown((e) => {
      if (e.numberOfTouches >= 2) scheduleOnRN(report, true);
    })
    .onUpdate((e) => {
      scale.value = Math.min(MAX_SCALE, Math.max(1, saved.value * e.scale));
    })
    .onEnd((e) => {
      // Son ölçek bitiş olayından: tek güncellemeli kısa bir hareket de sayılıyor.
      const next = Math.min(MAX_SCALE, Math.max(1, saved.value * e.scale));
      settle(next <= 1.01 ? 1 : next);
    })
    // Yakınlaşmadan biten ya da iptal edilen hareket kilidi geri veriyor.
    .onFinalize(() => {
      scheduleOnRN(report, saved.value > 1);
    });

  const pan = Gesture.Pan()
    .withTestId(`${testID}-pan`)
    .enabled(zoomed)
    .onStart(() => {
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((e) => {
      x.value = clampOffset(startX.value + e.translationX, scale.value, cw, width);
      y.value = clampOffset(startY.value + e.translationY, scale.value, ch, height);
    });

  const doubleTap = Gesture.Tap()
    .withTestId(`${testID}-doubleTap`)
    .numberOfTaps(2)
    .onStart(() => {
      settle(saved.value > 1 ? 1 : DOUBLE_TAP_SCALE);
    });

  // Kapatma: 10 pt'den az kayan, kısa (varsayılan 500 ms) tek dokunuş. Yakınken kapalı:
  // görsel ekranı kaplıyor, dokunuş gezinme.
  const backdrop = () => onBackdropPress?.();
  const tap = Gesture.Tap()
    .withTestId(`${testID}-tap`)
    .enabled(onBackdropPress !== undefined && !zoomed)
    .maxDistance(10)
    .onEnd((e, success) => {
      if (success && saved.value <= 1 && isBackdropTap(e.x, e.y, width, height, cw, ch, BACKDROP_MARGIN)) {
        scheduleOnRN(backdrop);
      }
    });

  // Race: çift dokunma varsayılanda parmak kaymasıyla düşmüyor (maxDist yok);
  // Exclusive'de iki parmak ve sürükleme onun 500 ms'lik süresini beklerdi. Tek
  // dokunuş ise çift dokunmanın düşmesini bekliyor (Exclusive): ikinci dokunuş
  // yakınlaştırsın, kapatmasın.
  const gesture = Gesture.Race(Gesture.Exclusive(doubleTap, tap), Gesture.Simultaneous(pinch, pan));

  // Uzaklaşırken kaydırma da sınıra çekiliyor: kenar hareket bitene dek görünmesin.
  const moved = useAnimatedStyle(() => ({
    transform: [
      { translateX: clampOffset(x.value, scale.value, cw, width) },
      { translateY: clampOffset(y.value, scale.value, ch, height) },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel}
        style={{ width, height, overflow: 'hidden' }}
      >
        <Animated.View style={[StyleSheet.absoluteFill, moved]}>
          <Image
            source={{ uri }}
            style={StyleSheet.absoluteFill}
            contentFit="contain"
            onLoad={(e) => {
              if (e.source.width && e.source.height) setAspect(e.source.width / e.source.height);
            }}
          />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}
