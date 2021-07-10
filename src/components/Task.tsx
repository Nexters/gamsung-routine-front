import React, {useCallback} from "react";
import styled from "@emotion/native";

interface Props {
    taskName: string;
    onClick: () => void;
}

const TaskButton = styled.Button`
    margin-bottom: 10px;
`

export const Task = (props: Props) => {

    const {taskName, onClick} = props;

    const handleClick = useCallback(() => {
        onClick();
    }, [])

    return (
        <TaskButton title={taskName} onPress={handleClick}/>
    )
}
