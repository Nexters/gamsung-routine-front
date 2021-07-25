import styled from '@emotion/native';
import React from 'react';
import { Image } from 'react-native';

import CustomText from './CustomText';

import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  isOpen: boolean;
  countText?: string;
  onSelectorClick?: () => void;
}

export const FoldableSelector = (props: Props) => {
  const handleOpen = () => {
    props?.onSelectorClick?.();
  };

  return (
    <SelectorStyled onPress={handleOpen}>
      <CustomText font={FontType.MEDIUM_BODY_01} color={TextColor.PRIMARY}>
        {props?.countText ?? ''}
      </CustomText>
      <Image
        style={{ width: 24, height: 24, marginLeft: 6 }}
        source={
          props.isOpen ? require('~/assets/icons/icon_arrow_up.png') : require('~/assets/icons/icon_arrow_down.png')
        }
      />
    </SelectorStyled>
  );
};

const SelectorStyled = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;
