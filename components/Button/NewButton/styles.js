import styled from "styled-components";

import MuiButton from "@material-ui/core/Button";
import MuiBox from "@material-ui/core/Box";
import MuiCircularProgress from "@material-ui/core/CircularProgress";

export const StyledButton = styled(MuiButton).attrs((props) => ({
  color: "primary",
  disabled: props.disabled || props.loading,
  disableElevation: true,
  fullWidth: true,
  variant: props.color === "secondary" ? "outlined" : "contained",
}))`
  border-radius: 100px !important;
  min-height: 2.3rem;
`;

export const StyledBox = styled(MuiBox).attrs((props) => ({
  display: "flex",
  px: props.options ? 2 : 3,
}))``;

export const StyledCircularProgress = styled(MuiCircularProgress).attrs(
  (props) => ({
    size: 20,
  })
)``;
