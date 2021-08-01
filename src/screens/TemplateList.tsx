import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { AddTaskVM } from './vm/addTaskVM';

import { useGetCategory, useTemplates } from '~/apis/templateAPI';
import CustomText from '~/components/CustomText';
import { ScrollingButtonMenu } from '~/components/ScrollingButtonMenu';
import { TemplateCard } from '~/components/TemplateCard';
import { Template } from '~/models/Template';
import { RootStackParamList } from '~/navigations/types';
import { GraphicColor, SurfaceColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const TemplateList: React.FC<Props> = observer(({ navigation }) => {
  const { data: categories = [] } = useGetCategory();
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories?.[0]?.id || 0);
  const { data: templates = [] } = useTemplates(selectedCategoryId);

  const [vm] = useState<AddTaskVM>(new AddTaskVM());

  useEffect(() => {
    if (!selectedCategoryId && categories?.[0]?.id) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);
  const handleCategoryPress = (id: number) => {
    setSelectedCategoryId(id);
  };

  const handleTemplatePress = (template: Template, headerColor: GraphicColor) => {
    navigation.navigate('TaskList', {
      template,
      headerColor,
    });
  };

  return (
    <Frame>
      <CategoryViewStyled>
        <ScrollingButtonMenu data={categories} selectedId={selectedCategoryId} onClick={handleCategoryPress} />
        <CountTextWrapStyled>
          <CustomText font={FontType.REGULAR_BODY_02}>
            {categories.find((category) => category.id === selectedCategoryId)?.name} 템플릿&nbsp;
          </CustomText>
          <CustomText font={FontType.BOLD_BODY_02} color={TextColor.HIGHLIGHT}>
            {templates.length}
          </CustomText>
        </CountTextWrapStyled>
        <FlatList
          data={templates}
          renderItem={({ item: template }) => {
            const GRAPHIC_COLORS = [
              GraphicColor.RED,
              GraphicColor.SKYBLUE,
              GraphicColor.GREEN,
              GraphicColor.YELLOW,
              GraphicColor.PURPLE,
            ];
            const headerColor = GRAPHIC_COLORS[template.id % GRAPHIC_COLORS.length];
            return (
              <TemplateCard
                id={template.id}
                name={template.name}
                tasks={template.tasks}
                onPress={() => handleTemplatePress(template, headerColor)}
                cardColor={headerColor}
              />
            );
          }}
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
  background-color: ${SurfaceColor.DEPTH1_L};
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
