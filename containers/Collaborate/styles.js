import styled from "styled-components";

import { Box, ListItem, Typography } from "@material-ui/core";

export const StyledBox = styled(Box).attrs({
  my: 2,
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
