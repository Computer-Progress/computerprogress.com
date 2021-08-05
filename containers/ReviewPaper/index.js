import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PageTemplate from "../../components/PageTemplate";
import PaperInformation from "../../components/PaperInformation";
import ModelInformation from "../../components/ModelInformation";
import Conversation from "../../components/Conversation";

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

export default function ReviewPaper() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate>
        <Box py={8}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="h1">Submit paper</Typography>
            </Grid>

            {/* <Grid item xs={12}>
              <PaperInformation />
            </Grid>

            <Grid item xs={12}>
              <ModelInformation />
            </Grid> */}

            <Grid item xs={12}>
              <Typography variant="h1">Conversation</Typography>
            </Grid>

            <Grid item xs={12}>
              <Conversation timeline={timeline} />
            </Grid>
          </Grid>
        </Box>
      </PageTemplate>
    </ThemeProvider>
  );
}
