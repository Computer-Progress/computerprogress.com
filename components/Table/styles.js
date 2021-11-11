import styled from "styled-components";

import { Grid, Box, Typography } from "@material-ui/core";

export const StyledGridItem = styled(Grid).attrs({
  item: true,
})`
  order: ${({ $order }) => $order};
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

export const StyledFlexbox = styled(Box).attrs({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})`
  height: 100%;
`;

export const Footnote = styled(Typography)`
  align-self: flex-start;
  margin-top: 10px !important;
  font-size: 13px !important;
`;