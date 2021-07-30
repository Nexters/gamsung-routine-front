import styled from '@emotion/native';
import React from 'react';

import CustomText from './CustomText';

import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  days: {
    id: number;
    day: string;
    selected: boolean;
  }[];
  onDayPress?: (id: number) => void;
}

export const DayWeekContainer: React.FC<Props> = ({ days, onDayPress }) => {
  const handleDayPress = (id: number) => () => {
    onDayPress?.(id);
  };

  return (
    <DayWeekContainerStyled>
      {days.map((day) => (
        <DayStyled selected={day.selected} onPress={handleDayPress(day.id)} key={day.id}>
          <CustomText font={FontType.MEDIUM_BODY_01} color={day.selected ? TextColor.WHITE : TextColor.SECONDARY}>
            {day.day}
          </CustomText>
        </DayStyled>
      ))}
    </DayWeekContainerStyled>
  );
};

const DayWeekContainerStyled = styled.View`
  flex-direction: row;
  width: 100%;
`;

const DayStyled = styled.TouchableOpacity<{ selected: boolean }>`
  width: 34px;
  height: 34px;
  margin-right: 10px;
  border: 1px solid #e4e5e9;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${({ selected }) => (selected ? '#5F4BF2' : '#FFF')};
`;
