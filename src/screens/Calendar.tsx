import styled from '@emotion/native';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import MonthPicker from 'react-native-month-year-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

  const monthArray = useMemo<dayjs.Dayjs[]>((): dayjs.Dayjs[] => {
    let nextWeek = firstDay;
    let monthArray = [] as dayjs.Dayjs[];
    do {
      monthArray = [
        ...monthArray,
        ...Array(7)
          .fill(nextWeek)
          .map((day, index) => day.add(index, 'day')),
      ];
      nextWeek = nextWeek.add(7, 'day');
    } while (month === nextWeek.month());
    return monthArray;
  }, [firstDay, month]);

  useEffect(() => {
    if (firstDay.add(7, 'day').month() !== month) {
      setMonth(firstDay.add(7, 'day').month());
    }
  }, [firstDay]);

  const insets = useSafeAreaInsets();

  return (
    <CalendarWrapper paddingTop={insets.top} paddingBottom={insets.bottom} backgroundColor={BackgroundColor.SECONDARY}>
      <MonthHead>
        <MonthWrapper onPress={() => setDatePickerVisibility(true)}>
          <CustomText font={FontType.REGULAR_TITLE_02} color={TextColor.WHITE}>
            {month + 1}월
          </CustomText>
          <DownIcon source={require('~/assets/icons/icon_down.png')} />
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
        <SettingIcon source={require('~/assets/icons/icon_setting.png')} />
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
          {monthArray.map((date) => {
            return (
              <TouchableOpacity
                key={date.toString()}
                onPress={() => {
                  setFocusDay(date);
                  if (date.month() !== month) {
                    setFirstDay(getFirstDay(date));
                  }
                }}>
                <DayOfWeek>
                  <DateWrapper backgroundColor={focusDay.isSame(date) ? '#3A2E8E' : '#3F4042'}>
                    <DateGauge backgroundColor={focusDay.isSame(date) ? '#5F4BF2' : '#5B5D61'} height={50} />
                    <CrownIcon
                      source={
                        focusDay.isSame(date)
                          ? require('~/assets/icons/icon_crown.png')
                          : require('~/assets/icons/icon_crown_gray.png')
                      }
                    />
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
        </Week>
        {isDatePickerVisible && (
          <MonthPicker
            onChange={(event: any, newDate: any) => {
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

const CrownIcon = styled.Image`
  width: 16px;
  height: 8px;
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
