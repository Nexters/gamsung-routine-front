import styled from '@emotion/native';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, ScrollView, TouchableOpacity, View } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore : 타입이 없음
import MonthPicker from 'react-native-month-year-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import GestureRecognizer from 'react-native-swipe-gestures';

import IconCrownSvg from '../assets/icons/icon_crown.svg';
import IconCrownGraySvg from '../assets/icons/icon_crown_gray.svg';

import CustomText from '~/components/CustomText';
import { BackgroundColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

enum RADIO_TYPE {
  '일별' = '일별',
  '주별' = '주별',
}

const getFirstDay = (date?: dayjs.Dayjs | string) => {
  let day = dayjs(date).locale('ko').set('date', 1);
  if (day.format('ddd') === 'Sun') {
    day = day.add(-7, 'day');
  }
  return day.day(1);
};

const Calendar = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [focusDay, setFocusDay] = useState(dayjs().locale('ko'));
  const [firstDay, setFirstDay] = useState(getFirstDay());
  const [weekDay, setWeekDay] = useState(getFirstDay());
  // 숫자는 0~11월로 표시됨
  const [month, setMonth] = useState(firstDay.add(7, 'day').month());
  const [radio, setRadio] = useState<RADIO_TYPE>(RADIO_TYPE.일별);

  const [isWeek, setIsWeek] = useState(false);

  const monthArray = useMemo<dayjs.Dayjs[]>((): dayjs.Dayjs[] => {
    let nextWeek = firstDay;
    let arr = [] as dayjs.Dayjs[];
    if (isWeek) {
      let today = weekDay;
      if (today.format('ddd') === 'Sun') {
        today = today.add(-7, 'day');
      }
      today = today.day(1);
      return Array(7)
        .fill(0)
        .map((_, index) => {
          return today.add(index, 'day');
        });
    }
    do {
      arr = [
        ...arr,
        ...Array(7)
          .fill(nextWeek)
          .map((day, index) => day.add(index, 'day')),
      ];
      nextWeek = nextWeek.add(7, 'day');
    } while (month === nextWeek.month());
    return arr;
  }, [firstDay, isWeek, month, weekDay]);

  const prevMonthArray = useMemo<dayjs.Dayjs[]>((): dayjs.Dayjs[] => {
    let nextWeek = getFirstDay(firstDay.add(7, 'day').add(-1, 'month').date(1));
    let arr = [] as dayjs.Dayjs[];
    if (isWeek) {
      let today = weekDay;
      if (today.format('ddd') === 'Sun') {
        today = today.add(-7, 'day');
      }
      today = today.day(1);
      return Array(7)
        .fill(0)
        .map((_, index) => {
          return today.add(-7, 'day').add(index, 'day');
        });
    }
    do {
      arr = [
        ...arr,
        ...Array(7)
          .fill(nextWeek)
          .map((day, index) => day.add(index, 'day')),
      ];
      nextWeek = nextWeek.add(7, 'day');
      // month가 0이면 12를 리턴
    } while ((month || 12) - 1 === nextWeek.month());
    return arr;
  }, [firstDay, isWeek, month, weekDay]);

  const nextMonthArray = useMemo<dayjs.Dayjs[]>((): dayjs.Dayjs[] => {
    let nextWeek = getFirstDay(firstDay.add(7, 'day').add(1, 'month').date(1));
    let arr = [] as dayjs.Dayjs[];
    if (isWeek) {
      let today = weekDay;
      if (today.format('ddd') === 'Sun') {
        today = today.add(-7, 'day');
      }
      today = today.day(1);
      return Array(7)
        .fill(0)
        .map((_, index) => {
          return today.add(7, 'day').add(index, 'day');
        });
    }
    do {
      arr = [
        ...arr,
        ...Array(7)
          .fill(nextWeek)
          .map((day, index) => day.add(index, 'day')),
      ];
      nextWeek = nextWeek.add(7, 'day');
      // nextWeek.month()가 0이면 12를 리턴
    } while (month + 1 === (nextWeek.month() || 12));
    return arr;
  }, [firstDay, isWeek, month, weekDay]);

  useEffect(() => {
    if (firstDay.add(7, 'day').month() !== month) {
      console.log(444, firstDay);
      console.log(555, firstDay.add(7, 'day').month());

      setMonth(firstDay.add(7, 'day').month());
    }
  }, [firstDay, month]);

  useEffect(() => {
    if (isWeek && weekDay.month() !== month) {
      setFirstDay(getFirstDay(weekDay));
    }
  }, [weekDay, month, isWeek]);

  // useEffect(() => {
  //   console.log(999, isWeek, firstDay, weekDay);

  //   if (isWeek && !firstDay.isSame(weekDay)) {
  //     // setMonth(weekDay.month());
  //     setFirstDay(weekDay);
  //   }
  // }, [firstDay, isWeek, weekDay]);

  const insets = useSafeAreaInsets();

  const handleChangeFocusDay = (date: dayjs.Dayjs) => {
    setFocusDay(date);
  };

  const handleChangeFirstDay = (date: dayjs.Dayjs) => {
    setFirstDay(date);
  };

  const handleChangeWeekDay = (date: dayjs.Dayjs) => {
    setWeekDay(date);
  };

  const handleChangeIsWeek = (bol: boolean) => {
    setIsWeek(bol);
  };

  return (
    <CalendarWrapper paddingTop={insets.top} paddingBottom={insets.bottom} backgroundColor={BackgroundColor.SECONDARY}>
      <MonthHead>
        <MonthWrapper onPress={() => setDatePickerVisibility(true)}>
          <CustomText font={FontType.REGULAR_TITLE_02} color={TextColor.WHITE}>
            {month + 1}월
          </CustomText>
          <DownIcon source={require('~/assets/icons/icon_down.svg')} />
        </MonthWrapper>
        <RadioWrapper>
          <RadioFocus left={radio === RADIO_TYPE.일별 ? 3 : 47} />
          <RadioDay onPress={() => setRadio(RADIO_TYPE.일별)}>
            <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.WHITE}>
              {RADIO_TYPE.일별}
            </CustomText>
          </RadioDay>
          <TouchableOpacity onPress={() => setRadio(RADIO_TYPE.주별)}>
            <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.WHITE}>
              {RADIO_TYPE.주별}
            </CustomText>
          </TouchableOpacity>
        </RadioWrapper>
        <SettingIcon source={require('~/assets/icons/icon_setting.svg')} />
      </MonthHead>
      <CalView>
        <CalColumn>
          <Week>
            {['월', '화', '수', '목', '금', '토', '일'].map((dayOfWeek) => {
              return (
                <DayOfWeek key={dayOfWeek}>
                  <CustomText color={TextColor.WHITE}>{dayOfWeek}</CustomText>
                </DayOfWeek>
              );
            })}
          </Week>
          <Container
            monthArray={monthArray}
            month={month}
            handleChangeFocusDay={handleChangeFocusDay}
            handleChangeFirstDay={handleChangeFirstDay}
            focusDay={focusDay}
            prevMonthArray={prevMonthArray}
            nextMonthArray={nextMonthArray}
            firstDay={firstDay}
            type={radio}
            isWeek={isWeek}
            weekDay={weekDay}
            handleChangeWeekDay={handleChangeWeekDay}
            handleChangeIsWeek={handleChangeIsWeek}
          />
        </CalColumn>
        {isDatePickerVisible && (
          <MonthPicker
            onChange={(event: unknown, newDate: dayjs.Dayjs) => {
              setDatePickerVisibility(false);
              setFirstDay(getFirstDay(newDate));
            }}
            value={new Date(firstDay.add(7, 'day').format('YYYY-MM-DD'))}
            locale="ko"
          />
        )}
      </CalView>
    </CalendarWrapper>
  );
};
export default Calendar;

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
  margin-left: 20px;
  flex-direction: row;
  align-items: center;
