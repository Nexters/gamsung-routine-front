import React from "react";
import styled from "@emotion/native";

interface Props {
    taskName: string;
}

const TaskButton = styled.Button`
    margin-bottom: 10px;
`

export const Task = (props: Props) => {

    const {taskName} = props;

    return (
        <TaskButton title={taskName} onPress={() => console.log(`tset click ${taskName}`)}/>
    )
}
