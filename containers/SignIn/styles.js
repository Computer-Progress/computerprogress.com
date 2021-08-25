import styled from "styled-components";
import theme from "../../styles/theme";
import { Box, Divider as MaterialDivider, TextField } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "../../components/Button";

export const Container = styled.div`
  background: ${theme.colors.white};
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: center;
  margin: 50px 0px 20px 0px;
  width: 100%;
   div p {
     font-size: 15px;
   }

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.6;
`;

export const StyledBox = styled(Box).attrs({
  borderRadius: 15,
  boxShadow: 1,
  padding: 3,
  paddingBottom: 5,
})`
  flex: 0.35;
  h2 {
    font-weight: normal;
  }
`;

export const Input = styled(TextField).attrs({
  variant: "outlined",
})`
  width: 100%;
  margin-bottom: 12px !important;
`;

export const Question = styled.p`
  color: ${({ button }) =>
    button ? theme.colors.primary : theme.colors.greyText};
  margin-top: 0px;
  padding-top: 0px;
  font-size: 14px !important;
`;

export const SignButton = styled(Button)`
  align-self: stretch !important;
  width: 100% !important;
  background: ${({ variant }) =>
    variant
      ? "transparent"
      : "linear-gradient(268.88deg, rgba(255, 255, 255, 0.1) -7.38%, #9E1FFF 104.79%), #6047FF"} !important;
  color: ${({ variant }) =>
    variant ? theme.colors.secondary : theme.colors.white} !important;
  border: 1px solid ${theme.colors.secondary} !important;
`;

export const Divider = styled(MaterialDivider)`
  margin: 15px 0px !important;
`;

export const StyledAlert = styled(MuiAlert).attrs({
  severity: "success",
})``;
