import styled from "styled-components";
import Button from "../Button";
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: ${({ transparentBackground }) =>
    transparentBackground
      ? "transparent"
      : "linear-gradient(268.88deg, rgba(255, 255, 255, 0.1) -7.38%, #9E1FFF 104.79%), #6047FF;"};
  width: 100%;
  padding: 0 3.75%;
  margin: 0 auto;
`;

export const Logo = styled(Button)`
  padding: 0;
`;

export const SignInButton = styled(Button)`
  color: #9e1fff !important;
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
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Auth = styled.div`
  display: flex;
  justify-content: space-between;
`;
