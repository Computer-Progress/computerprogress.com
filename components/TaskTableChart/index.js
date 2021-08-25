import { useState, useEffect } from "react";
import { CircularProgress, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { StyledCard, StyledBox } from "./styles";
import Chart from "../Chart";

export default function TaskTableChart({ isLoading, data, computingPower, label, isByYear }) {
  // const computingPower = {
  //   name: 'Hardware Burden',
  //   value: 'hardware_burden',
  // }

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StyledCard style={{ borderRadius: isTablet ? "16px" : "0 16px 16px 0" }}>
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
