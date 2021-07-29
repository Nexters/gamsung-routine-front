import { action, computed, makeObservable, observable } from 'mobx';

export class EditTaskVM {
  taskName: string = '';

  day: { id: number; day: string; selected: boolean }[] = [
    { id: 1, day: '월', selected: true },
    { id: 2, day: '화', selected: true },
    { id: 3, day: '수', selected: true },
    { id: 4, day: '목', selected: true },
    { id: 5, day: '금', selected: true },
    { id: 6, day: '토', selected: true },
    { id: 7, day: '일', selected: true },
  ];

  timeOfDay: number = 1;

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
