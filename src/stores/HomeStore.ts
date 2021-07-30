import { Task, Weekday } from '~/models/Task';
import { makeObservable, observable } from 'mobx';

class HomeStore {
  private static _instance: HomeStore;

  private static _id: number = -1;

  taskList: Task[] = [];

  constructor() {
    makeObservable(this, {
      taskList: observable,
    });
  }

  addTask(
    title: string,
    timesOfWeeks: number,
    timesOfDay: number,
    percent: number,
    todayOfWeek: Weekday,
    dayOfWeek: Weekday[],
  ) {
    this.taskList.push({
      id: HomeStore.nextId(),
      title: title,
      timesOfWeek: timesOfWeeks,
      timesOfDay: timesOfDay,
      percent: percent,
      todayOfWeek: todayOfWeek,
      dayOfWeek: dayOfWeek,
    });
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new HomeStore();
    }
    return this._instance;
  }

  static nextId() {
    return --this._id;
  }
}

export default HomeStore.instance();


// const [taskList, setTaskList] = useState(() => {
//   return Array.from({ length: 5 }, (_, index) => ({
//     id: index + 1,
//     title: `My Task ${index + 1}`,
//     timesOfWeek: 3,
//     timesOfDay: 1,
//     percent: 15,
//     todayOfWeek: {
//       count: 3,
//       endTasks: ['1'],
//     },
//     dayOfWeek: [
//       {
//         count: 3,
//         endTasks: ['1', '2'],
//       },
//       {
//         count: 2,
//         endTasks: ['1', '2'],
//       },
//       {
//         count: 6,
//         endTasks: ['1', '2', '3', '4', '5'],
//       },
//       {
//         count: 8,
//         endTasks: ['1'],
//       },
//       {
//         count: 3,
//         endTasks: [],
//       },
//       {
//         count: 2,
//         endTasks: ['1'],
//       },
//       {
//         count: 0,
//         endTasks: [],
//       },
//     ],
//   }));
// });