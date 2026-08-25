import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconName } from '../icons';
import {
  colors,
  fonts,
  gradientDirection,
  gradients,
  radius,
  shadow,
  type GradientStops,
} from '../theme';
import { PixelIcon } from './Pixel';

/* -------------------------------------------------------------------------- */
/* Text                                                                        */
/* -------------------------------------------------------------------------- */

type Weight = keyof typeof fonts;

type TxtProps = TextProps & {
  weight?: Weight;
  size?: number;
  color?: string;
  /** Line height as a multiple of `size`. */
  leading?: number;
  tracking?: number;
};

/**
 * React Native does not synthesise font weights, so every weight maps to its own
 * family. Going through one component keeps that detail in a single place.
 */
export function Txt({
  weight = 'regular',
  size = 14,
  color = colors.text,
  leading,
  tracking,
  style,
  ...rest
}: TxtProps) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: fonts[weight],
          fontSize: size,
          color,
          ...(leading ? { lineHeight: Math.round(size * leading) } : null),
          ...(tracking !== undefined ? { letterSpacing: tracking } : null),
        },
        style,
      ]}
    />
  );
}

/** Press Start 2P runs large for its point size, so callers pass small numbers. */
export function PixelTxt({ size = 8, color = colors.blue500, style, ...rest }: TxtProps) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: fonts.pixel, fontSize: size, color, letterSpacing: 0.5 }, style]}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Badges + chips                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Pixel-font badge with a matching pixel glyph — the design's accent language for
 * "YENI", "CEKILIS", "SON GUN" and friends.
 */
export function PixelBadge({
  icon,
  label,
  bg,
  fg,
  size = 7,
  style,
}: {
  icon?: IconName;
  label: string;
  bg: string;
  fg: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          alignSelf: 'flex-start',
          backgroundColor: bg,
          paddingHorizontal: size + 1,
          paddingVertical: size - 1,
          borderRadius: 6,
        },
        style,
      ]}
    >
      {icon ? <PixelIcon name={icon} size={size + 2} color={fg} /> : null}
      <PixelTxt size={size} color={fg}>
        {label}
      </PixelTxt>
    </View>
  );
}

export function Tag({ label, style }: { label: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.blue100,
          paddingHorizontal: 11,
          paddingVertical: 7,
          borderRadius: radius.sm,
        },
        style,
      ]}
    >
      <Txt weight="semibold" size={12} color={colors.navy700}>
        {label}
      </Txt>
    </View>
  );
}

/** Rounded filter pill used by the archive category rail. */
export function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ pressed }) => ({
        borderWidth: 1.5,
        borderColor: active ? colors.blue500 : colors.border,
        backgroundColor: active ? colors.blue500 : colors.surface,
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 20,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Txt weight="semibold" size={13} color={active ? '#fff' : colors.muted}>
        {label}
      </Txt>
    </Pressable>
  );
}

/* -------------------------------------------------------------------------- */
/* Structure                                                                   */
/* -------------------------------------------------------------------------- */

/** The dashed rule that sits under every gradient header. */
export function DottedRule({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', height: 6, overflow: 'hidden' }, style]}>
      {Array.from({ length: 30 }).map((_, i) => (
        <View
          key={i}
          style={{
            width: 6,
            height: 6,
            marginRight: 8,
            backgroundColor: 'rgba(147,203,220,0.85)',
          }}
        />
      ))}
    </View>
  );
}

/**
 * Gradient page header with the rounded bottom corners the design uses. Adds the
 * device's top inset so content clears the notch on every handset.
 */
