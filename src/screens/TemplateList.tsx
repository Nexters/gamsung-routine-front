import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useGetCategory, useTemplates } from '~/apis/templateAPI';
import CategoryView from '~/components/CategoryView';
import CustomText from '~/components/CustomText';
import Header from '~/components/Header';
import Icon from '~/components/Icon';
import { ScrollingButtonMenu } from '~/components/ScrollingButtonMenu';
import { Template } from '~/models/Template';
import { RootStackParamList } from '~/navigations/types';
import { BackgroundColor, GraphicColor, SurfaceColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const TemplateList = ({ navigation }: Props) => {
  const { data: categories = [] } = useGetCategory();
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  useEffect(() => {
    if (!selectedCategoryId && categories?.[0]?.id) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  const { data: templates = [] } = useTemplates(selectedCategoryId);

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
        <ScrollingButtonMenu data={categories} selectedId={selectedCategoryId} onClick={handleCategoryPress} />
        <CategoryView
          selectedCategoryId={selectedCategoryId}
          onTemplatePress={handleTemplatePress}
          categories={categories}
          templates={templates}
        />
      </CategoryViewStyled>
    </Frame>
  );
};

const Frame = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${SurfaceColor.DEPTH1_L};
`;

const CategoryViewStyled = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  padding: 0 10px;
  flex: 1;
`;

const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export default TemplateList;
