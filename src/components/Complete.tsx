import styled from '@emotion/native';
import React from 'react';

import PretendardText from '~/components/PretendardText';

interface Props {
  percent?: number;
}

const Complete = ({ percent = 34 }: Props) => {
  return (
    <CompleteStyled>
      <CompleteTitle>
        오늘 테스크를{'\n'} <PretendardText content={`${percent}%`} color="#7160ec" size={24} weight={700} /> 달성했어요
      </CompleteTitle>
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

const CompleteTitle = styled.Text`
  font-family: 'Pretendard';
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  line-height: 38px;
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
