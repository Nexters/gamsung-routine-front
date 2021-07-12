import styled from '@emotion/native';
import React, { useCallback } from 'react';
import { Text } from 'react-native';

import { SelectTaskCover } from './SelectedTaskCover';

interface Props {
  taskName: string;
  onClick: () => void;
  selected: boolean;
}

const TaskButton = styled.TouchableOpacity<{ selected: boolean }>`
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

export const Task = (props: Props) => {
  const { taskName, selected, onClick } = props;

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <TaskButton selected={selected} onPress={handleClick}>
      <Text
        style={{
          textAlign: 'center',
          color: selected ? 'rgba(201, 204, 210, 1)' : 'rgba(48, 51, 57, 1)',
        }}>
        {taskName}
      </Text>
      {selected && <SelectTaskCover />}
    </TaskButton>
  );
};
