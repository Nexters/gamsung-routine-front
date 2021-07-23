export type Weekday = { count: number; endTasks: string[] };

export interface Task {
  id: number;
  title: string;
  timesOfWeek: number;
  timesOfDay: number;
  percent: number;
  todayOfWeek: Weekday;
  dayOfWeek: Weekday[];
}
