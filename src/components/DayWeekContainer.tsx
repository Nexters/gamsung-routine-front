import styled from '@emotion/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import CustomText from './CustomText';

import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  isRender: boolean;
}

export const DayWeekContainer = (props: Props) => {
  if (!props.isRender) {
    return null;
  }

  const day = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <DayWeekContainerStyled>
      {Array.from({ length: 7 }, (_, index) => day[index]).map((it, index) => (
        <DayStyled selected={index % 2 === 0}>
          <TouchableOpacity>
            <CustomText font={FontType.MEDIUM_BODY_01} color={index % 2 === 0 ? TextColor.WHITE : TextColor.SECONDARY}>
              {it}
            </CustomText>
          </TouchableOpacity>
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
