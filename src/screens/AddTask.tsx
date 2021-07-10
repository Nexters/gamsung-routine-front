import React, {useMemo} from "react";
import {Button, Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import {NavigationProp} from "../../App";
import {Task} from "../components/Task";


export const AddTask = ({navigation}: NavigationProp) => {
    const sheetRef = React.useRef(null);

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                height: '100%',
            }}>
            <Text>Swipe down to close</Text>
            <Text>내가 선택한 태스크</Text>
            <Task taskName={'task1'}/>
            <Task taskName={'task2'}/>
        </View>
    );

    const renderTasks = useMemo(() => {
        return Array.from({length: 20}, (_, index) => ({name: `task${index}`}))
    }, [])

    return (
        <SafeAreaView
            style={{
                backgroundColor: 'yellow',
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <ScrollView>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>캘리가 처음이라면</Text>
                <Text>캘리가 처음이신가요?</Text>
                <Image source={require('./temp.png')}/>
                <Text>모두 선택하기</Text>
                <Button title={'test'} onPress={() => console.log(`test`)}/>
                {renderTasks.map(it => <Task taskName={it.name}/>)}
            </ScrollView>

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
