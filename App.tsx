import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddTask" component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

type RootStackParamList = {
  Home: undefined;
  AddTask: undefined;
};

interface Prop {
  navigation: StackNavigationProp<RootStackParamList>;
}

function Home({navigation}: Prop) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="+" onPress={() => navigation.navigate('AddTask')} />
      <Button title="Show modal" onPress={toggleModal} />

      <Modal
        isVisible={isModalVisible}
        style={{
          width: '100%',
          margin: 0,
          backgroundColor: 'rgba(25,25,25,0.8)',
          justifyContent: 'center',
          alignContent: 'center',
        }}
        backdropOpacity={0}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}>
        <View>
          <Button title="Close modal" onPress={toggleModal} />
          <Text style={{color: 'white', textAlign: 'center'}}>111</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const AddTask = ({navigation}: Prop) => {
  const sheetRef = React.useRef(null);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}>
      <Text>Swipe down to close</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'yellow',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Home')}
      />
      <BottomSheet
        ref={sheetRef}
        initialSnap={2}
        snapPoints={['85%', '10%', '10%']}
        borderRadius={10}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
};
