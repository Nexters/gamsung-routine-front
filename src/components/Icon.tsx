import React from 'react';
import { SvgXml } from 'react-native-svg';

import IconCrown from '~/assets/icons/icon_crown.svg';
import IconCrownGray from '~/assets/icons/icon_crown_gray.svg';
import IconDrop from '~/assets/icons/icon_drop.svg';
import IconTake from '~/assets/icons/icon_take.svg';

export enum IconType {
  'drop' = 'drop',
  'take' = 'take',
  'crown' = 'crown',
  'crownGray' = 'crownGray',
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
  };
  return <SvgXml xml={getIcon(type)} />;
};

export default Icon;
