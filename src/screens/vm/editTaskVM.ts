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

  async loadTask() {
    /**
     * TODO
     * templateTaskId: 제공하는 템플릿들이 가진 테스크 ID
     * taskId: 생성된 테스크 ID
     *
     * 1. 템플릿으로 접근
     *    -> 템플릿에서 제공하는 태스크 중 선택한 태스크의 ID로 데이터 조회하여 초기값 설정
     *    (templateTaskId: none null, taskId: null)
     *    - templateTaskId를 사용하여 조회
     *
     * 2. 커스텀 생성으로 접근
     *    -> 템플릿테스크를 null로 하여 초기값 설정 (조회X)
     *    (templateTaskId: null, taskId: null)
     *    - 조회 X
     *
     * 3. 수정으로 접근
     *    -> 만들어진 태스크의 ID로 데이터를 조회하여 초기값 설정
     *    (templateTaskId: null, taskId: none null)
     *    - taskId를 사용하여 조회
     */
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
