import styled from "styled-components";
import { Button as MuiButton } from "@material-ui/core";

const theme = {
  default: {
    background:
      "linear-gradient(268.88deg, rgba(255, 255, 255, 0.1) -7.38%, #7100C9 104.79%), #2000E5",
    color: "#ffffff",
  },
  primary: {
    background: "#ffffff",
    color: "#7100C9",
  },
  secondary: {
    background: "transparent",
    color: "white",
  },
};

export const StyledButton = styled(MuiButton).attrs({
  variant: "contained",
  disableElevation: true,
})`
  border-radius: 100px;

  color: ${({ color = "default" }) => theme[color].color} !important;

  background: ${({ color = "default" }) => theme[color].background} !important;
`;
