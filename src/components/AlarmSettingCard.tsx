import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import { FoldableContainer } from './FoldableContainer';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  onChangeAlarm?: (isAlarm: boolean) => void;
  disable?: boolean;
}

const AlarmSettingCard: React.FC<Props> = observer(({ marginTop, marginBottom, onChangeAlarm, disable = false }) => {
  const [isAlarmSettingOpen, setIsAlarmSettingOpen] = useState<boolean>(false);

  const handleChangeAlarm = () => {
    const _isAlarmSettingOpen = !isAlarmSettingOpen;
    setIsAlarmSettingOpen(_isAlarmSettingOpen);
    onChangeAlarm?.(_isAlarmSettingOpen);
  };

  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer
        type="SWITCH"
        label="알람 설정"
        isOpen={isAlarmSettingOpen}
        setIsOpen={handleChangeAlarm}
        disable={disable}
      />
    </CollapsibleCard>
  );
});

export default AlarmSettingCard;
