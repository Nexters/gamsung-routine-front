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

export const FoldableContainer = ({ label, type, isOpen, countText, onOpen }: Props) => {
  const [isExpended, setIsExpended] = useState(isOpen);

  const handleOpen = useCallback(() => {
    setIsExpended(!isExpended);
    onOpen?.();
  }, [onOpen]);

  useEffect(() => {
    setIsExpended(isExpended);
  }, [isOpen]);

  return (
    <FoldableContainerStyled>
      <CustomText font={FontType.MEDIUM_BODY_01} color={TextColor.PRIMARY}>
        {label}
      </CustomText>
      <RightViewStyled>
        {type === 'SELECTOR' && (
          <FoldableSelector countText={countText} isOpen={isExpended} onSelectorClick={handleOpen} />
        )}
        {type === 'SWITCH' && <FoldableSwitch isOn={isExpended} onToggle={handleOpen} />}
      </RightViewStyled>
    </FoldableContainerStyled>
  );
};

const FoldableContainerStyled = styled.View`
  flex-direction: row;
`;

const RightViewStyled = styled.View`
  margin-left: auto;
  margin-right: 0;
  flex-direction: row;
`;
