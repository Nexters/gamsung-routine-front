import styled from '@emotion/native';
import React from 'react';

import CustomText from '~/components/CustomText';

interface Props {
  percent?: number;
}

const Complete = ({ percent = 34 }: Props) => {
  return (
    <CompleteStyled>
      <CustomText color="white" size={24} weight="bold" align="center">
        오늘 테스크를{'\n'}
        <CustomText color="puple50" size={24} weight="bold">
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
