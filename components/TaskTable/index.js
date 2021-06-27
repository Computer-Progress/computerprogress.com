import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@material-ui/core";

import { Typography, Grid, Card, Box } from "@material-ui/core";

import TaskTableTabs from "../TaskTableTabs";
import TaskTableDatasets from "../TaskTableDatasets";

import { MuiTheme } from "../../styles/theme";
import { StyledGridItem, StyledFlexbox } from "./styles";

export default function TaskTable({ tasks }) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("sm"));

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState(0);

  useEffect(() => {
    setSelectedDataset(0);
  }, [selectedTab]);

  return (
    <>
      <Typography variant="h3">Tasks</Typography>

      <Grid container spacing={1}>
        <StyledGridItem $order={0} xs={10}>
          <TaskTableTabs
            tasks={tasks}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </StyledGridItem>

        <StyledGridItem $order={1} xs={2}>
          <Link href="/tasks">
            <StyledFlexbox>
              <Box>
                <Typography variant="button">View all tasks</Typography>
              </Box>
            </StyledFlexbox>
          </Link>
        </StyledGridItem>

        <StyledGridItem $order={2} xs={12} sm={6} md={2}>
          <TaskTableDatasets
            datasets={tasks[selectedTab].datasets}
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
          />
        </StyledGridItem>

        <StyledGridItem $order={isMobile ? 4 : 3} xs={12} md={8}>
          <Card>Chart for {selectedDataset}</Card>
        </StyledGridItem>

        <StyledGridItem $order={isMobile ? 3 : 4} xs={12} sm={6} md={2}>
          <Card>SOTA</Card>
        </StyledGridItem>
      </Grid>
    </>
  );
}
