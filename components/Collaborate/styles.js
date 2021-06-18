import styled, { keyframes } from "styled-components";
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 400px;
  box-shadow: inset 0px 60px 40px -10px rgba(255, 255, 255, 1); /* change to alter the effect*/
  padding: 60px 3.75%;
  padding-bottom: 300px;
  height: 500px;
  margin: 0 auto;
  margin-top: 100px;
  max-width: 1920px;
`;

export const Text = styled.p`
  display: flex;
  font-weight: bold;
  margin-bottom: 3rem;
  font-size: 2.25rem;
  color: "#2000E5";
`

export const Call = styled.p`
  display: flex;
  margin-bottom: 3rem;
  margin-top: 0;
  font-weight: 500;
  font-size: 1.5rem;
  color: "#2000E5";
`

