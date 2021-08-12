import { TemplateTask } from '~/models/TemplateTask';

export interface Template {
  id: number;
  name: string;
  tasks: TemplateTask[];
  templateIconUrl: string | null;
  description: string;
}
