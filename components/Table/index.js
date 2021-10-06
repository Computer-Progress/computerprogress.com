import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@material-ui/core";

import { Grid, Box, Button } from "@material-ui/core";

import TaskTableTabs from "../TaskTableTabs";
import TableOptions from "../TableOptions";
import TaskTableSOTA from "../TaskTableSOTA";
import TaskTableChart from "../TaskTableChart";

import { MuiTheme } from "../../styles/theme";
import { StyledGridItem, StyledFlexbox, Footnote } from "./styles";

export default function TaskTable(props) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));
  const isMobileXS = useMediaQuery(MuiTheme.breakpoints.down("xs"));

  return (
    <>
      <Grid container spacing={1}>
        <StyledGridItem $order={0} xs={12} lg={props.showViewAllTasks ? 9 : 12}>
          <TaskTableTabs
            tabs={props.tabs}
            selectedTab={props.selectedTab}
            onSelectTab={props.onSelectTab}
          />
        </StyledGridItem>

        {!isMobile && props.showViewAllTasks && (
          <StyledGridItem $order={1} xs={3}>
            <Link href="/tasks">
              <StyledFlexbox>
                <Button color="primary">View all tasks</Button>
              </StyledFlexbox>
            </Link>
          </StyledGridItem>
        )}

        <StyledGridItem
          $order={3}
          xs={12}
          sm={props.showViewAllTasks ? 6 : 12}
          lg={props.showViewAllTasks ? 3 : 3}
        >
          <TableOptions
            options={props.options}
            selectedOption={props.selectedOption}
            setSelectedOption={props.setSelectedOption}
            optionsTitle={props.optionsTitle}
            secondaryOptions={props.secondaryOptions}
            selectedSecondaryOption={props.selectedSecondaryOption}
            setSelectedSecondaryOption={props.setSelectedSecondaryOption}
            secondaryOptionsTitle={props.secondaryOptionsTitle}
            fieldName={props.fieldName}
          />
        </StyledGridItem>

        <StyledGridItem $order={4} xs={12} lg={props.showViewAllTasks ? 6 : 9}>
          <TaskTableChart
            isLoading={props.loading}
            data={props.data}
            label={props.label}
            computingPower={props.computingPower}
            isByYear={props.isByYear}
          />
        </StyledGridItem>
        {props.sota ? (
          <StyledGridItem $order={isMobile ? 3 : 4} xs={12} sm={6} lg={3}>
            <Box style={{ height: "100%" }} ml={isMobileXS ? 0 : 2}>
              <TaskTableSOTA sota={props.sota} />
            </Box>
          </StyledGridItem>
        ) : null}
      </Grid>
      {!props.isByYear ? (
        <Footnote>
          * The regression is performed in log-log space but (for
          interpretability) the regression formula is shown in exponential form.
        </Footnote>
      ) : null}
    </>
  );
}
