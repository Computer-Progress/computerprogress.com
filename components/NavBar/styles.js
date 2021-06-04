import styled from "styled-components";
import Button from "../Button";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: transparent;
  width: 100%;
  padding:0 3.75%;
  max-width: 1920px;
  margin: 0 auto;

`;

export const Logo = styled(Button)`
padding: 0;
`;

export const LogoName = styled.h1`
padding: 0;

  margin-left: 1rem;
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  text-transform: uppercase;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #f9f9f9;
`

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Auth = styled.div`
  display: flex;
  justify-content: space-between;
`;

