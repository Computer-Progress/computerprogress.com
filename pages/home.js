import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../styles/theme";

import DefaultLayout from "../layouts/DefaultLayout";
import TaskChart from "../components/TaskChart";

export default function Home() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <DefaultLayout>
        <TaskChart />
      </DefaultLayout>
    </ThemeProvider>
  );
}
