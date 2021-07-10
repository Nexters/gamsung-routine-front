import React, {useCallback} from 'react';
import styled from '@emotion/native';
import {View} from 'react-native';

interface Props {
  taskName: string;
  onClick: () => void;
  has: boolean;
}

const TaskButton = styled.Button`
  margin-bottom: 10px;
`;

export const Task = (props: Props) => {
  const {taskName, onClick} = props;

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <View style={{backgroundColor: props.has ? 'black' : 'white'}}>
      <TaskButton title={taskName} onPress={handleClick} />
    </View>
  );
};
