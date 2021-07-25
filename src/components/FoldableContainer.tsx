import styled from '@emotion/native';
import React, { useCallback, useEffect, useState } from 'react';

import CustomText from './CustomText';
import { FoldableSelector } from './FoldableSelector';
import { FoldableSwitch } from './FoldableSwitch';

import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  label: string;
  type: 'SELECTOR' | 'SWITCH';
  isOpen: boolean;
  countText?: string;
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
        {props.type === 'SELECTOR' && (
          <FoldableSelector countText={props?.countText} isOpen={props.isOpen} onSelectorClick={handleOpen} />
        )}
        {props.type === 'SWITCH' && <FoldableSwitch isOn={props.isOpen} onToggle={handleOpen} />}
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
