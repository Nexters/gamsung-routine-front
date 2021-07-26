import styled from '@emotion/native';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { spring } from 'react-native-reanimated';

import { BackgroundColor } from '~/utils/color';

interface Props {
  isOn: boolean;
  onColor?: BackgroundColor;
  onToggle?: (value: boolean) => void;
}

export const FoldableSwitch = ({isOn, onColor, onToggle}: Props) => {

  const [switchTranslate] = useState(new Animated.Value(0));
  useEffect(() => {
    if (isOn) {
      spring(switchTranslate, {
        toValue: 21,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    } else {
      spring(switchTranslate, {
        toValue: 0,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    }
  }, [isOn, switchTranslate]);

  const handleSwitchToggle = () => {
    onToggle?.(!isOn);
  };

  return (
    <Pressable onPress={handleSwitchToggle}>
      <ContainerStyled style={{ backgroundColor: isOn ? '#513DE5' : '#B6B8BC' }}>
        <CircleStyled
          style={[
            { backgroundColor: '#fff' },
            {
              transform: [
                {
                  translateX: switchTranslate,
                },
              ],
            },
          ]}
        />
      </ContainerStyled>
    </Pressable>
  );
};

const ContainerStyled = styled(Animated.View)`
  width: 50px;
  height: 28px;
  padding: 2px;
  border-radius: 36.5px;
`;

const CircleStyled = styled(Animated.View)`
  width: 24px;
  height: 24px;
  border-radius: 24px;
`;

const shadowValue = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
};
