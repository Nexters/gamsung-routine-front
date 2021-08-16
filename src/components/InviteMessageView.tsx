import styled from '@emotion/native';
import React from 'react';
import { View } from 'react-native';

import CustomText from '~/components/CustomText';
import { BackgroundColor, TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface Props {
  title: string;
  subText: string;
  buttonText: string;
  onInviteMessageButtonClick: () => void;
}

const InviteMessageView = ({ title, subText, buttonText, onInviteMessageButtonClick }: Props) => {
  const handleInviteMessageButtonClick = () => {
    onInviteMessageButtonClick();
  };

  return (
    <InviteMessageViewStyled>
      <View />
      <InviteContentView>
        <InviteLottie />
        <CustomText font={FontType.BOLD_TITLE_01} color={TextColor.PRIMARY_L} marginTop={31}>
          {title}
        </CustomText>
        <CustomText font={FontType.MEDIUM_BODY_01} color={TextColor.SECONDARY_L} marginTop={12}>
          {subText}
        </CustomText>
      </InviteContentView>
      <InviteMesageButton onPress={handleInviteMessageButtonClick}>
        <CustomText font={FontType.MEDIUM_LARGE} color={TextColor.PRIMARY_D} align={Align.CENTER}>
          {buttonText}
        </CustomText>
      </InviteMesageButton>
    </InviteMessageViewStyled>
  );
};

const InviteMessageViewStyled = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const InviteContentView = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InviteLottie = styled.View`
  width: 245px;
  height: 238px;
  background-color: #000;
`;

const InviteMesageButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${BackgroundColor.HIGHLIGHTER};
  padding: 12px 0;
  border-radius: 8px;
  margin-bottom: 34px;
`;

export default InviteMessageView;
