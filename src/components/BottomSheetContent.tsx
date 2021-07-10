import {Task} from "./Task";
import React, {useMemo} from "react";
import styled from "@emotion/native";
import {ContentScrollView, TaskType} from "../screens/AddTask";
import {RoundedCount} from "./RoundedCount";

const BottomSheetTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`

const Bar = styled.View`
  width: 60px;
  height: 4px;
  margin: 8px auto 20px;
  background: #D7D9DD;
  border-radius: 20px;
`

const BottomSheetContentView = styled.View`
  background-color: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid #D7D9DD;
  border-radius: 8px;
`;

interface Props {
    selectedTasks: TaskType[];
    onPress: (task: TaskType) => void;
}

export const BottomSheetContent = (props: Props) => {

    const {selectedTasks, onPress} = props;

    const count = useMemo(() => selectedTasks.length, [selectedTasks]);

    return (
        <BottomSheetContentView>
            <Bar/>
            <BottomSheetTitle>
                내가 선택한 태스크
                <RoundedCount count={count}/>
            </BottomSheetTitle>
            <ContentScrollView>
                {selectedTasks.map((task, index) => {
                    return (
                        <Task
                            selected={true}
                            key={index}
                            taskName={task.taskName}
                            onClick={() => onPress(task)}
                        />
                    );
                })}
            </ContentScrollView>
        </BottomSheetContentView>
    )
}
