import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React from 'react';

import Icon from './Icon';

import CustomText from '~/components/CustomText';
import MonsterIcon from '~/components/MonsterIcon';
import TaskDetailPopup from '~/components/TaskDetailPopup';
import { Weekday } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore, { RADIO_TYPE } from '~/stores/CalendarStore';
import { BackgroundColor, BorderColor, SurfaceColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  layerIndex: number;
  totalCount: number;
  id: number;
  title: string;
  timesOfWeek: number;
  timesOfDay: number;
  percent: number;
  todayOfWeek: Weekday;
  dayOfWeek: Weekday[];
  share?: boolean;
  shareCount?: number;
  shareFinishedCount?: number;
  sharePeople?: string[];
  sharePercent?: number;
  onTaskItemClick: (id: number) => void;
  isVisiblePopup: number | null;
  onMoreButtonClick: (id: number) => void;
  navigation: StackNavigationProp<RootStackParamList>;
}

const TaskListItem = observer(
  ({
    layerIndex,
    totalCount,
    id,
    title,
    timesOfWeek,
    timesOfDay,
    percent,
    todayOfWeek,
    dayOfWeek,
    share,
    shareCount,
    shareFinishedCount,
    sharePeople,
    onTaskItemClick,
    isVisiblePopup,
    onMoreButtonClick,
    navigation,
  }: Props) => {
    const checkTodayTaskState = todayOfWeek.count - todayOfWeek.endTasks.length;

    const handleTaskItemClick = () => {
      CalendarStore.radio === RADIO_TYPE.루틴 && onTaskItemClick?.(id);
    };

    return (
      // XXX : 스타일 내부에서는 z-index 가 먹히지 않음
      <TaskListItemStyled style={{ zIndex: totalCount - layerIndex }} checkLastItem={totalCount === layerIndex + 1}>
        <TaskListItemView>
          <TaskListItemViewLeft onPress={() => handleTaskItemClick()}>
            {CalendarStore.radio === RADIO_TYPE.루틴 && (
              <MonsterIcon listType={CalendarStore.radio} data={todayOfWeek} />
            )}
            <TaskListItemViewTitle>
              <TaskListItemViewInfo>
                <CustomText
                  font={FontType.REGULAR_LARGE}
                  color={!checkTodayTaskState ? TextColor.INACTIVE_L : TextColor.PRIMARY_L}>
                  {title}
                </CustomText>
                {!checkTodayTaskState && <TaskListItemLine />}
              </TaskListItemViewInfo>
              <TaskListItemViewSubTitle>
                <CustomText
                  font={FontType.REGULAR_CAPTION}
                  color={!checkTodayTaskState ? TextColor.INACTIVE_L : TextColor.PRIMARY_L}>
                  주 {timesOfWeek}회 · 하루 {timesOfDay}번
                </CustomText>
              </TaskListItemViewSubTitle>
            </TaskListItemViewTitle>
          </TaskListItemViewLeft>
          <MoreIconButton onPress={() => onMoreButtonClick(id)}>
            <Icon type={'MORE'} />
          </MoreIconButton>
        </TaskListItemView>
        {CalendarStore.radio === RADIO_TYPE.리포트 && (
          <TaskListItemWeekView>
            {dayOfWeek?.map((item, index) => {
              return <MonsterIcon key={index} listType={CalendarStore.radio} data={item} />;
            })}
          </TaskListItemWeekView>
        )}
        <TaskListItemInfoView listType={CalendarStore.radio} share={share}>
          <TaskListItemInfoImageList>
            {share && sharePeople?.map((_, index) => <TaskListItemInfoImage index={index} key={index} />)}
          </TaskListItemInfoImageList>
          <TaskListItemInfoPercent>
            {CalendarStore.radio === RADIO_TYPE.루틴 && share && (
              <CustomText color={TextColor.PRIMARY_L} font={FontType.REGULAR_CAPTION}>
                {shareCount}명 중 {shareFinishedCount}명이 완료
              </CustomText>
            )}
            {CalendarStore.radio === RADIO_TYPE.리포트 && (
              <CustomText color={TextColor.PRIMARY_L} font={FontType.REGULAR_CAPTION}>
                {share ? `${shareCount}명의 달성률 총 ` : '나의 달성률 총 '}
                <CustomText color={TextColor.HIGHLIGHT} font={FontType.REGULAR_CAPTION}>
                  {percent}%
                </CustomText>
              </CustomText>
            )}
          </TaskListItemInfoPercent>
        </TaskListItemInfoView>
        {isVisiblePopup === id && <TaskDetailPopup id={id} navigation={navigation} />}
      </TaskListItemStyled>
    );
  },
);

const TaskListItemStyled = styled.View<{ checkLastItem: boolean }>`
  flex-direction: column;
  position: relative;
  padding: 22px 20px;
  background-color: ${SurfaceColor.DEPTH1_L};
  border-radius: 10px;
  box-shadow: 0px 1px 6px -2px rgba(0, 0, 0, 0.04), 0px 3px 10px rgba(0, 0, 0, 0.06),
    0px 5px 22px 4px rgba(0, 0, 0, 0.06);

  & + & {
    margin-bottom: ${({ checkLastItem }) => (checkLastItem ? '80px' : '20px')};
  }
`;

const TaskListItemView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TaskListItemViewLeft = styled.TouchableOpacity`
  flex-direction: row;
`;

const TaskListItemViewTitle = styled.View`
  flex-direction: column;
`;

const TaskListItemViewInfo = styled.View`
  position: relative;
`;

const TaskListItemLine = styled.View`
  width: 115%;
  position: absolute;
  top: 50%;
  left: -6px;
  border-bottom-width: 1px;
  border-bottom-color: ${SurfaceColor.DEPTH2_L};
`;

const TaskListItemViewSubTitle = styled.Text``;

const MoreIconButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const TaskListItemWeekView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${SurfaceColor.DEPTH2_L};
  border-radius: 8px;
  padding: 8px;
  margin-top: 15px;
`;

const TaskListItemInfoView = styled.View<{ listType: RADIO_TYPE; share: boolean | undefined }>`
  flex-direction: row;
  justify-content: space-between;
  border-top-color: ${BorderColor.DEPTH1_L};
  border-top-width: ${({ listType, share }) => listType === RADIO_TYPE.루틴 && share && '1px'};
  padding-top: ${({ listType, share }) =>
    listType === RADIO_TYPE.루틴 && share ? '20px' : listType === RADIO_TYPE.리포트 ? '16px' : '0'};
  margin-top: ${({ listType, share }) => listType === RADIO_TYPE.루틴 && share && '12px'};
`;

const TaskListItemInfoImageList = styled.View`
  flex-direction: row;
`;

const TaskListItemInfoImage = styled.View<{ index: number }>`
  width: 24px;
  height: 24px;
  position: absolute;
  left: ${({ index }) => 0 + index * 15 + 'px'};
  background-color: ${BackgroundColor.DEPTH1_D};
  border-radius: 24px;
  border-width: 2px;
  border-color: ${BorderColor.WHITE};
  z-index: ${({ index }) => index};
`;

const TaskListItemInfoPercent = styled.View``;

export default TaskListItem;
