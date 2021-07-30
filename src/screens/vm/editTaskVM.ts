import { action, computed, makeObservable, observable } from 'mobx';

import HomeStore from '~/stores/HomeStore';

export class EditTaskVM {
  taskName = '';

  day: { id: number; day: string; selected: boolean }[] = [
    { id: 1, day: '월', selected: true },
    { id: 2, day: '화', selected: true },
    { id: 3, day: '수', selected: true },
    { id: 4, day: '목', selected: true },
    { id: 5, day: '금', selected: true },
    { id: 6, day: '토', selected: true },
    { id: 7, day: '일', selected: true },
  ];

  timeOfDay = 1;

  constructor(readonly taskId: number | null, name: string) {
    makeObservable(this, {
      day: observable,
      timeOfDay: observable,
      onSelectDay: action,
      onChangeCountOfDay: action,
      editableTitle: computed,
    });
    this.taskName = name;
  }

  onSelectDay(dayId: number) {
    const day = this.day.find((d) => d.id === dayId);
    if (day) {
      day.selected = !day.selected;
    }
  }

  onChangeCountOfDay(time: number) {
    this.timeOfDay = time;
  }

  onSave() {
    HomeStore.addTask(
      this.taskName,
      this.day.filter((d) => d.selected).length,
      this.timeOfDay,
      30,
      {
        count: this.timeOfDay,
        endTasks: [],
      },
      Array.from({ length: 7 }, () => {
        const count = Math.floor(Math.random() * 20);
        return {
          count,
          endTasks: Array.from({ length: Math.floor(Math.random() * count) }),
        };
      }),
    );
  }

  get timeSettingData() {
    return Array.from({ length: this.timeOfDay }).map((it) => ({
      isAm: true,
      hour: 9,
      minute: 0,
    }));
  }

  get editableTitle() {
    return this.taskId === null;
  }
}
