import { useState } from "react";
import { useTheme } from "@material-ui/core/styles";

import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Select,
  MenuItem,
  useMediaQuery,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Box,
  InputAdornment,
} from "@material-ui/core";

import MuiDivider from "@material-ui/core/Divider";
import Divider from "../Divider";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Target as TargetIcon } from "react-feather";

import {
  StyledCard,
  StyledBoxContainer,
  StyledTextField,
  StyledAutocomplete,
  StyledButton,
} from "./styles";

const task = [
  { id: 0, title: "Task 1" },
  { id: 1, title: "Task 2" },
];

const dataset = [
  { id: 0, title: "Dataset 1" },
  { id: 1, title: "Dataset 2" },
];

const accuracyTypes = [
  { id: 0, title: "BLEU" },
  { id: 1, title: "Other" },
];

const cpuModels = [
  { id: 0, title: "CPU A" },
  { id: 1, title: "CPU B" },
];

const gpuModels = [
  { id: 0, title: "GPU A" },
  { id: 1, title: "GPU B" },
];

const tpuModels = [
  { id: 0, title: "TPU A" },
  { id: 1, title: "TPU B" },
];

const emptyModel = {
  name: "",
  task: null,
  dataset: null,
  accuracies: [{ type: "", value: "" }],
  training: {
    time: "",
    epochs: "",
    extra: false,
  },
  cpu: {
    model: null,
    qty: "",
  },
  gpu: {
    model: null,
    qty: "",
  },
  tpu: {
    model: null,
    qty: "",
  },
  gigaflops: "",
  multiplyAdds: "",
  parametersQty: "",
};

export default function SubmitPaperModel() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [model, setModel] = useState(emptyModel);

  function addAccuracy() {
    const newModel = { ...model };
    newModel.accuracies.push(null);

    setModel(newModel);
  }

  function removeAccuracy(index) {
    const newModel = { ...model };

    newModel.accuracies[index];
    newModel.accuracies.splice(index, 1);

    setModel(newModel);
  }

  function handleChange(event, index) {
    const key = event.target.name;
    const value = event.target.value;

    const newModel = { ...model };

    switch (key) {
      case "accuracyType":
        newModel.accuracies[index].type = value;
        break;

      case "accuracyValue":
        newModel.accuracies[index].value = value;
        break;

      case "trainingTime":
        newModel.training.time = value;
        break;

      case "trainingEpochs":
        newModel.training.epochs = value;
        break;

      case "trainingExtra":
        newModel.training.extra = !newModel.training.extra;
        break;

      case "cpuQty":
        newModel.cpu.qty = value;

        break;
      case "gpuQty":
        newModel.gpu.qty = value;
        break;
      case "tpuQty":
        newModel.tpu.qty = value;
        break;
        break;

      default:
        newModel[key] = value;
        break;
    }

    setModel(newModel);
  }

  // console.log(model);

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
                label="Model name"
                name="name"
                value={model.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledAutocomplete
                value={model.task}
                onChange={(event, newValue) => {
                  setModel({ ...model, task: newValue });
                }}
                options={task}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <StyledTextField {...params} label="Task" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledAutocomplete
                value={model.dataset}
                onChange={(event, newValue) => {
                  setModel({ ...model, dataset: newValue });
                }}
                options={dataset}
                getOptionLabel={(option) => option.title}
                fullWidth
                renderInput={(params) => (
                  <StyledTextField {...params} placeholder="Dataset" />
                )}
              />
            </Grid>

            <Grid item xs={12} container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  placeholder="Accuracy type"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TargetIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  placeholder="Accuracy"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small">
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* <Grid item xs={1}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
              </Grid> */}
            </Grid>

            {/* <Grid item xs={12}>
              {model.accuracies.map((accuracy, index) => (
                <Grid container key={index}>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <InputLabel>Accuracy type</InputLabel>

                      <Select
                        value={model.accuracies[index].type}
                        onChange={(event) => handleChange(event, index)}
                        inputProps={{ name: "accuracyType" }}
                      >
                        {accuracyTypes.map((accuracyType) => (
                          <MenuItem
                            value={accuracyType.id}
                            key={accuracyType.id}
                          >
                            {accuracyType.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      placeholder="Value"
                      margin="normal"
                      name="accuracyValue"
                      value={model.accuracies[index].value}
                      onChange={(event) => handleChange(event, index)}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={1}
                    container
                    justifyContent="flex-end"
                    alignContent="center"
                  >
                    {index === 0 ? (
                      <IconButton size="small" onClick={() => addAccuracy()}>
                        <AddIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={() => removeAccuracy(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid> */}

            <Grid item xs={12}>
              <Typography variant="h4">Training information</Typography>
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField
                label="Training time"
                name="trainingTime"
                value={model.training.time}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField
                label="# of Epochs"
                name="trainingEpochs"
                value={model.training.epochs}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <FormControlLabel
                  value="top"
                  control={
                    <Switch
                      color="primary"
                      name="trainingExtra"
                      value={model.training.extra}
                      onChange={handleChange}
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
              <StyledAutocomplete
                value={model.cpu.model}
                onChange={(event, newValue) => {
                  setModel({
                    ...model,
                    cpu: { ...model.cpu, model: newValue },
                  });
                }}
                options={cpuModels}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <StyledTextField {...params} label="CPU model" />
                )}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField
                label="# of CPUs"
                name="cpuQty"
                value={model.cpu.qty}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <StyledAutocomplete
                value={model.gpu.model}
                onChange={(event, newValue) => {
                  setModel({
                    ...model,
                    gpu: { ...model.cpu, model: newValue },
                  });
                }}
                options={gpuModels}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <StyledTextField {...params} label="GPU model" />
                )}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField
                label="# of GPUs"
                name="gpuQty"
                value={model.gpu.qty}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <StyledAutocomplete
                value={model.tpu.model}
                onChange={(event, newValue) => {
                  setModel({
                    ...model,
                    tpu: { ...model.tpu, model: newValue },
                  });
                }}
                options={tpuModels}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <StyledTextField {...params} label="TPU model" />
                )}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField
                label="# of TPUs"
                name="tpuQty"
                value={model.tpu.qty}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Computation per network pass</Typography>
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField
                label="Gigaflops"
                name="gigaflops"
                value={model.gigaflops}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField
                label="Multiply-adds"
                name="multiplyAdds"
                value={model.multiplyAdds}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Other</Typography>
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField
                label="# of parameters"
                name="parametersQty"
                value={model.parametersQty}
                onChange={handleChange}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <StyledButton>
                  <Box px={3}>Add model</Box>
                </StyledButton>
              </Box>
            </Grid> */}
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </StyledCard>
  );
}
