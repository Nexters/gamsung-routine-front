import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: React.FC;
  AddTask: React.FC;
};

export interface HomeScreenProps {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: StackNavigationProp<RootStackParamList>;
}

export interface AddTaskScreenProps {
  route: RouteProp<RootStackParamList, 'AddTask'>;
  navigation: StackNavigationProp<RootStackParamList>;
}
