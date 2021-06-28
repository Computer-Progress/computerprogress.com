import { useState, useEffect } from "react";
import { CircularProgress, Box } from "@material-ui/core";

import { StyledCard, StyledBox } from "./styles";

export default function TaskTableChart({ isLoading, datasetModels }) {
  return (
    <StyledCard>
      {isLoading ? (
        <StyledBox>
          <CircularProgress />
        </StyledBox>
      ) : (
        <Box m={3}>Models for dataset with id {datasetModels.dataset_id}.</Box>
      )}
    </StyledCard>
  );
}
