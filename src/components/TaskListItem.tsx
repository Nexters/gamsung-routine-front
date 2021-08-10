import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React from 'react';

import Icon from './Icon';

import { useMonthlyTasks } from '~/apis/routinAPI';
import CustomText from '~/components/CustomText';
import MonsterIcon from '~/components/MonsterIcon';
import TaskDetailPopup from '~/components/TaskDetailPopup';
import { Task } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore, { RADIO_TYPE } from '~/stores/CalendarStore';
import { BackgroundColor, BorderColor, SurfaceColor, TextColor } from '~/utils/color';
import { getDay, getWeek } from '~/utils/days';
import { FontType } from '~/utils/font';

interface Props {
  layerIndex: number;
  totalCount: number;
  taskId: string;
  title: string;
  timesOfWeek: number;
  timesOfDay: number;
  completedDateList: { date: string }[] | [];
  days: number[];
  delay: boolean;
  isDelay: boolean;
  percent: number;
  share?: boolean;
  shareCount?: number;
  shareFinishedCount?: number;
  sharePeople?: string[];
  sharePercent?: number;
  onTaskItemClick: (id: string) => void;
  visiblePopup: string | null;
  onMoreButtonClick: (id: string) => void;
  navigation: StackNavigationProp<RootStackParamList>;
}

const TaskListItem = observer(
  ({
    layerIndex,
    totalCount,
    taskId,
    title,
    timesOfWeek,
    timesOfDay,
    completedDateList,
    days,
    delay,
    isDelay,
    percent,
    share,
    shareCount,
    shareFinishedCount,
    sharePeople,
    onTaskItemClick,
    visiblePopup,
    onMoreButtonClick,
    navigation,
  }: Props) => {
    const { data, error } = useMonthlyTasks({
      month: CalendarStore.month.toString(),
      year: CalendarStore.tempYear.toString(),
    });

    const dayOfWeek = [] as Task[];

    if (CalendarStore.radio === RADIO_TYPE.리포트) {
      const isSun = CalendarStore.focusDay.format('ddd') === 'Sun';
      const today = CalendarStore.focusDay.add(isSun ? -1 : 0, 'day').day(1);
      for (let i = 0; i < 7; i++) {
        const routine = data?.dailyRoutines[today.add(i, 'day').format('YYYYMMDD')] || ([] as Task[]);
        const r =
          routine.find((rr) => {
            return rr.taskId === taskId;
          }) || ({} as Task);
        dayOfWeek.push(r);
      }
    }

    const handleTaskItemClick = () => {
      CalendarStore.radio === RADIO_TYPE.루틴 && onTaskItemClick?.(taskId);
    };

    return (
      // XXXX : 스타일 내부에서는 z-index 가 먹히지 않음
      <TaskListItemStyled style={{ zIndex: totalCount - layerIndex }} checkLastItem={totalCount === layerIndex + 1}>
        <TaskListItemView>
          <TaskListItemViewLeft onPress={() => handleTaskItemClick()}>
            {CalendarStore.radio === RADIO_TYPE.루틴 && <MonsterIcon listType={CalendarStore.radio} data={percent} />}
            <TaskListItemViewTitle>
              <TaskListItemViewInfo>
                <CustomText
                  marginTop={-3}
                  font={FontType.REGULAR_LARGE}
                  color={percent === 100 ? TextColor.INACTIVE_L : TextColor.PRIMARY_L}>
                  {title}
                </CustomText>
                {percent === 100 && <TaskListItemLine />}
              </TaskListItemViewInfo>
              <TaskListItemViewSubTitle>
                <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.PRIMARY_L}>
                  {days &&
                    days.map((day, index) => {
                      return `${getDay(day) + (index !== days.length - 1 ? ',' : '')}`;
                    })}{' '}
                  · 하루 {timesOfDay}번 {delay && '· 미뤄짐'}
                </CustomText>
              </TaskListItemViewSubTitle>
            </TaskListItemViewTitle>
          </TaskListItemViewLeft>
          <MoreIconButton onPress={() => onMoreButtonClick(taskId)}>
            <Icon type={'MORE'} />
          </MoreIconButton>
        </TaskListItemView>
        {CalendarStore.radio === RADIO_TYPE.리포트 && (
          <TaskListItemWeekView>
            {dayOfWeek?.map((item, index) => {
              const dayOfWeekPercent = ((item.completeCount || 0) / (item.timesOfDay || 0) || 0) * 100;
              return (
                <MonsterIconStyled key={index}>
                  <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY_L} marginBottom={3}>
                    {getDay(index + 1)}
                  </CustomText>
                  <MonsterIcon key={index} listType={CalendarStore.radio} data={dayOfWeekPercent} none={!item.taskId} />
                </MonsterIconStyled>
              );
            })}
          </TaskListItemWeekView>
        )}
        <TaskListItemInfoView listType={CalendarStore.radio} share={share}>
          <TaskListItemInfoImageList>
            {share && sharePeople?.map((_, index) => <TaskListItemInfoImage index={index} key={index} />)}
          </TaskListItemInfoImageList>
          <TaskListItemInfoPercent>
            {(shareCount || 0) > 0 && CalendarStore.radio === RADIO_TYPE.루틴 && share && (
              <CustomText color={TextColor.PRIMARY_L} font={FontType.REGULAR_CAPTION}>
                {shareCount}명 중 {shareFinishedCount}명이 완료
              </CustomText>
            )}
            {CalendarStore.radio === RADIO_TYPE.리포트 && (
              <CustomText color={TextColor.PRIMARY_L} font={FontType.REGULAR_CAPTION}>
                {`${CalendarStore.focusDay.format('M월')} ${getWeek()}주 `}
                {share ? `${shareCount}명의 달성률 총 ` : '나의 달성률 총 '}
                <CustomText color={TextColor.HIGHLIGHT} font={FontType.REGULAR_CAPTION}>
                  {percent}%
                </CustomText>
              </CustomText>
            )}
          </TaskListItemInfoPercent>
        </TaskListItemInfoView>
        {visiblePopup === taskId && (
          <TaskDetailPopup
            taskId={taskId}
            navigation={navigation}
            completedCount={completedDateList.length}
            isDelay={isDelay}
          />
        )}
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
  padding: 10px;
  margin-top: 15px;
`;

const MonsterIconStyled = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
