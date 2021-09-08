import { Avatar } from "@material-ui/core";
import { Icon } from "@material-ui/core";
import { Card, Typography, Box } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

import { StyledChip } from "./styles";

export default function TaskTableDatasets({
  datasets,
  selectedDataset,
  setSelectedDataset,
}) {
  return (
    <Card style={{ height: "100%", borderRadius: "16px 0 0 16px" }}>
      <Box display="flex" flexDirection="column" p={2}>
        <Typography variant="h3">Datasets</Typography>

        {datasets.map((dataset, index) => (
          <Box mt={2} key={dataset.dataset_id}>
            <StyledChip
              label={dataset.dataset_name}
              avatar={selectedDataset === index ? <DoneIcon /> : <Icon />}
              onClick={() => setSelectedDataset(index)}
            />
          </Box>
        ))}
      </Box>
    </Card>
  );
}
