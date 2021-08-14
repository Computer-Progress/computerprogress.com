import React, { useState, useEffect } from "react";
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
import { CircularProgress } from '@material-ui/core';

import {
  Send as SendIcon,
  PlusCircle as PlusCircleIcon,
  MinusCircle as MinusCircleIcon,
  UserPlus as UserPlusIcon,
  UserMinus as UserMinusIcon,
  Edit3 as Edit3Icon,
} from "react-feather";
import { Box, Grid, Paper } from "@material-ui/core";
import { ContainedButton } from "./styles";
import useApi from '../../services/useApi'

export default function Conversation({ paperId }) {
  const api = useApi();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState([]);

  function handleTextChange(event) {
    setMessage(event.target.value);
  }

  const getMessages = async () => {
    try {
      const res = await api.get(`/submissions/${paperId}/messages`);
      setTimeline(res.data);
      setLoading(false);
      setMessage('');
    } catch (error) {
      console.log('cant load this submission')
      setLoading(false)
    }
  }

  useEffect(() => {
    getMessages();
  }, []);


  const onAddComment = async () => {
    setLoading(true)
    try {
      const response = await api.post(`/submissions/${paperId}/messages`, {
        message
      })
      if (response.data?.id) {
        getMessages()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

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
          <OutlinedInput
            multiline
            fullWidth
            style={{ boxShadow: "10px" }}
            value={message}
            onChange={handleTextChange}
          />
          {message ? (
          <Box display="flex" justifyContent="flex-end">
            <ContainedButton disabled={loading} onClick={onAddComment}>
              {loading ?
                (<CircularProgress color='inherit' size={25} />)
                : 'Add comment'}
            </ContainedButton>
          </Box>
          ) : null}
        </TimelineContent>
      </TimelineItem>
      {timeline.map((item, index) => (
        <TimelineItem>
          {item.author_id ? (
            <>
              <TimelineSeparator>
                <Paper elevation={2}>
                  <Box p={2}>
                    <Typography variant="h4" noWrap>
                      <pre style={{ fontFamily: 'inherit', margin: 0, padding: 0 }}>
                        {item.body}
                      </pre>
                    </Typography>

                    {/* <Box mt={1}>
                      <Typography variant="h5" noWrap>
                        {item.date}.
                      </Typography>
                    </Box> */}
                  </Box>
                </Paper>

                {index < timeline.length - 1 ? <TimelineConnector /> : null}
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

                {index < timeline.length - 1 ? <TimelineConnector /> : null}
              </TimelineSeparator>

              <TimelineContent>
                <Typography variant="h4">{item.body}</Typography>

                {/* <Box mt={1}>
                  <Typography variant="h5">{item.date}</Typography>
                </Box> */}
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
    case "edit":
      return <Edit3Icon size={20} color="#8f00ff" />;

    default:
      return <PlusCircleIcon size={20} color="#8f00ff" />;
  }
}
