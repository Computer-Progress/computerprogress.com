import {
  Grid,
  Typography,
  TextField,
  Divider,
  IconButton,
} from "@material-ui/core";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Add from "@material-ui/icons/Add";

import {
  StyledCard,
  StyledBoxContainer,
  StyledBoxItem,
  StyledTextField,
} from "./styles";
import { InputAdornment } from "@material-ui/core";

export default function SubmitPaperInfo() {
  return (
    <StyledCard>
      <StyledBoxContainer>
        <Grid container spacing={3}>
          <Grid item xs={6} container spacing={3} alignContent="flex-start">
            <Grid item xs={12}>
              <Typography variant="h3">Paper</Typography>
            </Grid>

            <Grid item xs={12}>
              <StyledTextField label="Title" />
            </Grid>

            <Grid item xs={6}>
              <StyledTextField label="Link" />
            </Grid>

            <Grid item xs={6}>
              <StyledTextField label="Code link" />
            </Grid>

            <Grid item xs={6}>
              <StyledTextField label="Release date" />
            </Grid>
          </Grid>

          <Grid item>
            <Divider orientation="vertical" />
          </Grid>

          <Grid item xs={6} container spacing={3} alignContent="flex-start">
            <Grid item xs={12}>
              <Typography variant="h3">Authors</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                placeholder="Author name"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonAdd />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={console.log("a")}>
                        <Add />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              >
                Paper
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </StyledCard>
  );
}
