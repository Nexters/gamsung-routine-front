import styled from '@emotion/native';
import React, { useState, useCallback } from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import { FoldableContainer } from './FoldableContainer';
import { WheelPicker } from './WheelPicker';

import { BorderColor } from '~/utils/color';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  dayOfTime?: number;
  onSelectCountOfDay?: (dayOfTime: number) => void;
}

export const DailyLoopCard = ({ marginTop, marginBottom, dayOfTime = 1, onSelectCountOfDay }: Props) => {
  const countDaily = useCallback((time) => {
    return `${time}회`;
  }, []);

  const [dailyTime, setDailyTime] = useState<number>(dayOfTime);
  const [isDailyTimeWheelOpen, setIsDailyTimeWheelOpen] = useState<boolean>(false);

  const handleWheelItemClick = (id: number) => {
    setDailyTime(id);
    setIsDailyTimeWheelOpen(false);
    onSelectCountOfDay?.(id);
  };

  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer
        type="SELECTOR"
        label="하루동안"
        isOpen={isDailyTimeWheelOpen}
        countText={countDaily(dailyTime)}
        setIsOpen={() => setIsDailyTimeWheelOpen(!isDailyTimeWheelOpen)}
      />
      {isDailyTimeWheelOpen && <DividerStyled />}
      {isDailyTimeWheelOpen && (
        <WheelPicker
          items={Array.from({ length: 7 }, (_, index) => ({ id: index + 1, name: countDaily(index + 1) }))}
          onClick={handleWheelItemClick}
          selectedItems={dailyTime}
        />
      )}
    </CollapsibleCard>
  );
};

const DividerStyled = styled.View`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${BorderColor.DEPTH1_L};
`;
