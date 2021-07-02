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
  const [secondButtons] = useState([
    {
      name: 'Hardware Burden',
      value: 'hardware_burden',
    },
    {
      name: 'Gigaflops',
      value: 'gflops',
    },
    {
      name: 'Multiply-adds',
      value: 'multiply_adds',
    },
  ]);
  const [computingPower, setComputingPower] = useState(secondButtons[0]);
  const [label, setLabel] = useState(benchmark.accuracy_types?.[0]?.name);
  const [selected, setSelected] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const [selectedSecondButton, setSelectedSecondButton] = useState(0);
  const [name, setName] = useState(`${benchmark.task_name} / ${benchmark.dataset_name}`);
  const [type, setType] = useState(0);
  const [buttons] = useState(benchmark.accuracy_types);

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
    console.log('benchmark', benchmark)
    // setDomain(query.benchmarkId);
    // console.log(domain);
  }, []);

  const onSelectAccuracy = (accuracy, index) => {
    setLabel(accuracy.name);
    setSelectedButton(index);
  }

  const onSelectComputingPower = (computingPower, index) => {
    setComputingPower(computingPower);
    setSelectedSecondButton(index);
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
            secondButtons={secondButtons}
            secondTitle="Computing Power"
            onPressSecond={onSelectComputingPower}
            selectedSecond={selectedSecondButton}
          />
          <Chart data={data} label={label} isByYear={type} computingPower={computingPower} />
        </div>
        <Download contained href={`http://ec2-3-129-18-205.us-east-2.compute.amazonaws.com/api/v1/models/${taskId}/${benchmarkId}/csv`}>Download</Download>
        <PapersList selectedAccuracy={label} papers={data} accuracy={label} accuracy_list={buttons} />
      </Container>
      <ButtonToTop />
    </PageTemplate>
  );
}

// Benchmark.getInitialProps = ({ query }) => {
//   return { query };
// };

export default Benchmark;
