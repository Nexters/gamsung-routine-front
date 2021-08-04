import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Animated, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GestureRecognizer from 'react-native-swipe-gestures';

import Icon from './Icon';
import { WheelPicker } from './WheelPicker';

import { useMonthlyTasks } from '~/apis/routinAPI';
import CustomText from '~/components/CustomText';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore, { RADIO_TYPE } from '~/stores/CalendarStore';
import { BackgroundColor, SurfaceColor, CalenderColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

export interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Calendar = ({ navigation }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const insets = useSafeAreaInsets();

  const left = CalendarStore.left.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 53],
  });

  return (
    <CalendarWrapper
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      backgroundColor={BackgroundColor.DEPTH2_D}
      style={{ zIndex: 10 }}>
      <MonthHead>
        <MonthWrapper
          onPress={() => {
            setDatePickerVisibility(true);
            CalendarStore.changeIsWeek(false);
          }}>
          <CustomText font={FontType.REGULAR_TITLE_02} color={TextColor.PRIMARY_D}>
            {CalendarStore.month + 1}월
          </CustomText>
          <Icon type={'FULL_ARROW_DOWN'} />
        </MonthWrapper>
        <RadioWrapper>
          <Animated.View
            style={{
              left,
              position: 'absolute',
              width: 51,
              height: 24,
              backgroundColor: SurfaceColor.DEPTH2_D,
              borderRadius: 7,
            }}
          />
          <RadioDay onPress={() => CalendarStore.changeRadio(RADIO_TYPE.루틴)}>
            <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_D}>
              {RADIO_TYPE.루틴}
            </CustomText>
          </RadioDay>
          <RadioWeek onPress={() => CalendarStore.changeRadio(RADIO_TYPE.리포트)}>
            <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_D}>
              {RADIO_TYPE.리포트}
            </CustomText>
          </RadioWeek>
        </RadioWrapper>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Icon type={'SETTING'} />
        </TouchableOpacity>
      </MonthHead>
      <CalView>
        <CalColumn>
          <Week>
            {['월', '화', '수', '목', '금', '토', '일'].map((dayOfWeek) => {
              return (
                <DayOfWeek key={dayOfWeek}>
                  <CustomText color={TextColor.PRIMARY_D}>{dayOfWeek}</CustomText>
                </DayOfWeek>
              );
            })}
          </Week>
          <Container />
        </CalColumn>
        {isDatePickerVisible && (
          <>
            <BackDrop onPress={() => setDatePickerVisibility(false)} />
            <View
              style={{
                position: 'absolute',
                top: 0,
                backgroundColor: CalenderColor.UNFILL,
                opacity: 1,
                width: '100%',
                height: 198,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                zIndex: 100,
              }}>
              <View
                style={{
                  width: Dimensions.get('window').width - 50,
                  marginLeft: 25,
                  marginRight: 25,
                  height: 36,
                  position: 'absolute',
                  top: '50%',
                  transform: [{ translateY: -18 }],
                  backgroundColor: CalenderColor.FILL,
                  borderRadius: 8,
                }}
              />
              <View style={{ marginRight: 40, justifyContent: 'center' }}>
                <WheelPicker
                  color={TextColor.PRIMARY_D}
                  onScrollEndDrag={(id) => {
                    CalendarStore.tempYear = id;
                    const date = `${CalendarStore.tempYear}-${
                      CalendarStore.tempMonth < 9 ? `0${CalendarStore.tempMonth}` : CalendarStore.tempMonth
                    }-01`;
                    CalendarStore.changeIsWeek(false);
                    CalendarStore.changeFirstDay(CalendarStore.getFirstDay(date));
                  }}
                  initHeight={(9 - (parseInt(dayjs().format('YYYY'), 10) - CalendarStore.firstDay.year())) * 36}
                  height={36}
                  items={Array.from({ length: 10 }, (_, index) => index).map((it) => {
                    return {
                      id: parseInt(dayjs().format('YYYY'), 10) - (9 - it),
                      name: `${parseInt(dayjs().format('YYYY'), 10) - (9 - it)}년`,
                    };
                  })}
                />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <WheelPicker
                  color={TextColor.PRIMARY_D}
                  onScrollEndDrag={(id) => {
                    CalendarStore.tempMonth = id;
                    const date = `${CalendarStore.tempYear}-${
                      CalendarStore.tempMonth < 9 ? `0${CalendarStore.tempMonth}` : CalendarStore.tempMonth
                    }-01`;
                    CalendarStore.changeIsWeek(false);
                    CalendarStore.changeFirstDay(CalendarStore.getFirstDay(date));
                  }}
                  initHeight={CalendarStore.month * 36}
                  height={36}
                  items={Array.from({ length: 12 }, (_, index) => index).map((it) => {
                    return {
                      id: it + 1,
                      name: `${it < 9 ? `0${it + 1}` : it + 1}월`,
                    };
                  })}
                />
              </View>
            </View>
          </>
        )}
      </CalView>
    </CalendarWrapper>
  );
};
export default observer(Calendar);

