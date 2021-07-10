import dayjs from 'dayjs';
import React from 'react';
import {Text, View} from 'react-native';
import 'dayjs/locale/ko';

const Week = () => {
  const isSun = dayjs().format('ddd') === 'Sun';
  const day = isSun ? dayjs().add(-1, 'day') : dayjs();
  return (
    <View>
      {Array(7)
        .fill(0)
        .map((_, index) => {
          return (
            <View>
              <Text>
                {day
                  .day(index + 1)
                  .locale('ko')
                  .format('ddd')}
              </Text>
              <Text>{day.day(index + 1).date()}</Text>
            </View>
          );
        })}
    </View>
  );
};

export default Week;
