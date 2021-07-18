import { Task } from '~/models/Task';

export interface Template {
  id: number;
  title: string;
  tasks: Task[];
  templateIconSrc: string | null;
}
