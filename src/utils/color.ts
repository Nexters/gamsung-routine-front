const GrayColor = {
  GRAY10: '#F2F2F4',
  GRAY20: '#E4E5E9',
  GRAY30: '#D7D9DD',
  GRAY40: '#C8CACF',
  GRAY50: '#B6B8BC',
  GRAY60: '#9B9EA5',
  GRAY70: '#5B5D61',
  GRAY80: '#3F4042',
  GRAY90: '#333436',
  GRAY100: '#292A2C',
} as const;

const PrimaryColor = {
  PURPLE10: '#EEECFC',
  PURPLE20: '#CBC5F7',
  PURPLE30: '#A89EF2',
  PURPLE40: '#7D6BFF',
  PURPLE50: '#5F4BF2',
  PURPLE60: '#513DE5',
  PURPLE70: '#3A2E8E',
  PURPLE80: '#2C2469',
  PURPLE90: '#282352',
  PURPLE100: '#25204D',
} as const;

const SubColor = {
  RED50: '#ED5742',
  RED60: '#E82D13',
  YELLOW60: '#FFBD13',
  YELLOW: '#FFCA42',
  SKYBLUE: '#89B1FF',
  RED: '#FF7B68',
  GREEN: '#52C39B',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
} as const;

const BackgroundColor = {
  DEPTH1_L: SubColor.WHITE,
  DEPTH2_L: GrayColor.GRAY10,
  DEPTH1_D: GrayColor.GRAY90,
  DEPTH2_D: GrayColor.GRAY100,
} as const;

const TextColor = {
  PRIMARY_L: GrayColor.GRAY90,
  PRIMARY_D: SubColor.WHITE,
  SECONDARY_L: GrayColor.GRAY70,
  SECONDARY_D: GrayColor.GRAY20,
  INACTIVE_L: GrayColor.GRAY50,
  HIGHLIGHT: PrimaryColor.PURPLE60,
} as const;

const BorderColor = {
  DEPTH1_L: GrayColor.GRAY10,
  DEPTH2_L: GrayColor.GRAY20,
  DEPTH3_L: GrayColor.GRAY50,
  WHITE: SubColor.WHITE,
} as const;

const IconColor = {
  PRIMARY_L: GrayColor.GRAY90,
  PRIMARY_D: SubColor.WHITE,
  SECONDARY_L: GrayColor.GRAY70,
  SECONDARY_D: GrayColor.GRAY20,
  TERTIARY_D: GrayColor.GRAY60,
} as const;

const ActionColor = {
  ACTIVE: PrimaryColor.PURPLE50,
  HOVER: PrimaryColor.PURPLE10,
  INACTIVE: PrimaryColor.PURPLE60,
  BG: PrimaryColor.PURPLE10,
} as const;

const CalenderColor = {
  FILL_FOCUS: PrimaryColor.PURPLE50,
  UNFILL_FOCUS: PrimaryColor.PURPLE10,
  FILL: GrayColor.GRAY70,
  UNFILL: GrayColor.GRAY90,
} as const;

const SurfaceColor = {
  DEPTH1_D: GrayColor.GRAY90,
  DEPTH2_D: GrayColor.GRAY70,
  DEPTH1_L: SubColor.WHITE,
  DEPTH2_L: GrayColor.GRAY10,
  DEPTH3_L: GrayColor.GRAY20,
  INACTIVE_L: GrayColor.GRAY50,
} as const;

const SystemColor = {
  ALERT: SubColor.RED50,
} as const;

const MonsterColor = {
  FILL: PrimaryColor.PURPLE40,
  UNFILL: GrayColor.GRAY40,
} as const;

const GraphicColor = {
  YELLOW: SubColor.YELLOW,
  SKYBLUE: SubColor.SKYBLUE,
  RED: SubColor.RED,
  PURPLE: PrimaryColor.PURPLE40,
  GREEN: SubColor.GREEN,
} as const;

type GrayColor = typeof GrayColor[keyof typeof GrayColor];
type PrimaryColor = typeof PrimaryColor[keyof typeof PrimaryColor];
type SubColor = typeof SubColor[keyof typeof SubColor];

type BackgroundColor = typeof BackgroundColor[keyof typeof BackgroundColor];
type TextColor = typeof TextColor[keyof typeof TextColor];
type BorderColor = typeof BorderColor[keyof typeof BorderColor];
type IconColor = typeof IconColor[keyof typeof IconColor];
type ActionColor = typeof ActionColor[keyof typeof ActionColor];
type CalenderColor = typeof CalenderColor[keyof typeof CalenderColor];
type SurfaceColor = typeof SurfaceColor[keyof typeof SurfaceColor];
type SystemColor = typeof SystemColor[keyof typeof SystemColor];
type MonsterColor = typeof MonsterColor[keyof typeof MonsterColor];
type GraphicColor = typeof GraphicColor[keyof typeof GraphicColor];

export {
  BackgroundColor,
  TextColor,
  BorderColor,
  IconColor,
  ActionColor,
  CalenderColor,
  SurfaceColor,
  SystemColor,
  MonsterColor,
  GraphicColor,
};
