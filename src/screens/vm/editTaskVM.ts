import { action, computed, makeObservable, observable } from 'mobx';

import EditTaskStore from '~/stores/EditTaskStore';

export class EditTaskVM {
  taskName = '';

  days: { id: number; day: string; selected: boolean }[] = [
    { id: 1, day: '월', selected: true },
    { id: 2, day: '화', selected: true },
    { id: 3, day: '수', selected: true },
    { id: 4, day: '목', selected: true },
    { id: 5, day: '금', selected: true },
    { id: 6, day: '토', selected: true },
    { id: 7, day: '일', selected: true },
  ];

  times: { id: number; hour: number; minute: number }[] = [];

  timeOfDay = 1;
  alarm = false;

  constructor(readonly templateTaskId: string | null = null, name: string) {
    makeObservable(this, {
      days: observable,
      taskName: observable,
      timeOfDay: observable,
      times: observable,
      alarm: observable,
      onSelectDay: action,
      onChangeCountOfDay: action,
      onChangeTaskName: action,
      onChangeTimeSettingData: action,
      onChangeAlarm: action,
      editableTitle: computed,
    });
    this.taskName = name;
    this.loadTask();
  }

  loadTask() {
    // 수정으로 접근 시 task id가 있을 경우 load한다.
    // templateTaskId는 template에서 제공하는 task들의 id
    // taskId는 사용자가 선택/커스텀하여 생성한 task의 id
    // 현재 get routine api는 없음.
    this.times = [
      {
        id: 0,
        hour: 9,
        minute: 0,
      },
    ];
  }

  onSelectDay(dayId: number) {
    const day = this.days.find((d) => d.id === dayId);
    if (day) {
      day.selected = !day.selected;
    }
  }

  onChangeCountOfDay(time: number) {
    this.timeOfDay = time;
    const timeSettingData = Array.from({ length: time }).map(() => ({
      id: EditTaskVM.nextId,
      hour: 9,
      minute: 0,
    }));

    this.times = [...this.times, ...timeSettingData].slice(0, time);
  }

  onChangeTaskName(name: string) {
    this.taskName = name;
  }

  onChangeTimeSettingData(id: number, hour: number, minute: number) {
    const t = this.times.find((time) => time.id === id);
    if (t) {
      t.hour = hour;
      t.minute = minute;
    }
  }

  onChangeAlarm(isAlarm: boolean) {
    this.alarm = isAlarm;
  }

  onSave() {
    // api call은 하는거 같은데 실제 저장이 되는지를 모르겠어서 로그 남김
    console.log(
      'save data',
      this.taskName,
      this.days.filter((day) => day.selected).map((day) => day.id),
      this.times.map((time) => `${time.hour}:${time.minute}`),
      this.alarm,
      null,
      this.templateTaskId,
    );

    EditTaskStore.instance().saveTask(
      this.taskName,
      this.days.filter((day) => day.selected).map((day) => day.id),
      this.times.map((time) => `${time.hour}:${time.minute}`),
      this.alarm,
      null,
      this.templateTaskId,
    );
  }

  get editableTitle() {
    return this.templateTaskId === null;
  }

  private static id = -1;

  static get nextId() {
    return --this.id;
  }
}
