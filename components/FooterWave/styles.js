import styled from "styled-components";
import Wave from 'react-wavify';

export const FooterWave = styled(Wave)`
  position: absolute;
  z-index: -1;
  height: 400px;
  bottom: 0;

  @media only screen and (max-width: 1250px) {
    height: 550px;
  }
`;
