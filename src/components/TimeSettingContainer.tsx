import styled from '@emotion/native';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import CustomText from './CustomText';
import { ToggleBoxButton } from './ToggleBoxButton';
import { WheelPicker } from './WheelPicker';

interface Props {
  count: number;
}

export const TimeSettingContainer = (props: Props) => {
  const [isAm, setIsAm] = useState<boolean>(true);

  const handleToggleBoxClick = useCallback((value: boolean) => {
    setIsAm(value);
  }, []);

  return (
    <TimeSettingContainerStyled>
      <CustomText>{props.count}회</CustomText>
      <RightView>
        <ToggleBoxButton isOn={isAm} onText={'오전'} offText={'오후'} onToggleClick={handleToggleBoxClick} />
        <TimeWheelContainer>
          <WheelPicker
            height={36}
            items={Array.from({ length: 12 }, (_, index) => index).map((it) => {
              return {
                id: it,
                name: `${it}`,
              };
            })}
          />
          <View style={{ width: 10, justifyContent: 'center', alignItems: 'center' }}>
            <CustomText align={'center'}>:</CustomText>
          </View>
          <WheelPicker
            height={36}
            items={Array.from({ length: 6 }, (_, index) => index).map((it) => {
              return {
                id: it,
                name: `${it * 10}`,
              };
            })}
          />
        </TimeWheelContainer>
      </RightView>
    </TimeSettingContainerStyled>
  );
};

const TimeSettingContainerStyled = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 6px;
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
  background-color: #f2f2f4;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  margin-left: 6px;
  justify-content: center;
  align-content: center;
`;
