import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import CustomText from '~/components/CustomText';
import Icon from '~/components/Icon';
import { RootStackParamList } from '~/navigations/types';
import { BackgroundColor, IconColor, TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  left?: React.ReactNode;
  goBackButton?: boolean;
  goBackButtonStroke?: IconColor;
  goBackButtonTitle?: string;
  goBackButtonTitleColor?: TextColor;
  title?: string;
  right?: React.ReactNode;
  backgroundColor?: BackgroundColor;
}

const Header = ({
  navigation,
  left,
  goBackButton = false,
  goBackButtonStroke = IconColor.PRIMARY_L,
  goBackButtonTitle,
  goBackButtonTitleColor = TextColor.PRIMARY_L,
  title,
  right,
  backgroundColor = BackgroundColor.DEPTH2_L,
}: Props) => {
  return (
    <HeaderStyled backgroundColor={backgroundColor}>
      <HeaderLeft>
        {goBackButton ? (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon type={goBackButtonStroke === IconColor.PRIMARY_D ? 'ARROW_LEFT_WHITE' : 'ARROW_LEFT'} />
            </TouchableOpacity>
            {goBackButtonTitle && (
              <CustomText font={FontType.MEDIUM_LARGE} color={goBackButtonTitleColor} marginLeft={16}>
                {goBackButtonTitle}
              </CustomText>
            )}
          </>
        ) : (
          left
        )}
      </HeaderLeft>
      <CustomText font={FontType.BOLD_BODY_01} color={TextColor.PRIMARY_L} align={Align.CENTER}>
        {title}
      </CustomText>
      <HeaderRight>{right}</HeaderRight>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.View<{ backgroundColor: BackgroundColor }>`
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  left: 20px;
`;

const HeaderRight = styled.View`
  position: absolute;
  right: 20px;
`;

export default Header;
