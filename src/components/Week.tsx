import styled from '@emotion/native';
import dayjs from 'dayjs';
import React from 'react';
import 'dayjs/locale/ko';

const Week = () => {
  const today = dayjs();
  const isSun = today.format('ddd') === 'Sun';
  const weekDay = isSun ? dayjs().add(-1, 'day') : dayjs();

  return (
    <WeekStyled>
      {Array(7)
        .fill(0)
        .map((_, index) => {
          const day = weekDay.locale('ko').day(index + 1);
          const dayOfTheWeek = day.date();
          return (
            <WeekItem key={index}>
              <WeekItemText indexNumber={index}>{day.format('ddd')}</WeekItemText>
              <WeekItemNumber selected={dayOfTheWeek === today.date()}>
                <WeekItemNumberText>{dayOfTheWeek}</WeekItemNumberText>
              </WeekItemNumber>
            </WeekItem>
          );
        })}
    </WeekStyled>
  );
};

const WeekStyled = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 30px 0;
  z-index: 1;
`;

const WeekItem = styled.View`
  flex: 1;
  align-items: center;
`;

const WeekItemText = styled.Text<{ indexNumber: number }>`
  padding-bottom: 10px;
  color: ${({ indexNumber }) => (indexNumber >= 5 ? '#ef7c79' : '#ffffff')};
`;

const WeekItemNumber = styled.View<{ selected: boolean }>`
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected }) => selected && '#604dee'};
  border-radius: 36px;
`;

const WeekItemNumberText = styled.Text`
  font-weight: bold;
  color: #fff;
`;

export default Week;
