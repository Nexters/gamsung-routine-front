export type Weekday = { count: number; endTasks: string[] };

export interface Task {
  completeCount: number;
  completedDateList: any[];
  date: string;
  days: number[];
  friendIds: any[];
  id: string;
  profileId: string;
  taskId: string;
  times: string[];
  timesOfDay: number;
  timesOfWeek: number;
  title: string;
}
