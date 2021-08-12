import styled from '@emotion/native';
import React from 'react';

import CustomText from './CustomText';

import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';
const SkipButton = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
  const handleSkipClick = () => {
    navigation.replace('Login');
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
  top: 20px;
  right: 24px;
  background-color: transparent;
  z-index: 10;
`;

export default SkipButton;
