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
  Button,
  Tooltip,
} from "@material-ui/core";
import MuiDivider from "@material-ui/core/Divider";

import AutocompleteCreatable from "../AutocompleteCreatable";

import Divider from "../Divider";

import { Target as TargetIcon } from "react-feather";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import useApi from '../../services/useApi'

import { StyledCard, StyledBoxContainer, StyledTextField } from "./styles";

export default function ModelInformation(props) {
  const api = useApi();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [model, setModel] = useState(props.model);
  const [task, setTask] = useState(null);
  const [dataset, setDataset] = useState(null);

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

    fetchTasks();
    fetchCpus();
    fetchGpus();
    fetchTpus();
  }, [props.undoChangesPressed]);

  useEffect(() => {
    if (props.modelIndex >= 0) {
      props.handleModelChange(model, props.modelIndex);
    }
  }, [model]);

  useEffect(() => {
    if (!task) {
      return;
    }

    let taskIdQueryParam = task.hasOwnProperty("id")
      ? "?task_id=" + task.id
      : "";

    const URL = `/datasets${taskIdQueryParam}`;

    api.get(URL)
    .then((response) => {
      const data = response.data;
      setDatasetOptions(data);
      const newModel = model
      newModel.accuracies = [];
      setModel({...newModel})
      setNewAccuracyType(null)
      setNewAccuracyValue('')
    })
  }, [model.task]);

  useEffect(() => {
    if (!dataset || !task) {
      return;
    }

    api.get(`/accuracy_types?skip=0&limit=100&task_dataset_identifier=${task.identifier}-on-${dataset.identifier}`)
      .then((response) => {
        const data = response.data;
        setAccuracyOptions(data);
      })

  }, [model.dataset]);

  function fetchTasks() {
    api.get(`/tasks`)
      .then((response) => {
        const data = response.data;
        setTaskOptions(data);
      })
  }

  function fetchCpus() {
    api.get(`/cpus`)
      .then((response) => {
        const data = response.data;
        setCpuOptions(data);
      })
  }

  function fetchGpus() {
    api.get(`/gpus`)
      .then((response) => {
        const data = response.data;
        setGpuOptions(data);
      })
  }

  function fetchTpus() {
    api.get(`/tpus`)
      .then((response) => {
        const data = response.data;
        setTpuOptions(data);
      })
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

  function handleNumberChange({ target: { name, value } }, type) {
    switch (type) {
      case "int":
        const onlyInt = value.replace(/[^0-9]/g, "");

        setModel({ ...model, [name]: onlyInt });
        break;
      case "float":
        break;
    }
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
                {...props.register(`ModelName${props.index}`, { required: !model.name })}
                error={!!props.errors[`ModelName${props.index}`]}
                helperText={!!props.errors[`ModelName${props.index}`] && "Model is required"}
                name="name"
                label="Model name"
                value={model.name}
                onChange={handleTextChange}
              />
            </Grid>

            <Grid item xs={12}>
              <AutocompleteCreatable
                {...props.register(`Task${props.index}`, { required: !model.task })}
                error={!!props.errors[`Task${props.index}`]}
                helperText={!!props.errors[`Task${props.index}`] && "Task is required"}
                name="task"
                label={"Tasks"}
                options={taskOptions}
                optionKey="name"
                outsideValue={model.task}
                updateObject={setTask}
                handleAutocompleteChange={handleAutocompleteChange}
              />
            </Grid>

            <Grid item xs={12}>
              <AutocompleteCreatable
                {...props.register(`Dataset${props.index}`, { required: !model.dataset })}
                error={!!props.errors[`Dataset${props.index}`]}
                helperText={!!props.errors[`Dataset${props.index}`] && "Dataset is required"}
                name="dataset"
                optionKey={"name"}
                options={datasetOptions}
                label={"Datasets"}
                disabled={!model.task}
                outsideValue={model.dataset}
                task={model.task}
                updateObject={setDataset}
                handleAutocompleteChange={handleAutocompleteChange}
              />
            </Grid>

            <Grid item xs={12} container spacing={1}>
              <Grid item xs={8}>
                <AutocompleteCreatable
                  {...props.register(`accuracy_type${props.index}`, { required: !model.accuracies.length })}
                  error={!!props.errors[`accuracy_type${props.index}`]}
                  helperText={!!props.errors[`accuracy_type${props.index}`] && "To add the accuracy type, click on the plus icon"}
                  name="accuracy_type"
                  label={"Accuracy type"}
                  options={accuracyOptions}
                  optionKey="name"
                  variant="standard"
                  task={model.task}
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
                <Tooltip title="To add the accuracy type, click the plus icon" placement="top-end">
                  <TextField
                    {...props.register(`accuracy_value${props.index}`, { required: !model.accuracies.length })}
                    error={!!props.errors[`accuracy_value${props.index}`]}
                    helperText={!!props.errors[`accuracy_value${props.index}`] && "Fill accuracy value and click the plus icon"}
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
                </Tooltip>
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

            <Grid item xs={6}>
              <StyledTextField
                {...props.register(`TrainingTime${props.index}`, { required: !model.training_time})}
                error={!!props.errors[`TrainingTime${props.index}`]}
                helperText={!!props.errors[`TrainingTime${props.index}`] && "Training time is required"}
                label="Training time (seg)"
                name="training_time"
                type="number"
                value={model.training_time}
                onChange={(event) => handleNumberChange(event, "int")}
              />
            </Grid>

            <Grid item xs={6}>
              <StyledTextField
                {...props.register(`Ephocs${props.index}`, { required: !model.epochs })}
                error={!!props.errors[`Ephocs${props.index}`]}
                helperText={!!props.errors[`Ephocs${props.index}`] && "# of Epochs is required"}
                label="# of Epochs"
                name="epochs"
                type="number"
                value={model.epochs}
                onChange={(event) => handleNumberChange(event, "int")}
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
                outsideValue={model.cpu}
                handleAutocompleteChange={handleAutocompleteChange}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField
                {...props.register(`ofCPU${props.index}`, { required: !!model.cpu && !model.number_of_cpus  })}
                error={!!props.errors[`ofCPU${props.index}`]}
                helperText={!!props.errors[`ofCPU${props.index}`] && "# of CPU required"}
                label="# of CPUs"
                name="number_of_cpus"
                type="number"
                value={model.number_of_cpus}
                onChange={(event) => handleTextChange(event, "int")}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <AutocompleteCreatable
                {...props.register(`GPU${props.index}`, { required: !model.tpu && !model.gpu })}
                error={!!props.errors[`GPU${props.index}`]}
                helperText={!!props.errors[`GPU${props.index}`] && "GPU or TPU required"}
                name="gpu"
                label={"GPUs"}
                options={gpuOptions}
                outsideValue={model.gpu}
                optionKey={"name"}
                handleAutocompleteChange={handleAutocompleteChange}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField
                {...props.register(`ofGPU${props.index}`, { required: !!model.gpu && !model.number_of_gpus })}
                error={!!props.errors[`ofGPU${props.index}`]}
                helperText={!!props.errors[`ofGPU${props.index}`] && "# of GPU required"}
                label="# of GPUs"
                name="number_of_gpus"
                type="number"
                value={model.number_of_gpus}
                onChange={(event) => handleTextChange(event, "int")}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <AutocompleteCreatable
                {...props.register(`TPU${props.index}`, { required: !model.tpu && !model.gpu })}
                error={!!props.errors[`TPU${props.index}`]}
                helperText={!!props.errors[`TPU${props.index}`] && "TPU or GPU required"}
                name="tpu"
                label={"TPUs"}
                options={tpuOptions}
                optionKey={"name"}
                outsideValue={model.tpu}
                value={model.tpu ? model.tpu.name : null}
                handleAutocompleteChange={handleAutocompleteChange}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField
                {...props.register(`ofTPU${props.index}`, { required: !!model.tpu && !model.number_of_tpus })}
                error={!!props.errors[`ofTPU${props.index}`]}
                helperText={!!props.errors[`ofTPU${props.index}`] && "# of TPU required"}
                label="# of TPUs"
                name="number_of_tpus"
                value={model.number_of_tpus}
                type="number"
                onChange={(event) => handleTextChange(event, "int")}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Computation per network pass</Typography>
            </Grid>

            <Grid item xs={6}>
              <StyledTextField
                label="Gigaflops"
                name="gflops"
                type="number"
                value={model.gflops}
                onChange={(event) => handleTextChange(event, "float")}
              />
            </Grid>

            <Grid item xs={6}>
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

            <Grid item xs={6}>
              <StyledTextField
                label="# of parameters"
                name="number_of_parameters"
                type="number"
                value={model.number_of_parameters}
                onChange={handleTextChange}
              />
            </Grid>
            {props.modelIndex >= 1 && (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ borderRadius: "100px" }}
                    onClick={() => props.handleRemoveModel(props.modelIndex)}
                  >
                    Remove model
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </StyledCard>
  );
}
