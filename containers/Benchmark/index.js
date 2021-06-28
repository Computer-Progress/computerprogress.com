import React, { useState, useEffect } from "react";
import { Container, Title } from "./styles.js";
import Chart from "../../components/Chart";
import ChartOptions from "../../components/ChartOptions";
import Tabs from "../../components/Tabs";
import PageTemplate from "../../components/PageTemplate";
import PapersList from "../../components/PapersList";
import ButtonToTop from "../../components/ButtonToTop";

function Benchmark({ benchmark }) {
  const [data, setData] = useState(benchmark.models);
  const [label, setLabel] = useState(benchmark.accuracy_types?.[0]?.name);
  const [selected, setSelected] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const [name, setName] = useState(benchmark.task_name);
  const [type, setType] = useState(0);
  const [buttons, setButtons] = useState(benchmark.accuracy_types);

  const tabs = [
    {
      name: "Performance x Computing power",
      onSelect: () => setType(0),
    },
    {
      name: "Performance x Year",
      onSelect: () => setType(1),
    },
  ];

  useEffect(() => {
    console.log('vaai vai', benchmark)
    // setDomain(query.benchmarkId);
    // console.log(domain);
  }, []);

  // useEffect(() => {
  //   switch (domain) {
  //     case "imagenet":
  //       setData(imagenet);
  //       setLabel("TOP 1");
  //       setSelectedButton(0);
  //       setName("Image Classification / Imagenet");
  //       setButtons([
  //         {
  //           name: "TOP 1",
  //           onPress: () => {},
  //         },
  //       ]);
  //       break;
  //     case "mscoco":
  //       setData(mscoco);
  //       setLabel("BOX AP");
  //       setSelectedButton(0);
  //       setName("Object Detection / MS COCO");
  //       setButtons([
  //         {
  //           name: "BOX AP",
  //           onPress: () => {},
  //         },
  //       ]);
  //       break;
  //     case "squad1_1":
  //       setData(squad1_1);
  //       setLabel("F1 SCORE");
  //       setSelectedButton(0);
  //       setName("Question Answering / SQUAD 1.1");
  //       setButtons([
  //         {
  //           name: "F1 SCORE",
  //           onPress: () => {},
  //         },
  //       ]);
  //       break;
  //     case "conll2003":
  //       setData(conll2003);
  //       setLabel("F1 SCORE");
  //       setSelectedButton(0);
  //       setName("Named Entity Recognition / Conll 2003");
  //       setButtons([
  //         {
  //           name: "F1 SCORE",
  //           onPress: () => {},
  //         },
  //       ]);
  //       break;
  //     case "wmt2014_enfr":
  //       setData(wmt2014_enfr);
  //       setLabel("BLEU");
  //       setSelectedButton(0);
  //       setName("Machine Translation / WMT 2014 EN-FR");
  //       setButtons([
  //         {
  //           name: "BLEU",
  //           onPress: () => {},
  //         },
  //       ]);
  //       break;
  //     default:
  //       break;
  //   }
  // }, [domain]);

  return (
    <PageTemplate>
      <Container>
        <Title>{name}</Title>
        <Tabs selected={type} items={tabs} />
        <div className="chart">
          <ChartOptions
            title="Accuracy"
            buttons={buttons}
            selected={selectedButton}
          />
          <Chart data={data} label={label} isByYear={type} />
        </div>
        <PapersList papers={data} accuracy={label} />
      </Container>
      <ButtonToTop />
    </PageTemplate>
  );
}

// Benchmark.getInitialProps = ({ query }) => {
//   return { query };
// };

export default Benchmark;
