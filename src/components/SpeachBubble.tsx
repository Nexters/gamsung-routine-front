import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import CustomText from './CustomText';
import Icon from './Icon';

import { CalenderColor, IconColor, SurfaceColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  text: string;
  speaker?: string;
  onConfirmClick?: () => void;
}

export const SpeachBubble: React.FC<Props> = observer(({ text, onConfirmClick, speaker }) => {
  const handlePress = () => {
    onConfirmClick?.();
  };

  return (
    <SpeachBubbleStyled>
      <CustomText font={FontType.REGULAR_LARGE} color={TextColor.PRIMARY_D}>
        {text}
      </CustomText>
      <IconFrame onPress={handlePress}>
        <Icon type="CONFIRM" />
      </IconFrame>
      {speaker && (
        <SpeakerFrame>
          <CustomText font={FontType.BOLD_TITLE_02} color={TextColor.PRIMARY_D}>
            {speaker}
          </CustomText>
        </SpeakerFrame>
      )}
    </SpeachBubbleStyled>
  );
});

const SpeachBubbleStyled = styled.View`
  width: 100%;
  height: 180px;
  background-color: ${SurfaceColor.DEPTH2_D};
  border-radius: 12px;
  padding: 40px 20px;
`;

const IconFrame = styled(TouchableOpacity)`
  position: absolute;
  right: 28px;
  bottom: 28px;
`;

const SpeakerFrame = styled.View`
  position: absolute;
  top: -20;
  left: 20;
  width: 90px;
  height: 42px;
  border: 3px solid ${IconColor.PRIMARY_L};
  border-radius: 10px;
  background-color: ${CalenderColor.UNFILL};
  justify-content: center;
  align-items: center;
`;
