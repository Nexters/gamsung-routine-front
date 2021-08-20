import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, View } from 'react-native';

import CustomText from '~/components/CustomText';
import { Category } from '~/models/Category';
import { ActionColor, BackgroundColor, BorderColor, TextColor } from '~/utils/color';

interface Props {
  data: Category[];
  onClick?: (id: number) => void;
  selectedId: number | null;
}

export const ScrollingButtonMenu = observer(({ data, selectedId, onClick }: Props) => {
  const handlePress = (id: number) => {
    onClick?.(id);
  };

  return (
    <ViewStyled style={{ marginTop: 16 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <MenuButtonStyled selected={item.id === selectedId} onPress={() => handlePress(item.id)}>
              <View>
                <CustomText color={item.id === selectedId ? TextColor.PRIMARY_D : TextColor.SECONDARY_L}>
                  {item.name}
                </CustomText>
              </View>
            </MenuButtonStyled>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ViewStyled>
  );
});

const MenuButtonStyled = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 4px 16px;
  background-color: ${({ selected }) => (selected ? ActionColor.ACTIVE : BackgroundColor.DEPTH1_L)};
  border: 1px solid ${BorderColor.DEPTH2_L};
  border-radius: 20px;
  margin-right: 8px;
`;

const ViewStyled = styled.View`
  padding: 0 10px;
  margin-bottom: 36px;
`;
