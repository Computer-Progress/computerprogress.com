import React, { useState, useEffect } from "react";
import { Container, Title } from "./styles.js";
import Chart from "../../components/Chart";
import ChartOptions from "../../components/ChartOptions";
import Tabs from "../../components/Tabs";
import PageTemplate from "../../components/PageTemplate";
import PapersList from "../../components/PapersList";

import {
  imagenet,
  mscoco,
  squad1_1,
  conll2003,
  wmt2014_enfr,
  wmt2014_enge,
} from "../../data";

function Domain({ router, query }) {
  const [domain, setDomain] = useState(0)
  const [data, setData] = useState(imagenet);
  const [label, setLabel] = useState("TOP 1");
  const [selected, setSelected] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const [name, setName] = useState('')
  const [type, setType] = useState(0);
  const [buttons, setButtons] = useState([
    {
      name: "Imagenet",
      onPress: () => { },
    },
  ]);

  const tabs = [
    {
      name: 'Performance x Computing power',
      onSelect: () => setType(0)
    },
    {
      name: 'Performance x Year',
      onSelect: () => setType(1)
    }
  ]

  useEffect(() => {
    setDomain(query?.id);
  }, [])

  useEffect(() => {
    switch (domain) {
      case "0":
        setData(imagenet);
        setLabel("TOP 1");
        setSelectedButton(0);
        setName('Image Classification / Imagenet')
        setButtons([
          {
            name: "TOP 1",
            onPress: () => { },
          },
        ]);
        break;
      case "1":
        setData(mscoco);
        setLabel("BOX AP");
        setSelectedButton(0);
        setName('Object Detection / MS COCO')
        setButtons([
          {
            name: "BOX AP",
            onPress: () => { },
          },
        ]);
        break;
      case "2":
        setData(squad1_1);
        setLabel("F1 SCORE");
        setSelectedButton(0);
        setName('Question Answering / SQUAD 1.1')
        setButtons([
          {
            name: "F1 SCORE",
            onPress: () => { },
          },
        ]);
        break;
      case "3":
        setData(conll2003);
        setLabel("F1 SCORE");
        setSelectedButton(0);
        setName('Named Entity Recognition / Conll 2003')
        setButtons([
          {
            name: "F1 SCORE",
            onPress: () => { },
          },
        ]);
        break;
      case "4":
        setData(wmt2014_enfr);
        setLabel("BLEU");
        setSelectedButton(0);
        setName('Machine Translation / WMT 2014 EN-FR')
        setButtons([
          {
            name: "BLEU",
            onPress: () => { },
          },
        ]);
        break;
      default:
        break;
    }
  }, [domain])

  return (
   <PageTemplate>
      <Container>
        <Title>{name}</Title>
        <Tabs selected={type} items={tabs} />
        <div className="chart">
          <ChartOptions title="Accuracy" buttons={buttons} selected={selectedButton} />
          <Chart data={data} label={label} isByYear={type} />
        </div>
        <PapersList papers={data} accuracy={label} />
      </Container>
    </PageTemplate>
  );
}

Domain.getInitialProps = ({query}) => {
  return {query}
}

export default Domain;
