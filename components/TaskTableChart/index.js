import { useState, useEffect } from "react";
import { CircularProgress, Box } from "@material-ui/core";

import { StyledCard, StyledBox } from "./styles";
import Chart from "../Chart";

export default function TaskTableChart({ isLoading, datasetModels }) {
  return (
    <StyledCard>
      {isLoading ? (
        <StyledBox>
          <CircularProgress />
        </StyledBox>
      ) : (
        <Chart data={datasetModels.models} label={datasetModels.accuracy_types[0].name} />
      )}
    </StyledCard>
  );
}
