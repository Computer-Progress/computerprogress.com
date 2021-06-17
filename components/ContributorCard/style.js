import styled from "styled-components";

import { Box } from "@material-ui/core";

export const ContributorBox = styled(Box).attrs({
  border: 0,
})`
  font-weight: 500;
  max-width: 180px;
  text-align: center;
  padding: 1rem;
  margin: 0 1rem;
`;

export const StyledName = styled.p`
  font-size: 0.9rem;
  margin: 0.6rem 0;
`;

export const StyledPosition = styled.p`
  font-size: 0.7rem;
  color: #5d5d5d;
  margin: 0;
`;
