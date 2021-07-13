import styled from '@emotion/native';
import React, { useCallback } from 'react';

import SelectTaskCover from '~/components/SelectedTaskCover';

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
      <TaskButtonText selected={selected}>{taskName}</TaskButtonText>
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

const TaskButtonText = styled.Text<{ selected: boolean }>`
  text-align: center;
  color: ${(props) => (props.selected ? 'rgba(201, 204, 210, 1)' : 'rgba(48, 51, 57, 1)')};
`;

export default AddTaskItem;
