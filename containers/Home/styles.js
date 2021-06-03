import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 16px;
  background: ${theme.colors.white};
  font-size: 2rem;
  width: 90vw;
  margin: 0 auto;
  /* height: 100vh; */
`;
