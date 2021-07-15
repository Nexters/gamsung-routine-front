import styled from '@emotion/native';
import React, { useCallback } from 'react';

import CustomText from '~/components/CustomText';
import SelectTaskCover from '~/components/SelectedTaskCover';
import { TextColor } from '~/utils/color';

interface Props {
  taskName: string;
  onClick: () => void;
  selected: boolean;
}

const AddTaskItem = (props: Props) => {
  const { taskName, selected, onClick } = props;

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <TaskButton onPress={handleClick}>
      <CustomText color={selected ? TextColor.MAIN : TextColor.PRIMARY} align="center">
        {taskName}
      </CustomText>
      {selected && <SelectTaskCover />}
    </TaskButton>
  );
};

const TaskButton = styled.TouchableOpacity`
  display: flex;
  position: relative;
  font-size: 18px;
  width: 100%;
  height: 70px;
  margin-bottom: 10px;
  background-color: #fff;
  justify-content: center;
  text-align: center;
  border: 1px solid #e4e5e9;
  border-radius: 8px;
`;

export default AddTaskItem;
