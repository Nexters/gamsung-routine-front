import styled from '@emotion/native';
import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Image } from 'react-native';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import CustomText from './CustomText';

interface Props {
  label: string;
  countText: string;
  isOpen: boolean;
  onOpen?: () => void;
}

export const FoldableContainer = (props: Props) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  const handleOpen = useCallback(() => {
    setIsOpen(!isOpen);
    props.onOpen?.();
  }, [props.onOpen]);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <FoldableContainerStyled>
      <CustomText font={FontType.MEDIUM_BODY_01} color={TextColor.PRIMARY}>
        {props.label}
      </CustomText>
      <RightViewStyled>
        <SelectorStyled onPress={handleOpen}>
          <CustomText font={FontType.MEDIUM_BODY_01} color={TextColor.PRIMARY}>
            {props.countText}
          </CustomText>
          <Image
            style={{ width: 24, height: 24, marginLeft: 6 }}
            source={
              isOpen ? require('~/assets/icons/icon_arrow_up.png') : require('~/assets/icons/icon_arrow_down.png')
            }
          />
        </SelectorStyled>
      </RightViewStyled>
    </FoldableContainerStyled>
  );
};

const FoldableContainerStyled = styled.View`
  display: flex;
  flex-direction: row;
`;

const RightViewStyled = styled.View`
  margin-left: auto;
  margin-right: 0;
  flex-direction: row;
`;

const SelectorStyled = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;
