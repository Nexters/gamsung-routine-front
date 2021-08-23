import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';

import { RoutineAPI } from '~/apis/routinAPI';
import Header from '~/components/Header';
import InviteMessageView from '~/components/InviteMessageView';
import { RoutineTaskUnit } from '~/models/RoutineTaskUnit';
import { RootStackParamList } from '~/navigations/types';
import { BackgroundColor } from '~/utils/color';

export interface InviteIntroScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'InviteIntro'>;
}

const InviteIntro = ({ navigation, route }: InviteIntroScreenProps) => {
  const { taskId } = route.params;

  const [task, setTask] = useState<RoutineTaskUnit>();

  useEffect(() => {
    async function getTask() {
      const _task = await RoutineAPI.instance().getSingleTask(taskId);
      setTask(_task);
    }
    getTask();
  }, [taskId]);

  const handleInviteMessageButtonClick = () => {
    if (!task) {
      return;
    }
    navigation.navigate('InviteAccept', { task: task });
  };

  return (
    <>
      <TopStatusBarStyled backgroundColor={BackgroundColor.DEPTH2_L} />
      <StatusBar barStyle="dark-content" backgroundColor={BackgroundColor.DEPTH2_L} />
      <Header navigation={navigation} goBackButton={true} />
      <InviteIntroStyled>
        <View style={{ flex: 1, width: '100%' }}>
          <InviteMessageView
            title="파티원 초대가 도착했어요"
            subText="수락할 시 테스크를 함께 수행할 수 있어요"
            buttonText="확인하기"
            onInviteMessageButtonClick={handleInviteMessageButtonClick}
          />
        </View>
      </InviteIntroStyled>
    </>
  );
};

const TopStatusBarStyled = styled.SafeAreaView<{ backgroundColor: string }>`
  flex: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const InviteIntroStyled = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default observer(InviteIntro);
