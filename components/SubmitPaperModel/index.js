import {
  Grid,
  Typography,
  TextField,
  Divider,
  IconButton,
  Select,
  MenuItem,
  useMediaQuery,
  FormControl,
  Input,
  InputLabel,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import AdjustIcon from "@material-ui/icons/Adjust";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Target as TargetIcon } from "react-feather";

import {
  StyledCard,
  StyledBoxContainer,
  StyledBoxItem,
  StyledTextField,
  StyledAutocomplete,
  StyledDivider,
} from "./styles";
import { InputAdornment } from "@material-ui/core";
import { useState } from "react";

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
  { id: 1, title: "GPU  B" },
];

const tpuModels = [
  { id: 0, title: "TPU A" },
  { id: 1, title: "TPU B" },
];

export default function SubmitPaperModel() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [modelInfo, setModelInfo] = useState({
    name: "",
    task: null,
    dataset: null,
    accuracies: [{ id: null, title: "" }],
  });

  function addAccuracy() {
    const newModelInfo = { ...modelInfo };
    newModelInfo.accuracies.push({ id: null, title: "" });

    setModelInfo(newModelInfo);
  }

  function removeAccuracy(index) {
    const newModelInfo = { ...modelInfo };

    newModelInfo.accuracies[index];
    newModelInfo.accuracies.splice(index, 1);

    setModelInfo(newModelInfo);
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
              <StyledDivider />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField label="Model name" />
            </Grid>

            <Grid item xs={12}>
              <StyledAutocomplete
                options={task}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <StyledTextField {...params} label="Task" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledAutocomplete
                options={dataset}
                getOptionLabel={(option) => option.title}
                fullWidth
                renderInput={(params) => (
                  <StyledTextField {...params} placeholder="Dataset" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              {modelInfo.accuracies.map((accuracy, index) => (
                <Grid container key={index}>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <InputLabel>Accuracy type</InputLabel>

                      <Select>
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
                    <TextField placeholder="Value" margin="normal" />
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
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Training information</Typography>
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField label="Training time" />
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField label="# of Epochs" />
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <FormControlLabel
                  value="top"
                  control={<Switch color="primary" />}
                  label="Uses extra training data?"
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
          </Grid>

          {isLargeScreen && (
            <Grid item>
              <Divider orientation="vertical" />
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
              <StyledDivider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Hardware burden</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <StyledAutocomplete
                options={cpuModels}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <StyledTextField {...params} label="CPU model" />
                )}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField label="# of CPUs" />
            </Grid>

            <Grid item xs={12} md={8}>
              <StyledAutocomplete
                options={gpuModels}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <StyledTextField {...params} label="GPU model" />
                )}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField label="# of GPUs" />
            </Grid>

            <Grid item xs={12} md={8}>
              <StyledAutocomplete
                options={tpuModels}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <StyledTextField {...params} label="TPU model" />
                )}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <StyledTextField label="# of TPUs" />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Computation per network pass</Typography>
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField label="Gigaflops" />
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField label="Multiply-adds" />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Other</Typography>
            </Grid>

            <Grid item xs={6} md={5} lg={4} xl={3}>
              <StyledTextField label="# of parameters" />
            </Grid>
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </StyledCard>
  );
}
