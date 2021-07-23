import styled from '@emotion/native';
import React from 'react';

import CustomText from '~/components/CustomText';
import MonsterIcon from '~/components/MonsterIcon';
import TaskDetailPopup from '~/components/TaskDetailPopup';
import { List } from '~/models/List';
import { Weekday } from '~/models/Task';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  listType: List;
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
}

const TaskListItem = (props: Props) => {
  const {
    layerIndex,
    totalCount,
    listType,
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
  } = props;
  const checkTodayTaskState = todayOfWeek.count - todayOfWeek.endTasks.length;

  const handleTaskItemClick = () => {
    listType === 'day' && onTaskItemClick?.(id);
  };

  return (
    <TaskListItemStyled style={{ zIndex: totalCount - layerIndex }} checkLastItem={totalCount === layerIndex + 1}>
      <TaskListItemView>
        <TaskListItemViewLeft onPress={() => handleTaskItemClick()}>
          {listType === 'day' && <MonsterIcon listType={listType} data={todayOfWeek} />}
          <TaskListItemViewTitle>
            <TaskListItemViewInfo>
              <CustomText
                font={FontType.REGULAR_LARGE}
                color={!checkTodayTaskState ? TextColor.DISABLE : TextColor.PRIMARY}>
                {title}
              </CustomText>
              {!checkTodayTaskState && <TaskListItemLine />}
            </TaskListItemViewInfo>
            <TaskListItemViewSubTitle>
              <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY}>
                주 {timesOfWeek}회 · 하루 {timesOfDay}번
              </CustomText>
            </TaskListItemViewSubTitle>
          </TaskListItemViewTitle>
        </TaskListItemViewLeft>
        <MoreIconButton onPress={() => onMoreButtonClick(id)}>
          <MoreIconImage source={require('~/assets/icons/icon_more.png')} />
        </MoreIconButton>
      </TaskListItemView>
      {listType === 'week' && (
        <TaskListItemWeekView>
          {dayOfWeek?.map((item, index) => {
            return <MonsterIcon key={index} listType={listType} data={item} />;
          })}
        </TaskListItemWeekView>
      )}
      <TaskListItemInfoView listType={listType} share={share}>
        <TaskListItemInfoImageList>
          {share && sharePeople?.map((_, index) => <TaskListItemInfoImage index={index} key={index} />)}
        </TaskListItemInfoImageList>
        <TaskListItemInfoPercent>
          {listType === 'day' && share && (
            <CustomText color={TextColor.SECONDARY} font={FontType.REGULAR_CAPTION}>
              {shareCount}명 중 {shareFinishedCount}명이 완료
            </CustomText>
          )}
          {listType === 'week' && (
            <CustomText color={TextColor.SECONDARY} font={FontType.REGULAR_CAPTION}>
              {share ? `${shareCount}명의 달성률 총 ` : '나의 달성률 총 '}
              <CustomText color={TextColor.MAIN} font={FontType.REGULAR_CAPTION}>
                {percent}%
              </CustomText>
            </CustomText>
          )}
        </TaskListItemInfoPercent>
      </TaskListItemInfoView>
      {isVisiblePopup === id && <TaskDetailPopup id={id} />}
    </TaskListItemStyled>
  );
};

const TaskListItemStyled = styled.View<{ checkLastItem: boolean }>`
  flex-direction: column;
  position: relative;
  padding: 22px 20px;
  background-color: #fff;
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
  border-bottom-color: #b6b8bc;
`;

const TaskListItemViewSubTitle = styled.Text``;

const MoreIconButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const MoreIconImage = styled.Image``;

const TaskListItemWeekView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f4;
  border-radius: 8px;
  padding: 8px;
  margin-top: 15px;
`;

const TaskListItemInfoView = styled.View<{ listType: List; share: boolean | undefined }>`
  flex-direction: row;
  justify-content: space-between;
  border-top-color: #e4e5e9;
  border-top-width: ${({ listType, share }) => listType === 'day' && share && '1px'};
  padding-top: ${({ listType, share }) => (listType === 'day' && share ? '20px' : listType === 'week' ? '16px' : '0')};
  margin-top: ${({ listType, share }) => listType === 'day' && share && '12px'};
`;

const TaskListItemInfoImageList = styled.View`
  flex-direction: row;
`;

const TaskListItemInfoImage = styled.View<{ index: number }>`
  width: 24px;
  height: 24px;
  position: absolute;
  left: ${({ index }) => 0 + index * 15 + 'px'};
  background-color: #989898;
  border-radius: 24px;
  border-width: 2px;
  border-color: #fff;
  z-index: ${({ index }) => index};
`;

const TaskListItemInfoPercent = styled.View``;

export default TaskListItem;