export function GradientHeader({
  gradient = gradients.section,
  children,
  bottomRadius = 22,
  style,
}: {
  gradient?: GradientStops;
  children: React.ReactNode;
  bottomRadius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={gradient}
      start={gradientDirection.diagonal.start}
      end={gradientDirection.diagonal.end}
      style={[
        {
          paddingTop: insets.top + 14,
          paddingHorizontal: 20,
          paddingBottom: 18,
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}

export function Card({
  children,
  style,
  padded = true,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.xl,
          ...(padded ? { padding: 14 } : null),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

/** Small rounded square holding a pixel glyph, used in fact rows and settings. */
export function IconTile({
  icon,
  size = 34,
  tint = colors.blue100,
  color = colors.navy700,
  glyph = 14,
}: {
  icon: IconName;
  size?: number;
  tint?: string;
  color?: string;
  glyph?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 9,
        backgroundColor: tint,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PixelIcon name={icon} size={glyph} color={color} />
    </View>
  );
}

export function SectionTitle({
  icon,
  children,
  trailing,
  style,
}: {
  icon: IconName;
  children: React.ReactNode;
  trailing?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 12,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <PixelIcon name={icon} size={14} color={colors.blue500} />
        <Txt weight="extrabold" size={17} color={colors.navy900} tracking={-0.3}>
          {children}
        </Txt>
      </View>
      {trailing}
    </View>
  );
}

/** Small pixel-font label that heads a settings or calendar group. */
export function GroupLabel({ children, style }: { children: string; style?: StyleProp<TextStyle> }) {
  return (
    <PixelTxt size={8} color={colors.blue500} style={[{ letterSpacing: 1 }, style]}>
      {children}
    </PixelTxt>
  );
}

/* -------------------------------------------------------------------------- */
/* Controls                                                                    */
/* -------------------------------------------------------------------------- */

export function Toggle({
  value,
  onValueChange,
  accessibilityLabel,
}: {
  value: boolean;
  onValueChange: (next: boolean) => void;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabel}
      onPress={() => onValueChange(!value)}
      hitSlop={8}
      style={{
        width: 50,
        height: 29,
        borderRadius: 16,
        backgroundColor: value ? colors.blue500 : colors.switchOff,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 3,
          left: value ? 24 : 3,
          width: 23,
          height: 23,
          borderRadius: 12,
          backgroundColor: '#fff',
          shadowColor: '#001B4A',
          shadowOpacity: 0.22,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      />
    </Pressable>
  );
}

export type SegmentedOption = { label: string; value: string };

/**
 * Segmented control. `onNavy` is the variant that sits inside a gradient header;
 * the default variant sits on a light surface.
 */
export function Segmented({
  options,
  value,
  onChange,
  onNavy = false,
  style,
}: {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  onNavy?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: onNavy ? 'rgba(255,255,255,0.12)' : colors.bg,
          borderRadius: 11,
          padding: 4,
        },
        style,
      ]}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 8,
              alignItems: 'center',
              backgroundColor: active ? (onNavy ? '#fff' : colors.blue500) : 'transparent',
            }}
          >
            <Txt
              weight="bold"
              size={13}
              color={active ? (onNavy ? colors.navy700 : '#fff') : onNavy ? colors.blue200 : colors.muted}
            >
              {opt.label}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Full-width gradient call to action. Falls back to a flat grey when disabled. */
export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  style,
  /** Padding for the filled area itself — the outer `style` is for layout only. */
  contentStyle,
  textStyle,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) {
  const content = (
    <Txt
      weight="bold"
      size={15.5}
      color={disabled ? colors.disabledFg : '#fff'}
      style={[{ textAlign: 'center' }, textStyle]}
    >
      {label}
    </Txt>
  );

  if (disabled) {
    return (
      <View
        accessibilityRole="button"
        accessibilityState={{ disabled: true }}
        style={[
          { backgroundColor: colors.disabledBg, borderRadius: 13, paddingVertical: 17 },
          contentStyle,
          style,
        ]}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        { borderRadius: 13, transform: [{ translateY: pressed ? 1 : 0 }] },
        shadow.cta,
        style,
      ]}
    >
      <LinearGradient
        colors={gradients.cta}
        start={gradientDirection.control.start}
        end={gradientDirection.control.end}
        style={[{ borderRadius: 13, paddingVertical: 17 }, contentStyle]}
      >
        {content}
      </LinearGradient>
    </Pressable>
  );
}

/** Translucent round button used on gradient headers and the detail hero. */
export function GlassButton({
  label,
  onPress,
  size = 38,
  bg = 'rgba(255,255,255,0.14)',
  accessibilityLabel,
  children,
}: {
  label?: string;
  onPress: () => void;
  size?: number;
  bg?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      hitSlop={8}
      style={({ pressed }) => ({
        width: size,
        height: size,
        borderRadius: 11,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.75 : 1,
      })}
    >
      {children ?? (
        <Txt size={17} color="#fff" style={{ marginTop: -2 }}>
          {label}
        </Txt>
      )}
    </Pressable>
  );
}

/**
 * Shared empty state — mascot, a heading, an explanation and an optional action.
 *
 * The club's calendar is empty between terms, so this is a normal screen rather
 * than an error: it says what is missing and what happens next, and never blames
 * the user or implies something broke.
 */
export function EmptyState({
  title,
  body,
  ctaLabel,
  onPress,
  style,
}: {
  title: string;
  body: string;
  ctaLabel?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[emptyStyles.root, style]}>
      <Image
        source={require('../../assets/brand/mascot.png')}
        style={emptyStyles.art}
        resizeMode="contain"
      />
      <Txt weight="extrabold" size={16} color={colors.navy900} style={{ marginTop: 20 }}>
        {title}
      </Txt>
      <Txt size={13.5} leading={1.6} color={colors.muted} style={emptyStyles.body}>
        {body}
      </Txt>

      {ctaLabel && onPress ? (
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          style={({ pressed }) => [emptyStyles.cta, pressed && { backgroundColor: colors.blue100 }]}
        >
          <Txt weight="bold" size={13.5} color={colors.blue500}>
            {ctaLabel}
          </Txt>
        </Pressable>
      ) : null}
    </View>
  );
}

const emptyStyles = StyleSheet.create({
  root: { paddingHorizontal: 40, paddingVertical: 56, alignItems: 'center' },
  art: { width: 132, height: 116, opacity: 0.5 },
  body: { marginTop: 8, textAlign: 'center' },
  cta: {
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: colors.blue500,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 11,
  },
});

/**
 * Shown by the event detail and registration routes when the id in the URL
 * matches nothing — a deep link to an event that has been removed, a stale push
 * notification, or simply no calendar yet.
 *
 * `useContent().getEvent` used to return the first event instead of undefined,
 * which meant those cases silently displayed the wrong event. This is what that
 * fallback was hiding.
 */
export function MissingEvent({ onBack }: { onBack: () => void }) {
  return (
    <View style={[styles.screen, { justifyContent: 'center' }]}>
      <EmptyState
        title="Etkinlik bulunamadı"
        body="Bu etkinlik kaldırılmış ya da bağlantı eskimiş olabilir. Yeni program açıklandığında takvimde görünecek."
        ctaLabel="Takvime dön"
        onPress={onBack}
      />
    </View>
  );
}

/**
 * Shown when Firestore could not be reached and the screen is therefore showing
 * whatever it already had.
 *
 * `useContent` produced `source`, `error` and `refresh` from the start and no
 * screen consumed any of them, so a failed fetch looked identical to an empty
 * calendar — and once the bundled events were removed, identical to a working
 * app with nothing scheduled. The user had no way to tell and no way to retry
 * short of killing the app.
 */
export function ContentNotice({
  onRetry,
  retrying,
  style,
}: {
  onRetry: () => void;
  retrying: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[noticeStyles.root, style]}>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Txt weight="bold" size={13} color={colors.navy900}>
          Güncel içeriğe ulaşılamadı
        </Txt>
        <Txt size={12} leading={1.45} color={colors.muted} style={{ marginTop: 2 }}>
          Bağlantını kontrol edip tekrar dene. Gördüklerin son bilinen hâli.
        </Txt>
      </View>

      <Pressable
        onPress={onRetry}
        disabled={retrying}
        accessibilityRole="button"
        accessibilityLabel="İçeriği yeniden yükle"
        style={({ pressed }) => [
          noticeStyles.retry,
          (pressed || retrying) && { opacity: 0.55 },
        ]}
      >
        <Txt weight="bold" size={12.5} color={colors.blue500}>
          {retrying ? 'Deneniyor…' : 'Yenile'}
        </Txt>
      </Pressable>
    </View>
  );
}

const noticeStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 14,
    padding: 14,
    borderRadius: radius.md,
    backgroundColor: colors.blue100,
    borderWidth: 1,
    borderColor: colors.blue200,
  },
  retry: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.blue500,
  },
});

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
