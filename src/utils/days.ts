import CalendarStore from '~/stores/CalendarStore';

const days = ['월', '화', '수', '목', '금', '토', '일'];

export const getDay = (day: number) => {
  return days[day - 1];
};

export const getWeek = () => {
  return Math.floor(
    CalendarStore.days.findIndex((date) => {
      return date.isSame(CalendarStore.focusDay, 'day');
    }) / 7,
  );
};
