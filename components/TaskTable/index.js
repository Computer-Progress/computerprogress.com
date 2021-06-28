import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@material-ui/core";

import { Typography, Grid, Card, Box } from "@material-ui/core";

import TaskTableTabs from "../TaskTableTabs";
import TaskTableDatasets from "../TaskTableDatasets";
import TaskTableSOTA from "../TaskTableSOTA";
import TaskTableChart from "../TaskTableChart";

import { MuiTheme } from "../../styles/theme";
import { StyledGridItem, StyledFlexbox } from "./styles";

export default function TaskTable({ tasks }) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("sm"));

  const [selectedTask, setSelectedTask] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState(0);
  const [datasetModels, setDatasetModels] = useState({});
  const [isDatasetModelsLoading, setIsDatasetModelsLoading] = useState(true);

  useEffect(async () => {
    const URL =
      "http://ec2-3-129-18-205.us-east-2.compute.amazonaws.com/api/v1";

    const taskId = tasks[selectedTask].task_id;
    const datasetId = tasks[selectedTask].datasets[selectedDataset].dataset_id;

    setIsDatasetModelsLoading(true);

    try {
      const response = await fetch(`${URL}/models/${taskId}/${datasetId}`);
      const datasetModels = await response.json();

      setDatasetModels(datasetModels);
      setIsDatasetModelsLoading(false);
    } catch {
      setIsDatasetModelsLoading(false);
    }
  }, [selectedTask, selectedDataset]);

  return (
    <>
      <Typography variant="h3">Tasks</Typography>

      <Grid container spacing={1}>
        <StyledGridItem $order={0} xs={9}>
          <TaskTableTabs
            tasks={tasks}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            setSelectedDataset={setSelectedDataset}
          />
        </StyledGridItem>

        <StyledGridItem $order={1} xs={3}>
          <Link href="/tasks">
            <StyledFlexbox>
              <Box>
                <Typography variant="button">View all tasks</Typography>
              </Box>
            </StyledFlexbox>
          </Link>
        </StyledGridItem>

        <StyledGridItem $order={2} xs={12} sm={6} md={3}>
          <TaskTableDatasets
            datasets={tasks[selectedTask].datasets}
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
          />
        </StyledGridItem>

        <StyledGridItem $order={isMobile ? 4 : 3} xs={12} md={6}>
          <TaskTableChart
            isLoading={isDatasetModelsLoading}
            datasetModels={datasetModels}
          />
        </StyledGridItem>

        <StyledGridItem $order={isMobile ? 3 : 4} xs={12} sm={6} md={3}>
          <TaskTableSOTA sota={tasks[selectedTask].datasets[selectedDataset]} />
        </StyledGridItem>
      </Grid>
    </>
  );
}
