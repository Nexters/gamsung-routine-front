import React from "react";
import styled from "@emotion/native";

const SelectCover = styled.View`
   position: absolute;
   display: flex;
   border-radius: 8px;
   background-color: rgb(81, 61, 229);
   opacity: 0.34;
   width: 100%;
   height: 100%;
`

const CoverImage = styled.Image`
  width: 80px;
  height: 69px;
  margin-left: auto;
`

export const SelectTaskCover = () => {

    return (
        <SelectCover>
            <CoverImage source={require('../assets/accept_area.png')}/>
        </SelectCover>
    )
}
