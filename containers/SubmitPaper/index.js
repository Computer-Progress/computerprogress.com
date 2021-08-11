import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";

import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PageTemplate from "../../components/PageTemplate";
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

import PaperSubmission from '../../components/PaperSubmission';

export default function SubmitPaper() {

  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate>
        <PaperSubmission />
      </PageTemplate>
    </ThemeProvider>
  );
}
