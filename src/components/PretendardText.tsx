import styled from '@emotion/native';
import React from 'react';

interface Props {
  content: string;
  size?: number;
  weight?: number;
  color?: string;
}

const PretendardText = (props: Props) => {
  return (
    <PretendardTextStyled>
      <PretendardTextContent size={props.size} weight={props.weight} color={props.color}>
        {props.content}
      </PretendardTextContent>
    </PretendardTextStyled>
  );
};

const PretendardTextStyled = styled.View``;

const PretendardTextContent = styled.Text<{ size?: number; weight?: number; color?: string }>`
  font-family: 'Pretendard';
  font-size: ${({ size }) => (size ? size : 14) + 'px'};
  font-weight: ${({ weight }) => (weight ? weight : 400) + ''};
  color: ${({ color }) => (color ? color : '#000')};
  line-height: ${({ size }) => (size && size * 1.5) + 'px'};
`;

export default PretendardText;
