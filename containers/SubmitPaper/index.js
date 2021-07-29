import { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PageTemplate from "../../components/PageTemplate";
import PaperInformation from "../../components/PaperInformation";
import ModelInformation from "../../components/ModelInformation";

import { Box, Grid, Typography } from "@material-ui/core/";

const emptyPaper = {
  title: "",
  link: "",
  code_link: "",
  publication_date: null,
  authors: [],
  models: [
    {
      name: "a",
      task: null,
      dataset: null,
      cpu: null,
      gpu: null,
      tpu: null,
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

  function handlePaperInformationChange(newPaper) {
    setPaper(newPaper);
  }

  function handleModelChange(newModel, modelIndex) {
    const newPaper = { ...paper };
    newPaper.models[modelIndex] = newModel;

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
              <PaperInformation
                paper={paper}
                handlePaperInformationChange={handlePaperInformationChange}
              />
            </Grid>
            {/* {paper.models.map((model, index) => (
              <Grid item xs={12} key={index}>
                <ModelInformation
                  model={model}
                  modelIndex={index}
                  handleModelChange={handleModelChange}
                />
              </Grid>
            ))} */}
          </Grid>
        </Box>
      </PageTemplate>
    </ThemeProvider>
  );
}
