import React from 'react';
import { FlatList, View } from 'react-native';
import CustomText from '~/components/CustomText';
import styled from '@emotion/native';
import { BackgroundColor, TextColor } from '~/utils/color';
import { Category } from '~/models/Category';
import { observer } from 'mobx-react';

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
    <ViewStyled>
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
  background-color: ${({ selected }) => (selected ? BackgroundColor.SECONDARY : BackgroundColor.ELEVATED)};
  border: 1px solid ${TextColor.DISABLE};
  border-radius: 20px;
  margin-right: 8px;
`;

const ViewStyled = styled.View`
  padding: 0 10px;
  margin-bottom: 40px;
`;
