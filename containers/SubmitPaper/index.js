import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PageTemplate from "../../components/PageTemplate";
import SubmitPaperInfo from "../../components/SubmitPaperInfo";
import SubmitPaperModel from "../../components/SubmitPaperModel";

import { Grid } from "@material-ui/core/";

import { Typography } from "@material-ui/core";

export default function SubmitPaper() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant="h1">Submit paper</Typography>
          </Grid>

          <Grid item>
            <SubmitPaperInfo />
          </Grid>

          <Grid item>
            <SubmitPaperModel />
          </Grid>
        </Grid>
      </PageTemplate>
    </ThemeProvider>
  );
}
