import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

import CustomText from './CustomText';

import onboarding1 from '~/assets/lottie/onboarding1.json';
import onboarding2 from '~/assets/lottie/onboarding2.json';
import onboarding3 from '~/assets/lottie/onboarding3.json';
import { BackgroundColor } from '~/utils/color';

const Onboarding2 = () => {
  const [phase, setPhase] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = async () => {
      const value = await AsyncStorage.getItem('onboarding2');
      setShow(!value);
    };
    fn();
  }, []);

  if (!show || phase >= 3) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1,
        backgroundColor: BackgroundColor.DEPTH2_D,
      }}>
      <TouchableOpacity
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          justifyContent: 'center',
        }}
        onPress={async () => {
          if (phase < 2) {
            return setPhase((phase) => phase + 1);
          }
          AsyncStorage.setItem('onboarding2', 'true');
          setShow(false);
        }}>
        <CustomText>
          <LottieView
            style={{
              width: Dimensions.get('window').width,
            }}
            source={getLottie(phase)}
            autoPlay
            loop
          />
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

interface AnimationObject {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: any[];
  layers: any[];
}

const getLottie = (phase: number) => {
  const phaseList = [onboarding1, onboarding2, onboarding3];
  return (phaseList[phase] as AnimationObject) || onboarding1;
};

export default Onboarding2;
