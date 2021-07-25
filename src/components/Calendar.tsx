import styled from '@emotion/native';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore : 타입이 없음
import MonthPicker from 'react-native-month-year-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import GestureRecognizer from 'react-native-swipe-gestures';

import IconCrownSvg from '../assets/icons/icon_crown.svg';
import IconCrownGraySvg from '../assets/icons/icon_crown_gray.svg';

import CustomText from '~/components/CustomText';
import CalendarStore from '~/stores/CalendarStore';
import { BackgroundColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

enum RADIO_TYPE {
  '일별' = '일별',
  '주별' = '주별',
}

const Calendar = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [radio, setRadio] = useState<RADIO_TYPE>(RADIO_TYPE.일별);
  const insets = useSafeAreaInsets();

  return (
    <CalendarWrapper paddingTop={insets.top} paddingBottom={insets.bottom} backgroundColor={BackgroundColor.SECONDARY}>
      <MonthHead>
        <MonthWrapper onPress={() => setDatePickerVisibility(true)}>
          <CustomText font={FontType.REGULAR_TITLE_02} color={TextColor.WHITE}>
            {CalendarStore.month + 1}월
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
          <Container type={radio} />
        </CalColumn>
        {isDatePickerVisible && (
          <MonthPicker
            onChange={(event: unknown, newDate: dayjs.Dayjs) => {
              setDatePickerVisibility(false);
              CalendarStore.changeFirstDay(CalendarStore.getFirstDay(newDate));
              console.log(9999, CalendarStore.getFirstDay(newDate));
            }}
            value={new Date(CalendarStore.firstDay.add(7, 'day').format('YYYY-MM-DD'))}
            locale="ko"
          />
        )}
      </CalView>
    </CalendarWrapper>
  );
};
export default observer(Calendar);

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

const Daily = observer(() => {
  return (
    <>
      {CalendarStore.days.map((date) => {
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
              <DateWrapper backgroundColor={CalendarStore.focusDay.isSame(date, 'day') ? '#3A2E8E' : '#3F4042'}>
                <DateGauge
                  backgroundColor={CalendarStore.focusDay.isSame(date, 'day') ? '#5F4BF2' : '#5B5D61'}
                  height={50}
                />
                <SvgXml xml={CalendarStore.focusDay.isSame(date, 'day') ? IconCrownSvg : IconCrownGraySvg} />
              </DateWrapper>
            </DayOfWeek>
            <DateTextWrapper>
              <CustomText
                font={FontType.REGULAR_CAPTION}
                color={CalendarStore.month === date.month() ? TextColor.ELEVATED : TextColor.SECONDARY}
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

  return (
    <WeeklyWrapper>
      {CalendarStore.days.map((date, index) => {
        if (index !== 0 && index % 7 !== 0) {
          return null;
        }
        return (
          <TouchableOpacity
            key={date.toString()}
            onPress={() => {
              CalendarStore.changeFocusDay(date);
              if (date.month() !== CalendarStore.month) {
                CalendarStore.changeFirstDay(CalendarStore.getFirstDay(date));
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
                          color={CalendarStore.month === textDate.month() ? TextColor.ELEVATED : TextColor.SECONDARY}
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

interface ContainerProps {
  type: RADIO_TYPE;
}

const Container = observer(({ type }: ContainerProps) => {
  const ViewType = type === RADIO_TYPE.일별 ? Daily : Weekly;

  const maxHeight = CalendarStore.translation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      (Dimensions.get('window').width - 22) / 7 + 12,
      Math.ceil(CalendarStore.days.length / 7 + 2) * ((Dimensions.get('window').width - 22) / 7),
    ], // <-- value that larger than your content's height: ;
  });

  const index = CalendarStore.days.findIndex((date) => {
    return date.isSame(CalendarStore.focusDay);
  });

  const maxY = CalendarStore.translation.interpolate({
    inputRange: [0, 1],
    outputRange: [-((Dimensions.get('window').width - 22) / 7 + 12) * (index / 7 - 1 < 0 ? 0 : index / 7 - 1), 0], // <-- value that larger than your content's height: ;
  });

  return (
    <View>
      <Animated.View
        style={{
          maxHeight: maxHeight,
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
    </View>
  );
});
