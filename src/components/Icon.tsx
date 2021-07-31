import React from 'react';
import { SvgXml } from 'react-native-svg';

import ADD from '~/assets/icons/icon_add.svg';
import ARROW_DOWN from '~/assets/icons/icon_arrow_down.svg';
import ARROW_LEFT from '~/assets/icons/icon_arrow_left.svg';
import ARROW_UP from '~/assets/icons/icon_arrow_up.svg';
import CROWN from '~/assets/icons/icon_crown.svg';
import CROWN_GRAY from '~/assets/icons/icon_crown_gray.svg';
import DROP from '~/assets/icons/icon_drop.svg';
import FULL_ARROW_DOWN from '~/assets/icons/icon_full_arrow_down.svg';
import MORE from '~/assets/icons/icon_more.svg';
import PLUS from '~/assets/icons/icon_plus.svg';
import TAKE from '~/assets/icons/icon_take.svg';

export type IconType = keyof typeof icon;

const icon = {
  DROP,
  TAKE,
  CROWN,
  CROWN_GRAY,
  ARROW_UP,
  ARROW_DOWN,
  MORE,
  FULL_ARROW_DOWN,
  ARROW_LEFT,
  ADD,
  PLUS,
};
interface Props {
  type: IconType;
}
const Icon = ({ type }: Props) => {
  return <SvgXml xml={icon[type]} />;
};

export default Icon;
