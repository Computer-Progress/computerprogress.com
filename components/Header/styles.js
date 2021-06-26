import styled from "styled-components";

import { AppBar as MuiAppBar, Box as MuiBox } from "@material-ui/core";

import Button from "../Button";

export const StyledAppBar = styled(MuiAppBar).attrs({
  position: "static",
  elevation: 0,
})`
  background: linear-gradient(
      268.88deg,
      rgba(255, 255, 255, 0.1) -7.38%,
      #7100c9 104.79%
    ),
    #2000e5;
`;

export const StyledToolbarBox = styled(MuiBox).attrs({
  display: "flex",
  alignItems: "center",
})`
  width: 100%;
`;

export const StyledSpacer = styled(MuiBox).attrs({
  flexGrow: 1,
})``;
