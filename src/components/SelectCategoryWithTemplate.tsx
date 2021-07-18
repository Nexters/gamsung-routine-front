import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { ScrollingButtonMenu } from '~/components/ScrollingButtonMenu';
import { AddTaskVM } from '~/screens/addTaskVM';
import styled from '@emotion/native';
import { TemplateCard } from '~/components/TemplateCard';
import { observer } from 'mobx-react';

interface Props {
  vm: AddTaskVM;
}

export const SelectCategoryWithTemplate = observer((props: Props) => {
  const { vm } = props;

  const handlePress = (id: number) => {
    vm.selectedCategoryId = id;
  };

  const handleTemplatePress = (id: number) => {
    vm.selectedTemplateId = id;
  };

  return (
    <CategoryViewStyled>
      <ScrollingButtonMenu data={vm.categories} selectedId={vm.selectedCategoryId} onClick={handlePress} />
      <FlatList
        data={vm.templates}
        renderItem={({ item }) => (
          <TemplateCard id={item.id} name={item.title} tasks={item.tasks} onPress={handleTemplatePress} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </CategoryViewStyled>
  );
});

const CategoryViewStyled = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: 10px;
  flex: 1;
`;
