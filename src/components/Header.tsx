import styled from '@emotion/native';
import React from 'react';

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left, right }: Props) => {
  return (
    <HeaderStyled>
      <HeaderLeft>{left}</HeaderLeft>
      <HeaderRight>{right}</HeaderRight>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  margin-top: 25px;
  padding: 0 24px;
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default Header;
