import { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PageTemplate from "../../components/PageTemplate";
import PaperInformation from "../../components/PaperInformation";
import ModelInformation from "../../components/ModelInformation";

import { Box, Grid, Typography } from "@material-ui/core/";

export default function SubmitPaper() {
  const [paper, setPaper] = useState({});

  useEffect(() => {
    setPaper({
      title: "",
      link: "",
      code_link: "",
      publication_date: null,
      authors: [],
      models: [
        {
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
          accuracies: [
            {
              accuracy_type: "",
              value: "",
            },
          ],
        },
      ],
    });
  }, []);

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
            {paper.models?.map((model, index) => (
              <Grid item xs={12} key={index}>
                <ModelInformation
                  model={model}
                  modelIndex={index}
                  handleModelChange={handleModelChange}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </PageTemplate>
    </ThemeProvider>
  );
}
