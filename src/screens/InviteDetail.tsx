import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';

import EditTaskView from '~/components/EditTaskView';
import Header from '~/components/Header';
import Icon from '~/components/Icon';
import InviteButton from '~/components/InviteButton';
import { RootStackParamList } from '~/navigations/types';
import { EditTaskStore } from '~/stores/EditTaskStore';
import { IconColor } from '~/utils/color';

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
      <StatusBar barStyle="dark-content" />
      <InviteDetailStyled>
        <InviteDetailView>
          <Header
            left={
              <TouchableOpacity aria-label="뒤로가기" onPress={() => navigation.goBack()}>
                <Icon type="ARROW_LEFT" color={IconColor.PRIMARY_L} />
              </TouchableOpacity>
            }
          />
          <EditTaskView vm={vm} disable={true} />
          <InviteButton onCancelButtonClick={handleCancelButtonClick} onAcceptButtonClick={handleAcceptButtonClick} />
        </InviteDetailView>
      </InviteDetailStyled>
    </>
  );
};

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
