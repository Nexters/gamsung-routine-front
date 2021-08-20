import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import EditTaskView from '~/components/EditTaskView';
import Header from '~/components/Header';
import InviteButton from '~/components/InviteButton';
import { RootStackParamList } from '~/navigations/types';
import { EditTaskStore } from '~/stores/EditTaskStore';
import { BackgroundColor } from '~/utils/color';

export interface InviteDetailScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'InviteDetail'>;
}

const InviteDetail = ({ route, navigation }: InviteDetailScreenProps) => {
  const { task } = route.params;
  const [vm] = useState<EditTaskStore>(new EditTaskStore(task.taskId, null));

  const handleCancelButtonClick = () => {
    console.log('cancel');
    navigation.navigate('Home');
  };

  const handleAcceptButtonClick = () => {
    console.log('accept');
    navigation.navigate('Home');
  };

  return (
    <>
      <TopStatusBarStyled backgroundColor={BackgroundColor.DEPTH2_L} />
      <StatusBar barStyle="dark-content" backgroundColor={BackgroundColor.DEPTH2_L} />
      <Header navigation={navigation} goBackButton={true} />
      <InviteDetailStyled>
        <InviteDetailView>
          <EditTaskView vm={vm} disable={true} />
          <InviteButton onCancelButtonClick={handleCancelButtonClick} onAcceptButtonClick={handleAcceptButtonClick} />
        </InviteDetailView>
      </InviteDetailStyled>
    </>
  );
};

const TopStatusBarStyled = styled.SafeAreaView<{ backgroundColor: string }>`
  flex: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const InviteDetailStyled = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const InviteDetailView = styled.View`
  flex: 1;
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 40px;
`;

export default observer(InviteDetail);
