import React from "react";
import {
  Wrapper,
  StateOfArt,
  Acurracy,
  Percentage,
  Line,
  Block,
  ModelBlock,
} from "./styles";

import theme from "../../styles/theme";

const StateOfArtBox = ({ items, onClick }) => {
  return (
    <Wrapper>
      <StateOfArt>{"State-Of-The-Art"}</StateOfArt>
      <Acurracy> {"Acurracy:"}</Acurracy>
      <Percentage>{"83%"}</Percentage>
      <Line />
      <Block>
        <p>Computation - Hardware burden</p>
        <h4>10e+12.22</h4>
      </Block>
      <Line />
      <ModelBlock>
        <p>Model</p>
        <h5>NASNetA (6@4032)</h5>
      </ModelBlock>
    </Wrapper>
  );
};

export default StateOfArtBox;
