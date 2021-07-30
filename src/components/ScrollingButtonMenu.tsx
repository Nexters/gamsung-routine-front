import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, View } from 'react-native';

import CustomText from '~/components/CustomText';
import { Category } from '~/models/Category';
import { BackgroundColor, TextColor } from '~/utils/color';

interface Props {
  data: Category[];
  onClick?: (id: number) => void;
  selectedId: number | null;
}

export const ScrollingButtonMenu = observer((props: Props) => {
  const { data, selectedId, onClick } = props;
  const handlePress = (id: number) => {
    onClick?.(id);
  };

  return (
    <ViewStyled style={{ marginTop: 20 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MenuButtonStyled selected={item.id === selectedId} onPress={() => handlePress(item.id)}>
            <View>
              <CustomText color={item.id === selectedId ? TextColor.WHITE : TextColor.SECONDARY}>
                {item.name}
              </CustomText>
            </View>
          </MenuButtonStyled>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ViewStyled>
  );
});

const MenuButtonStyled = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 4px 16px;
  background-color: ${({ selected }) => (selected ? '#513DE5' : BackgroundColor.PRIMARY)};
  border: 1px solid #e4e5e9;
  border-radius: 20px;
  margin-right: 8px;
`;

const ViewStyled = styled.View`
  padding: 0 10px;
  margin-bottom: 36px;
`;
