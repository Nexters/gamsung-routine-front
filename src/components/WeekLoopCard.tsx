import React from 'react';
import styled from '@emotion/native';
import { CollapsibleCard } from './CollapsibleCard';
import CustomText from './CustomText';
import { useState } from 'react';
import { WheelPicker } from './WheelPicker';
import { BackgroundColor, TextColor } from '~/utils/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useCallback } from 'react';
import { Font, FontType } from '~/utils/font';
import { Image } from 'react-native';
import { FoldableContainer } from './FoldableContainer';
import { DayWeekContainer } from './DayWeekContainer';

export const WeekLoopCard = () => {
  // 1 ~ 7 ; 7 = 매일
  const [timesWeek, setTimesWeek] = useState<number>(7);
  const [isTimesWeekWheelOpen, setIsTimesWeekWheelOpen] = useState<boolean>(false);

  const handleWheelItemClick = (id: number | string) => {
    setTimesWeek(id as number);
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
    <CollapsibleCard>
      <FoldableContainer
        label={'일주일동안'}
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
