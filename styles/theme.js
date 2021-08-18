import { createTheme } from "@material-ui/core/styles";

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

export const MuiTheme = createTheme({
  overrides: {
    MuiTimelineItem: {
      missingOppositeContent: {
        "&:before": {
          display: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', "sans-serif"].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 300,
    },
    h5: {
      fontSize: "0.8rem",
      fontWeight: 300,
    },
    h6: {
      fontSize: "1.1rem",
    },
    subtitle1: {
      fontSize: "0.8rem",
    },
  },
  palette: {
    primary: {
      main: "#7100C9",
      contrastText: "#efeff4",
    },
    secondary: {
      main: "#efeff4",
      contrastText: "#7100C9",
    },
  },
});
