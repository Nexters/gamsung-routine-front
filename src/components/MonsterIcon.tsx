import styled from '@emotion/native';
import React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop, SvgXml } from 'react-native-svg';

import { Weekday } from '~/models/Task';
import { RADIO_TYPE } from '~/stores/CalendarStore';
import { getFace } from '~/utils/monster';

interface Props {
  listType: RADIO_TYPE;
  data: Weekday;
}

const MonsterIconBackground = (props: Props['data']) => {
  const value = Number((props.endTasks.length / props.count || 0).toFixed(2));

  return (
    <>
      <Svg height="28" width="28">
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#C8CACF" stopOpacity="1" />
            <Stop offset={1 - value} stopColor="#C8CACF" stopOpacity="1" />
            <Stop offset={1 - value} stopColor="#a89ef2" stopOpacity="1" />
            <Stop offset="1" stopColor="#a89ef2" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          d="M26.4302 18.5071C26.4302 19.9271 26.4302 21.3671 26.4302 22.7971C26.4302 24.2271 26.7902 26.1671 24.8302 26.8571C23.1602 27.4471 22.1002 26.1671 21.2202 25.0871C19.6002 23.0871 18.1402 23.1571 16.6302 25.0871C14.6302 27.5971 12.7202 27.3571 10.8002 25.0871C9.24024 23.2371 7.80024 23.0871 6.15024 25.0871C5.29024 26.0871 4.39024 27.6071 2.64024 26.8671C0.890245 26.1271 1.03024 24.2771 1.03024 22.6871C0.877493 17.751 1.30373 12.814 2.30024 7.97712C3.30024 3.84712 5.92024 1.85712 9.99024 1.33712C22.6002 -0.252875 26.2202 3.50712 26.4302 18.5071Z"
          fill="url(#gradient)"
        />
      </Svg>
      <SvgXml style={{ position: 'absolute' }} xml={getFace(value)} />
    </>
  );
};

const MonsterIcon = ({ listType, data }: Props) => {
  return (
    <MonsterIconStyled listType={listType}>
      <MonsterIconBackground {...data} />
    </MonsterIconStyled>
  );
};

const MonsterIconStyled = styled.View<{ listType: RADIO_TYPE }>`
  width: 28px;
  height: 28px;
  position: relative;
  margin-left: ${({ listType }) => listType === RADIO_TYPE.리포트 && '6px'};
  margin-right: ${({ listType }) => (listType === RADIO_TYPE.루틴 ? '12px' : '6px')};
`;

const MonsterIconFace = styled.Image`
  position: absolute;
`;

export default MonsterIcon;
