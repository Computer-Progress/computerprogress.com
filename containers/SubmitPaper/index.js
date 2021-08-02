import { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PageTemplate from "../../components/PageTemplate";
import PaperInformation from "../../components/PaperInformation";
import ModelInformation from "../../components/ModelInformation";

import { Box, Grid, Typography } from "@material-ui/core/";
import { OutlinedButton, ContainedButton } from "./styles";

const emptyModel = {
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
};

export default function SubmitPaper() {
  const [paper, setPaper] = useState({});

  useEffect(() => {
    setPaper({
      title: "",
      link: "",
      code_link: "",
      publication_date: null,
      authors: [],
      models: [emptyModel],
    });
  }, []);

  function handlePaperInformationChange(newPaper) {
    setPaper({ ...paper, newPaper });
  }

  function handleModelChange(newModel, modelIndex) {
    const newPaper = { ...paper };
    newPaper.models[modelIndex] = newModel;

    setPaper(newPaper);
  }

  function addNewModel() {
    setPaper({ ...paper, models: [...paper.models, emptyModel] });
  }

  function submitPaper() {
    console.log("submit paper");
  }

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

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Box pl={1} borderRadius={10}>
                  <OutlinedButton onClick={addNewModel}>
                    New model
                  </OutlinedButton>
                </Box>
                <Box pl={1}>
                  <ContainedButton onClick={submitPaper}>
                    Submit paper
                  </ContainedButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </PageTemplate>
    </ThemeProvider>
  );
}
