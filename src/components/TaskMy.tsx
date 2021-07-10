import styled from '@emotion/native';
import React, {useCallback} from 'react';
import {Image, Text, View} from 'react-native';

interface Props {
  taskName: string;
  onPress: () => void;
  has: boolean;
}

const StyledTouchableOpacity = styled.TouchableOpacity`
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

  box-shadow: 0px 1px 6px -2px rgba(0, 0, 0, 0.04),
    0px 3px 10px rgba(0, 0, 0, 0.06), 0px 5px 22px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;

  & + & {
    margin-bottom: 20px;
  }

  position: relative;
`;

export const TaskMy = (props: Props) => {
  const {taskName, onPress} = props;

  const handleClick = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <StyledTouchableOpacity onPress={() => handleClick()}>
      {props.has && (
        <View
          style={{
            borderBottomColor: '#9399A5',
            borderBottomWidth: 1,
            width: '100%',
            position: 'absolute',
            backgroundColor: 'red',
            left: 10,
          }}
        />
      )}
      <Text style={{color: props.has ? '#9399A5' : '#303339'}}>{taskName}</Text>
      <Image
        style={{width: props.has ? 34 : 27, height: 27}}
        source={
          props.has
            ? require('../assets/b_monster.png')
            : require('../assets/a_monster.png')
        }
      />
    </StyledTouchableOpacity>
  );
};
