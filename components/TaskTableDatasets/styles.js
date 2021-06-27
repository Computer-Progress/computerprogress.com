import styled from "styled-components";

import { Button } from "@material-ui/core";

export const StyledButton = styled(Button).attrs({
  variant: "outlined",
  size: "small",
  fullWidth: true,
})`
  border-radius: 100px !important;
  border: 1px solid ${({ $active }) => ($active ? "#2000e5" : "white")} !important;
  color: #2000e5 !important;
`;
