import { useState, useEffect } from "react";
import { CircularProgress, Box } from "@material-ui/core";

import { StyledCard, StyledBox } from "./styles";
import Chart from "../Chart";

export default function TaskTableChart({
  isLoading,
  data,
  computingPower,
  label,
  isByYear,
}) {
  // const computingPower = {
  //   name: 'Hardware Burden',
  //   value: 'hardware_burden',
  // }
  return (
    <StyledCard>
      {isLoading ? (
        <StyledBox>
          <CircularProgress />
        </StyledBox>
      ) : (
        <Chart
          data={data}
          label={label}
          computingPower={computingPower}
          isByYear={isByYear}
        />
      )}
    </StyledCard>
  );
}
