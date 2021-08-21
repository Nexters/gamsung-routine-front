import React, { ComponentProps } from 'react';
import { SvgXml } from 'react-native-svg';

import ADD from '~/assets/icons/icon_add.svg';
import ARROW_DOWN from '~/assets/icons/icon_arrow_down.svg';
import ARROW_LEFT from '~/assets/icons/icon_arrow_left.svg';
import ARROW_LEFT_WHITE from '~/assets/icons/icon_arrow_left_white.svg';
import ARROW_RIGHT from '~/assets/icons/icon_arrow_right.svg';
import ARROW_UP from '~/assets/icons/icon_arrow_up.svg';
import CANCEL from '~/assets/icons/icon_cancel.svg';
import CHECK from '~/assets/icons/icon_check.svg';
import CONFIRM from '~/assets/icons/icon_confirm.svg';
import CROWN from '~/assets/icons/icon_crown.svg';
import CROWN_GRAY from '~/assets/icons/icon_crown_gray.svg';
import DROP from '~/assets/icons/icon_drop.svg';
import FULL_ARROW_DOWN from '~/assets/icons/icon_full_arrow_down.svg';
import KAKAO from '~/assets/icons/icon_kakao.svg';
import MORE from '~/assets/icons/icon_more.svg';
import PLUS from '~/assets/icons/icon_plus.svg';
import SETTING from '~/assets/icons/icon_setting.svg';
import TAKE from '~/assets/icons/icon_take.svg';

export type IconType = keyof typeof icon;

const icon = {
  DROP,
  TAKE,
  CROWN,
  CROWN_GRAY,
  ARROW_UP,
  ARROW_DOWN,
  ARROW_RIGHT,
  MORE,
  FULL_ARROW_DOWN,
  ARROW_LEFT,
  ARROW_LEFT_WHITE,
  ADD,
  PLUS,
  CONFIRM,
  SETTING,
  KAKAO,
  CANCEL,
  CHECK,
};
interface Props extends Omit<ComponentProps<typeof SvgXml>, 'xml'> {
  type: IconType;
}
const Icon = ({ type, ...props }: Props) => {
  return <SvgXml xml={icon[type]} {...props} />;
};

export default Icon;
