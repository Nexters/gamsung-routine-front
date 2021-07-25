import { TemplateTask } from '~/models/TemplateTask';

export interface Template {
    id: number;
    title: string;
    tasks: TemplateTask[];
    templateIconSrc: string | null;
}
