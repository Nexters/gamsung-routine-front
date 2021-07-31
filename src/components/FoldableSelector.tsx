import styled from '@emotion/native';
import React from 'react';

import CustomText from './CustomText';
import Icon from './Icon';

import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  isOpen: boolean;
  countText?: string;
  onSelectorClick?: () => void;
}

export const FoldableSelector = ({ isOpen, countText, onSelectorClick }: Props) => {
  const handleOpen = () => {
    onSelectorClick?.();
  };

  return (
    <SelectorStyled onPress={handleOpen}>
      <CustomText font={FontType.MEDIUM_BODY_01} color={TextColor.PRIMARY}>
        {countText ?? ''}
      </CustomText>
      {isOpen ? <Icon type={'ARROW_UP'} /> : <Icon type={'ARROW_DOWN'} />}
    </SelectorStyled>
  );
};

const SelectorStyled = styled.TouchableOpacity`
  flex-direction: row;
`;
