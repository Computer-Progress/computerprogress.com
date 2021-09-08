import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@material-ui/core";

import { Grid, Box, Button } from "@material-ui/core";

import UserPageTemplate from "../../components/UserPageTemplate";
import Submissions from "../../components/Submissions";
import { MuiTheme } from "../../styles/theme";
import { StyledGridItem, StyledFlexbox, Title } from "./styles";

export default () => {
  // const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));
  const papers = [
    {
      name: "Segmentation Transformer: Object Contextual Representations",
      models: ["Semantic Segmentation", "Panoptic Segmentation"],
      last_update: "2 dias atrás",
      status: 0,
      submitted_by: "João Agewarth",
    },
    {
      name: "Segmentation Transformer: Object Contextual Representations",
      models: ["Semantic Segmentation", "Panoptic Segmentation"],
      last_update: "2 dias atrás",
      status: 3,
      submitted_by: "João Agewarth",
    },
    {
      name: "Segmentation Transformer: Object Contextual Representations",
      models: ["Semantic Segmentation", "Panoptic Segmentation"],
      last_update: "2 dias atrás",
      status: 1,
      submitted_by: "João Agewarth",
    },
  ];

  return (
    <UserPageTemplate selectedPage={2}>
      <Title>Review</Title>
      <Submissions papers={papers} />
    </UserPageTemplate>
  );
};
