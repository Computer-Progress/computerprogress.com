import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";

import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PaperInformation from "../../components/PaperInformation";
import ModelInformation from "../../components/ModelInformation";
import NewButton from "../../components/Button/NewButton";

import { Box, Grid, Typography } from "@material-ui/core/";
import { OutlinedButton, ContainedButton } from "./styles";
import useApi from "../../services/useApi";
import { TrainRounded } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Creators as alertActions } from "../../store/ducks/alert";
import Conversation from "../../components/Conversation";
import { useRouter } from "next/router";
import MuiCircularProgress from "@material-ui/core/CircularProgress";

const emptyPaper = {
  title: "",
  link: "",
  code_link: "",
  publication_date: null,
  authors: [],
  models: [],
};

export default function PaperSubmission({ submittedPaper }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const api = useApi();
  const [paper, setPaper] = useState({});
  const [nextId, setNextId] = useState(2);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [onUpdate, setOnUpdate] = useState(false);
  const [paperDidChange, setPaperDidChange] = useState(false);
  const [undoChangesPressed, setUndoChangesPressed] = useState(false);

  const undoRef = useRef(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const emptyModel = (newId) => {
    return {
      id: newId,
      name: "",
      task: null,
      dataset: null,
      cpu: null,
      gpu: null,
      tpu: null,
      gflops: null,
      multiply_adds: null,
      number_of_parameters: null,
      training_time: "",
      epochs: "",
      extra_training_data: false,
      accuracies: [],
    };
  };

  useEffect(() => {
    if (submittedPaper) {
      const myPaper = JSON.parse(JSON.stringify(submittedPaper.data));
      setPaper(myPaper);
    } else {
      setPaper({
        ...emptyPaper,
        models: [emptyModel(1)],
      });
    }
  }, [undoChangesPressed]);

  useEffect(() => {
    setUndoChangesPressed(!undoChangesPressed);
  }, [submittedPaper]);

  useEffect(() => {
    undoRef.current = false;

    setTimeout(() => {
      undoRef.current = true;
    }, 600);
  }, [submittedPaper, undoChangesPressed]);

  function handlePaperInformationChange(newPaper) {
    setPaper({ ...paper, ...newPaper });
    if (undoRef.current) {
      setPaperDidChange(true);
    }
  }

  function handleModelChange(newModel, modelIndex) {
    const newPaper = { ...paper };
    newPaper.models[modelIndex] = newModel;
    setPaper(newPaper);
    if (undoRef.current) {
      setPaperDidChange(true);
    }
  }

  function addNewModel() {
    setPaper({ ...paper, models: [...paper.models, emptyModel(nextId)] });
    setNextId(nextId + 1);
  }

  function removeModel(modelIndex) {
    const newPaper = paper;
    const newList = paper.models.filter((item, index) => index !== modelIndex);
    newPaper.models = [...newList];

    setPaper({ ...newPaper });
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

  const undoChanges = () => {
    setUndoChangesPressed(!undoChangesPressed);
    setPaperDidChange(false);
    setPageLoading(true);
    setTimeout(() => {
      setPageLoading(false);
    }, 5);
  };

  const onSubmitAction = async (status) => {
    // console.log(paper);
    setLoading(true);
    try {
      if (submittedPaper) {
        if (typeof status === "string") {
          const response = await api.put(
            `/submissions/${submittedPaper.id}/status`,
            {
              status: status,
            }
          );
        } else {
          const response = await api.put(
            `/submissions/${submittedPaper.id}`,
            paper
          );
        }
        dispatch(
          alertActions.openAlert({
            open: true,
            message: `Submission updated with success.`,
            type: "success",
          })
        );
        setOnUpdate(!onUpdate);
        setPaperDidChange(false);
      } else {
        const response = await api.post("/submissions", paper);
        // console.log("response", response);
        router.push("/papers/submissions");
        dispatch(
          alertActions.openAlert({
            open: true,
            message: "Submission created",
            type: "success",
          })
        );
      }
    } catch (err) {
      dispatch(
        alertActions.openAlert({
          open: true,
          message: err.response?.data?.detail?.map((value) => `${value.msg}, `),
          type: "error",
        })
      );
    }
    setLoading(false);
  };

  const onPressSaveChanges = async (item) => {
    handleSubmit(onSubmitAction(item));
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <Box py={8}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <PaperInformation
              paper={paper}
              undoChangesPressed={undoChangesPressed}
              submittedPaper={submittedPaper?.data}
              handlePaperInformationChange={handlePaperInformationChange}
              control={control}
              register={register}
              errors={errors}
            />
          </Grid>
          {pageLoading ? (
            <MuiCircularProgress />
          ) : (
            <>
              {paper.models?.map((model, index) => (
                <Grid item xs={12} key={model.id}>
                  <ModelInformation
                    model={model}
                    undoChangesPressed={undoChangesPressed}
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
            </>
          )}

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Box pl={1} borderRadius={10}>
                <OutlinedButton onClick={addNewModel}>New model</OutlinedButton>
              </Box>
              {submittedPaper && paperDidChange ? (
                <Box pl={1}>
                  <NewButton
                    loading={loading}
                    onClick={undoChanges}
                    disabled={!paperDidChange}
                  >
                    UNDO CHANGES
                  </NewButton>
                </Box>
              ) : null}

              <Box pl={1}>
                <NewButton
                  loading={loading}
                  onClick={handleSubmit(onSubmitAction)}
                  disabled={!paperDidChange}
                >
                  {submittedPaper ? "Save changes" : "Submit paper"}
                </NewButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {submittedPaper ? (
          <Box>
            <Grid item xs={12}>
              <Typography variant="h1">Conversation</Typography>
            </Grid>

            <Grid item xs={12}>
              <Conversation
                paperId={submittedPaper?.id}
                onPressSaveChanges={onPressSaveChanges}
                onUpdate={onUpdate}
              />
            </Grid>
          </Box>
        ) : null}
      </Box>
    </ThemeProvider>
  );
}
