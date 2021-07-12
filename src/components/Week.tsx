import styled from '@emotion/native';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import 'dayjs/locale/ko';

const Week = () => {
  const [selectedDate] = useState(6);

  const isSun = dayjs().format('ddd') === 'Sun';
  const day = isSun ? dayjs().add(-1, 'day') : dayjs();

  return (
    <WeekStyled>
      {Array(7)
        .fill(0)
        .map((_, index) => {
          return (
            <WeekItem key={index}>
              <WeekItemText indexNumber={index}>
                {day
                  .day(index + 1)
                  .locale('ko')
                  .format('ddd')}
              </WeekItemText>
              <WeekItemNumber selected={index === selectedDate}>
                <WeekItemNumberText>{day.day(index + 1).date()}</WeekItemNumberText>
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
  color: ${(props) => (props.indexNumber === 5 || props.indexNumber === 6 ? '#EF7C79' : '#fff')};
`;

const WeekItemNumber = styled.View<{ selected: boolean }>`
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.selected && '#604DEE'};
  border-radius: 36px;
`;

const WeekItemNumberText = styled.Text`
  font-weight: bold;
  color: #fff;
`;

export default Week;
