import { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";

import {
  Grid,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
  FormControl,
  FormControlLabel,
  Switch,
  InputAdornment,
  Box,
} from "@material-ui/core";
import MuiDivider from "@material-ui/core/Divider";

import AutocompleteCreatable from "../AutocompleteCreatable";

import Divider from "../Divider";

import { Target as TargetIcon } from "react-feather";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { StyledCard, StyledBoxContainer, StyledTextField } from "./styles";

export default function ModelInformation(props) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [model, setModel] = useState({
    name: "",
    task: null,
    dataset: null,
    cpu: null,
    gpu: null,
    tpu: null,
    gflops: "",
    multiply_adds: "",
    number_of_parameters: "",
    training_time: "",
    epochs: "",
    extra_training_data: false,
    accuracies: [],
  });

  const [taskOptions, setTaskOptions] = useState([]);
  const [datasetOptions, setDatasetOptions] = useState([]);
  const [cpuOptions, setCpuOptions] = useState([]);
  const [gpuOptions, setGpuOptions] = useState([]);
  const [tpuOptions, setTpuOptions] = useState([]);

  const [accuracyOptions, setAccuracyOptions] = useState([]);
  const [newAccuracyType, setNewAccuracyType] = useState(null);
  const [newAccuracyValue, setNewAccuracyValue] = useState("");

  useEffect(() => {
    setModel(props.model);

    fetchData();
  }, []);

  useEffect(() => {
    if (props.modelIndex >= 0) {
      props.handleModelChange(model, props.modelIndex);
    }
  }, [model]);

  useEffect(() => {
    if (!model.task) {
      return;
    }

    let taskIdQueryParam = model.task.hasOwnProperty("id")
      ? "?task_id=" + model.task.id
      : "";

    const URL = `https://computerprogress.xyz/api/v1/datasets${taskIdQueryParam}`;

    // fetch(URL)
    //   .then((response) => response.json())
    //   .then((data) => setDatasetOptions(data));
  }, [model.task]);

  function fetchData() {
    fetch(`https://computerprogress.xyz/api/v1/tasks`)
      .then((response) => response.json())
      .then((data) => setTaskOptions(data));

    fetch(`https://computerprogress.xyz/api/v1/cpus`)
      .then((response) => response.json())
      .then((data) => setCpuOptions(data));

    fetch(`https://computerprogress.xyz/api/v1/gpus`)
      .then((response) => response.json())
      .then((data) => setGpuOptions(data));

    fetch(`https://computerprogress.xyz/api/v1/tpus`)
      .then((response) => response.json())
      .then((data) => setTpuOptions(data));

    fetch(`https://computerprogress.xyz/api/v1/accuracy_types`)
      .then((response) => response.json())
      .then((data) => setAccuracyOptions(data));
  }

  function handleTextChange({ target: { name, value } }, type) {
    const newModel = { ...model };

    switch (type) {
      case "int":
        newModel[name] = parseInt(value);
        break;

      case "float":
        newModel[name] = parseFloat(value);
        break;

      default:
        newModel[name] = value;
        break;
    }

    setModel(newModel);
  }

  function handleAutocompleteChange(selected, name) {
    setModel({ ...model, [name]: selected });
  }

  function handleAccuracyTypeChange(newAccuracyType) {
    setNewAccuracyType(newAccuracyType);
  }

  function handleAccuracyValueChange(event) {
    setNewAccuracyValue(event.target.value);
  }

  function addAccuracy() {
    const isAccuracyEmpty = !newAccuracyType || !newAccuracyValue;

    if (isAccuracyEmpty) {
      return;
    }

    const newAccuracy = {
      accuracy_type: newAccuracyType,
      value: newAccuracyValue,
    };

    setModel({ ...model, accuracies: [...model.accuracies, newAccuracy] });
  }

  function removeAccuracy(accuracyIndex) {
    const newModel = { ...model };
    newModel.accuracies.splice(accuracyIndex, 1);

    setModel(newModel);
  }

  return (
    <StyledCard>
      <StyledBoxContainer>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            container
            spacing={3}
            alignContent="flex-start"
          >
            <Grid item xs={12}>
              <Typography variant="h3">Model</Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                name="name"
                label="Model name"
                value={model.name}
                onChange={handleTextChange}
              />
            </Grid>

            <Grid item xs={12}>
              <AutocompleteCreatable
                name="task"
                label={"Tasks"}
                options={taskOptions}
                optionKey="name"
                handleAutocompleteChange={handleAutocompleteChange}
              />
            </Grid>

            <Grid item xs={12}>
              <AutocompleteCreatable
                name="dataset"
                optionKey={"name"}
                options={datasetOptions}
                label={"Datasets"}
                disabled={!model.task}
                handleAutocompleteChange={handleAutocompleteChange}
              />
            </Grid>

            <Grid item xs={12} container spacing={1}>
              <Grid item xs={8}>
                <AutocompleteCreatable
                  name="accuracy_type"
                  label={"Accuracy type"}
                  options={accuracyOptions}
                  optionKey="name"
                  variant="standard"
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <TargetIcon />
                  //     </InputAdornment>
                  //   ),
                  // }}
                  handleAutocompleteChange={handleAccuracyTypeChange}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Value"
                  value={newAccuracyValue}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={addAccuracy}>
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleAccuracyValueChange}
                />
              </Grid>

              {model.accuracies.map((accuracy, index) => (
                <>
                  <Grid item xs={8} key={index}>
                    <Box display="flex">
                      <Box mb={1} display="inline-block">
                        <Typography variant="body2">
                          {accuracy.accuracy_type.name ??
                            accuracy.accuracy_type}
                        </Typography>
                      </Box>
                    </Box>

                    <MuiDivider />
                  </Grid>

                  <Grid item xs={4}>
                    <Box display="flex">
                      <Box mb={1} display="inline-block" flexGrow={1}>
                        <Typography variant="body2">
                          {accuracy.value}
                        </Typography>
                      </Box>

                      <Box display="inline-block">
                        <IconButton
                          size="small"
                          onClick={() => removeAccuracy(index)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <MuiDivider />
                  </Grid>
                </>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Training information</Typography>
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField
                label="Training time"
                name="training_time"
                type="number"
                value={model.training_time}
                onChange={(event) => handleTextChange(event, "float")}
              />
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField
                label="# of Epochs"
                name="epochs"
                type="number"
                value={model.epochs}
                onChange={(event) => handleTextChange(event, "int")}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <FormControlLabel
                  value="top"
                  control={
                    <Switch
                      color="primary"
                      name="extra_training_data"
                      value={model.extra_training_data}
                      onChange={() =>
                        setModel({
                          ...model,
                          extra_training_data: !model.extra_training_data,
                        })
                      }
                    />
                  }
                  label="Uses extra training data?"
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
          </Grid>

          {isLargeScreen && (
            <Grid item>
              <MuiDivider orientation="vertical" />
            </Grid>
          )}

          <Grid
            item
            xs={12}
            md={6}
            container
            spacing={3}
            alignContent="flex-start"
          >
            <Grid item xs={12}>
              <Typography variant="h3">Computing power information</Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Hardware burden</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <AutocompleteCreatable
                name="cpu"
                label={"CPUs"}
                options={cpuOptions}
                optionKey={"name"}
                handleAutocompleteChange={handleAutocompleteChange}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField
                label="# of CPUs"
                name="number_of_cpu"
                type="number"
                value={model.cpu_qty}
                onChange={(event) => handleTextChange(event, "int")}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <AutocompleteCreatable
                name="gpu"
                label={"GPUs"}
                options={gpuOptions}
                optionKey={"name"}
                handleAutocompleteChange={handleAutocompleteChange}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField
                label="# of GPUs"
                name="number_of_gpu"
                type="number"
                value={model.gpu_qty}
                onChange={(event) => handleTextChange(event, "int")}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <AutocompleteCreatable
                name="tpu"
                label={"TPUs"}
                options={tpuOptions}
                optionKey={"name"}
                handleAutocompleteChange={handleAutocompleteChange}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField
                label="# of TPUs"
                name="tpu_qty"
                type="number"
                value={model.tpu_qty}
                onChange={(event) => handleTextChange(event, "int")}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Computation per network pass</Typography>
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField
                label="Gigaflops"
                name="gflops"
                type="number"
                value={model.gflops}
                onChange={(event) => handleTextChange(event, "float")}
              />
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField
                label="Multiply-adds"
                name="multiply_adds"
                type="number"
                value={model.multiply_adds}
                onChange={(event) => handleTextChange(event, "float")}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Other</Typography>
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField
                label="# of parameters"
                name="number_of_parameters"
                type="number"
                value={model.number_of_parameters}
                onChange={handleTextChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </StyledCard>
  );
}
