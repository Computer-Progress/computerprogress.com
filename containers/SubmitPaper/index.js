import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import PageTemplate from "../../components/PageTemplate";
import SubmitPaperInfo from "../../components/SubmitPaperInfo";
import SubmitPaperModel from "../../components/SubmitPaperModel";
import SubmitModelsList from "../../components/SubmitModelsList";

import { Box, Grid, Typography } from "@material-ui/core/";

import { StyledButton } from "./styles";

function createData(name, dataset, task, accuracyType, accuracyValue) {
  return { name, dataset, task, accuracyType, accuracyValue };
}

const models = [
  createData(
    "Frozen HRNet-OCR (Hierarchical Multi-Scale Attention)",
    "Cityscapes test",
    "Semantic Segmentation",
    "Mean IoU (class)",
    "85.1%"
  ),
  createData(
    "OCR (HRNetV2-W48)",
    "ADE20K val",
    "Semantic Segmentation",
    "mIoU",
    "45.66"
  ),
];

export default function SubmitPaper() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate>
        <Box py={8}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="h1">Submit paper</Typography>
            </Grid>

            <Grid item xs={12}>
              <SubmitPaperInfo />
            </Grid>

            <Grid item xs={12}>
              <SubmitPaperModel />
            </Grid>

            {/* <Grid item xs={12}>
              <SubmitModelsList models={models} />
            </Grid> */}

            {/* <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <StyledButton >
                  <Box px={5} py={1}>
                    Submit paper
                  </Box>
                </StyledButton>
              </Box>
            </Grid> */}
          </Grid>
        </Box>
      </PageTemplate>
    </ThemeProvider>
  );
}
