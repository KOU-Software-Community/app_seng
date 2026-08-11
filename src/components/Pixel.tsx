import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { ICON, IconName, PIXEL_ART_VIEWBOX, PixelArtLayer } from '../icons';

type PixelIconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

/** An 8×8 pixel glyph. Sizes cleanly because every path sits on whole units. */
export function PixelIcon({ name, size = 14, color = '#0389BC' }: PixelIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 8 8">
      <Path d={ICON[name]} fill={color} />
    </Svg>
  );
}

/** Multi-colour pixel scene, used for the onboarding illustrations. */
export function PixelArt({
  layers,
  width,
  height,
}: {
  layers: PixelArtLayer[];
  width: number;
  height: number;
}) {
  return (
    <Svg width={width} height={height} viewBox={PIXEL_ART_VIEWBOX}>
      {layers.map((layer, i) => (
        <Path key={i} d={layer.d} fill={layer.fill} />
      ))}
    </Svg>
  );
}

/**
 * A square that blinks on a 4-step cycle, matching the canvas `pxspin` keyframes:
 * each square sits at 25% opacity and flashes to full for a quarter of the loop.
 */
function BlinkSquare({
  size,
  color,
  delay,
  duration,
}: {
  size: number;
  color: string;
  delay: number;
  duration: number;
}) {
  const opacity = useRef(new Animated.Value(0.25)).current;

  useEffect(() => {
    const quarter = duration / 4;
    // `steps(1)` in CSS means no easing between states — hence duration 0 hops.
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, { toValue: 1, duration: 0, useNativeDriver: true }),
        Animated.delay(quarter),
        Animated.timing(opacity, { toValue: 0.25, duration: 0, useNativeDriver: true }),
        Animated.delay(duration - quarter - delay),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, delay, duration]);

  return <Animated.View style={{ width: size, height: size, backgroundColor: color, opacity }} />;
}

/**
 * The chasing pixel squares used on the splash, the loading overlay and the
 * confirmation screen.
 */
export function PixelLoader({
  size = 10,
  gap = 5,
  duration = 900,
  colors = ['#0389BC', '#0389BC', '#0389BC', '#0389BC'],
  style,
}: {
  size?: number;
  gap?: number;
  duration?: number;
  colors?: string[];
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ flexDirection: 'row', gap }, style]}>
      {colors.map((color, i) => (
        <BlinkSquare
          key={i}
          size={size}
          color={color}
          delay={(duration / colors.length) * i}
          duration={duration}
        />
      ))}
    </View>
  );
}
