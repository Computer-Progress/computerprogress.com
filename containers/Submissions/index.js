import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@material-ui/core";

import { Grid, Box, Button } from "@material-ui/core";

import UserPageTemplate from "../../components/UserPageTemplate";
import Submissions from '../../components/Submissions';
import { MuiTheme } from "../../styles/theme";
import { StyledGridItem, StyledFlexbox, Title } from "./styles";

export default function Review() {
  // const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));
  const papers = [
    {
      name: 'Segmentation Transformer: Object Contextual Representations',
      models: [
        'Semantic Segmentation',
        'Panoptic Segmentation',
      ],
      last_update: '2 dias atrás',
      status: 'Review pending'
    },
    {
      name: 'Segmentation Transformer: Object Contextual Representations',
      models: [
        'Semantic Segmentation',
        'Panoptic Segmentation',
      ],
      last_update: '2 dias atrás',
      status: 'Review pending'
    },
    {
      name: 'Segmentation Transformer: Object Contextual Representations',
      models: [
        'Semantic Segmentation',
        'Panoptic Segmentation',
      ],
      last_update: '2 dias atrás',
      status: 'Review pending'
    },
  ]

  return (
    <UserPageTemplate selectedPage={1}>
      <Title>Submissions</Title>
      <Submissions papers={papers} />
    </UserPageTemplate>
  );
}