const BackDrop = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  flex: 1;
  height: ${`${Dimensions.get('window').height}px`};
  background: ${BackgroundColor.DEPTH2_D};
  opacity: 0.7;
`;

const CalendarWrapper = styled.SafeAreaView<{
  paddingTop: number;
  paddingBottom: number;
  backgroundColor: BackgroundColor;
}>`
  padding-top: ${({ paddingTop }) => paddingTop}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const MonthWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const RadioWrapper = styled.View`
  background-color: ${SurfaceColor.DEPTH1_D};
  border-radius: 7px;
  width: 108px;
  height: 28px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const RadioDay = styled.TouchableOpacity`
  margin-right: 20px;
  margin-left: 13px;
`;

const RadioWeek = styled.TouchableOpacity`
  margin-right: 7px;
`;

const CalView = styled.View`
  margin: 30px auto;
  width: 100%;
  flex-wrap: wrap;
`;

const Week = styled.View`
  width: ${`${Dimensions.get('window').width}px`};
  margin: 0 0 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const CalColumn = styled(Week)`
  flex-direction: column;
`;

const DayOfWeek = styled.View`
  width: ${`${(Dimensions.get('window').width - 22) / 7}px`};
  height: ${`${(Dimensions.get('window').width - 22) / 7}px`};
  padding: 9px;
  margin: -9px 0;
  justify-content: center;
  align-items: center;
  padding-bottom: 13px;
`;

const DateWrapper = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const DateGauge = styled.View<{ backgroundColor: string; height: number }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  position: absolute;
  bottom: 0;
  flex: 1;
  width: 100%;
  height: ${({ height }) => `${height}%`};
`;

const DateTextWrapper = styled.View`
  margin-top: 4px;
  margin-bottom: 12px;
`;

const MonthHead = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
`;

const WeeklyWrapper = styled.View`
  width: 100%;
`;

const WeeklyRow = styled.View`
  flex-grow: 1;
  height: 24px;
  margin: 0 20px;
  overflow: hidden;
`;

const WeekGauge = styled(DateGauge)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  position: absolute;
  left: 0;
  flex: 1;
  height: 100%;
  width: ${({ height }) => `${height}%`};
