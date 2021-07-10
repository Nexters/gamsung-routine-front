import React, {useMemo, useState} from 'react';
import {SafeAreaView,} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {NavigationProp} from '../../App';
import {Task} from '../components/Task';
import styled from "@emotion/native";
import {BottomSheetContent} from "../components/BottomSheetContent";

export type TaskType = {
    id: number;
    taskName: string;
}

export const ContentScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 20px;
`

export const AddTask = ({navigation}: NavigationProp) => {
    const sheetRef = React.useRef(null);

    const [selectedTasks, setSelectedTasks] = useState<TaskType[]>([]);

    const onPress = (selectedTask: TaskType) => {
        setSelectedTasks(oldSelectedTasks => {
            const has = oldSelectedTasks.some(task => {
                return task.id === selectedTask.id;
            });
            if (has) {
                return oldSelectedTasks.filter(task => {
                    return task.id !== selectedTask.id;
                });
            }
            return [...oldSelectedTasks, selectedTask];
        });
    };

    const tempTasks = useMemo(() => {
        return Array.from({length: 20}, (_, index) => ({
            id: index,
            taskName: `task${index}`,
        }));
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F2F2F4'
            }}>
            <ContentScrollView>
                {tempTasks.map(task => {
                    const has = selectedTasks.some(selectedTask => {
                        return selectedTask.id === task.id;
                    });
                    return (
                        <Task
                            selected={has}
                            taskName={task.taskName}
                            onClick={() => onPress(task)}
                        />
                    );
                })}
            </ContentScrollView>
            <BottomSheet
                ref={sheetRef}
                initialSnap={2}
                snapPoints={['85%', '15%', '15%']}
                borderRadius={8}
                renderContent={() => <BottomSheetContent selectedTasks={selectedTasks} onPress={onPress}/>}
                enabledInnerScrolling
            />
        </SafeAreaView>
    );
};
