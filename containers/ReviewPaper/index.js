import { useEffect, useState } from 'react';

import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PageTemplate from "../../components/PageTemplate";
import PaperInformation from "../../components/PaperInformation";
import ModelInformation from "../../components/ModelInformation";
import Conversation from "../../components/Conversation";
import useApi from '../../services/useApi';
import PaperSubmission from '../../components/PaperSubmission';
import { Box, Grid, Typography } from "@material-ui/core/";

const timeline = [
  {
    type: "remove-author",
    content: "João removed “Gabriel Casado” from authors.",
    date: "2 hours ago",
  },
  {
    type: "add-author",
    content: "João added “Gabriel Casado” to authors.",
    date: "2 hours ago",
  },
  {
    type: "remove",
    content: "João added “Gabriel Casado” to authors.",
    date: "2 hours ago",
  },
  {
    type: "comment",
    content: "João added “Gabriel Casado” to authors.",
    date: "2 hours ago",
  },
  {
    type: "add",
    content:
      "João added “BLEU” accuracy from model “HRNet-OCR (Hierarchical Multi-Scale Attention)”.",
    date: "2 hours ago",
  },
  {
    type: "edit",
    content:
      "João edited dataset from model “HRNet-OCR (Hierarchical Multi-Scale Attention)”.",
    date: "2 hours ago",
  },
];

export default function ReviewPaper({ submissionId }) {
  const api = useApi();
  const [paper, setPaper] = useState(null);
  const [messages, setMessages] = useState([]);

  const getSubmission = async () => {
    try {
      const res = await api.get(`/submissions/${submissionId}`);
      setPaper(res.data);
    } catch (error) {
      console.log('cant load this submission')
    }
  }

  useEffect(() => {
    getSubmission();
  }, []);


  console.log('submission', submissionId)

  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate>
        <Box py={8}>
          <Grid container spacing={5}>
            <PaperSubmission submittedPaper={paper} />

            {/*<Grid item xs={12}>
              <PaperInformation />
            </Grid>

            <Grid item xs={12}>
              <ModelInformation />
            </Grid> */}

            <Grid item xs={12}>
              <Typography variant="h1">Conversation</Typography>
            </Grid>

            <Grid item xs={12}>
              <Conversation timeline={messages} paperId={submissionId} />
            </Grid>
          </Grid>
        </Box>
      </PageTemplate>
    </ThemeProvider>
  );
}
