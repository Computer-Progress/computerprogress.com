import React, { useState, useEffect } from "react";
import { Container, Title, Download } from "./styles.js";
import Chart from "../../components/Chart";
import ChartOptions from "../../components/ChartOptions";
import Tabs from "../../components/Tabs";
import PageTemplate from "../../components/PageTemplate";
import PapersList from "../../components/PapersList";
import ButtonToTop from "../../components/ButtonToTop";
import Table from '../../components/Table';

function Benchmark({ benchmark, taskId, benchmarkId }) {
  const [data, setData] = useState(benchmark.models);
  const [secondButtons, setSecondButtons] = useState([
    {
      name: 'Hardware Burden',
      value: 'hardware_burden',
    },
    {
      name: `Operations Per\nNetwork Pass`,
      value: 'operation_per_network_pass',
    },
  ]);
  const [showOperations, setShowOperations] = useState(true);
  const [computingPower, setComputingPower] = useState(secondButtons[0]);
  const [label, setLabel] = useState(benchmark.accuracy_types?.[0]?.name);
  const [selected, setSelected] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const [selectedSecondButton, setSelectedSecondButton] = useState(0);
  const [name, setName] = useState();
  const [type, setType] = useState(0);
  const [buttons] = useState(benchmark.accuracy_types.filter(x => data.some(d => d[x.name])));

  const tabs = [
    {
      task_name: "Performance x Computing power",
      task_id: 0,
    },
    {
      task_name: "Performance x Year",
      task_id: 1,
    },
  ];

  useEffect(() => {
    const has_operation_per_network_pass = data.some(item => !!item.operation_per_network_pass);
    if (!has_operation_per_network_pass) {
      setSecondButtons([
        {
          name: 'Hardware Burden',
          value: 'hardware_burden',
        }
      ])
      setShowOperations(false);
    }
    // // console.log(domain);
  }, []);

  const onSelectAccuracy = ({option, index}) => {
    setLabel(option.name);
    setSelectedButton(index);
  }

  const onSelectComputingPower = ({option, index}) => {
    setComputingPower(option);
    setSelectedSecondButton(index);
  }

  return (
    <PageTemplate>
      <Container>
        <Title><a href={`/tasks/${taskId}`}>{benchmark.task_name}</a> / {benchmark.dataset_name}</Title>
        <Table
          tabs={tabs}
          selectedTab={type}
          onSelectTab={(index) => setType(index)}
          options={buttons}
          fieldName="name"
          optionsTitle="Accuracy"
          selectedOption={selectedButton}
          setSelectedOption={onSelectAccuracy}
          secondaryOptions={secondButtons}
          selectedSecondaryOption={selectedSecondButton}
          setSelectedSecondaryOption={onSelectComputingPower}
          secondaryOptionsTitle="Computing Power"
          data={data}
          label={label}
          isByYear={type}
          computingPower={computingPower}
        />
        <Download contained href={process.env.BASE_API_URL + `/models/${taskId}/${benchmarkId}/csv`}>Download</Download>
        <PapersList 
          onSelectAccuracy={onSelectAccuracy}
          selectedAccuracy={label}
          papers={data}
          accuracy={label}
          accuracy_list={buttons}
          showOperations={showOperations}
        />
      </Container>
      <ButtonToTop />
    </PageTemplate>
  );
}

// Benchmark.getInitialProps = ({ query }) => {
//   return { query };
// };

export default Benchmark;
