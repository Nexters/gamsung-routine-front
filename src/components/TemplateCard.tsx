import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React from 'react';

import CustomText from '~/components/CustomText';
import { TemplateTask } from '~/models/TemplateTask';
import { GraphicColor, SurfaceColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  id: number;
  name: string;
  tasks: TemplateTask[];
  onPress?: (id: number) => void;
  cardColor?: GraphicColor;
}

export const TemplateCard: React.FC<Props> = observer(({ id, name, tasks, onPress, cardColor = GraphicColor.RED }) => {
  const handlePress = () => {
    onPress?.(id);
  };

  return (
    <TemplateCardStyled onPress={handlePress} backgroundColor={cardColor}>
      <TemplateContentStyled>
        <CustomText font={FontType.BOLD_LARGE} color={TextColor.PRIMARY_D}>
          {name}
        </CustomText>
        <ViewStyled>
          {tasks.slice(0, 3).map((it) => (
            <CustomText key={it.id} font={FontType.REGULAR_CAPTION} color={TextColor.PRIMARY_D}>
              {it.taskName}
            </CustomText>
          ))}
        </ViewStyled>
      </TemplateContentStyled>
      <TemplateBeltStyled />
    </TemplateCardStyled>
  );
});

const TemplateContentStyled = styled.View`
  height: 100%;
`;

const TemplateBeltStyled = styled.View`
  position: absolute;
  width: 12px;
  top: 0;
  bottom: 0;
  right: 16px;
  background-color: ${SurfaceColor.DEPTH1_L};
  opacity: 0.2;
`;

const TemplateCardStyled = styled.TouchableOpacity<{ backgroundColor: GraphicColor }>`
  width: 160px;
  height: 184px;
  flex: 1;
  flex-direction: row;
  margin: 10px;
  padding: 18px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 9px;
`;

const ViewStyled = styled.View`
  margin-top: 24px;
`;
