import React, { useState } from "react";
import { Container, AllTasksButton } from "./styles.js";
import Chart from "../../components/Chart";
import ChartOptions from "../../components/ChartOptions";
import Tabs from "../../components/Tabs";
import StateOfArtBox from "../../components/StateOfArtBox";
import Button from "../../components/Button"
import Collaborate from "../../components/Collaborate";
import PageTemplate from "../../components/PageTemplate";

import {
  imagenet,
  mscoco,
  squad1_1,
  conll2003,
  wmt2014_enfr,
  wmt2014_enge,
} from "../../data";
import theme from "../../styles/theme.js";

export default function Home() {
  const [data, setData] = useState(imagenet);
  const [label, setLabel] = useState("TOP 1");
  const [selected, setSelected] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const [buttons, setButtons] = useState([
    {
      name: "Imagenet",
      onPress: () => { },
    },
  ]);

  const tabs = [
    {
      name: "Image Classification",
      onSelect: () => {
        setData(imagenet);
        setLabel("TOP 1");
        setSelected(0);
        setSelectedButton(0);
        setButtons([
          {
            name: "Imagenet",
            onPress: () => { },
          },
        ]);
      },
    },
    {
      name: "Object Detection",
      onSelect: () => {
        setData(mscoco);
        setLabel("BOX AP");
        setSelected(1);
        setSelectedButton(0);
        setButtons([
          {
            name: "MS COCO",
            onPress: () => { },
          },
        ]);
      },
    },
    {
      name: "Question Answering",
      onSelect: () => {
        setData(squad1_1);
        setLabel("F1 SCORE");
        setSelected(2);
        setSelectedButton(0);
        setButtons([
          {
            name: "SQUAD 1.1",
            onPress: () => { },
          },
        ]);
      },
    },
    {
      name: "Named Entity Recognition",
      onSelect: () => {
        setData(conll2003);
        setLabel("F1 SCORE");
        setSelected(3);
        setSelectedButton(0);
        setButtons([
          {
            name: "Conll 2003",
            onPress: () => { },
          },
        ]);
      },
    },
    {
      name: "Machine Translation",
      onSelect: () => {
        setData(wmt2014_enfr);
        setLabel("BLEU");
        setSelected(4);
        setSelectedButton(0);
        setButtons([
          {
            name: "WMT 2014 EN-FR",
            onPress: () => {
              setData(wmt2014_enfr);
              setSelectedButton(0);
              setLabel("BLEU");
            },
          },
          {
            name: "WMT 2014 EN-GE",
            onPress: () => {
              setData(wmt2014_enge);
              setSelectedButton(1);
              setLabel("BLEU");
            },
          },
        ]);
      },
    },
  ];

  return (
   <PageTemplate isHome>
      <Container>
        <Tabs selected={selected} items={tabs} />
        <div className="viewAll">
          <AllTasksButton link='/tasks' >VIEW ALL TASKS</AllTasksButton>
        </div>
        <div className="chart">
          <ChartOptions title="Benchmarks:" buttons={buttons} selected={selectedButton} />
          <Chart data={data} label={label} />
        </div>
        <StateOfArtBox data={data} />
      </Container>
      <Collaborate />
    </PageTemplate>
  );
}
