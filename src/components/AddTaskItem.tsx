import styled from '@emotion/native';
import React, { useCallback } from 'react';

import CustomText from '~/components/CustomText';
import { BackgroundColor, TextColor } from '~/utils/color';
import { Align } from '~/utils/font';

interface Props {
  taskName: string;
  onClick: () => void;
  selected?: boolean;
}

const AddTaskItem = ({ taskName, onClick }: Props) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <TaskButton onPress={handleClick}>
      <CustomText color={TextColor.PRIMARY_L} align={Align.CENTER}>
        {taskName}
      </CustomText>
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
  background-color: ${BackgroundColor.DEPTH1_L};
  justify-content: center;
  text-align: center;
  border-radius: 8px;
`;

export default AddTaskItem;
