/**
 * Design tokens ported from the KOÜ Yazılım Kulübü design canvas.
 *
 * The five brand colours are the palette the design doc pins down; everything
 * under `neutral` is the supporting scale the screens already used.
 */

export const palette = {
  /** Zemin / header */
  navy900: '#001B4A',
  /** İkincil yüzey */
  navy700: '#014576',
  /** Vurgu / CTA */
  blue500: '#0389BC',
  /** Badge / ikincil */
  blue200: '#93CBDC',
  /** Kart zemini */
  blue100: '#D2E7EC',
} as const;

export const colors = {
  ...palette,

  bg: '#F4F9FB',
  surface: '#FFFFFF',
  border: '#E4EEF3',
  borderSoft: '#EEF4F7',

  text: '#0B1F3A',
  textBody: '#41586B',
  muted: '#5B7185',
  faint: '#8FA3B5',

  switchOff: '#CBD9E1',
  disabledBg: '#DCE7ED',
  disabledFg: '#95A9B6',
  dotIdle: '#C8DCE6',

  danger: '#C2453E',
  dangerBorder: '#E2A6A2',

  onNavy: '#D2E7EC',
} as const;

/**
 * `expo-linear-gradient` requires at least two stops, so gradients are typed as a
 * non-empty tuple rather than a plain array.
 */
export type GradientStops = readonly [string, string, ...string[]];

/**
 * CSS `linear-gradient` stops in the design run past 100% (e.g. `#0389BC 135%`),
 * so the colour actually visible at the bottom edge is an interpolation rather
 * than the literal last stop. These end colours are pre-solved for that, which
 * keeps the React Native gradients matching the canvas.
 */
export const gradients = {
  /** 160deg · #001B4A → #014576 58% → #0389BC 128% */
  splash: ['#001B4A', '#014576', '#026EA0'],
  /** 160deg · #001B4A → #014576 62% → #0389BC 130% */
  onboarding: ['#001B4A', '#014576', '#026B9D'],
  /** 140deg · #001B4A → #014576 65% → #0389BC 135% */
  home: ['#001B4A', '#014576', '#026799'],
  /** 140deg · #001B4A → #014576 80% → #0389BC 140% */
  calendar: ['#001B4A', '#014576', '#025C8D'],
  /** 140deg · #001B4A → #014576 85% → #0389BC 150% */
  section: ['#001B4A', '#014576', '#025586'],
  /** 140deg · #001B4A → #014576 90% (flat past the last stop) */
  form: ['#001B4A', '#014576', '#014576'],
  /** 165deg · #001B4A → #014576 70% → #0389BC 140% */
  success: ['#001B4A', '#014576', '#026294'],
  /** 140deg · #001B4A → #014576 70% → #0389BC 150% */
  featured: ['#001B4A', '#014576', '#025F90'],

  /** 140deg · two-stop hero + placeholder fills */
  hero: ['#001B4A', '#0389BC'],
  photo: ['#014576', '#93CBDC'],
  lightbox: ['#014576', '#0389BC'],

  /** 135deg · primary CTA + avatar chips */
  cta: ['#014576', '#0389BC'],
  masterCard: ['#001B4A', '#0389BC'],
} as const;

/**
 * `start`/`end` pairs approximating the CSS angles above. React Native maps these
 * to the box corners, so wide headers read as a top-left → bottom-right sweep and
 * full-height screens stay closer to vertical.
 */
export const gradientDirection = {
  /** ~140deg on a wide box */
  diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  /** ~160-165deg on a full-height box */
  vertical: { start: { x: 0, y: 0 }, end: { x: 0.35, y: 1 } },
  /** 135deg on small controls */
  control: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
} as const;

/**
 * Plus Jakarta Sans for everything readable. React Native does not synthesise
 * weights, so each weight is its own family name.
 */
export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
  /**
   * Pixel accent. Design rule: badge labels, empty states, loading and the
   * splash wordmark only — never body copy, forms or buttons.
   */
  pixel: 'PressStart2P_400Regular',
} as const;

export const radius = {
  xs: 5,
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  pill: 999,
} as const;

/** Spacing steps are multiples of 4, as specified in the handoff notes. */
export const spacing = (n: number) => n * 4;

export const shadow = {
  card: {
    shadowColor: '#001B4A',
    shadowOpacity: 0.07,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  featured: {
    shadowColor: '#001B4A',
    shadowOpacity: 0.13,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  cta: {
    shadowColor: '#0389BC',
    shadowOpacity: 0.3,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
} as const;
