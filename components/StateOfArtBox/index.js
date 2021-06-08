import React, { useEffect, useState } from "react";
import {
  Wrapper,
  StateOfArt,
  Line,
  Block,
  ModelBlock,
  ButtonWrapper,
  Button,
} from "./styles";

const StateOfArtBox = ({ data }) => {

  const [stateOfArt, setStateOfArt] = useState({});

  useEffect(() => {
    let bestIndex = 0;
    const accuracy = data.reduce((sum, curr, index) => {
      let max = Math.max(sum, curr.accuracy);
      if (max === curr.accuracy) bestIndex = index;
      return max;
    }, 0);

    setStateOfArt(data[bestIndex]);
  }, [data]);

  return (
    <Wrapper>
      <StateOfArt>State-Of-The-Art</StateOfArt>
      <div className="blockWrapper">
        <Block>
          <p>Acurracy:</p>
          <h4>{stateOfArt.accuracy * 100}<span>
            %
          </span>
          </h4>
        </Block>
        <Line />
        <Block>
          <p>Hardware Burden:</p>
          <h4>10<sup>{Math.log10(stateOfArt.hardware_burden).toFixed(2)}</sup></h4>
        </Block>
        <Line />
        <ModelBlock>
          <p>Model:</p>
          <h5>{stateOfArt.model}</h5>
        </ModelBlock>
      </div>
      <ButtonWrapper>
        <Button primary link='/tasks'>VIEW PAPER</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default StateOfArtBox;
