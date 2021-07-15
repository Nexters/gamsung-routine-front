import styled from '@emotion/native';
import React, { useCallback } from 'react';

import CustomText from '~/components/CustomText';
import { TextColor } from '~/utils/color';

interface Props {
  taskName: string;
  onPress: () => void;
  has: boolean;
}

const TaskListItem = (props: Props) => {
  const { taskName, onPress, has } = props;

  const handleClick = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <TaskListItemStyled onPress={() => handleClick()}>
      {has && <TaskListItemBox />}
      <CustomText color={has ? TextColor.DISABLE : TextColor.PRIMARY}>{taskName}</CustomText>
      <TaskListItemImage
        has={has}
        source={has ? require('~/assets/icons/icon_task_clear.png') : require('~/assets/icons/icon_task.png')}
      />
    </TaskListItemStyled>
  );
};

const TaskListItemStyled = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
  background: #ffffff;
  /* Gray20 */

  border: 0.5px solid #e4e5e9;
  /* box-sizing: border-box; */
  /* Light/shadow02 */

  box-shadow: 0px 1px 6px -2px rgba(0, 0, 0, 0.04), 0px 3px 10px rgba(0, 0, 0, 0.06),
    0px 5px 22px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;

  & + & {
    margin-bottom: 20px;
  }

  position: relative;
`;

const TaskListItemBox = styled.View`
  border-bottom-color: #9399a5;
  border-bottom-width: 1px;
  width: 100%;
  position: absolute;
  background-color: red;
  left: 10px;
`;

const TaskListItemImage = styled.Image<{ has: boolean }>`
  width: ${({ has }) => (has ? '34px' : '27px')};
  height: 27px;
`;

export default TaskListItem;
