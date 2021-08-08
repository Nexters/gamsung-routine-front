import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import CustomText from './CustomText';
import { DayWeekContainer } from './DayWeekContainer';
import { FoldableContainer } from './FoldableContainer';

import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  days: {
    id: number;
    day: string;
    selected: boolean;
  }[];
  marginTop?: number;
  marginBottom?: number;
  onDayPress?: (id: number) => void;
}

export const WeekLoopCard = observer(({ marginBottom, marginTop, days, onDayPress }: Props) => {
  const isSelected = days.some((currentValue) => currentValue.selected === true);

  const handleDayPress = (id: number) => {
    onDayPress?.(id);
  };

  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer type="NONE" label="일주일동안">
        <CustomText font={FontType.MEDIUM_BODY_01} color={isSelected ? TextColor.PRIMARY_L : TextColor.INACTIVE_L}>
          {!isSelected
            ? '요일을 선택해주세요'
            : days
                .filter((day) => day.selected)
                .map((day) => day.day)
                .join(',')}
        </CustomText>
      </FoldableContainer>
      <WhiteSpace />
      <DayWeekContainer days={days} onDayPress={handleDayPress} />
    </CollapsibleCard>
  );
});

const WhiteSpace = styled.View`
  width: 100%;
  padding: 8px 0;
`;
