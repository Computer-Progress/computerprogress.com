import React from "react";
import { Wrapper, StateOfArt, Acurracy, Percentage, Line } from "./styles";

import theme from "../../styles/theme";

const StateOfArtBox = ({ items, onClick }) => {
  return (
    <Wrapper>
      <StateOfArt>{"State-Of-The-Art"}</StateOfArt>
      <Acurracy> {"Acurracy:"}</Acurracy>
      <Percentage>{"83%"}</Percentage>
      <Line></Line>
    </Wrapper>
  );
};

export default StateOfArtBox;
