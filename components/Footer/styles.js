import styled from "styled-components";
import theme from "../../styles/theme";

export const HomeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  background: linear-gradient(to right, #2000e5, #8f00ff, #8f00ff, #8f00ff), #2000e5;
  font-size: .8rem;
  width: 100%;
  padding: 0 3.75%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding:0 3.75%;
  padding-top: 100px;
  max-width: 1920px;
  margin: 0 auto;
`;

export const Logos = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Text = styled.p`
  display: flex;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${theme.colors.white};
`

export const Copyright = styled.p`
  display: flex;
  justify-content: flex-end;
  color: ${theme.colors.white};
  text-align: right;
`