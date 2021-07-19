import styled from '@emotion/native';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dimensions, TouchableOpacity } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore : 타입이 없음
import MonthPicker from 'react-native-month-year-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

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
  // 숫자는 0~11월로 표시됨
  const [month, setMonth] = useState(firstDay.add(7, 'day').month());
  const [radio, setRadio] = useState<RADIO_TYPE>(RADIO_TYPE.일별);

  const [isWeek, setIsWeek] = useState(true);

  const monthArray = useMemo<dayjs.Dayjs[]>((): dayjs.Dayjs[] => {
    let nextWeek = firstDay;
    let arr = [] as dayjs.Dayjs[];
    if (isWeek) {
      let today = focusDay;
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
  }, [firstDay, isWeek, month, focusDay]);

  useEffect(() => {
    if (firstDay.add(7, 'day').month() !== month) {
      setMonth(firstDay.add(7, 'day').month());
    }
  }, [firstDay, month]);

  const insets = useSafeAreaInsets();

  const handleChangeFocusDay = (date: dayjs.Dayjs) => {
    setFocusDay(date);
  };

  const handleChangeFirstDay = (date: dayjs.Dayjs) => {
    setFirstDay(date);
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
        <Week>
          {['월', '화', '수', '목', '금', '토', '일'].map((dayOfWeek) => {
            return (
              <DayOfWeek key={dayOfWeek}>
                <CustomText color={TextColor.WHITE}>{dayOfWeek}</CustomText>
              </DayOfWeek>
            );
          })}
          {radio === RADIO_TYPE.일별 && (
            <Daily
              monthArray={monthArray}
              month={month}
              handleChangeFocusDay={handleChangeFocusDay}
              handleChangeFirstDay={handleChangeFirstDay}
              focusDay={focusDay}
            />
          )}
          {radio === RADIO_TYPE.주별 && (
            <Weekly
              monthArray={monthArray}
              month={month}
              handleChangeFocusDay={handleChangeFocusDay}
              handleChangeFirstDay={handleChangeFirstDay}
              focusDay={focusDay}
            />
          )}
        </Week>
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
      <Button title="토클" onPress={() => setIsWeek((prevIsWeek) => !prevIsWeek)} />
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
  width: 100%;
  margin: 0 0 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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
              <DateWrapper backgroundColor={focusDay.isSame(date) ? '#3A2E8E' : '#3F4042'}>
                <WeekGauge backgroundColor={focusDay.isSame(date) ? '#5F4BF2' : '#5B5D61'} height={50} />
                <SvgXml xml={focusDay.isSame(date) ? IconCrownSvg : IconCrownGraySvg} />
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
