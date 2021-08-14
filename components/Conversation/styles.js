import styled from "styled-components";
import { Button } from "@material-ui/core";

export const OutlinedButton = styled(Button).attrs({
  disableElevation: true,
  color: "primary",
  variant: "outlined",
})`
  border-radius: 100px !important;
`;

export const ContainedButton = styled(Button).attrs({
  disableElevation: true,
  color: "primary",
  variant: "contained",
})`
  border-radius: 100px !important;
  background: linear-gradient(
      268.88deg,
      rgba(255, 255, 255, 0.1) -7.38%,
      #9e1fff 104.79%
    ),
    #6047ff !important;
  margin: 20px 0px !important;
  align-self: flex-end !important;
`;
