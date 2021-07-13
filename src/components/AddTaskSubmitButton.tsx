import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { RootStackParamList } from '~/navigations/types';

export interface AddTaskScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const AddTaskSubmitButton = ({ navigation }: AddTaskScreenProps) => {
  return (
    <AddTaskSubmitButtonStyled
      onPress={() => {
        navigation.navigate('Home');
      }}>
      <AddTaskSubmitButtonText>완료</AddTaskSubmitButtonText>
    </AddTaskSubmitButtonStyled>
  );
};

const AddTaskSubmitButtonStyled = styled.TouchableOpacity`
  margin-right: 10px;
`;

const AddTaskSubmitButtonText = styled.Text`
  color: rgba(81, 61, 229, 1);
`;

export default AddTaskSubmitButton;
