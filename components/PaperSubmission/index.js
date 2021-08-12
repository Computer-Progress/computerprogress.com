import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";

import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PaperInformation from "../../components/PaperInformation";
import ModelInformation from "../../components/ModelInformation";

import { Box, Grid, Typography } from "@material-ui/core/";
import { OutlinedButton, ContainedButton } from "./styles";
import useApi from '../../services/useApi';

const emptyPaper = {
  title: "",
  link: "",
  code_link: "",
  publication_date: null,
  authors: [],
  models: [],
};

export default function PaperSubmission({ submittedPaper }) {
  const api = useApi();
  const [paper, setPaper] = useState({});
  const [nextId, setNextId] = useState(2);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [paperErrors, setPaperErros] = useState({});
  const [shouldValidate, setShouldValidade] = useState(false);

  const emptyModel = (newId) => {
    console.log('onAdd', newId)
    return {
      id: newId,
      name: '',
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
    }
  };

  useEffect(() => {
    console.log('submittedPaper', submittedPaper)
    if (submittedPaper) {
      setPaper(submittedPaper)
    } else {
      setPaper({
        ...emptyPaper,
        models: [emptyModel(1)],
      });
    }
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
    setPaper({ ...paper, models: [...paper.models, emptyModel(nextId)] });
    setNextId(nextId + 1)
  }

  function removeModel(modelIndex) {
    console.log(modelIndex);

    const newPaper = paper;
    const newList = paper.models.filter((item, index) => index !== modelIndex);;
    newPaper.models = [...newList];
  
    setPaper({...newPaper});
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

  const onSubmit = async () => {
    console.log(paper);
    const response = await api.post('/submissions', paper);
    console.log('response', response)
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <Box py={8}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h1">Submit paper</Typography>
          </Grid>

          <Grid item xs={12}>
            <PaperInformation
              paper={paper}
              submittedPaper={submittedPaper}
              handlePaperInformationChange={handlePaperInformationChange}
              control={control}
              register={register}
              errors={errors}
            />
          </Grid>
          {console.log('Aquuiii', paper.models)}
          {paper.models?.map((model, index) => (
            <Grid item xs={12} key={model.id}>
              {console.log('model.id', model.id)}
              <ModelInformation
                model={model}
                key={model.id}
                id={model.id}
                modelIndex={index}
                handleModelChange={handleModelChange}
                handleRemoveModel={removeModel}
                index={index}
                control={control}
                register={register}
                errors={errors}
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
    </ThemeProvider>
  );
}
