import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { RootStackParamList } from '~/navigations/types';
import { AddTaskVM } from '~/screens/vm/addTaskVM';
import { BackgroundColor } from '~/utils/color';

interface AddTaskScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const AddTask = observer(({ navigation }: AddTaskScreenProps) => {
  const [vm] = useState<AddTaskVM>(new AddTaskVM());

  return <AddTaskStyled></AddTaskStyled>;
});

const AddTaskStyled = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${BackgroundColor.PRIMARY};
`;

export default AddTask;
