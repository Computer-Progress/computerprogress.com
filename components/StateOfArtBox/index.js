import React from "react";
import {
  Wrapper,
  StateOfArt,
  Acurracy,
  Percentage,
  Line,
  Block,
  ModelBlock,
  ButtonWrapper
} from "./styles";

import theme from "../../styles/theme";
import Button from "../../components/Button"

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
      <ButtonWrapper>
        <Button primary link='/domains'>ViewPaper</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default StateOfArtBox;
