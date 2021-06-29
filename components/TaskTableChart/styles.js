import styled from "styled-components";

import { Card, Box } from "@material-ui/core";

export const StyledCard = styled(Card)`
  height: 100%;
  border-radius: 16px;
`;

export const StyledBox = styled(Box).attrs({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})`
  height: 100%;
`;
