import React from "react";
import { Wrapper, ImageWrapper, Separator } from "./styles";

import theme from "../../styles/theme";

const Task = ({ item }) => {

  return (
    <Wrapper>
      <ImageWrapper>
        <item.icon />
        <h3>{item.name}</h3>
      </ImageWrapper>
      <Separator />
      <p>{item.banchmark} benchmark(s)</p>
    </Wrapper>
  );
};

export default Task;
