import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import {
  Send as SendIcon,
  PlusCircle as PlusCircleIcon,
  MinusCircle as MinusCircleIcon,
  UserPlus as UserPlusIcon,
  UserMinus as UserMinusIcon,
  Edit3 as Edit3Icon,
} from "react-feather";
import { Box, Grid, Paper } from "@material-ui/core";

export default function Conversation({ timeline }) {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            elevation={0}
            style={{
              background: "#f9f9f9",
              boxShadow: "none",
              padding: "8px",
            }}
          >
            <SendIcon size={20} color="#8f00ff" />
          </TimelineDot>

          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Grid container xs={12}>
            
          </Grid>
          <OutlinedInput fullWidth style={{ boxShadow: "10px" }} />
        </TimelineContent>
      </TimelineItem>

      {timeline.map((item, index) => (
        <TimelineItem>
          {item.type === "comment" ? (
            <>
              <TimelineSeparator>
                <Paper elevation={2}>
                  <Box p={2}>
                    <Typography variant="h4" noWrap>
                      {item.content}
                    </Typography>

                    <Box mt={1}>
                      <Typography variant="h5" noWrap>
                        {item.date}.
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {index < timeline.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
            </>
          ) : (
            <>
              <TimelineSeparator>
                <TimelineDot
                  elevation={0}
                  style={{
                    background: "#f9f9f9",
                    boxShadow: "none",
                    padding: "8px",
                  }}
                >
                  <TimelineSeparatorIcon type={item.type} />
                </TimelineDot>

                {index < timeline.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent>
                <Typography variant="h4">{item.content}</Typography>

                <Box mt={1}>
                  <Typography variant="h5">{item.date}.</Typography>
                </Box>
              </TimelineContent>
            </>
          )}
        </TimelineItem>
      ))}
    </Timeline>
  );
}

function TimelineSeparatorIcon({ type }) {
  switch (type) {
    case "add":
      return <PlusCircleIcon size={20} color="#8f00ff" />;

    case "remove":
      return <MinusCircleIcon size={20} color="red" />;

    case "edit":
      return <Edit3Icon size={20} color="#8f00ff" />;

    case "add-author":
      return <UserPlusIcon size={20} color="#8f00ff" />;

    case "remove-author":
      return <UserMinusIcon size={20} color="red" />;

    default:
      return <PlusCircleIcon color="#8f00ff" />;
  }
}
