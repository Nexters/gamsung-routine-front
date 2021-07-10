import React, {useState} from "react";
import {Button, SafeAreaView, Text, View} from "react-native";
import Modal from "react-native-modal";
import {NavigationProp} from "../../App";

export const Home = ({navigation}: NavigationProp) => {
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