`;

const DownIcon = styled.Image`
  margin-left: 12px;
  width: 16px;
  height: 8px;
`;

const RadioWrapper = styled.View`
  background-color: #3f4042;
  border-radius: 7px;
  width: 101px;
  height: 28px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const RadioFocus = styled.View<{ left: number }>`
  position: absolute;
  width: 51px;
  height: 24px;
  background-color: #6b6d72;
  border-radius: 7px;
  left: ${({ left }) => left};
`;

const RadioDay = styled.TouchableOpacity`
  margin-right: 20px;
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

const SettingIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 30px;
`;

const MonthHead = styled.View`
  flex-direction: row;
  justify-content: space-between;
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

const TempView = styled.View<{ position: string }>`
  opacity: 0;
  position: ${({ position }) => position};
`;

const CalenderScrollView = styled.ScrollView<{ show: boolean }>`
  position: ${({ show }) => (show ? 'relative' : 'absolute')};
`;

interface DailyProps {
  monthArray: dayjs.Dayjs[];
  month: number;
  handleChangeFocusDay: (date: dayjs.Dayjs) => void;
  handleChangeFirstDay: (date: dayjs.Dayjs) => void;
  focusDay: dayjs.Dayjs;
}

const Daily = ({ monthArray, month, handleChangeFocusDay, handleChangeFirstDay, focusDay }: DailyProps) => {
  return (
    <>
      {monthArray.map((date) => {
        return (
          <TouchableOpacity
            key={date.toString()}
            onPress={() => {
              handleChangeFocusDay(date);
              if (date.month() !== month) {
                handleChangeFirstDay(getFirstDay(date));
              }
            }}>
            <DayOfWeek>
              <DateWrapper backgroundColor={focusDay.isSame(date) ? '#3A2E8E' : '#3F4042'}>
                <DateGauge backgroundColor={focusDay.isSame(date) ? '#5F4BF2' : '#5B5D61'} height={50} />
                <SvgXml xml={focusDay.isSame(date) ? IconCrownSvg : IconCrownGraySvg} />
              </DateWrapper>
            </DayOfWeek>
            <DateTextWrapper>
              <CustomText
                font={FontType.REGULAR_CAPTION}
                color={month === date.month() ? TextColor.ELEVATED : TextColor.SECONDARY}
                align="center">
                {date.date()}
              </CustomText>
            </DateTextWrapper>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const Weekly = ({ monthArray, month, handleChangeFocusDay, handleChangeFirstDay, focusDay }: DailyProps) => {
  const day = focusDay.format('ddd') === 'Sun' ? focusDay.add(-7, 'day').day(1) : focusDay.day(1);

  return (
    <WeeklyWrapper>
      {monthArray.map((date, index) => {
        if (index !== 0 && index % 7 !== 0) {
          return null;
        }
        return (
          <TouchableOpacity
            key={date.toString()}
            onPress={() => {
              handleChangeFocusDay(date);
              if (date.month() !== month) {
                handleChangeFirstDay(getFirstDay(date));
              }
            }}>
            <WeeklyRow>
              <DateWrapper backgroundColor={day.isSame(date) ? '#3A2E8E' : '#3F4042'}>
                <WeekGauge backgroundColor={day.isSame(date) ? '#5F4BF2' : '#5B5D61'} height={50} />
                <SvgXml xml={day.isSame(date) ? IconCrownSvg : IconCrownGraySvg} />
              </DateWrapper>
            </WeeklyRow>
            <WeekTextWrapper key={`${date}_${index}`}>
              {Array(7)
                .fill(0)
                .map((_, idx) => {
                  const textDate = date.add(idx, 'day');
                  return (
                    <DayOfWeek key={textDate.toString()}>
                      <DateTextWrapper>
                        <CustomText
                          font={FontType.REGULAR_CAPTION}
                          color={month === textDate.month() ? TextColor.ELEVATED : TextColor.SECONDARY}
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
};

interface ContainerProps extends DailyProps {
  firstDay: dayjs.Dayjs;
  weekDay: dayjs.Dayjs;
  prevMonthArray: dayjs.Dayjs[];
  nextMonthArray: dayjs.Dayjs[];
  type: RADIO_TYPE;
  isWeek: boolean;
  handleChangeWeekDay: (date: dayjs.Dayjs) => void;
  handleChangeIsWeek: (bol: boolean) => void;
}

const Container = ({
  monthArray,
  month,
  handleChangeFocusDay,
  handleChangeFirstDay,
  focusDay,
  prevMonthArray,
  nextMonthArray,
  firstDay,
  type,
  isWeek,
  handleChangeWeekDay,
  handleChangeIsWeek,
  weekDay,
}: ContainerProps) => {
  const ref = useRef<ScrollView>(null);
  const [ab, setAb] = useState<dayjs.Dayjs[]>([]);
  const [translation] = useState(new Animated.Value(0));
  const [y] = useState(new Animated.Value(0));

  useEffect(() => {
    ref.current?.scrollTo({ animated: false, x: Dimensions.get('window').width });
    setAb([]);
  }, [month, weekDay]);

  const ViewType = type === RADIO_TYPE.일별 ? Daily : Weekly;

  const maxHeight = translation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      (Dimensions.get('window').width - 22) / 7 + 12,
      Math.ceil(monthArray.length / 7 + 2) * ((Dimensions.get('window').width - 22) / 7),
    ], // <-- value that larger than your content's height: ;
  });

  const index = monthArray.findIndex((date) => {
    return date.isSame(focusDay);
  });

  const maxY = translation.interpolate({
    inputRange: [0, 1],
    outputRange: [-((Dimensions.get('window').width - 22) / 7 + 12) * (index / 7 - 1 < 0 ? 0 : index / 7 - 1), 0], // <-- value that larger than your content's height: ;
  });

  useEffect(() => {
    if (isWeek === false) {
      Animated.timing(translation, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => handleChangeIsWeek(false));
      Animated.timing(y, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [handleChangeIsWeek, isWeek, translation, y]);

  return (
    <>
      <View>
        {ab.length > 0 && (
          <Week>
            <ViewType
              monthArray={ab}
              month={month}
              handleChangeFocusDay={handleChangeFocusDay}
              handleChangeFirstDay={handleChangeFirstDay}
              focusDay={focusDay}
            />
          </Week>
        )}
        <TempView position={ab.length === 0 ? 'absolute' : 'relative'}>
          <CustomText>6주가 되면 렌더링 안되는 이슈해결을 위한 임시방편</CustomText>
        </TempView>
      </View>
      <Animated.View
        style={{
          // height: translation,
          maxHeight: maxHeight,
          transform: [{ translateY: maxY }],
        }}>
        <CalenderScrollView
          // opacity 값을 여기서 주지 않으면 적용되지 않음
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ opacity: ab.length > 0 ? 0 : 1 }}
          show={ab.length > 0 ? false : true}
          ref={ref}
          horizontal
          disableIntervalMomentum={true}
          snapToInterval={Dimensions.get('window').width}
          snapToAlignment={'center'}
          // showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const nextCurrent: number = Math.floor(e.nativeEvent.contentOffset.x / Dimensions.get('window').width);
            if (ab.length || nextCurrent === 1) {
              return;
            }
            if (nextCurrent === 0) {
              if (isWeek) {
                handleChangeWeekDay(weekDay.add(-7, 'day'));
              } else {
                handleChangeFirstDay(getFirstDay(firstDay.add(7, 'day').add(-1, 'month')));
              }

              setAb([...prevMonthArray]);
            }
            if (nextCurrent === 2) {
              if (isWeek) {
                handleChangeWeekDay(weekDay.add(7, 'day'));
              } else {
                handleChangeFirstDay(getFirstDay(firstDay.add(7, 'day').add(1, 'month')));
              }
              setAb([...nextMonthArray]);
            }
          }}>
          <Week>
            <ViewType
              monthArray={prevMonthArray}
              month={month}
              handleChangeFocusDay={handleChangeFocusDay}
              handleChangeFirstDay={handleChangeFirstDay}
              focusDay={focusDay}
            />
          </Week>
          <GestureRecognizer
            // style={{ overflow: 'hidden' }}
            onSwipeUp={(state) => {
              console.log(getFirstDay(monthArray[0]).format('YYYY-MM-DD'));
              // if (weekDay.isSame(getFirstDay(monthArray[0]))) {
              //   handleChangeWeekDay(getFirstDay(monthArray[0]));
              // }
              Animated.timing(translation, {
                toValue: 0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start(() => handleChangeIsWeek(true));
              Animated.timing(y, {
                toValue: 0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start();
            }}
            onSwipeDown={(state) => {
              handleChangeIsWeek(false);
            }}>
            <Week>
              <ViewType
                monthArray={monthArray}
                month={month}
                handleChangeFocusDay={handleChangeFocusDay}
                handleChangeFirstDay={handleChangeFirstDay}
                focusDay={focusDay}
              />
            </Week>
          </GestureRecognizer>
          <Week>
            <ViewType
              monthArray={nextMonthArray}
              month={month}
              handleChangeFocusDay={handleChangeFocusDay}
              handleChangeFirstDay={handleChangeFirstDay}
              focusDay={focusDay}
            />
          </Week>
        </CalenderScrollView>
      </Animated.View>
    </>
  );
};
