import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";

import { Box, Paper } from "@material-ui/core";

import TimelineItem from "../TimelineItem";

// import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
// import TimelineDot from "@material-ui/lab/TimelineDot";
// import Typography from "@material-ui/core/Typography";

export default function TimelineItemComment({ item, disableConnector }) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <Paper elevation={2}>
          <Box p={1}>
            TesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTeste
          </Box>
          <Box p={1}>
            TesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTeste
          </Box>
        </Paper>

        {!disableConnector && <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent></TimelineContent>
    </TimelineItem>
  );
}
