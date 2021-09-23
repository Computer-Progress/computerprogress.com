import React, { useState, useEffect, useMemo } from "react";
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
import { CircularProgress } from "@material-ui/core";

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
import useApi from "../../services/useApi";
import NewButton from "../../components/Button/NewButton";
import { useSelector } from "react-redux";
import { getRelativeTime } from "../../utils";

export default function Conversation({
  paperId,
  onPressSaveChanges,
  onUpdate,
}) {
  const api = useApi();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const userState = useSelector((state) => state.UserReducer);

  function handleTextChange(event) {
    setMessage(event.target.value);
  }

  const getMessages = async () => {
    try {
      const res = await api.get(`/submissions/${paperId}/messages`);
      setTimeline(res.data);
      setLoading(false);
      setMessage("");
    } catch (error) {
      // console.log('cant load this submission')
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [onUpdate]);

  const submitOptions = useMemo(() => {
    if (message) {
      return [
        { name: "Approve and comment", value: "approved" },
        { name: "Decline and comment", value: "declined" },
        { name: "Request information and comment", value: "need_information" },
      ];
    }

    return [
      { name: "Approve", value: "approved" },
      { name: "Decline", value: "declined" },
      { name: "Request information", value: "need_information" },
    ];
  }, [message]);

  const onAddComment = async () => {
    setLoading(true);
    try {
      const response = await api.post(`/submissions/${paperId}/messages`, {
        message,
      });
      if (response.data?.id) {
        getMessages();
      }
    } catch (error) {
      // console.log('error', error)
    }
  };

  const onPressOption = async (value) => {
    setLoading(true);
    if (message) {
      await onAddComment();
    }
    await onPressSaveChanges(submitOptions[value].value);
  };

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
          <Grid container xs={12}></Grid>
          <OutlinedInput
            multiline
            fullWidth
            placeholder="Leave a comment..."
            style={{ boxShadow: "10px" }}
            value={message}
            onChange={handleTextChange}
          />
          <Box
            display="flex"
            justifyContent="flex-end"
            flexDirection="row"
            alignItems="center"
            p={1}
          >
            {message ? (
              <Box marginRight={1}>
                <NewButton
                  loading={loading}
                  onClick={onAddComment}
                  color="secondary"
                >
                  Add comment
                </NewButton>
              </Box>
            ) : null}
            <Box>
              {userState.role !== "default" ? (
                <NewButton
                  loading={loading}
                  options={submitOptions}
                  onClick={onPressOption}
                ></NewButton>
              ) : null}
            </Box>
          </Box>
        </TimelineContent>
      </TimelineItem>
      {timeline.map((item, index) => (
        <TimelineItem>
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
              {item.author_id ? (
                <Paper elevation={2}>
                  <Box p={2}>
                    <Typography variant="h4" noWrap>
                      <pre
                        style={{ fontFamily: "inherit", margin: 0, padding: 0 }}
                      >
                        {item.body}
                      </pre>
                    </Typography>

                    <Box
                      mt={1}
                      display="flex"
                      alignItems="flex-end"
                      justifyContent="flex-end"
                    >
                      <Typography variant="h5" noWrap>
                        Commented by "{item.author.first_name}{" "}
                        {item.author.last_name}"{" "}
                        {getRelativeTime(new Date(item.created_at))}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ) : (
                <>
                  <Typography variant="h4">{item.body}</Typography>

                  <Box mt={1}>
                    <Typography variant="h5">
                      {getRelativeTime(new Date(item.created_at))}
                    </Typography>
                  </Box>
                </>
              )}
            </TimelineContent>
          </>
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
