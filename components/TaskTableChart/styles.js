import styled from "styled-components";

import { Card, Box } from "@material-ui/core";

export const StyledCard = styled(Card)`
  height: 100%;
  border-radius: 0 16px 16px 0 !important;
`;

export const StyledBox = styled(Box).attrs({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})`
  height: 100%;
`;
