import React from 'react';
import { SvgXml } from 'react-native-svg';

import IconArrowDown from '~/assets/icons/icon_arrow_down.svg';
import IconArrowUp from '~/assets/icons/icon_arrow_up.svg';
import IconArrowLeft from '~/assets/icons/icon_arrow_left.svg';
import IconCrown from '~/assets/icons/icon_crown.svg';
import IconCrownGray from '~/assets/icons/icon_crown_gray.svg';
import IconDrop from '~/assets/icons/icon_drop.svg';
import IconFullArrowDown from '~/assets/icons/icon_full_arrow_down.svg';
import IconMore from '~/assets/icons/icon_more.svg';
import IconTake from '~/assets/icons/icon_take.svg';
import IconAdd from '~/assets/icons/icon_add.svg';

export enum IconType {
  'DROP' = 'DROP',
  'TAKE' = 'TAKE',
  'CROWN' = 'CROWN',
  'CROWN_GRAY' = 'CROWN_GRAY',
  'ARROW_UP' = 'ARROW_UP',
  'ARROW_DOWN' = 'ARROW_DOWN',
  'MORE' = 'MORE',
  'FULL_ARROW_DOWN' = 'FULL_ARROW_DOWN',
  'ARROW_LEFT' = 'ARROW_LEFT',
  'ADD' = 'ADD'
}

interface Props {
  type: IconType;
}
const Icon = ({ type }: Props) => {
  const getIcon = (type: IconType) => {
    if (type === IconType.DROP) {
      return IconDrop;
    }
    if (type === IconType.TAKE) {
      return IconTake;
    }
    if (type === IconType.CROWN) {
      return IconCrown;
    }
    if (type === IconType.CROWN_GRAY) {
      return IconCrownGray;
    }
    if (type === IconType.ARROW_DOWN) {
      return IconArrowDown;
    }
    if (type === IconType.ARROW_UP) {
      return IconArrowUp;
    }
    if (type === IconType.MORE) {
      return IconMore;
    }
    if (type === IconType.FULL_ARROW_DOWN) {
      return IconFullArrowDown;
    }
    if (type === IconType.ARROW_LEFT) {
      return IconArrowLeft;
    }
    if (type === IconType.ADD) {
      return IconAdd;
    }
  };
  return <SvgXml xml={getIcon(type)} />;
};

export default Icon;
