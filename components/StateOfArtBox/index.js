import React, { useEffect, useState } from "react";
import {
  Wrapper,
  StateOfArt,
  Line,
  Block,
  ModelBlock,
  ButtonWrapper,
  ViewPaperButton,
  HardwareBurdenTooltip,
  PurpleInfoIcon
} from "./styles";

import { Tooltip, IconButton } from '@material-ui/core';

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
          <HardwareBurdenTooltip>
            <p>Hardware Burden</p>
            <Tooltip title="The computational capability of the hardware used to train the model, calculated as the number of processors multiplied by the computation rate and time.">
              <IconButton aria-label="info">
                <PurpleInfoIcon />
              </IconButton>
            </Tooltip>
            <p>  :</p>
          </HardwareBurdenTooltip>
          <h4>10<sup>{Math.log10(stateOfArt.hardware_burden).toFixed(1)}</sup></h4>
        </Block>
        <Line />
        <ModelBlock>
          <p>Model:</p>
          <h5>{stateOfArt.model}</h5>
        </ModelBlock>
      </div>
      <ButtonWrapper>
        <ViewPaperButton primary link='/tasks'>VIEW PAPER</ViewPaperButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default StateOfArtBox;
