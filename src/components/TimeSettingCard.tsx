import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React, { useState, useCallback } from 'react';

import { CollapsibleCard } from './CollapsibleCard';
import { FoldableContainer } from './FoldableContainer';
import { TimeSettingContainer } from './TimeSettingContainer';

import { BorderColor } from '~/utils/color';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  timeSettingData: { id: number; hour: number; minute: number }[];
  onChangeTimeSettingData?: (id: number, hour: number, minute: number) => void;
}

export const TimeSettingCard: React.FC<Props> = observer(
  ({ marginTop, marginBottom, timeSettingData, onChangeTimeSettingData }) => {
    const [isTimeSettingOpen, setIsTimeSettingOpen] = useState(false);

    const handleChangeTimeData = useCallback(
      (id: number, hour: number, minute: number) => {
        onChangeTimeSettingData?.(id, hour, minute);
      },
      [onChangeTimeSettingData],
    );

    return (
      <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
        <FoldableContainer
          type="SWITCH"
          label="시간 설정"
          isOpen={isTimeSettingOpen}
          setIsOpen={() => setIsTimeSettingOpen(!isTimeSettingOpen)}
        />
        {isTimeSettingOpen && <DividerStyled />}
        {isTimeSettingOpen &&
          timeSettingData.map((it, index) => (
            <TimeSettingContainer
              key={it.id}
              id={it.id}
              count={index + 1}
              hour={it.hour}
              minute={it.minute}
              onChangeTimeSettingData={handleChangeTimeData}
            />
          ))}
      </CollapsibleCard>
    );
  },
);

const DividerStyled = styled.View`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${BorderColor.DEPTH2_L};
`;
