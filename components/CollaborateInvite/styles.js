import styled from "styled-components";
import { Box, Button } from "@material-ui/core";

export const StyledFlexbox = styled(Box).attrs({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
})`
  height: 100%;
`;
export const StyledButton = styled(Button).attrs({
  variant: "contained",
  disableElevation: true,
})`
  border-radius: 100px !important;

  color: white !important;
  background: linear-gradient(
      268.88deg,
      rgba(255, 255, 255, 0.1) -7.38%,
      #7100c9 104.79%
    ),
    #2000e5 !important;
`;
