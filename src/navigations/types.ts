import { RoutineTaskUnit } from '~/models/RoutineTaskUnit';
import { Template } from '~/models/Template';
import { TemplateTask } from '~/models/TemplateTask';
import { GraphicColor } from '~/utils/color';

export type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  Home: undefined;
  AddTask: undefined;
  EditTask: {
    templateTask: TemplateTask | null;
    taskId: string | null;
  };
  TaskList: { template: Template; headerColor?: GraphicColor };
  TemplateList: undefined;
  Setting: undefined;
  InviteIntro: { taskId: string };
  InviteAccept: {
    task: RoutineTaskUnit;
  };
  InviteDetail: {
    taskId: string;
  };
};

export type TaskId = string | null;
