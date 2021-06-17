import styled from "styled-components";

import { Box } from "@material-ui/core";

export const StyledH2 = styled.h2`
  font-size: 1.9rem;
  font-weight: 400;
  text-align: center;
`;

export const ContributorsFlexBox = styled(Box).attrs({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
})`
  margin: 1rem 0;
`;
