import React from 'react';
import { FlatList } from 'react-native';
import { ScrollingButtonMenu } from '~/components/ScrollingButtonMenu';
import styled from '@emotion/native';
import { TemplateCard } from '~/components/TemplateCard';
import { observer } from 'mobx-react';
import { AddTaskVM } from '~/screens/vm/addTaskVM';

interface Props {
  vm: AddTaskVM;
}

export const SelectCategoryWithTemplate = observer((props: Props) => {
  const { vm } = props;

  const handleCategoryPress = (id: number) => {
    vm.onSelectedCategoryIdChange(id);
  };

  const handleTemplatePress = (id: number) => {
    vm.onSelectedTemplateIdChange(id);
  };

  return (
    <CategoryViewStyled>
      <ScrollingButtonMenu data={vm.categories} selectedId={vm.selectedCategoryId} onClick={handleCategoryPress} />
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
