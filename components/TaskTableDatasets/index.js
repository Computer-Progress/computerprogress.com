import { Card, Typography, Box } from "@material-ui/core";

import { StyledButton } from "./styles";

export default function TaskTableDatasets({
  datasets,
  selectedDataset,
  setSelectedDataset,
}) {
  return (
    <Card>
      <Box display="flex" flexDirection="column" p={2}>
        <Typography variant="h3">Datasets</Typography>

        {datasets.map((dataset, index) => (
          <Box mt={2} key={dataset.dataset_id}>
            <StyledButton
              $active={selectedDataset === index}
              onClick={() => setSelectedDataset(index)}
            >
              <Typography variant="button" noWrap>
                {dataset.dataset_name}
              </Typography>
            </StyledButton>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
