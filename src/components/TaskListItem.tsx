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
  onTaskItemClick: () => void;
  visiblePopup: string | null;
  onMoreButtonClick: (id: string) => void;
  navigation: StackNavigationProp<RootStackParamList>;
  task: Task;
}

const TaskListItem = observer(
  ({
    layerIndex,
    totalCount,
    taskId,
    title,
    timesOfDay,
    completedDateList,
    days,
    delay,
    isDelay,
    percent,
    onTaskItemClick,
    visiblePopup,
    onMoreButtonClick,
    navigation,
    task,
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

    const weekPercent = dayOfWeek.reduce(
      (prev, curr) => {
        if (!curr.timesOfDay) {
          return prev;
        }
        if (curr.friends.length > 1) {
          let len = 0;
          let timesOfDay = 0;
          curr.friends.forEach((c) => {
            len += c.completedDateList.length;
            timesOfDay += curr.timesOfDay;
          });
          return { timesOfDay: timesOfDay + prev.timesOfDay, len: len + prev.len };
        } else {
          return { timesOfDay: curr.timesOfDay + prev.timesOfDay, len: curr.completedDateList?.length || 0 + prev.len };
        }
      },
      { timesOfDay: 0, len: 0 },
    );

    const handleTaskItemClick = () => {
      CalendarStore.radio === RADIO_TYPE.루틴 && onTaskItemClick?.();
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
                {CalendarStore.radio === RADIO_TYPE.루틴 && percent === 1 && <TaskListItemLine />}
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
              let dayOfWeekPercent = 0;
              if (item.friends?.length > 1) {
                let len = 0;
                let timesOfDay = 0;
                item.friends.forEach((c) => {
                  len += c.completedDateList.length;
                  timesOfDay += item.timesOfDay;
                });
                dayOfWeekPercent = len / timesOfDay;
              } else {
                dayOfWeekPercent = (item.completedDateList?.length || 0) / (item.timesOfDay || 0) || 0;
              }
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
        <TaskListItemInfoView listType={CalendarStore.radio} share={task.friends?.length > 1}>
          <TaskListItemInfoImageList>
            {task.friends?.length > 1 &&
              task.friends.map((t, index) => (
                <TaskListItemInfoImage source={{ uri: t.thumbnailImageUrl }} index={index} key={index} />
              ))}
          </TaskListItemInfoImageList>
          <TaskListItemInfoPercent>
            {(task.friends?.length || 0) > 1 && CalendarStore.radio === RADIO_TYPE.루틴 && (
              <CustomText color={TextColor.PRIMARY_L} font={FontType.REGULAR_CAPTION}>
                {task.friends?.length}명 중{' '}
                {task.friends.reduce((prev, curr) => {
                  if (task.timesOfDay === curr.completedDateList.length) {
                    prev += 1;
                  }
                  return prev;
                }, 0)}
                명이 완료
              </CustomText>
            )}
            {CalendarStore.radio === RADIO_TYPE.리포트 && (
              <CustomText color={TextColor.PRIMARY_L} font={FontType.REGULAR_CAPTION}>
                {`${CalendarStore.focusDay.format('M월')} ${getWeek()}주 `}
                {task.friends?.length > 1 ? `${task.friends?.length}명의 달성률 총 ` : '나의 달성률 총 '}
                <CustomText color={TextColor.HIGHLIGHT} font={FontType.REGULAR_CAPTION}>
                  {((weekPercent.len / weekPercent.timesOfDay) * 100).toFixed(0)}%
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
  left: -15px;
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

const TaskListItemInfoImage = styled.Image<{ index: number }>`
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
