import styled from '@emotion/native';
import React, { useState, useCallback } from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import { DayWeekContainer } from './DayWeekContainer';
import { FoldableContainer } from './FoldableContainer';
import CustomText from './CustomText';
import { observer } from 'mobx-react';

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
  const handleDayPress = (id: number) => {
    onDayPress?.(id);
  };

  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer type="NONE" label="일주일동안">
        <CustomText>
          {days
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
