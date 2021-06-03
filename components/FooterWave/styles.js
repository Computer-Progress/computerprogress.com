import styled from "styled-components";
import Wave from 'react-wavify';
import theme from "../../styles/theme";

export const FooterWave = styled(Wave)`
  position: absolute;
  margin-bottom: -5px;
  height: 300px;
`;

export const Text = styled.p`
  position: absolute;
  left: 72px;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${theme.colors.white};
  width: 35%;
`
