import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import GestureRecognizer from 'react-native-swipe-gestures';

import Icon from './Icon';
import { WheelPicker } from './WheelPicker';

import { useMonthlyTasks } from '~/apis/routinAPI';
import CustomText from '~/components/CustomText';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore, { RADIO_TYPE } from '~/stores/CalendarStore';
import { BackgroundColor, SurfaceColor, CalenderColor, TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

// ''/''/01/02/03 or 01/02/03/04/05 or 10/11/12/''/'' 노출을 위해 앞뒤로 2씩 4을 더함
const MONTH_PICKER_NUMBER = 2 + 12 + 2;
// 올해부터 앞 10년을 노출. 휠피커를 지원하기 위해 앞뒤로 2씩 더함
const YEAR_PICKER_NUMBER = 2 + 10 + 2;

export interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Calendar = ({ navigation }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const insets = useSafeAreaInsets();

  const left = CalendarStore.left.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 56],
  });

  return (
    <CalendarWrapper
      paddingTop={insets.top + 15}
      paddingBottom={insets.bottom}
      backgroundColor={BackgroundColor.DEPTH2_D}
      style={{ zIndex: 10 }}>
      <MonthHead>
        <MonthWrapper
          onPress={() => {
            setDatePickerVisibility(true);
            CalendarStore.changeIsWeek(false);
          }}>
          <CustomText font={FontType.REGULAR_TITLE_02} color={TextColor.PRIMARY_D} marginRight={4}>
            {CalendarStore.month + 1 < 10 ? `0${CalendarStore.month + 1}` : CalendarStore.month + 1}월
          </CustomText>
          <Icon type={'FULL_ARROW_DOWN'} />
        </MonthWrapper>
        <RadioWrapper>
          <Animated.View
            style={{
              left,
              position: 'absolute',
              width: CalendarStore.radio === RADIO_TYPE.루틴 ? 52 : 54,
              height: 24,
              backgroundColor: SurfaceColor.DEPTH2_D,
              borderRadius: 6,
            }}
          />
          <RadioDay onPress={() => CalendarStore.changeRadio(RADIO_TYPE.루틴)}>
            <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_D} align={Align.CENTER}>
              {RADIO_TYPE.루틴}
            </CustomText>
          </RadioDay>
          <RadioWeek onPress={() => CalendarStore.changeRadio(RADIO_TYPE.리포트)}>
            <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_D} align={Align.CENTER}>
              {RADIO_TYPE.리포트}
            </CustomText>
          </RadioWeek>
        </RadioWrapper>
        <SettingButton onPress={() => navigation.navigate('Setting')}>
          <Icon type={'SETTING'} />
        </SettingButton>
      </MonthHead>
      <CalView>
        <CalColumn>
          <Week>
            {['월', '화', '수', '목', '금', '토', '일'].map((dayOfWeek) => {
              return (
                <DayOfWeek key={dayOfWeek}>
                  <CustomText color={TextColor.PRIMARY_D} font={FontType.REGULAR_CAPTION}>
                    {dayOfWeek}
                  </CustomText>
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
              <View pointerEvents="none" style={{ position: 'absolute', top: 0, zIndex: 10 }}>
                <Svg height={55} width={Dimensions.get('window').width}>
                  <Defs>
                    <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#303133" stopOpacity="1" />
                      <Stop offset="1" stopColor="#303133" stopOpacity="0" />
                    </LinearGradient>
                  </Defs>
                  <Rect width={Dimensions.get('window').width} height={55} fill="url(#gradient)" />
                </Svg>
              </View>
              <View pointerEvents="none" style={{ position: 'absolute', bottom: 0, zIndex: 10 }}>
                <Svg height={55} width={Dimensions.get('window').width}>
                  <Defs>
                    <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#303133" stopOpacity="0" />
                      <Stop offset="1" stopColor="#303133" stopOpacity="1" />
                    </LinearGradient>
                  </Defs>
                  <Rect width={Dimensions.get('window').width} height={55} fill="url(#gradient)" />
                </Svg>
              </View>
              <View style={{ marginRight: 40, justifyContent: 'center' }}>
                <WheelPicker
                  onClick={(target) => {
                    const id = target - 2;
                    const year = parseInt(dayjs().format('YYYY'), 10);
                    if (year - 10 >= id || id > year) {
                      return;
                    }
                    CalendarStore.tempYear = id;
                    const date = `${CalendarStore.tempYear}-${
                      CalendarStore.tempMonth < 9 ? `0${CalendarStore.tempMonth}` : CalendarStore.tempMonth
                    }-01`;
                    CalendarStore.changeIsWeek(false);
                    CalendarStore.changeFirstDay(CalendarStore.getFirstDay(date));
                  }}
                  color={TextColor.PRIMARY_D}
                  onScrollEndDrag={(id) => {
                    CalendarStore.tempYear = id;
                    const date = `${CalendarStore.tempYear}-${
                      CalendarStore.tempMonth < 9 ? `0${CalendarStore.tempMonth}` : CalendarStore.tempMonth
                    }-01`;
                    CalendarStore.changeIsWeek(false);
                    CalendarStore.changeFirstDay(CalendarStore.getFirstDay(date));
                  }}
                  initHeight={(11 - (parseInt(dayjs().format('YYYY'), 10) - CalendarStore.tempYear + 2)) * 36}
                  height={36 * 5}
                  step={36}
                  items={Array.from({ length: YEAR_PICKER_NUMBER }, (_, index) => index).map((it) => {
                    return {
                      id: parseInt(dayjs().format('YYYY'), 10) - (9 - it),
                      name: it < 2 || it > 11 ? '' : `${parseInt(dayjs().format('YYYY'), 10) - (11 - it)}년`,
                    };
                  })}
                />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <WheelPicker
                  onClick={(target) => {
                    const id = target - 2;
                    if (id <= 0 || id > 12) {
                      return;
                    }
                    CalendarStore.tempMonth = id;

                    const date = `${CalendarStore.tempYear}-${
                      CalendarStore.tempMonth < 9 ? `0${CalendarStore.tempMonth}` : CalendarStore.tempMonth
                    }-01`;

                    CalendarStore.changeIsWeek(false);
                    CalendarStore.changeFirstDay(CalendarStore.getFirstDay(date));
                  }}
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
                  height={36 * 5}
                  step={36}
                  items={Array.from({ length: MONTH_PICKER_NUMBER }, (_, index) => index).map((it) => {
                    return {
                      id: it + 1,
                      name: it < 2 || it > 13 ? '' : `${it < 11 ? `0${it - 1}` : it - 1}월`,
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
  align-items: center;
  justify-content: center;
`;

const MonthWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  position: absolute;
  left: 20px;
`;

const RadioWrapper = styled.View`
  background-color: ${SurfaceColor.DEPTH1_D};
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 2px;
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

const DateTextView = styled.View<{ checkToday: boolean }>`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${({ checkToday }) => (checkToday ? SurfaceColor.DEPTH1_D : 'transparent')};
  border-radius: 100px;
  margin-top: 2px;
`;

const DayOfWeek = styled.View`
  width: ${`${(Dimensions.get('window').width - 22) / 7 - 2}px`};
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
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const SettingButton = styled.TouchableOpacity`
  align-items: center;
  position: absolute;
  right: 20px;
`;

const MonthHead = styled.View`
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
`;

const WeeklyWrapper = styled.View`
  width: 100%;
`;

const WeeklyRow = styled.View`
  width: 100%;
  height: ${`${(Dimensions.get('window').width - 22) / 7}px`};
  padding: 9px;
  margin: -9px 0;
  justify-content: center;
  align-items: center;
  padding-bottom: 13px;
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
                  (CalendarStore.focusDay.isSame(date, 'day') ? <Icon type="CROWN" /> : <Icon type="CROWN_GRAY" />)}
              </DateWrapper>
            </DayOfWeek>
            <DateTextWrapper>
              <DateTextView checkToday={dayjs().isSame(date, 'day')}>
                <CustomText
                  font={FontType.MEDIUM_CAPTION}
                  color={CalendarStore.month === date.month() ? TextColor.PRIMARY_D : TextColor.SECONDARY_D}
                  align={Align.CENTER}>
                  {date.date()}
                </CustomText>
              </DateTextView>
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
            // style={{ height: Platform.OS === 'ios' ? 'auto' : (Dimensions.get('window').width - 22) / 7 }}
            key={date.toString()}
            onPress={() => {
              CalendarStore.changeFocusDay(date);
              if (date.month() !== CalendarStore.month) {
                CalendarStore.changeFirstDay(CalendarStore.getFirstDay(date));
              }
            }}>
            <WeeklyRow>
              <View style={{ width: Dimensions.get('window').width - 40, height: '100%' }}>
                <DateWrapper
                  backgroundColor={day.isSame(date, 'day') ? CalenderColor.UNFILL_FOCUS : CalenderColor.UNFILL}>
                  <WeekGauge
                    backgroundColor={day.isSame(date, 'day') ? CalenderColor.FILL_FOCUS : CalenderColor.FILL}
                    height={percent}
                  />
                  {percent === 100 &&
                    (dayjs().isSame(date, 'day') ? <Icon type={'CROWN'} /> : <Icon type={'CROWN_GRAY'} />)}
                </DateWrapper>
              </View>
            </WeeklyRow>
            <WeekTextWrapper key={`${date}_${index}`}>
              {Array(7)
                .fill(0)
                .map((_, idx) => {
                  const textDate = date.add(idx, 'day');
                  return (
                    <DayOfWeek key={textDate.toString()}>
                      <DateTextWrapper>
                        <DateTextView checkToday={dayjs().isSame(textDate, 'day')}>
                          <CustomText
                            font={FontType.MEDIUM_CAPTION}
                            color={CalendarStore.month === date.month() ? TextColor.PRIMARY_D : TextColor.SECONDARY_D}
                            align={Align.CENTER}>
                            {textDate.date()}
                          </CustomText>
                        </DateTextView>
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
      (CalendarStore.days.length / 7 + 2) * ((Dimensions.get('window').width - 22) / 7),
    ], // <-- value that larger than your content's height: ;
  });

  const index = CalendarStore.days.findIndex((date) => {
    return date.isSame(CalendarStore.focusDay, 'day');
  });

  const maxY = CalendarStore.translation.interpolate({
    inputRange: [0, 1],
    outputRange: [-(Dimensions.get('window').width / 7 + 12 + Math.floor(index / 7) * 1) * Math.floor(index / 7), 0], // <-- value that larger than your content's height: ;
  });

  return (
    <Animated.View
      style={{
        maxHeight: maxHeight,
        overflow: 'hidden',
      }}>
      <Animated.View
        style={{
          // transform: [{ translateY: CalendarStore.isWeek ? 0 : maxY }],
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
