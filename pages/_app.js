import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../styles/theme";
import { store, persistor } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Alert from "../components/Alert";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
          <Alert />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
