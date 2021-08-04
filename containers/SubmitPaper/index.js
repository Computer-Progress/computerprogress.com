import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
  accuracies: [],
};

const emptyPaper = {
  title: "",
  link: "",
  code_link: "",
  publication_date: null,
  authors: [],
  models: [],
};

export default function SubmitPaper() {
  const [paper, setPaper] = useState({});
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [paperErrors, setPaperErros] = useState({});
  const [shouldValidate, setShouldValidade] = useState(false);

  useEffect(() => {
    setPaper({
      ...emptyPaper,
      models: [emptyModel],
    });
  }, []);

  function handlePaperInformationChange(newPaper) {
    setPaper({ ...paper, ...newPaper });
  }

  function handleModelChange(newModel, modelIndex) {
    const newPaper = { ...paper };
    newPaper.models[modelIndex] = newModel;

    setPaper(newPaper);
  }

  function addNewModel() {
    setPaper({ ...paper, models: [...paper.models, emptyModel] });
  }

  function validatePaperInformation() {
    const { models, ...newPaperInformation } = paper;

    Object.keys(newPaperInformation).forEach((key) => {});
  }

  function validateModelInformation() {}

  function validateData() {
    validatePaperInformation();
    // validateModelInformation();
  }

  function submitPaper() {
    validateData();
  }

  const onSubmit = () => console.log(paper);

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
                control={control}
                register={register}
                errors={errors}
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
                  <ContainedButton onClick={handleSubmit(onSubmit)}>
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
