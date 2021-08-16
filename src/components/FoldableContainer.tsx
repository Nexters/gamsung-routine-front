import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';

import CustomText from './CustomText';
import { FoldableSelector } from './FoldableSelector';
import { FoldableSwitch } from './FoldableSwitch';

import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  label: string;
  type: 'SELECTOR' | 'SWITCH' | 'NONE';
  isOpen?: boolean;
  countText?: string;
  setIsOpen?: () => void;
  children?: React.ReactNode;
  disable?: boolean;
}

export const FoldableContainer: React.FC<Props> = observer(
  ({ label, type, isOpen = false, countText, setIsOpen, children, disable = false }) => {
    const [isExpanded, setIsExpanded] = useState(isOpen);

    const handleOpen = useCallback(() => {
      if (disable) return;
      setIsExpanded(!isExpanded);
      setIsOpen?.();
    }, [setIsOpen, isExpanded, disable]);

    useEffect(() => {
      setIsExpanded(isOpen);
    }, [isOpen]);

    return (
      <FoldableContainerStyled>
        <CustomText font={FontType.MEDIUM_BODY_01} color={TextColor.PRIMARY_L}>
          {label}
        </CustomText>
        <RightViewStyled>
          {type === 'SELECTOR' && (
            <FoldableSelector countText={countText} isOpen={isExpanded} onSelectorClick={handleOpen} />
          )}
          {type === 'SWITCH' && <FoldableSwitch isOn={isExpanded} onToggle={handleOpen} />}
          {type === 'NONE' && children}
        </RightViewStyled>
      </FoldableContainerStyled>
    );
  },
);

const FoldableContainerStyled = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RightViewStyled = styled.View`
  margin-left: auto;
  margin-right: 0;
  flex-direction: row;
`;
