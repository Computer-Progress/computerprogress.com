import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import DefaultLayout from "../../layouts/DefaultLayout";

import TaskTable from "../../components/TaskTable";
import CollaborateInvite from "../../components/CollaborateInvite";
import { Box, useMediaQuery } from "@material-ui/core";

export default function Home({ tasks }) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));

  return (
    <ThemeProvider theme={MuiTheme}>
      <DefaultLayout>
        <Box display="flex" flexDirection="column">
          <Box my={3}>
            <TaskTable tasks={tasks} />
          </Box>

          <Box my={3} height="70vh" width={isMobile ? "100%" : "50%"}>
            <CollaborateInvite />
          </Box>
        </Box>
      </DefaultLayout>
    </ThemeProvider>
  );
}
