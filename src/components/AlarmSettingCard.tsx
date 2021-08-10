import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import { FoldableContainer } from './FoldableContainer';
import { WheelPicker } from './WheelPicker';

import { WheelItem } from '~/models/WheelItem';
import { BorderColor } from '~/utils/color';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  onChangeAlarm?: (isAlarm: boolean) => void;
}

export const AlarmSettingCard: React.FC<Props> = observer(({ marginTop, marginBottom, onChangeAlarm }) => {
  const [isAlarmSettingOpen, setIsAlarmSettingOpen] = useState<boolean>(false);

  // 현재 실제로 이 값을 저장하지는 않음. (alarm on/off 여부만 저장 중)
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

  const handleChangeAlarm = () => {
    const _isAlarmSettingOpen = !isAlarmSettingOpen;
    setIsAlarmSettingOpen(_isAlarmSettingOpen);
    onChangeAlarm?.(_isAlarmSettingOpen);
  };

  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer type="SWITCH" label="알람 설정" isOpen={isAlarmSettingOpen} setIsOpen={handleChangeAlarm} />
      {isAlarmSettingOpen && <DividerStyled />}
      {isAlarmSettingOpen && <WheelPicker items={alarmData} />}
    </CollapsibleCard>
  );
});

const DividerStyled = styled.View`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${BorderColor.DEPTH2_L};
`;
