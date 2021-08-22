import styled from '@emotion/native';
import React from 'react';
import { Svg, Defs, Stop, Rect, LinearGradient } from 'react-native-svg';

import CustomText from '~/components/CustomText';
import { BackgroundColor, BorderColor, TextColor, SurfaceColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface Props {
  onCancelButtonClick: () => void;
  onAcceptButtonClick: () => void;
}

const InviteButton = ({ onCancelButtonClick, onAcceptButtonClick }: Props) => {
  const handleCancelButtonClick = () => {
    onCancelButtonClick();
  };

  const handleAcceptButtonClick = () => {
    onAcceptButtonClick();
  };

  return (
    <InviteButtonStyled>
      <Svg height={80} width="100%">
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
            <Stop offset="0" stopColor={SurfaceColor.DEPTH2_L} stopOpacity="1" />
            <Stop offset="1" stopColor={SurfaceColor.DEPTH2_L} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height={80} fill="url(#gradient)" />
      </Svg>
      <InviteButtonView>
        <InviteCancelButton onPress={handleCancelButtonClick}>
          <CustomText font={FontType.MEDIUM_LARGE} color={TextColor.SECONDARY_L} align={Align.CENTER}>
            거절하기
          </CustomText>
        </InviteCancelButton>
        <InviteAcceptButton onPress={handleAcceptButtonClick}>
          <CustomText font={FontType.MEDIUM_LARGE} color={TextColor.PRIMARY_D} align={Align.CENTER}>
            수락하기
          </CustomText>
        </InviteAcceptButton>
      </InviteButtonView>
    </InviteButtonStyled>
  );
};

const InviteButtonStyled = styled.View`
  width: 100%;
  position: absolute;
  bottom: 34px;
`;

const InviteButtonView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
`;

const InviteCancelButton = styled.TouchableOpacity`
  width: 48%;
  border: 1px solid ${BorderColor.DEPTH3_L};
  border-radius: 8px;
  padding: 12px 0;
`;

const InviteAcceptButton = styled.TouchableOpacity`
  width: 48%;
  background-color: ${BackgroundColor.HIGHLIGHTER};
  border-radius: 8px;
  padding: 12px 0;
`;

export default InviteButton;
