import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import CustomText from '~/components/CustomText';
import { RootStackParamList } from '~/navigations/types';
import { TextColor } from '~/utils/color';

export interface AddTaskScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const AddTaskSubmitButton = ({ navigation }: AddTaskScreenProps) => {
  return (
    <AddTaskSubmitButtonStyled
      onPress={() => {
        navigation.navigate('Home');
      }}>
      <CustomText color={TextColor.MAIN}>완료</CustomText>
    </AddTaskSubmitButtonStyled>
  );
};

const AddTaskSubmitButtonStyled = styled.TouchableOpacity`
  margin-right: 10px;
`;

export default AddTaskSubmitButton;
