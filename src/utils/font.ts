const Weight = {
  BOLD: 700,
  MEDIUM: 500,
  REGULAR: 400,
} as const;

const FontSize = {
  SIZE_HEAD_01: 32,
  SIZE_HEAD_02: 24,
  SIZE_TITLE_01: 22,
  SIZE_TITLE_02: 20,
  SIZE_LARGE: 18,
  SIZE_BODY_01: 16,
  SIZE_BODY_02: 14,
  SIZE_CAPTION: 12,
} as const;

const Align = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

const FontType = {
  BOLD_HEAD_01: 'BOLD_HEAD_01',
  BOLD_HEAD_02: 'BOLD_HEAD_02',
  BOLD_TITLE_01: 'BOLD_TITLE_01',
  BOLD_TITLE_02: 'BOLD_TITLE_02',
  BOLD_LARGE: 'BOLD_LARGE',
  BOLD_BODY_01: 'BOLD_BODY_01',
  BOLD_BODY_02: 'BOLD_BODY_02',
  BOLD_CAPTION: 'BOLD_CAPTION',

  MEDIUM_LARGE: 'MEDIUM_LARGE',
  MEDIUM_BODY_01: 'MEDIUM_BODY_01',
  MEDIUM_BODY_02: 'MEDIUM_BODY_02',
  MEDIUM_CAPTION: 'MEDIUM_CAPTION',

  REGULAR_HEAD_01: 'REGULAR_HEAD_01',
  REGULAR_HEAD_02: 'REGULAR_HEAD_02',
  REGULAR_TITLE_01: 'REGULAR_TITLE_01',
  REGULAR_TITLE_02: 'REGULAR_TITLE_02',
  REGULAR_LARGE: 'REGULAR_LARGE',
  REGULAR_BODY_01: 'REGULAR_BODY_01',
  REGULAR_BODY_02: 'REGULAR_BODY_02',
  REGULAR_CAPTION: 'REGULAR_CAPTION',
} as const;

type Align = typeof Align[keyof typeof Align];
type FontType = typeof FontType[keyof typeof FontType];
type FontStyle = { size: number; weight: number };

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Font {
  export const getStyle = (font: FontType): FontStyle => {
    return {
      weight: getWeight(font),
      size: getSize(font),
    };
  };

  const getSize = (font: FontType) => {
    switch (font) {
      case FontType.BOLD_HEAD_01:
      case FontType.REGULAR_HEAD_01: {
        return FontSize.SIZE_HEAD_01;
      }

      case FontType.BOLD_HEAD_02:
      case FontType.REGULAR_HEAD_02: {
        return FontSize.SIZE_HEAD_02;
      }

      case FontType.BOLD_TITLE_01:
      case FontType.REGULAR_TITLE_01: {
        return FontSize.SIZE_TITLE_01;
      }

      case FontType.BOLD_TITLE_02:
      case FontType.REGULAR_TITLE_02: {
        return FontSize.SIZE_TITLE_02;
      }

      case FontType.BOLD_LARGE:
      case FontType.MEDIUM_LARGE:
      case FontType.REGULAR_LARGE: {
        return FontSize.SIZE_LARGE;
      }

      case FontType.BOLD_BODY_01:
      case FontType.MEDIUM_BODY_01:
      case FontType.REGULAR_BODY_01: {
        return FontSize.SIZE_BODY_01;
      }

      case FontType.BOLD_BODY_02:
      case FontType.MEDIUM_BODY_02:
      case FontType.REGULAR_BODY_02: {
        return FontSize.SIZE_BODY_02;
      }

      case FontType.BOLD_CAPTION:
      case FontType.MEDIUM_CAPTION:
      case FontType.REGULAR_CAPTION: {
        return FontSize.SIZE_CAPTION;
      }
    }

    return FontSize.SIZE_BODY_02;
  };

  const getWeight = (font: FontType) => {
    switch (font) {
      case FontType.BOLD_HEAD_01:
      case FontType.BOLD_HEAD_02:
      case FontType.BOLD_TITLE_01:
      case FontType.BOLD_TITLE_02:
      case FontType.BOLD_LARGE:
      case FontType.BOLD_BODY_01:
      case FontType.BOLD_BODY_02:
      case FontType.BOLD_CAPTION: {
        return Weight.BOLD;
      }
      case FontType.MEDIUM_LARGE:
      case FontType.MEDIUM_BODY_01:
      case FontType.MEDIUM_BODY_02:
      case FontType.MEDIUM_CAPTION: {
        return Weight.MEDIUM;
      }
      case FontType.REGULAR_HEAD_01:
      case FontType.REGULAR_HEAD_02:
      case FontType.REGULAR_TITLE_01:
      case FontType.REGULAR_TITLE_02:
      case FontType.REGULAR_LARGE:
      case FontType.REGULAR_BODY_01:
      case FontType.REGULAR_BODY_02:
      case FontType.REGULAR_CAPTION: {
        return Weight.REGULAR;
      }
    }
    return Weight.REGULAR;
  };

  export const getFamily = (weight: number) => {
    switch (weight) {
      case Weight.BOLD: {
        return 'Pretendard-Bold';
      }
      case Weight.MEDIUM: {
        return 'Pretendard-Medium';
      }
      case Weight.REGULAR: {
        return 'Pretendard-Regular';
      }
    }
    return 'Pretendard-Regular';
  };
}

export { Font, FontType, Align };
