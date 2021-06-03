import styled from "styled-components";
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Text = styled.p`
  font-size: 2rem;
  color: ${theme.colors.black};
`