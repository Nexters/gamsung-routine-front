import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import { FoldableContainer } from './FoldableContainer';
import { WheelPicker } from './WheelPicker';

import { WheelItem } from '~/models/WheelItem';
import { BackgroundColor } from '~/utils/color';

interface Props {
  marginTop?: number;
  marginBottom?: number;
}

export const AlarmSettingCard: React.FC<Props> = observer(({ marginTop, marginBottom }) => {
  const [isAlarmSettingOpen, setIsAlarmSettingOpen] = useState<boolean>(false);

  const alarmData: WheelItem[] = [
    '설정한 시간 당시',
    '5분 전',
    '10분 전',
    '15분 전',
    '30분 전',
    '1시간 전',
    '2시간 전',
  ].map((it, index) => ({
    id: index,
    name: it,
  }));

  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer
        type={'SWITCH'}
        label={'알람 설정'}
        isOpen={isAlarmSettingOpen}
        onOpen={() => setIsAlarmSettingOpen(!isAlarmSettingOpen)}
      />
      {isAlarmSettingOpen && <DividerStyled />}
      {isAlarmSettingOpen && <WheelPicker items={alarmData} />}
    </CollapsibleCard>
  );
});

const DividerStyled = styled.View`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${BackgroundColor.ELEVATED};
`;
