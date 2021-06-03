import styled from "styled-components";
import Button from "../Button";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
`;

export const Logo = styled(Button)`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  text-transform: uppercase;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #f9f9f9;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Auth = styled.div`
  display: flex;
  justify-content: space-between;
`;
