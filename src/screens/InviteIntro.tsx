import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';

import Header from '~/components/Header';
import Icon from '~/components/Icon';
import InviteMessageView from '~/components/InviteMessageView';
import { Task } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import { IconColor } from '~/utils/color';

export interface InviteIntroScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const InviteIntro = ({ navigation }: InviteIntroScreenProps) => {
  const task: Task = {
    completeCount: 3,
    completedDateList: ['1', '2'],
    date: '2021-08-16',
    days: [1, 2, 3],
    friendIds: [
      { id: 1, name: '파티원1', profileImageUrl: null, leader: true },
      { id: 2, name: '파티원2', profileImageUrl: null },
      { id: 3, name: '파티원3', profileImageUrl: null },
    ],
    id: '61169cddc0f4a9257f4320c0',
    profileId: '6106e7389ae3536a58c23615',
    taskId: '61169cddc0f4a9257f4320c0',
    times: ['1', '3', '7'],
    timesOfDay: 2,
    timesOfWeek: 2,
    title: '물 마시기',
  };

  const handleInviteMessageButtonClick = () => {
    navigation.navigate('InviteAccept', { task: task });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <InviteIntroStyled>
        <View style={{ flex: 1, width: '100%' }}>
          <Header
            left={
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon type="ARROW_LEFT" color={IconColor.PRIMARY_L} />
              </TouchableOpacity>
            }
          />
          <InviteMessageView
            title={'파티원 초대가 도착했어요'}
            subText={'수락할 시 테스크를 함께 수행할 수 있어요'}
            buttonText={'확인하기'}
            onInviteMessageButtonClick={handleInviteMessageButtonClick}
          />
        </View>
      </InviteIntroStyled>
    </>
  );
};

const InviteIntroStyled = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default observer(InviteIntro);
