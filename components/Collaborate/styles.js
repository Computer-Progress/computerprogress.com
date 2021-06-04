import styled, {keyframes} from "styled-components";
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 100px;
  width: 100%;
  height: 400px;
  box-shadow: inset 0px 60px 40px -10px rgba(255, 255, 255, 1); /* change to alter the effect*/
`;

export const Text = styled.p`
  display: flex;
  font-weight: bold;
  font-size: 2.25rem;
  margin-left:50px;
  color: ${theme.colors.primary};
`

export const Call = styled.p`
  display: flex;
  font-weight: 500;
  font-size: 1.5rem;
  margin-left:50px;
  color: ${theme.colors.primary};
`

