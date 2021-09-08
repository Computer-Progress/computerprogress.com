import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@material-ui/core";

import { Grid, Box, Button } from "@material-ui/core";

import TaskTableTabs from "../TaskTableTabs";
import TableOptions from "../TableOptions";
import TaskTableSOTA from "../TaskTableSOTA";
import TaskTableChart from "../TaskTableChart";

import { MuiTheme } from "../../styles/theme";
import { StyledGridItem, StyledFlexbox } from "./styles";

export default function TaskTable({
  tabs,
  selectedTab,
  onSelectTab,
  showViewAllTasks,
  options,
  optionsTitle,
  selectedOption,
  setSelectedOption,
  secondaryOptions,
  selectedSecondaryOption,
  setSelectedSecondaryOption,
  secondaryOptionsTitle,
  loading,
  data,
  label,
  computingPower,
  fieldName,
  sota,
  isByYear
}) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));

  return (
    <>
      <Grid container spacing={1}>
        <StyledGridItem $order={0} xs={12} lg={showViewAllTasks ? 9 : 12}>
          <TaskTableTabs
            tabs={tabs}
            selectedTab={selectedTab}
            onSelectTab={onSelectTab}
          />
        </StyledGridItem>

        {!isMobile && showViewAllTasks && (
          <StyledGridItem $order={1} xs={3}>
            <Link href="/tasks">
              <StyledFlexbox>
                <Button color="primary">View all tasks</Button>
              </StyledFlexbox>
            </Link>
          </StyledGridItem>
        )}

        <StyledGridItem $order={3} xs={12} sm={showViewAllTasks ? 6 : 12} lg={showViewAllTasks ? 3 : 3}>
          <TableOptions
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            optionsTitle={optionsTitle}
            secondaryOptions={secondaryOptions}
            selectedSecondaryOption={selectedSecondaryOption}
            setSelectedSecondaryOption={setSelectedSecondaryOption}
            secondaryOptionsTitle={secondaryOptionsTitle}
            fieldName={fieldName}
          />
        </StyledGridItem>

        <StyledGridItem $order={isMobile ? 4 : 4} xs={12} lg={showViewAllTasks ? 6 : 9}>
          <TaskTableChart
            isLoading={loading}
            data={data}
            label={label}
            computingPower={computingPower}
            isByYear={isByYear}
          />
        </StyledGridItem>
        {sota ? (
          <StyledGridItem $order={isMobile ? 3 : 4} xs={12} sm={6} lg={3}>
            <Box style={{ height: "100%" }} ml={2}>
              <TaskTableSOTA
                sota={sota}
              />
            </Box>
          </StyledGridItem>
        ) : null}
      </Grid>
    </>
  );
}
