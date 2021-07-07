import {
  Grid,
  Typography,
  TextField,
  Divider,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import AdjustIcon from "@material-ui/icons/Adjust";
import Add from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import {
  StyledCard,
  StyledBoxContainer,
  StyledBoxItem,
  StyledTextField,
  StyledSelect,
} from "./styles";
import { InputAdornment } from "@material-ui/core";

export default function SubmitPaperModel() {
  return (
    <StyledCard>
      <StyledBoxContainer>
        <Grid container spacing={3}>
          <Grid item xs={6} container spacing={3} alignContent="flex-start">
            <Grid item xs={12}>
              <Typography variant="h3">Model</Typography>
            </Grid>

            <Grid item xs={12}>
              <StyledTextField label="Model name" />
            </Grid>

            <Grid item xs={12}>
              <StyledSelect label="Task" />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField label="Dataset" />
            </Grid>

            <Grid item xs={8}>
              <TextField
                placeholder="Accuracy type"
                disabled
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AdjustIcon />
                    </InputAdornment>
                  ),
                }}
              >
                Paper
              </TextField>
            </Grid>

            <Grid item xs={3}>
              <TextField
                placeholder="Placeholder"
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={1}>
              <IconButton size="small" onClick={console.log("a")}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item>
            <Divider orientation="vertical" />
          </Grid>

          <Grid item xs={6} container spacing={3} alignContent="flex-start">
            <Grid item xs={12}>
              <Typography variant="h3">Computing power information</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Hardware burden</Typography>
            </Grid>

            <Grid item xs={8}>
              <StyledTextField label="CPU model" />
            </Grid>

            <Grid item xs={4}>
              <StyledTextField label="# of CPUs" />
            </Grid>

            <Grid item xs={8}>
              <StyledTextField label="GPU model" />
            </Grid>

            <Grid item xs={4}>
              <StyledTextField label="# of GPUs" />
            </Grid>

            <Grid item xs={8}>
              <StyledTextField label="TPU model" />
            </Grid>

            <Grid item xs={4}>
              <StyledTextField label="# of TPUs" />
            </Grid>
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </StyledCard>
  );
}
