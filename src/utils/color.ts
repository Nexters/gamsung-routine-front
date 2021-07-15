const BasicColor = {
  RED: '#E82D13',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  YELLOW: '#FFBD13',

  PURPLE10: '#EEECFC',
  PURPLE20: '#DCD8FA',
  PURPLE30: '#CBC5F7',
  PURPLE40: '#A89EF2',
  PURPLE50: '#7464EA',
  PURPLE60: '#513DE5',
  PURPLE70: '#4937CE',
  PURPLE80: '#4131B7',
  PURPLE90: '#312589',
  PURPLE100: '#20185C',

  GRAY10: '#F2F2F4',
  GRAY30: '#E4E5E9',
  GRAY20: '#D7D9DD',
  GRAY40: '#C8CACF',
  GRAY50: '#B6B8BC',
  GRAY60: '#9B9EA5',
  GRAY70: '#6B6D72',
  GRAY80: '#4B4C4F',
  GRAY90: '#333436',
  GRAY100: '#0C0D0E',
} as const;

const BackgroundColor = {
  PRIMARY: BasicColor.WHITE,
  SECONDARY: BasicColor.GRAY90,
  ELEVATED: BasicColor.GRAY10,
} as const;

const TextColor = {
  PRIMARY: BasicColor.GRAY90,
  SECONDARY: BasicColor.GRAY70,
  DISABLE: BasicColor.GRAY30,
  ELEVATED: BasicColor.GRAY10,
  MAIN: BasicColor.PURPLE60,
  WHITE: BasicColor.WHITE,
  RED: BasicColor.RED,
} as const;

const PressedColor = {
  PRESSED: alpha(BasicColor.GRAY100, 10), // 가이드 상 아직 정해지지 않은 칼라명
} as const;

const DimColor = {
  DIM: alpha(BasicColor.GRAY100, 60), // 가이드 상 아직 정해지지 않은 칼라명
} as const;

/**
 *
 * @param color
 * @param opacity 0 ~ 100
 */
function alpha(color: BasicColor, opacity: number) {
  const alpha = Math.round(opacity * 2.55).toString(16);
  return `${color}${alpha}`;
}

type BasicColor = typeof BasicColor[keyof typeof BasicColor];

type BackgroundColor = typeof BackgroundColor[keyof typeof BackgroundColor];
type TextColor = typeof TextColor[keyof typeof TextColor];
type PressedColor = typeof PressedColor[keyof typeof PressedColor];
type DimColor = typeof DimColor[keyof typeof DimColor];

export { BackgroundColor, TextColor, PressedColor, DimColor };
