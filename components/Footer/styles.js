import styled from "styled-components";
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  width: 100%;
`;

export const Logos = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 150px;
`;

export const Text = styled.p`
  display: flex;
  font-weight: bold;
  font-size: 1.5rem;
  margin-left:50px;
  color: ${theme.colors.white};
`

export const Copyright = styled.p`
  display: flex;
  justify-content: flex-end;
  margin-right:50px;
  color: ${theme.colors.white};
`