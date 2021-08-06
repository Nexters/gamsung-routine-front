import { Template } from '~/models/Template';
import { GraphicColor } from '~/utils/color';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddTask: undefined;
  EditTask: {
    taskId?: number | null;
    taskName?: string | null;
    headerColor?: GraphicColor;
  };
  TaskList: { template: Template; headerColor?: GraphicColor };
  TemplateList: undefined;
};

export type TaskId = string | null;
