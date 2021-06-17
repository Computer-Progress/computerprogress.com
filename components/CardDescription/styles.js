import styled from "styled-components";
import { Grid, Box } from "@material-ui/core";

export const GridContainer = styled(Grid).attrs({
  container: true,
})`
  p {
    margin: 0;
    font-family: 'Montserrat';
    text-align: justify;
    font-size: 15px;
    font-weight: 100;
  }
  
`;

export const GridItem = styled(Grid).attrs({
  item: true,
})`
  align-self: ${(props) => props.$alignSelf};

  h1 {
    font-family: 'Montserrat';
    font-weight: 500;
    margin: 50px 0;
  }

  p {
    margin: 0;
    font-family: 'Montserrat';
    text-align: justify;
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
    width: 60%;
    height: 60%;
  }
`;
