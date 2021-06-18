import styled from "styled-components";

import { Box } from "@material-ui/core";

export const StyledH2 = styled.h2`
  font-size: 1.5rem;
  margin: 50px 0;
  font-weight: 400;
  text-align: center;
`;

export const ContributorsFlexBox = styled(Box).attrs({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
})`
  margin: 2rem 0;
`;
