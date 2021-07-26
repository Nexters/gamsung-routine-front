import styled from '@emotion/native';
import React, { useState, useCallback } from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import { DayWeekContainer } from './DayWeekContainer';
import { FoldableContainer } from './FoldableContainer';
import { WheelPicker } from './WheelPicker';

import { BackgroundColor } from '~/utils/color';

interface Props {
  marginTop?: number;
  marginBottom?: number;
}

export const WeekLoopCard = ({ marginBottom, marginTop }: Props) => {
  // 1 ~ 7 ; 7 = 매일
  const [timesWeek, setTimesWeek] = useState<number>(7);
  const [isTimesWeekWheelOpen, setIsTimesWeekWheelOpen] = useState<boolean>(false);

  const handleWheelItemClick = (id: number) => {
    setTimesWeek(id);
    setIsTimesWeekWheelOpen(false);
  };

  const timesWeekText = useCallback((time: number) => {
    if (time >= 7) {
      return '매일';
    }

    return `${time % 7}일`;
  }, []);

  const Divider = () => {
    if (!isTimesWeekWheelOpen && timesWeek >= 7) {
      return null;
    }

    return <DividerStyled />;
  };

  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer
        type="SELECTOR"
        label="일주일동안"
        isOpen={isTimesWeekWheelOpen}
        countText={timesWeekText(timesWeek + 1)}
        onOpen={() => setIsTimesWeekWheelOpen(!isTimesWeekWheelOpen)}
      />
      {(isTimesWeekWheelOpen || timesWeek) < 6 && <Divider />}
      <DayWeekContainer isRender={!isTimesWeekWheelOpen && timesWeek < 6} />
      {isTimesWeekWheelOpen && (
        <WheelPicker
          items={Array.from({ length: 7 }, (_, index) => ({ id: index, name: timesWeekText(index + 1) }))}
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
