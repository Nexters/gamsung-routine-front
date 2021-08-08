import { action, computed, makeObservable, observable } from 'mobx';

import { RoutineAPI } from '~/apis/routinAPI';
import { RoutineTaskUnit } from '~/models/RoutineTaskUnit';
import { TemplateTask } from '~/models/TemplateTask';

export class EditTaskStore {
  templateTaskId: number | null = null;
  taskName = '';

  days: { id: number; day: string; selected: boolean }[] = [
    { id: 1, day: '월', selected: false },
    { id: 2, day: '화', selected: false },
    { id: 3, day: '수', selected: false },
    { id: 4, day: '목', selected: false },
    { id: 5, day: '금', selected: false },
    { id: 6, day: '토', selected: false },
    { id: 7, day: '일', selected: false },
  ];

  times: { id: number; hour: number; minute: number }[] = [];

  timeOfDay = 1;
  alarm = false;

  constructor(readonly taskId: number | null = null, templateTask: TemplateTask | null = null) {
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
      isEditMode: computed,
    });

    this.loadTask(templateTask);
  }

  async loadTask(templateTask: TemplateTask | null) {
    if (templateTask) {
      // template에서 테스크 선택으로 접근
      this.taskName = templateTask.name;
      this.templateTaskId = templateTask.id;
      templateTask.defaultDays.forEach((day) => {
        const d = this.days.find((d) => day === d.id);
        if (d) {
          d.selected = true;
        }
      });
      this.timeOfDay = templateTask?.defaultTimes ?? 1;
      return;
    }

    if (this.taskId) {
      // home에서 수정으로 접근
      const data = await RoutineAPI.instance().getSingleTask(this.taskId.toString());
      this.taskName = data?.title ?? '';
      this.templateTaskId = null;
      data?.days.forEach((day) => {
        const d = this.days.find((d) => day === d.id);
        if (d) {
          d.selected = true;
        }
      });
      this.timeOfDay = data?.times.length ?? 1;
      this.times =
        data?.times.map((time, index) => {
          const temp = time.split(':');
          return {
            id: index,
            hour: Number(temp[0]),
            minute: Number(temp[1]),
          };
        }) ?? [];

      return;
    }

    // 커스텀 생성으로 접근
    this.templateTaskId = null;
    this.days.forEach((it) => (it.selected = true));
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
      id: EditTaskStore.nextId,
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

  onTaskEnd() {
    if (this.taskId) {
      RoutineAPI.instance().deleteTask(this.taskId.toString());
    }
  }

  onSave(profileUserId: string) {
    const item: RoutineTaskUnit = {
      id: this.taskId?.toString() ?? null,
      profileId: profileUserId,
      title: this.taskName,
      notify: this.alarm,
      days: this.days.filter((day) => day.selected).map((day) => day.id),
      times: this.times.map((time) => `${time.hour}:${time.minute}`),
      category: '1', // null로 보낼 경우 에러 발생
      templateId: this.templateTaskId?.toString() ?? '1', // null로 보낼 경우 에러 발생
      order: 1,
    };

    if (this.taskId) {
      RoutineAPI.instance().updateTask(item);
      return;
    }
    RoutineAPI.instance().saveTask(item);
  }

  get editableTitle() {
    return this.templateTaskId === null;
  }

  get isEditMode() {
    return this.taskId !== null;
  }

  get isValidSave() {
    return this.taskName.length > 0;
  }

  private static id = -1;

  static get nextId() {
    return --this.id;
  }
}
