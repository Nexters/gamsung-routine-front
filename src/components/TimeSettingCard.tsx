import styled from '@emotion/native';
import React, { useState } from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import { FoldableContainer } from './FoldableContainer';
import { TimeSettingContainer } from './TimeSettingContainer';

import { BackgroundColor } from '~/utils/color';

interface Props {
  marginTop?: number;
  marginBottom?: number;
}

const mock = [
  {
    id: 1,
    isAm: true,
    hour: 8,
    minute: 20,
  },
  {
    id: 2,
    isAm: false,
    hour: 8,
    minute: 30,
  },
];

export const TimeSettingCard = (props: Props) => {
  const [isTimeSettingOpen, setIsTimeSettingOpen] = useState<boolean>(false);

  return (
    <CollapsibleCard marginTop={props?.marginTop} marginBottom={props?.marginBottom}>
      <FoldableContainer
        type={'SWITCH'}
        label={'시간 설정'}
        isOpen={isTimeSettingOpen}
        onOpen={() => setIsTimeSettingOpen(!isTimeSettingOpen)}
      />
      {isTimeSettingOpen && <DividerStyled />}
      {isTimeSettingOpen && mock.map((it, index) => <TimeSettingContainer key={it.id} count={index + 1} />)}
    </CollapsibleCard>
  );
};

const DividerStyled = styled.View`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${BackgroundColor.ELEVATED};
`;
