import dayjs from 'dayjs';
import { action, makeObservable, observable } from 'mobx';
import { Animated, Easing } from 'react-native';

export enum RADIO_TYPE {
  '루틴' = '루틴',
  '리포트' = '리포트',
}

class CalendarStore {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: CalendarStore;
  focusDay = dayjs().locale('ko');
  firstDay = this.getFirstDay();
  month = this.getFirstDay().add(7, 'day').month();
  isWeek = true;
  weekDay = this.getMonday(this.focusDay);
  tempYear = parseInt(dayjs().format('YYYY'), 10);
  tempMonth = parseInt(dayjs().format('MM'), 10);

  days = this.getDays();

  translation = new Animated.Value(0);
  y = new Animated.Value(0);

  radio = RADIO_TYPE.루틴;
  left = new Animated.Value(0);

  constructor() {
    makeObservable(this, {
      focusDay: observable,
      firstDay: observable,
      month: observable,
      isWeek: observable,
      days: observable,
      radio: observable,

      changeFirstDay: action,
      changeIsWeek: action,
      changeWeekDay: action,
    });
  }

  changeFocusDay(date: dayjs.Dayjs) {
    this.focusDay = date;
    if (this.isWeek) {
      this.weekDay = this.getMonday(date);
    }
    if (this.focusDay.month() !== this.month) {
      this.month = date.add(7, 'day').month();
      this.changeFirstDay(this.getFirstDay(date));
      this.days = this.getDays();
    }
  }

  changeFirstDay(date: dayjs.Dayjs) {
    this.firstDay = date;
    if (date.add(7, 'day').month() !== this.month) {
      this.month = date.add(7, 'day').month();
    }
    this.days = this.getDays();
  }

  changeIsWeek(isWeek: boolean) {
    this.isWeek = isWeek;
    if (!isWeek) {
      this.days = this.getDays();
      Animated.parallel([
        Animated.timing(this.translation, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(this.y, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      this.days = this.getDays();
      Animated.parallel([
        Animated.timing(this.translation, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(this.y, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start(() => {
        if (this.focusDay.month() === this.month) {
          this.changeWeekDay(this.getMonday(this.focusDay));
        } else {
          this.changeWeekDay(this.days[0]);
        }
      });
    }
  }

  changeWeekDay(date: dayjs.Dayjs) {
    this.weekDay = date;
    this.days = this.getDays();
  }

  changeRadio(type: RADIO_TYPE) {
    this.radio = type;
    if (this.radio === RADIO_TYPE.루틴) {
      Animated.timing(this.left, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(this.left, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }

  getFirstDay(date?: dayjs.Dayjs | string) {
    let day = dayjs(date).locale('ko').set('date', 1);
    if (day.format('ddd') === 'Sun') {
      day = day.add(-7, 'day');
    }
    return day.day(1);
  }

  getMonday(date?: dayjs.Dayjs | string) {
    let day = dayjs(date).locale('ko');
    if (day.format('ddd') === 'Sun') {
      day = day.add(-7, 'day');
    }
    return day.day(1);
  }

  getDays() {
    let nextWeek = this.firstDay;
    let arr = [] as dayjs.Dayjs[];

    if (this.isWeek) {
      let today = this.weekDay;
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
    } while (this.month === nextWeek.month());
    return arr;
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new CalendarStore();
    }
    return this._instance;
  }
}

export default CalendarStore.instance();
