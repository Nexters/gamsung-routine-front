import styled from '@emotion/native';
import React from 'react';
import { FlatList } from 'react-native';

import CustomText from './CustomText';
import Loading from './Loading';

import { TemplateCard } from '~/components/TemplateCard';
import { loading } from '~/hocs/loading';
import { Category } from '~/models/Category';
import { Template } from '~/models/Template';
import IndicatorStore from '~/stores/IndicatorStore';
import { GraphicColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  selectedCategoryId: number;
  categories: Category[];
  templates: Template[];
  onTemplatePress: (template: Template, headerColor: GraphicColor) => void;
}

const CategoryView = ({ selectedCategoryId, onTemplatePress, categories, templates }: Props) => {
  const handleTemplatePress = (template: Template, headerColor: GraphicColor) => {
    onTemplatePress(template, headerColor);
  };

  return (
    <>
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
    </>
  );
};

const CountTextWrapStyled = styled.View`
  flex-direction: row;
  margin-left: 10px;
  margin-bottom: 15px;
`;

export default loading(CategoryView, () => IndicatorStore.count > 0, <Loading />);
