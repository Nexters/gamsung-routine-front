import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View } from 'react-native';

import CustomText from './CustomText';
import { ToggleBoxButton } from './ToggleBoxButton';
import { WheelPicker } from './WheelPicker';

import { SurfaceColor, TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

const WHEEL_ITEM_HEIGHT = 36;

interface Props {
  count: number;
  id: number;
  hour?: number;
  minute?: number;
  onChangeTimeSettingData?: (id: number, hour: number, minute: number) => void;
}

export const TimeSettingContainer: React.FC<Props> = observer(
  ({ id, count, hour = 9, minute = 30, onChangeTimeSettingData }) => {
    const [isAm, setIsAm] = useState<boolean>(() => hour < 12);
    const [hourValue, setHourValue] = useState<number>(hour);
    const [minuteValue, setMinuteValue] = useState<number>(minute);

    const handleToggleBoxClick = (value: boolean) => {
      setIsAm(value);
    };

    const handleHourChange = (time: number) => {
      setHourValue(time);
    };

    const handleMinuteChange = (minute: number) => {
      setMinuteValue(minute);
    };

    const handleChangeTimeSettingData = useCallback(
      (h) => {
        onChangeTimeSettingData?.(id, h, minuteValue);
      },
      [id, minuteValue, onChangeTimeSettingData],
    );

    useEffect(() => {
      const h = isAm ? hourValue : 12 + hourValue;
      handleChangeTimeSettingData(h);
    }, [isAm, hourValue, minuteValue, handleChangeTimeSettingData]);

    const hours = useMemo(() => {
      return Array.from({ length: 12 }, (_, index) => index).map((it) => {
        return {
          id: it,
          name: `${it < 10 ? `0${it}` : it}`,
        };
      });
    }, []);

    const minutes = useMemo(() => {
      return Array.from({ length: 6 }, (_, index) => index).map((it) => {
        const item = it * 10;
        return {
          id: it,
          name: `${item < 10 ? `0${item}` : item}`,
        };
      });
    }, []);

    return (
      <TimeSettingContainerStyled>
        <CustomText font={FontType.MEDIUM_BODY_01} color={TextColor.PRIMARY_L}>
          {count}회
        </CustomText>
        <RightView>
          <ToggleBoxButton isOn={isAm} onText="오전" offText="오후" onToggleClick={handleToggleBoxClick} />
          <TimeWheelContainer>
            <WheelPicker
              height={36}
              items={hours}
              onScrollEndDrag={handleHourChange}
              initHeight={WHEEL_ITEM_HEIGHT * (hourValue % 12)}
            />
            <View style={{ width: 10, justifyContent: 'center', alignItems: 'center' }}>
              <CustomText font={FontType.MEDIUM_BODY_02} color={TextColor.PRIMARY_L} align={Align.CENTER}>
                :
              </CustomText>
            </View>
            <WheelPicker
              height={36}
              items={minutes}
              onScrollEndDrag={handleMinuteChange}
              initHeight={WHEEL_ITEM_HEIGHT * (minuteValue % 10)}
            />
          </TimeWheelContainer>
        </RightView>
      </TimeSettingContainerStyled>
    );
  },
);

const TimeSettingContainerStyled = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

const RightView = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: 0;
  margin-left: auto;
`;

const TimeWheelContainer = styled.View`
  width: 80px;
  height: 36px;
  background-color: ${SurfaceColor.DEPTH2_L};
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  margin-left: 6px;
  justify-content: center;
  align-content: center;
`;
