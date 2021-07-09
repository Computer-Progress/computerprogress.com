import React, { useState, useEffect } from "react";
import { Container, Title, Download } from "./styles.js";
import Chart from "../../components/Chart";
import ChartOptions from "../../components/ChartOptions";
import Tabs from "../../components/Tabs";
import PageTemplate from "../../components/PageTemplate";
import PapersList from "../../components/PapersList";
import ButtonToTop from "../../components/ButtonToTop";

function Benchmark({ benchmark, taskId, benchmarkId }) {
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

  const onSelectAccuracy = (accuracy, index) => {
    setLabel(accuracy.name);
    setSelectedButton(index);
  }

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
            onPress={onSelectAccuracy}
          />
          <Chart data={data} label={label} isByYear={type} />
        </div>
        <Download contained href={`https://computerprogress.xyz/api/v1/models/${taskId}/${benchmarkId}/csv`}>Download</Download>
        <PapersList papers={data} accuracy={label} accuracy_list={buttons} />
      </Container>
      <ButtonToTop />
    </PageTemplate>
  );
}

// Benchmark.getInitialProps = ({ query }) => {
//   return { query };
// };

export default Benchmark;
