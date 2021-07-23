import styled from '@emotion/native';
import React from 'react';

import { List } from '~/models/List';
import { Weekday } from '~/models/Task';
import { getFace } from '~/utils/monster';

interface Props {
  listType: List;
  data: Weekday;
}

const MonsterIconBackground = (props: Props['data']) => {
  const value = 100 - Math.floor((props?.endTasks.length / props?.count) * 100);

  return (
    <MonsterIconBackgroundStyled>
      <MonsterIconBackgroundBack count={props?.count} value={value} />
      <MonsterIconBackgroundPrograss value={value} />
    </MonsterIconBackgroundStyled>
  );
};

const MonsterIcon = ({ listType, data }: Props) => {
  return (
    <MonsterIconStyled listType={listType}>
      <MonsterIconBackground {...data} />
      <MonsterIconFace source={getFace(data?.count, data?.endTasks.length)} />
    </MonsterIconStyled>
  );
};

const MonsterIconStyled = styled.View<{ listType: List }>`
  width: 28px;
  height: 28px;
  position: relative;
  margin-left: ${({ listType }) => listType === 'week' && '6px'};
  margin-right: ${({ listType }) => (listType === 'day' ? '12px' : '6px')};
`;

const MonsterIconFace = styled.Image`
  position: absolute;
`;

const MonsterIconBackgroundStyled = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  border-radius: 8px;
`;

const MonsterIconBackgroundBack = styled.View<{ count: number; value: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ count, value }) => (!count ? '#fff' : value ? '#a89ef2' : '#d7d9dd')};
`;

const MonsterIconBackgroundPrograss = styled.View<{ value: number }>`
  width: 100%;
  height: ${({ value }) => value + '%'};
  position: absolute;
  bottom: 0;
  background-color: #5f4bf2;
`;

export default MonsterIcon;
