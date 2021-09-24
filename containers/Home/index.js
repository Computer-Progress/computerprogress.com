import PageTemplate from "../../components/PageTemplate";
import { MuiTheme } from "../../styles/theme";
import TaskTable from "../../components/TaskTable";
import CollaborateInvite from "../../components/CollaborateInvite";
import { Box, useMediaQuery, Typography} from "@material-ui/core";
import { Footnote } from "./styles.js";


export default function Home({ tasks }) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));

  return (
      <PageTemplate isHome>
        <Box display="flex" flexDirection="column">
          <Box my={3}>
            <TaskTable tasks={tasks} />
          </Box>
          <Footnote>
            * The regression is performed in log-log space but (for interpretability) the regression formula is shown in exponential form.
          </Footnote>
          <Box my={3} height="30vh" width={isMobile ? "100%" : "80%"}>
            <CollaborateInvite />
          </Box>
        </Box>
      </PageTemplate>
  );
}
