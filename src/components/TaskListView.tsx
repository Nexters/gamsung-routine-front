import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React from 'react';
import { SvgXml, Svg, Defs, Stop, Rect, LinearGradient } from 'react-native-svg';

import EmptyImage from '~/assets/images/empty_image.svg';
import CustomText from '~/components/CustomText';
import TaskListItem from '~/components/TaskListItem';
import { Task } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore from '~/stores/CalendarStore';
import { TextColor, SurfaceColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  taskList: Task[];
  onToggleTask: (taskId: string) => void;
  visiblePopup: string | null;
  onPopupClick: (id: string | null) => void;
  dailyRoutines: {
    [key: string]: Task[];
  } | null;
  revalidate: () => Promise<boolean>;
}

const TaskListView = ({
  taskList,
  onToggleTask,
  visiblePopup,
  onPopupClick,
  navigation,
  dailyRoutines,
  revalidate,
}: Props) => {
  const handleMoreButtonClick = (id: string) => {
    onPopupClick(id);
  };

  return (
    <>
      {taskList.length > 0 && (
        <>
          <TaskListViewGradient>
            <Svg style={{ width: '100%', position: 'absolute', top: 10, zIndex: 99 }} height={30} width="100%">
              <Defs>
                <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={SurfaceColor.DEPTH2_L} stopOpacity="1" />
                  <Stop offset="1" stopColor={SurfaceColor.DEPTH2_L} stopOpacity="0" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height={30} fill="url(#gradient)" />
            </Svg>
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
                    percent={(task.completedDateList.length || 0) / (task.timesOfDay || 0) || 0}
                    task={task}
                    onTaskItemClick={() => onToggleTask(task.taskId)}
                    visiblePopup={visiblePopup}
                    onMoreButtonClick={handleMoreButtonClick}
                    taskList={taskList}
                    dailyRoutines={dailyRoutines}
                    revalidate={revalidate}
                  />
                );
              })}
            </TaskListViewStyled>
            <Svg style={{ width: '100%', position: 'absolute', bottom: 30, zIndex: 99 }} height={30} width="100%">
              <Defs>
                <LinearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
                  <Stop offset="0" stopColor={SurfaceColor.DEPTH2_L} stopOpacity="1" />
                  <Stop offset="1" stopColor={SurfaceColor.DEPTH2_L} stopOpacity="0" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height={30} fill="url(#gradient)" />
            </Svg>
          </TaskListViewGradient>
        </>
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

const TaskListViewGradient = styled.View`
  width: 100%;
  height: auto;
  position: relative;
  top: 0;
`;

const TaskListViewStyled = styled.ScrollView`
  margin-top: 10px;
  padding-top: 10px;
`;

const EmptyView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default observer(TaskListView);
