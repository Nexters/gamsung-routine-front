import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React from 'react';

import AlarmSettingCard from '~/components/AlarmSettingCard';
import CustomText from '~/components/CustomText';
import CustomTextInput from '~/components/CustomTextInput';
import { DailyLoopCard } from '~/components/DailyLoopCard';
import { FriendInviteCard } from '~/components/FriendInviteCard';
import { TimeSettingCard } from '~/components/TimeSettingCard';
import { WeekLoopCard } from '~/components/WeekLoopCard';
import { EditTaskStore } from '~/stores/EditTaskStore';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  vm: EditTaskStore;
  onChangeTaskName?: (name: string) => void;
  onDaySelect?: (id: number) => void;
  onCountOfDay?: (countOfDay: number) => void;
  onChangeTimeData?: (id: number, hour: number, minute: number) => void;
  onChangeAlarm?: (isAlarm: boolean) => void;
  onEndTaskClick?: () => void;
  onInviteClick?: () => void;
  disable?: boolean;
}

const EditTaskView = ({
  vm,
  onChangeTaskName,
  onDaySelect,
  onCountOfDay,
  onChangeTimeData,
  onChangeAlarm,
  onEndTaskClick,
  onInviteClick,
  disable = false,
}: Props) => {
  const handleChangeTaskName = (name: string) => {
    onChangeTaskName?.(name);
  };

  const handleDaySelect = (id: number) => {
    onDaySelect?.(id);
  };

  const handleCountOfDay = (countOfDay: number) => {
    onCountOfDay?.(countOfDay);
  };

  const handleChangeTimeData = (id: number, hour: number, minute: number) => {
    onChangeTimeData?.(id, hour, minute);
  };

  const handleChangeAlarm = (isAlarm: boolean) => {
    onChangeAlarm?.(isAlarm);
  };

  const handleEndTaskClick = () => {
    onEndTaskClick?.();
  };

  const handleInviteClick = () => {
    onInviteClick?.();
  };

  return (
    <EditTaskScrollView>
      <EditTaskViewStyled>
        <EditSettingView>
          <TitleSettingView>
            {vm.editableTitle ? (
              <CustomTextInput
                onChangeText={handleChangeTaskName}
                value={vm.taskName}
                placeHolder="태스크 명을 입력해주세요."
                font={FontType.BOLD_TITLE_01}
                color={TextColor.PRIMARY_L}
              />
            ) : (
              <CustomText font={FontType.BOLD_TITLE_01} color={TextColor.PRIMARY_L}>
                {vm.taskName}
              </CustomText>
            )}
          </TitleSettingView>
          <TimeSettingView>
            <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY_L} marginBottom={8}>
              시간 설정
            </CustomText>
            <WeekLoopCard days={vm.days} onDayPress={handleDaySelect} marginTop={8} disable={disable} />
            <DailyLoopCard marginTop={16} onSelectCountOfDay={handleCountOfDay} disable={disable} />
            <TimeSettingCard
              marginTop={16}
              timeSettingData={vm.times}
              onChangeTimeSettingData={handleChangeTimeData}
              disable={disable}
            />
          </TimeSettingView>
          <AddSettingView>
            <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY_L} marginBottom={8}>
              부가 설정
            </CustomText>
            <AlarmSettingCard onChangeAlarm={handleChangeAlarm} marginTop={8} disable={disable} />
          </AddSettingView>
          {vm.isEditMode && (
            <>
              <AddPartyView>
                <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY_L}>
                  파티원 설정
                </CustomText>
                <FriendInviteCard
                  friends={[
                    { id: 1, name: '김헌진' },
                    { id: 2, name: '김헌진' },
                  ]}
                  marginTop={16}
                  disable={disable}
                  onInviteClick={handleInviteClick}
                />
              </AddPartyView>
              {!disable && (
                <FinishTaskTextButton onPress={handleEndTaskClick}>
                  <CustomText font={FontType.MEDIUM_BODY_02} color={TextColor.RED}>
                    테스크 종료
                  </CustomText>
                </FinishTaskTextButton>
              )}
            </>
          )}
        </EditSettingView>
      </EditTaskViewStyled>
    </EditTaskScrollView>
  );
};

const EditTaskScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
`;

const EditTaskViewStyled = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
  padding-bottom: 50px;
`;

const EditSettingView = styled.View`
  margin-top: 26px;
`;

const TitleSettingView = styled.View``;

const TimeSettingView = styled.View`
  padding-top: 40px;
`;

const AddSettingView = styled.View`
  padding-top: 40px;
`;

const AddPartyView = styled.View`
  padding-top: 40px;
`;

const FinishTaskTextButton = styled.TouchableOpacity`
  padding-top: 40px;
`;

export default observer(EditTaskView);
