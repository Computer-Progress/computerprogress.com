import styled from "styled-components";
import { Box, Divider } from "@material-ui/core";
import theme from "../../styles/theme";

export const StyledBox = styled(Box).attrs({
  borderRadius: 15,
  boxShadow: 1,
  padding: 3,
})`
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
})``;

export const FlexItem = styled(Box).attrs({
  //
})`
  h4 {
    font-weight: 500;
  }
`;
