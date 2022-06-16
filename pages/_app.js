import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
