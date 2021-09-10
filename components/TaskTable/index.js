import Link from "next/link";
import { useEffect, useState } from "react";


import { Typography, Grid, Card, Box, Button } from "@material-ui/core";

import TaskTableTabs from "../TaskTableTabs";
import TaskTableDatasets from "../TaskTableDatasets";
import TaskTableSOTA from "../TaskTableSOTA";
import TaskTableChart from "../TaskTableChart";

import { MuiTheme } from "../../styles/theme";
import { StyledGridItem, StyledFlexbox } from "./styles";

import Table from '../Table';

export default function TaskTable({ tasks }) {
  const [selectedTask, setSelectedTask] = useState(0);
  const [loadedTasks, setLoadedTasks] = useState({});
  const [selectedDataset, setSelectedDataset] = useState(0);
  const [datasetModels, setDatasetModels] = useState({});
  const [isDatasetModelsLoading, setIsDatasetModelsLoading] = useState(true);

  useEffect(async () => {
    const URL =
      process.env.BASE_API_URL;

    const taskId = tasks[selectedTask].task_id;
    const datasetId = tasks[selectedTask].datasets[selectedDataset].dataset_id;

    try {
      if (loadedTasks[taskId]?.[datasetId]) {
        setDatasetModels(loadedTasks[taskId][datasetId])
        return;
      }

      setIsDatasetModelsLoading(true);

      const response = await fetch(`${URL}/models/${taskId}/${datasetId}`);
      const datasetModels = await response.json();
      const newModelObject = {};
      newModelObject[taskId] = loadedTasks[taskId] || {};
      newModelObject[taskId][datasetId] = datasetModels;
      setLoadedTasks({
        ...loadedTasks,
        ...newModelObject,
      });
      setDatasetModels(datasetModels);
      setIsDatasetModelsLoading(false);
    } catch {
      setIsDatasetModelsLoading(false);
    }
  }, [selectedTask, selectedDataset]);

  const onSelectTab = (value) => {
    setSelectedTask(value)
    setSelectedDataset(0)
  }

  const computingPower = {
    name: 'Hardware Burden',
    value: 'hardware_burden',
  }

  return (
    <Table
      tabs={tasks}
      selectedTab={selectedTask}
      onSelectTab={onSelectTab}
      showViewAllTasks
      options={tasks[selectedTask].datasets}
      optionsTitle="Datasets"
      fieldName="dataset_name"
      selectedOption={selectedDataset}
      setSelectedOption={({index}) => setSelectedDataset(index)}
      loading={isDatasetModelsLoading}
      data={datasetModels.models}
      label={datasetModels.accuracy_types?.[0].name}
      computingPower={computingPower}
      sota={tasks[selectedTask].datasets[selectedDataset]}
    />
  )
}
