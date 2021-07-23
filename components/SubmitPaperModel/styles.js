import styled from "styled-components";
import { Card, Box, TextField, Select, Divider } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export const StyledCard = styled(Card).attrs({})``;

// export const StyledGridContainer = styled(Grid).attrs({})``;

export const StyledBoxContainer = styled(Box).attrs({
  p: 3,
})``;

export const StyledBoxItem = styled(Box).attrs({
  p: 0,
})``;

export const StyledDivider = styled(Divider).attrs({
})`
  height: 2px !important;
  background: linear-gradient(
      268.88deg,
      rgba(255, 255, 255, 0.1) -7.38%,
      #9e1fff 104.79%
    ),
    #6047ff !important;
`;

export const StyledTextField = styled(TextField).attrs({
  variant: "outlined",
  fullWidth: true,
})``;

export const StyledSelect = styled(Select).attrs({
  fullWidth: true,
})``;

export const StyledAutocomplete = styled(Autocomplete).attrs({
  fullWidth: true,
})``;
