import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React from 'react';
import { StatusBar } from 'react-native';

import { useUserProfileData } from '~/apis/authAPI';
import { RoutineAPI } from '~/apis/routinAPI';
import CustomText from '~/components/CustomText';
import { FriendInviteCard } from '~/components/FriendInviteCard';
import Header from '~/components/Header';
import Icon from '~/components/Icon';
import InviteButton from '~/components/InviteButton';
import { RootStackParamList } from '~/navigations/types';
import { BackgroundColor, IconColor, TextColor } from '~/utils/color';
import { getDay } from '~/utils/days';
import { FontType } from '~/utils/font';

export interface InviteAcceptScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'InviteAccept'>;
}

const InviteAccept = ({ route, navigation }: InviteAcceptScreenProps) => {
  const { task } = route.params;

  const { data: profile } = useUserProfileData();

  const handleCancelButtonClick = () => {
    navigation.replace('Home');
  };

  const handleAcceptButtonClick = async () => {
    if (!task || !task.id || !profile || !profile.id) {
      return;
    }
    await RoutineAPI.instance().inviteRoutine(task.id, profile?.id);
    navigation.replace('Home');
  };

  return (
    <>
      <TopStatusBarStyled backgroundColor={BackgroundColor.HIGHLIGHTER} />
      <StatusBar barStyle="light-content" backgroundColor={BackgroundColor.HIGHLIGHTER} />
      <Header
        navigation={navigation}
        goBackButton={true}
        goBackButtonStroke={IconColor.PRIMARY_D}
        goBackButtonTitle="파티원 초대"
        goBackButtonTitleColor={TextColor.PRIMARY_D}
        backgroundColor={BackgroundColor.HIGHLIGHTER}
      />
      <InviteAcceptStyled>
        <InviteAcceptView>
          <BackgroundView />
          <DetailCardView onPress={() => navigation.navigate('InviteDetail', { taskId: task.id! })}>
            <DetailCardInfo>
              <CustomText font={FontType.REGULAR_LARGE} color={TextColor.PRIMARY_L}>
                {task.title}
              </CustomText>

              <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.PRIMARY_L}>
                {task.days?.map(getDay).join(',')} · 하루 {task.times.length}번
              </CustomText>
            </DetailCardInfo>
            <Icon type="ARROW_RIGHT" />
          </DetailCardView>
          <FriendInviteCard friends={task.friends ?? []} backgroundColor={BackgroundColor.DEPTH2_L} disable={true} />
          <InviteButton onCancelButtonClick={handleCancelButtonClick} onAcceptButtonClick={handleAcceptButtonClick} />
        </InviteAcceptView>
      </InviteAcceptStyled>
    </>
  );
};

const TopStatusBarStyled = styled.SafeAreaView<{ backgroundColor: string }>`
  flex: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const InviteAcceptStyled = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InviteAcceptView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 83px;
`;

const BackgroundView = styled.View`
  width: 100%;
  height: 127px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${BackgroundColor.HIGHLIGHTER};
`;

const DetailCardView = styled.TouchableOpacity`
  width: 90%;
  height: 89px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-right: 28px;
  background-color: ${BackgroundColor.DEPTH1_L};
  border-radius: 10px;
  box-shadow: 0px 1px 4px -2px rgba(0, 0, 0, 0.04), 0px 3px 6px rgba(0, 0, 0, 0.04),
    0px 5px 12px 4px rgba(0, 0, 0, 0.04);
`;

const DetailCardInfo = styled.View`
  flex-direction: column;
`;

export default observer(InviteAccept);
