import styled from "styled-components";
import { Box, Divider } from "@material-ui/core";
import theme from "../../styles/theme";

export const StyledBox = styled(Box).attrs({
  borderRadius: 15,
  boxShadow: 1,
  padding: 3,
})`
  z-index: 1000;

  div {
    position:relative;
    pointer-events: none;
    z-index: 1;
  }

  div div {
    position:relative;
    pointer-events: none;
    z-index: 1;
  }

  div div a {
    pointer-events: all;
  }

  div div a {
    color: ${theme.colors.secondary};
  }

  h3 {
    font-weight: 500;
  }
`;

export const StyledDivider = styled(Divider).attrs({
  height: 10,
})`
  height: 2px !important;
  background: linear-gradient(
    to right,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
`;

export const FlexBox = styled(Box).attrs({
  display: "flex",
})`
  justify-content: space-between;
`;

export const FlexItem = styled(Box).attrs({
  //
})`
  h4 {
    font-weight: 500;
  }
`;

export const Link = styled.a`
  position:absolute;
  left:0; top:0; bottom:0; right:0;
  z-index: 0;
`

export const Container = styled.div`
  position:relative;
`;
