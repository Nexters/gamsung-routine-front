import styled from '@emotion/native';
import React, { useCallback, useEffect, useState } from 'react';

import CustomText from './CustomText';
import { FoldableSelector } from './FoldableSelector';
import { FoldableSwitch } from './FoldableSwitch';

import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import { observer } from 'mobx-react';

interface Props {
  label: string;
  type: 'SELECTOR' | 'SWITCH' | 'NONE';
  isOpen?: boolean;
  countText?: string;
  onOpen?: () => void;
  children?: React.ReactNode;
}

export const FoldableContainer: React.FC<Props> = observer(
  ({ label, type, isOpen = false, countText, onOpen, children }) => {
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
          {type === 'NONE' && children}
        </RightViewStyled>
      </FoldableContainerStyled>
    );
  },
);

const FoldableContainerStyled = styled.View`
  flex-direction: row;
`;

const RightViewStyled = styled.View`
  margin-left: auto;
  margin-right: 0;
  flex-direction: row;
`;
