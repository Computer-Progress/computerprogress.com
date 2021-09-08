import { useEffect, useState } from 'react';

import PaperListItem from "./PaperListItem";

import { ItemsWrapper } from './styles';

import { Wrapper } from './PaperListItem/styles'

// import { DataGrid } from '@material-ui/data-grid';

export default function PapersList({
  papers,
  accuracy,
  accuracy_list,
  selectedAccuracy,
  onSelectAccuracy,
  showOperations
}) {
  const renderItem = (item, index) => (
    <PaperListItem
      onSelectAccuracy={onSelectAccuracy}
      selectedAccuracy={selectedAccuracy}
      item={item}
      index={index}
      length={papers.length}
      accuracy={accuracy}
      accuracy_list={accuracy_list}
      showOperations={showOperations}
    />
  )

  // const [columns] = useState([
  //   {
  //     field: 'name',
  //     headerName: 'Model',
  //     width: 300,
  //   },
  //   {
  //     field: 'paper_title',
  //     headerName: 'Paper',
  //     width: 300,
  //   },
  //   ...accuracy_list?.map(accuracy => ({
  //     field: accuracy.name,
  //     headerName: accuracy.name,
  //     type: 'number',
  //     width: 300,
  //   })),
  //   {
  //     field: 'gflops',
  //     headerName: 'Gigaflops',
  //     type: 'number',
  //     width: 300,
  //   },
  //   {
  //     field: 'multiply_adds',
  //     headerName: 'Multiply-adds',
  //     type: 'number',
  //     width: 300,
  //   },
  //   {
  //     field: 'hardware_burden',
  //     headerName: 'Hardware Burden',
  //     width: 300,
  //     valueFormatter: (params) => {
  //       return `10${Math.log10(params.value).toFixed(1).sup()}`;
  //     },
  //   },
  //   {
  //     field: 'paper_publication_date',
  //     headerName: 'Publication Date',
  //     type: 'number',
  //     width: 300,
  //   }
  // ]);

  const [list, setList] = useState([]);

  useEffect(() => {
    papers.sort((a, b) => b[selectedAccuracy] - a[selectedAccuracy]);
    setList(papers.filter((item) => item[selectedAccuracy]));
  }, [selectedAccuracy, papers])

  return (
    <ItemsWrapper>
      <Wrapper accuracy_list={accuracy_list} showOperations={showOperations}>
        {list.map((item, index) => renderItem(item, index))}
      </Wrapper>
    </ItemsWrapper>
  )

  // return (
  //   <ItemsWrapper>
  //     <DataGrid rows={list} columns={columns} />
  //   </ItemsWrapper>
  // )
}
