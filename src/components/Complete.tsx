import styled from '@emotion/native';
import React from 'react';

import CustomText from '~/components/CustomText';
import { TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface Props {
  percent?: number;
}

const Complete = ({ percent = 34 }: Props) => {
  return (
    <CompleteStyled>
      <CustomText color={TextColor.WHITE} font={FontType.BOLD_HEAD_02} align={Align.CENTER}>
        오늘 테스크를{'\n'}
        <CustomText color={TextColor.MAIN} font={FontType.BOLD_HEAD_02} align={Align.CENTER}>
          {percent}%
        </CustomText>{' '}
        달성했어요
      </CustomText>
      <CompleteBar>
        <CompleteBarProgress />
        <CompleteBarBackground percent={percent} />
      </CompleteBar>
    </CompleteStyled>
  );
};

const CompleteStyled = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  z-index: 3;
`;

const CompleteBar = styled.View`
  width: 80%;
  height: 5px;
  justify-content: center;
  position: relative;
  padding-top: 40px;
  padding-bottom: 10px;
  border-radius: 5px;
`;

const CompleteBarProgress = styled.View`
  width: 100%;
  height: 5px;
  position: absolute;
  background-color: #513de5;
  opacity: 0.3;
`;

const CompleteBarBackground = styled.View<{ percent: number }>`
  width: ${({ percent }) => `${percent}%`};
  height: 5px;
  position: absolute;
  background-color: #513de5;
`;

export default Complete;
