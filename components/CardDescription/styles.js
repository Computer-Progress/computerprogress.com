import styled from "styled-components";
import { Grid, Box } from "@material-ui/core";

export const GridContainer = styled(Grid).attrs({
  container: true,
})``;

export const GridItem = styled(Grid).attrs({
  item: true,
})`
  align-self: ${(props) => props.$alignSelf};

  h1 {
    margin: 0;
  }
`;

export const GridItemContainer = styled(Grid).attrs({
  item: true,
  container: true,
})``;

export const ImageBox = styled(Box).attrs({
  borderRadius: 15,
  boxShadow: 1,
  padding: 3,
  margin: 3,
  ml: 0
})`
  img {
    width: 100%;
    height: 100%;
  }
`;
