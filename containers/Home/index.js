import PageTemplate from "../../components/PageTemplate";
import { MuiTheme } from "../../styles/theme";

import TaskTable from "../../components/TaskTable";

import CollaborateInvite from "../../components/CollaborateInvite";
import { Box, useMediaQuery } from "@material-ui/core";

export default function Home({ tasks }) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));

  return (
      <PageTemplate isHome>
        <Box display="flex" flexDirection="column">
          <Box my={3}>
            <TaskTable tasks={tasks} />
          </Box>

          <Box my={3} height="50vh" width={isMobile ? "100%" : "80%"}>
            <CollaborateInvite />
          </Box>
        </Box>
      </PageTemplate>
  );
}
