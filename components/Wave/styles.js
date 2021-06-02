
import styled from "styled-components";
import Wave from 'react-wavify';
import theme from "../../styles/theme";

export const Header = styled(Wave)`
  transform: rotate(180deg);
  margin-top: -5px;
  height: 300px;
`;

export const Wrapper = styled.div`
  position: relative;
`

export const Text = styled.p`
  position: absolute;
  top: 100px;
  left: 72px;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${theme.colors.white};
  width: 35%;
`
