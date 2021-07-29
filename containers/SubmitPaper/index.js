import { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PageTemplate from "../../components/PageTemplate";
import PaperInformation from "../../components/PaperInformation";
import SubmitPaperModel from "../../components/SubmitPaperModel";

import { Box, Grid, Typography } from "@material-ui/core/";

const emptyPaper = {
  title: "",
  link: "",
  code_link: "",
  publication_date: null,
  authors: [],
  models: [
    {
      name: "",
      task: 0,
      dataset: 0,
      cpu: 0,
      gpu: 0,
      tpu: 0,
      gflops: 0,
      multiply_adds: 0,
      number_of_parameters: 0,
      training_time: 0,
      epochs: 0,
      extra_training_data: false,
      accuracies: [
        {
          accuracy_type: 0,
          value: 0,
        },
      ],
    },
  ],
};

export default function SubmitPaper() {
  const [paper, setPaper] = useState(emptyPaper);

  function handleChange(newPaper) {
    setPaper(newPaper);
  }

  // console.log(paper);

  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate>
        <Box py={8}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="h1">Submit paper</Typography>
            </Grid>

            <Grid item xs={12}>
              <PaperInformation paper={paper} handleChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <SubmitPaperModel />
            </Grid>
          </Grid>
        </Box>
      </PageTemplate>
    </ThemeProvider>
  );
}
