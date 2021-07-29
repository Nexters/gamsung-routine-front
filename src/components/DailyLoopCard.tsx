import styled from '@emotion/native';
import React, { useState, useCallback } from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import { FoldableContainer } from './FoldableContainer';
import { WheelPicker } from './WheelPicker';

import { BackgroundColor } from '~/utils/color';

interface Props {
  marginTop?: number;
  marginBottom?: number;
}

export const DailyLoopCard = ({ marginTop, marginBottom }: Props) => {
  const countDaily = useCallback((time) => {
    return `${time + 1} 회`;
  }, []);

  const [dailyTime, setDailyTime] = useState<number>(0);
  const [isDailyTimeWheelOpen, setIsDailyTimeWheelOpen] = useState<boolean>(false);

  const handleWheelItemClick = (id: number) => {
    setDailyTime(id);
    setIsDailyTimeWheelOpen(false);
  };

  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer
        type='SELECTOR'
        label='하루동안'
        isOpen={isDailyTimeWheelOpen}
        countText={countDaily(dailyTime)}
        onOpen={() => setIsDailyTimeWheelOpen(!isDailyTimeWheelOpen)}
      />
      {isDailyTimeWheelOpen && <DividerStyled />}
      {isDailyTimeWheelOpen && (
        <WheelPicker
          items={Array.from({ length: 7 }, (_, index) => ({ id: index, name: countDaily(index) }))}
          onClick={handleWheelItemClick}
        />
      )}
    </CollapsibleCard>
  );
};

const DividerStyled = styled.View`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${BackgroundColor.ELEVATED};
`;