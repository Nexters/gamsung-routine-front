import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { useGetCategory, useTemplates } from '~/apis/templateAPI';
import CustomText from '~/components/CustomText';
import Header from '~/components/Header';
import Icon from '~/components/Icon';
import Loading from '~/components/Loading';
import { ScrollingButtonMenu } from '~/components/ScrollingButtonMenu';
import { TemplateCard } from '~/components/TemplateCard';
import { Template } from '~/models/Template';
import { RootStackParamList } from '~/navigations/types';
import IndicatorStore from '~/stores/IndicatorStore';
import { BackgroundColor, GraphicColor, SurfaceColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const TemplateList: React.FC<Props> = observer(({ navigation }) => {
  const { data: categories = [] } = useGetCategory();
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories?.[0]?.id || 0);
  const { data: templates = [] } = useTemplates(selectedCategoryId);

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
      <Header
        navigation={navigation}
        title="테스크 추가"
        left={
          <AddButton
            onPress={() => {
              navigation.navigate('EditTask', { templateTask: null, taskId: null });
            }}>
            <Icon type={'ADD'} />
            <CustomText font={FontType.MEDIUM_BODY_01} color={TextColor.HIGHLIGHT} marginLeft={3}>
              직접 추가
            </CustomText>
          </AddButton>
        }
        right={
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Icon type={'CANCEL'} />
          </TouchableOpacity>
        }
        backgroundColor={BackgroundColor.DEPTH1_L}
      />
      <CategoryViewStyled>
        {IndicatorStore.count > 0 ? (
          <Loading />
        ) : (
          <>
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
          </>
        )}
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
  flex-direction: row;
  margin-left: 10px;
  margin-bottom: 15px;
`;

const CategoryViewStyled = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: 0 10px;
  flex: 1;
`;

const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
