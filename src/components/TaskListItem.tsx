import styled from '@emotion/native';
import React from 'react';

import CustomText from '~/components/CustomText';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  listType: 'day' | 'week';
  taskName: string;
  has: boolean;
  share?: boolean;
  shareCount?: number;
  shareFinishedCount?: number;
  sharePeople?: string[];
  sharePercent?: number;
  onTaskItemClick: () => void;
}

const TaskListItem = (props: Props) => {
  const { listType, taskName, has, share, shareCount, shareFinishedCount, sharePeople, sharePercent, onTaskItemClick } =
    props;

  const handleTaskItemClick = () => {
    onTaskItemClick?.();
  };

  return (
    <TaskListItemStyled>
      {listType === 'day' && (
        <TaskListItemToggleView onPress={() => handleTaskItemClick()}>
          <TaskListItemToggleViewTitle>
            {has && <TaskListItemLine />}
            <CustomText font={FontType.REGULAR_LARGE} color={has ? TextColor.DISABLE : TextColor.PRIMARY}>
              {taskName}
            </CustomText>
            <TaskListItemImage
              has={has}
              source={has ? require('~/assets/icons/icon_task_clear.png') : require('~/assets/icons/icon_task.png')}
            />
          </TaskListItemToggleViewTitle>
          {share && (
            <CustomText color={TextColor.SECONDARY} font={FontType.REGULAR_CAPTION}>
              {shareCount}명 중 {shareFinishedCount}명이 완료했습니다.
            </CustomText>
          )}
        </TaskListItemToggleView>
      )}
      {listType === 'week' && (
        <TaskListItemWeekView>
          <CustomText font={FontType.REGULAR_LARGE} color={TextColor.PRIMARY}>
            {taskName}
          </CustomText>
          <CustomText color={TextColor.SECONDARY} font={FontType.REGULAR_CAPTION}>
            {sharePercent}% 완료했습니다.
          </CustomText>
          <CompleteBar>
            <CompleteBarBackground />
            <CompleteBarProgress sharePercent={sharePercent} />
          </CompleteBar>
        </TaskListItemWeekView>
      )}
      {share && (
        <TaskListItemInfoView>
          <TaskListItemInfoContent>
            <TaskListItemInfoImageList>
              {sharePeople?.map((_, index) => (
                <TaskListItemInfoImage index={index} key={index} />
              ))}
            </TaskListItemInfoImageList>
            <CustomText color={TextColor.SECONDARY} font={FontType.REGULAR_CAPTION}>
              {shareCount}명이 참여중
            </CustomText>
          </TaskListItemInfoContent>
        </TaskListItemInfoView>
      )}
    </TaskListItemStyled>
  );
};

const TaskListItemStyled = styled.View`
  flex-direction: column;
  padding: 25px 20px;
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0px 1px 6px -2px rgba(0, 0, 0, 0.04), 0px 3px 10px rgba(0, 0, 0, 0.06),
    0px 5px 22px 4px rgba(0, 0, 0, 0.06);

  & + & {
    margin-bottom: 20px;
  }
`;

const TaskListItemToggleView = styled.TouchableOpacity`
  flex-direction: column;
`;

const TaskListItemToggleViewTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const TaskListItemLine = styled.View`
  width: 100%;
  position: absolute;
  left: 0;
  border-bottom-color: #9b9ea5;
  border-bottom-width: 1px;
  background-color: #e82d13;
`;

const TaskListItemImage = styled.Image<{ has: boolean }>`
  width: ${({ has }) => (has ? '34px' : '27px')};
  height: 27px;
`;

const TaskListItemWeekView = styled.View`
  flex-direction: column;
`;

const CompleteBar = styled.View`
  width: 100%;
  height: 9px;
  justify-content: center;
  position: relative;
  padding-top: 12px;
  padding-bottom: 18px;
`;

const CompleteBarBackground = styled.View`
  width: 100%;
  height: 9px;
  position: absolute;
  background-color: #e5e5e5;
  border-radius: 25px;
`;

const CompleteBarProgress = styled.View<{ sharePercent?: number }>`
  width: ${({ sharePercent }) => `${sharePercent}%`};
  height: 9px;
  position: absolute;
  background-color: #513de5;
  border-radius: 7px;
`;

const TaskListItemInfoView = styled.View``;

const TaskListItemInfoContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-top-color: #eaeaea;
  margin-top: 14px;
  padding-top: 14px;
`;

const TaskListItemInfoImageList = styled.View`
  flex-direction: row;
  position: relative;
`;

const TaskListItemInfoImage = styled.View<{ index: number }>`
  width: 24px;
  height: 24px;
  position: absolute;
  left: ${({ index }) => 0 + index * 12 + 'px'};
  background-color: #989898;
  border-radius: 24px;
  z-index: ${({ index }) => index};
`;

export default TaskListItem;
