import styled from "styled-components";
import { Card, Box, TextField } from "@material-ui/core";

export const StyledCard = styled(Card).attrs({})``;

// export const StyledGridContainer = styled(Grid).attrs({})``;

export const StyledBoxContainer = styled(Box).attrs({
  p: 3,
})``;

export const StyledBoxItem = styled(Box).attrs({
  p: 0,
})``;

export const StyledTextField = styled(TextField).attrs({
  variant: "outlined",
  fullWidth: true,
})``;

export const StyledSelect = styled(TextField).attrs({
  variant: "outlined",
  fullWidth: true,
})``;
