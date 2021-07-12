import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  AddTask: undefined;
  MyTask: undefined;
};

export interface NavigationProp {
  navigation: StackNavigationProp<RootStackParamList>;
}
