export interface Task {
  id: number;
  title: string;
  timesOfWeek: number;
  timesOfDay: number;
  percent: number;
  todayOfWeek: { count: number; endTasks: string[] };
  dayOfWeek: { count: number; endTasks: string[] }[];
}
