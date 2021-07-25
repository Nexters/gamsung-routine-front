import React from 'react';
import styled from '@emotion/native';
import CustomText from '~/components/CustomText';
import { FontType } from '~/utils/font';
import { BackgroundColor, TextColor } from '~/utils/color';
import { TemplateTask } from '~/models/TemplateTask';

interface Props {
  id: number;
  name: string;
  tasks: TemplateTask[];
  onPress?: (id: number) => void;
}

export const TemplateCard = (props: Props) => {
  const { id, name, tasks, onPress } = props;

  const handlePress = () => {
    onPress?.(id);
  };

  return (
    <TemplateCardStyled onPress={handlePress}>
      <CustomText font={FontType.BOLD_LARGE}>💪</CustomText>
      <CustomText font={FontType.BOLD_LARGE} color={TextColor.WHITE}>
        {name}
      </CustomText>
      <ViewStyled>
        {tasks.slice(0, 3).map((it) => (
          <CustomText key={it.id} font={FontType.REGULAR_CAPTION} color={TextColor.WHITE}>
            {it.taskName}
          </CustomText>
        ))}
      </ViewStyled>
    </TemplateCardStyled>
  );
};

const TemplateCardStyled = styled.TouchableOpacity`
  width: 160px;
  height: 184px;
  background-color: ${BackgroundColor.SECONDARY};
  border-radius: 9px;
  flex: 1;
  margin: 10px;
  padding: 18px;
`;

const ViewStyled = styled.View`
  margin-top: 24px;
`;
