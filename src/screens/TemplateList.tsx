import React from 'react';
import { observer } from 'mobx-react';
import { BackgroundColor, TextColor } from '~/utils/color';
import styled from '@emotion/native';
import { AddTaskVM } from './vm/addTaskVM';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '~/navigations/types';
import { ScrollingButtonMenu } from '~/components/ScrollingButtonMenu';
import { FlatList } from 'react-native';
import { TemplateCard } from '~/components/TemplateCard';
import CustomText from '~/components/CustomText';
import { FontType } from '~/utils/font';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const TemplateList: React.FC<Props> = observer(({ navigation }) => {
  const [vm] = useState<AddTaskVM>(new AddTaskVM());

  const handleCategoryPress = (id: number) => {
    vm.onSelectedCategoryIdChange(id);
  };

  const handleTemplatePress = (id: number) => {
    vm.onSelectedTemplateIdChange(id);
    navigation.navigate('TaskList', {
      templateId: id,
      vm: vm,
      headerColor: vm.templates.find((template) => template.id === id)?.color,
    });
  };

  return (
    <Frame>
      <CategoryViewStyled>
        <ScrollingButtonMenu data={vm.categories} selectedId={vm.selectedCategoryId} onClick={handleCategoryPress} />
        <CountTextWrapStyled>
          <CustomText font={FontType.REGULAR_BODY_02}>
            {vm.categories.find((category) => category.id === vm.selectedCategoryId)?.name} 템플릿&nbsp;
          </CustomText>
          <CustomText font={FontType.REGULAR_BODY_02} color={'#513DE5'}>
            {vm.templates.length}
          </CustomText>
        </CountTextWrapStyled>
        <FlatList
          data={vm.templates}
          renderItem={({ item }) => (
            <TemplateCard
              id={item.id}
              name={item.title}
              tasks={item.tasks}
              onPress={handleTemplatePress}
              cardColor={item.color}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </CategoryViewStyled>
    </Frame>
  );
});

const Frame = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${BackgroundColor.PRIMARY};
`;

const CountTextWrapStyled = styled.View`
  margin-left: 10px;
  flex-direction: row;
`;

const CategoryViewStyled = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: 10px;
  flex: 1;
`;
