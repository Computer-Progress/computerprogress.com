import { createMuiTheme } from "@material-ui/core/styles";

export default {
  colors: {
    primary: "#2000e5",
    secondary: "#9E1FFF",
    white: "#ffffff",
    grey: "#c4c4c4",
    black: "#1A1515",
    greyText: "#7f7f84",
  },
  fonts: {
    families: {
      montserrat: `"Montserrat", sans-serif`,
    },
    sizes: {
      h2: "2.25rem",
    },
  },
};

export const MuiTheme = createMuiTheme({
  typography: {
    fontFamily: ['"Montserrat"', "sans-serif"].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 500
    },
    h3: {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1.1rem",
    },
  },
  palette: {
    primary: {
      main: "#7100C9",
      contrastText: "#FFFFFF",
    },
  },
});
