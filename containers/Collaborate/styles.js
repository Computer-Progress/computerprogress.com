import styled from "styled-components";

import { Box, Button, ListItem, Typography } from "@material-ui/core";

export const StyledFlexboxSection = styled(Box).attrs({
  my: 5,
})``;

export const StyledBox = styled(Box).attrs({
  mt: 5,
})``;

export const StyledTypographyBody1 = styled(Typography).attrs({
  variant: "body1",
})``;

export const StyledListIcon = styled.div`
  width: 16px;
  height: 16px;
  border: solid 4px #7100c9;
  border-radius: 50%;
  background-color: #ffffff;
`;

export const StyledButton = styled(Button).attrs({
  color: "primary",
  variant: "contained",
})`
  padding-right: 50px !important;
  padding-left: 50px !important;

  border-radius: 100px !important;

  color: white !important;
  background: linear-gradient(
      268.88deg,
      rgba(255, 255, 255, 0.1) -7.38%,
      #7100c9 104.79%
    ),
    #2000e5 !important;
`;
