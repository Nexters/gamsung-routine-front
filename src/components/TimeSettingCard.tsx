import styled from '@emotion/native';
import React, { useState } from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import { FoldableContainer } from './FoldableContainer';
import { TimeSettingContainer } from './TimeSettingContainer';

import { BackgroundColor } from '~/utils/color';
import { observer } from 'mobx-react';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  timeSettingData: { isAm: boolean; hour: number; minute: number }[];
}

export const TimeSettingCard: React.FC<Props> = observer(({ marginTop, marginBottom, timeSettingData }) => {
  const [isTimeSettingOpen, setIsTimeSettingOpen] = useState<boolean>(false);

  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer
        type={'SWITCH'}
        label={'시간 설정'}
        isOpen={isTimeSettingOpen}
        onOpen={() => setIsTimeSettingOpen(!isTimeSettingOpen)}
      />
      {isTimeSettingOpen && <DividerStyled />}
      {isTimeSettingOpen && timeSettingData.map((it, index) => <TimeSettingContainer key={index} count={index + 1} />)}
    </CollapsibleCard>
  );
});

const DividerStyled = styled.View`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${BackgroundColor.ELEVATED};
`;
