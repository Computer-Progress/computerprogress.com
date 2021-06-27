import styled from "styled-components";

import { Grid, Box } from "@material-ui/core";

export const StyledGridItem = styled(Grid).attrs({
  item: true,
})`
  order: ${({ $order }) => $order};
`;

export const StyledFlexbox = styled(Box).attrs({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})`
  height: 100%;
`;
