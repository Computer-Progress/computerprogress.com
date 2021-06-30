import React from "react";
import { Wrapper, ImageWrapper, Separator, Image } from "./styles";

import theme from "../../styles/theme";

const Task = ({ item }) => {

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={item.image} />
        <h3>{item.name}</h3>
      </ImageWrapper>
      <Separator />
      <p>{item.number_of_benchmarks} benchmark(s)</p>
    </Wrapper>
  );
};

export default Task;
