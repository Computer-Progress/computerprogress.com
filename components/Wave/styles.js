import styled from "styled-components";
import ReactWave from "react-wavify";
import theme from "../../styles/theme";

export const Wave = styled(ReactWave)`
  transform: rotate(180deg);
  position: absolute;
  top: 0;
  z-index: -1;
  height: 350px;
`;

export const Text = styled.p`
  font-size: 1.5rem;
  padding-bottom: 50px;
  color: ${theme.colors.white};
  width: 45%;
`;

export const TextWrapper = styled.div`
  width: 100%;
  padding: 60px 3.75%;
  margin: 0 auto;
  max-width: 1920px;
  position: relative;
`;
