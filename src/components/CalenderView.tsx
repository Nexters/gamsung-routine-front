import React, {ComponentProps} from 'react';
// import styled from '@emotion/native';
import {Agenda} from 'react-native-calendars';

declare module 'react-native-calendars';

interface Props {
  items?: ComponentProps<typeof Agenda>['items'];
}

const items = {
  '2021-07-05': [{name: 'item 1 - any js object'}],
  '2021-07-06': [{name: 'item 1 - any js object'}],
  '2021-07-07': [{name: 'item 1 - any js object'}],
  '2021-07-08': [{name: 'item 1 - any js object'}],
  '2021-07-09': [{name: 'item 2 - any js object', height: 80}],
  '2021-07-10': [],
  '2021-07-11': [{name: 'item 3 - any js object'}, {name: 'any js object'}],
};

const CalenderView = () => {
  return (
    <>
      <Agenda
        items={items}
        renderEmptyDate={() => <span />}
        renderItem={item => {
          console.log(item);
          return <span>{item.name}</span>;
        }}
        rowHasChanged={(r1, r2) => {
          return r1.name !== r2.name;
        }}
      />
    </>
  );
};

export default CalenderView;
