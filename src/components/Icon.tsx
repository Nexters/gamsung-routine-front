import React from 'react';
import { SvgXml } from 'react-native-svg';

import IconCrown from '~/assets/icons/icon_crown.svg';
import IconCrownGray from '~/assets/icons/icon_crown_gray.svg';
import IconDrop from '~/assets/icons/icon_drop.svg';
import IconTake from '~/assets/icons/icon_take.svg';
import IconArrowDown from '~/assets/icons/icon_arrow_down.svg';
import IconArrowUp from '~/assets/icons/icon_arrow_up.svg';

export enum IconType {
  'drop' = 'drop',
  'take' = 'take',
  'crown' = 'crown',
  'crownGray' = 'crownGray',
  'iconArrowUp' = 'iconUp',
  'iconArrowDown' = 'iconDown',
}

interface Props {
  type: IconType;
}
const Icon = ({ type }: Props) => {
  const getIcon = (type: IconType) => {
    if (type === IconType.drop) {
      return IconDrop;
    }
    if (type === IconType.take) {
      return IconTake;
    }
    if (type === IconType.crown) {
      return IconCrown;
    }
    if (type === IconType.crownGray) {
      return IconCrownGray;
    }
    if (type === IconType.iconArrowDown) {
      return IconArrowDown;
    }
    if (type === IconType.iconArrowUp) {
      return IconArrowUp;
    }
  };
  return <SvgXml xml={getIcon(type)} />;
};

export default Icon;
