export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddTask: undefined;
  EditTask: { taskId: TaskId };
};

export type TaskId = number | null;
