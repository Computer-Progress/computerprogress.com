import TaskTableTabs from "../TabsTableTabs";

import { Grid, Card, useMediaQuery } from "@material-ui/core";

import { MuiTheme } from "../../styles/theme";
import { StyledGridItem } from "./styles";
import { useEffect, useState } from "react";

export default function TaskTable({ tasks }) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("sm"));
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const tabs = tasks.map((task) => ({
      id: task.task_id,
      identifier: task.task_identifier,
      name: task.task_name,
    }));

    setTabs(tabs);
  }, []);

  return (
    <Grid container spacing={1}>
      <StyledGridItem $order={1}>
        <TaskTableTabs />
      </StyledGridItem>

      <StyledGridItem $order={2} sm={6} md={2}>
        <Card>Datasets</Card>
      </StyledGridItem>

      <StyledGridItem $order={isMobile ? 4 : 3} md={8}>
        <Card>Chart</Card>
      </StyledGridItem>

      <StyledGridItem $order={isMobile ? 3 : 4} sm={6} md={2}>
        <Card>SOTA</Card>
      </StyledGridItem>
    </Grid>
  );
}
