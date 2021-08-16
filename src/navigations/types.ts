import { Task } from '~/models/Task';
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
  InviteIntro: undefined;
  InviteAccept: {
    task: Task;
  };
  InviteDetail: {
    task: Task;
  };
};

export type TaskId = string | null;