`;

const WeekTextWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Daily = observer(() => {
  const { data, error } = useMonthlyTasks({
    profileId: '1',
    month: CalendarStore.month.toString(),
    year: CalendarStore.tempYear.toString(),
  });
  return (
    <>
      {CalendarStore.days.map((date) => {
        const today = date.format('YYYYMMDD');
        const routine = data?.dailyRoutines[today];
        const total = routine?.reduce(
          (prev, curr) => {
            return {
              completeCount: prev.completeCount + curr.completeCount,
              timesOfDay: prev.timesOfDay + curr.timesOfDay,
            };
          },
          { completeCount: 0, timesOfDay: 0 },
        );
        const percent = ((total?.completeCount || 0) / (total?.timesOfDay || 0) || 0) * 100;
        return (
          <TouchableOpacity
            key={date.toString()}
            onPress={() => {
              CalendarStore.changeFocusDay(date);
              if (date.month() !== CalendarStore.month) {
                CalendarStore.changeFirstDay(CalendarStore.getFirstDay(date));
              }
            }}>
            <DayOfWeek>
              <DateWrapper
                backgroundColor={
                  CalendarStore.focusDay.isSame(date, 'day')
                    ? `${CalenderColor.UNFILL_FOCUS}`
                    : `${CalenderColor.UNFILL}`
                }>
                <DateGauge
                  backgroundColor={
                    CalendarStore.focusDay.isSame(date, 'day') ? `${CalenderColor.FILL_FOCUS}` : `${CalenderColor.FILL}`
                  }
                  height={percent}
                />
                {percent === 100 &&
                  (CalendarStore.focusDay.isSame(date, 'day') ? <Icon type={'CROWN'} /> : <Icon type={'CROWN_GRAY'} />)}
              </DateWrapper>
            </DayOfWeek>
            <DateTextWrapper>
              <CustomText
                font={FontType.REGULAR_CAPTION}
                color={CalendarStore.month === date.month() ? TextColor.PRIMARY_D : TextColor.SECONDARY_D}
                align="center">
                {date.date()}
              </CustomText>
            </DateTextWrapper>
          </TouchableOpacity>
        );
      })}
    </>
  );
});

const Weekly = observer(() => {
  const day =
    CalendarStore.focusDay.format('ddd') === 'Sun'
      ? CalendarStore.focusDay.add(-7, 'day').day(1)
      : CalendarStore.focusDay.day(1);
  const { data, error } = useMonthlyTasks({
    profileId: '1',
    month: CalendarStore.month.toString(),
    year: CalendarStore.tempYear.toString(),
  });
  return (
    <WeeklyWrapper>
      {CalendarStore.days.map((date, index) => {
        if (index !== 0 && index % 7 !== 0) {
          return null;
        }
        let total = { completeCount: 0, timesOfDay: 0 };
        for (let i = 0; i < 7; i++) {
          const today = date.add(i, 'day').format('YYYYMMDD');
          const routine = data?.dailyRoutines[today];
          if (routine) {
            total = routine?.reduce((prev, curr) => {
              return {
                completeCount: prev.completeCount + curr.completeCount,
                timesOfDay: prev.timesOfDay + curr.timesOfDay,
              };
            }, total);
          }
        }
        const percent = ((total?.completeCount || 0) / (total?.timesOfDay || 0) || 0) * 100;

        return (
          <TouchableOpacity
            style={{ height: Platform.OS === 'ios' ? 'auto' : (Dimensions.get('window').width - 22) / 7 }}
            key={date.toString()}
            onPress={() => {
              CalendarStore.changeFocusDay(date);
              if (date.month() !== CalendarStore.month) {
                CalendarStore.changeFirstDay(CalendarStore.getFirstDay(date));
              }
            }}>
            <WeeklyRow>
              <DateWrapper
                backgroundColor={day.isSame(date, 'day') ? CalenderColor.UNFILL_FOCUS : CalenderColor.UNFILL}>
                <WeekGauge
                  backgroundColor={day.isSame(date, 'day') ? CalenderColor.FILL_FOCUS : CalenderColor.FILL}
                  height={percent}
                />
                {percent === 100 && (day.isSame(date, 'day') ? <Icon type={'CROWN'} /> : <Icon type={'CROWN_GRAY'} />)}
              </DateWrapper>
            </WeeklyRow>
            <WeekTextWrapper key={`${date}_${index}`} style={{ height: 'auto' }}>
              {Array(7)
                .fill(0)
                .map((_, idx) => {
                  const textDate = date.add(idx, 'day');
                  return (
                    <DayOfWeek key={textDate.toString()} style={{ height: 'auto' }}>
                      <DateTextWrapper>
                        <CustomText
                          font={FontType.REGULAR_CAPTION}
                          color={CalendarStore.month === textDate.month() ? TextColor.PRIMARY_D : TextColor.SECONDARY_L}
                          align="center">
                          {textDate.date()}
                        </CustomText>
                      </DateTextWrapper>
                    </DayOfWeek>
                  );
                })}
            </WeekTextWrapper>
          </TouchableOpacity>
        );
      })}
    </WeeklyWrapper>
  );
});

const Container = observer(() => {
  const ViewType = CalendarStore.radio === RADIO_TYPE.루틴 ? Daily : Weekly;

  const maxHeight = CalendarStore.translation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      (Dimensions.get('window').width - 22) / 7 + 12,
      Math.ceil(CalendarStore.days.length / 7 + 2) * ((Dimensions.get('window').width - 22) / 7),
    ], // <-- value that larger than your content's height: ;
  });

  const index = CalendarStore.days.findIndex((date) => {
    return date.isSame(CalendarStore.focusDay, 'day');
  });

  const maxY = CalendarStore.translation.interpolate({
    inputRange: [0, 1],
    outputRange: [-((Dimensions.get('window').width - 22) / 7 + 12) * (index / 7 - 1 < 0 ? 0 : index / 7 - 1), 0], // <-- value that larger than your content's height: ;
  });

  return (
    <Animated.View style={{ maxHeight: maxHeight, overflow: 'hidden' }}>
      <Animated.View
        style={{
          transform: [{ translateY: maxY }],
        }}>
        <GestureRecognizer
          onSwipeUp={() => {
            CalendarStore.changeIsWeek(true);
          }}
          onSwipeDown={() => {
            CalendarStore.changeIsWeek(false);
          }}>
          <Week>
            <ViewType />
          </Week>
        </GestureRecognizer>
      </Animated.View>
    </Animated.View>
  );
});
