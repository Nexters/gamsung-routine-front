import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React from 'react';
import { SvgXml } from 'react-native-svg';

import EmptyImage from '~/assets/images/empty_image.svg';
import CustomText from '~/components/CustomText';
import TaskListItem from '~/components/TaskListItem';
import { Task } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore from '~/stores/CalendarStore';
import { TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  taskList: Task[];
  onToggleTask: (taskId: string) => void;
  visiblePopup: string | null;
  onPopupClick: (id: string | null) => void;
}

const TaskListView = ({ taskList, onToggleTask, visiblePopup, onPopupClick, navigation }: Props) => {
  const handleMoreButtonClick = (id: string) => {
    onPopupClick(id);
  };

  return (
    <>
      {taskList.length > 0 && (
        <TaskListViewStyled>
          {taskList.map((task, index) => {
            return (
              // TODO: delay (미뤄진 상태인지에 대한 여부), isDelay (미룰 수 있는지에 대한 여부) 값 연동 필요
              <TaskListItem
                navigation={navigation}
                layerIndex={index}
                totalCount={taskList?.length}
                key={index}
                taskId={task.taskId}
                title={task.title}
                timesOfWeek={task.timesOfWeek}
                timesOfDay={task.timesOfDay}
                completedDateList={task.completedDateList}
                days={task.days}
                delay={false}
                isDelay={true}
                percent={(task.completeCount || 0) / (task.timesOfDay || 0) || 0}
                share={false}
                shareCount={3}
                shareFinishedCount={0}
                sharePeople={['1', '2', '3']}
                sharePercent={30}
                onTaskItemClick={() => onToggleTask(task.taskId)}
                visiblePopup={visiblePopup}
                onMoreButtonClick={handleMoreButtonClick}
              />
            );
          })}
        </TaskListViewStyled>
      )}
      {taskList.length === 0 && (
        <EmptyView>
          {CalendarStore.isWeek && <SvgXml xml={EmptyImage} />}
          <CustomText
            font={FontType.MEDIUM_LARGE}
            color={TextColor.INACTIVE_L}
            align={Align.CENTER}
            marginTop={CalendarStore.isWeek ? 16 : 0}>
            {CalendarStore.isWeek ? `루틴이 없어요${'\n'}테스크를 추가해보세요.` : '테스크가 없어요.'}
          </CustomText>
        </EmptyView>
      )}
    </>
  );
};

const TaskListViewStyled = styled.ScrollView`
  margin-top: 20px;
`;

const EmptyView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default observer(TaskListView);
