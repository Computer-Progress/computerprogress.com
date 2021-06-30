import styled from "styled-components";
import {
  AppBar as MuiAppBar,
  Box as MuiBox,
  Button as MuiButton,
} from "@material-ui/core";

const theme = {
  default: {},
  primary: {
    text: "#7100c9",
    background: "white",
  },
  secondary: {
    text: "white",
    background: "",
  },
};

export const StyledAppBar = styled(MuiAppBar).attrs({
  position: "static",
  elevation: 0,
})`
${({ isHome }) => isHome ? 'background-color: transparent !important;' : `
  background-color: #4e33ff !important;
  background: linear-gradient(268.88deg, rgba(255, 255, 255, 0.1) -7.38%, #9E1FFF 104.79%), #4e33ff;
  `}
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

export const StyledButton = styled(MuiButton).attrs({})`
  color: ${({ color }) => theme[color].text} !important;
  background: ${({ color }) => theme[color].background} !important;
  border-radius: 100px !important;
`;
