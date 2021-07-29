import { AddTaskVM } from '~/screens/vm/addTaskVM';
import { GraphicColor } from '~/utils/color';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddTask: undefined;
  EditTask: { taskId: TaskId, taskName: string };
  TaskList: { templateId: number | null; vm: AddTaskVM; headerColor?: GraphicColor };
  TemplateList: undefined;
};

export type TaskId = number | null;
