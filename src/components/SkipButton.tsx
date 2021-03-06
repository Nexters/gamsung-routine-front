import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import CustomText from './CustomText';

import { RootStackParamList } from '~/navigations/types';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  navigation?: StackNavigationProp<RootStackParamList>;
  onClose?: () => void;
}

const SkipButton = ({ navigation, onClose }: Props) => {
  const handleSkipClick = () => {
    navigation ? navigation.replace('Login') : onClose?.();
  };

  return (
    <StyledSkipButton onPress={handleSkipClick}>
      <CustomText font={FontType.REGULAR_LARGE} color={TextColor.PRIMARY_D}>
        Skip
      </CustomText>
    </StyledSkipButton>
  );
};

const StyledSkipButton = styled.TouchableOpacity`
  position: absolute;
  top: 25px;
  right: 24px;
  background-color: transparent;
  z-index: 10;
`;

export default SkipButton;
