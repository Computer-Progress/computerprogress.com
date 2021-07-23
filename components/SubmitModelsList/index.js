import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { StyledCard, StyledBoxContainer, StyledDivider } from "./styles";

export default function SubmitModelsList({ models }) {
  return (
    <StyledCard>
      <StyledBoxContainer>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">Models</Typography>
          </Grid>

          <Grid item xs={12}>
            <StyledDivider />
          </Grid>

          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Model</TableCell>
                    <TableCell align="right">Dataset</TableCell>
                    <TableCell align="right">Task</TableCell>
                    <TableCell align="right">Accuracy type</TableCell>
                    <TableCell align="right">Accuracy value</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {models.map((model) => (
                    <TableRow key={model.name}>
                      <TableCell component="th" scope="row">
                        {model.name}
                      </TableCell>
                      <TableCell align="right">{model.dataset}</TableCell>
                      <TableCell align="right">{model.task}</TableCell>
                      <TableCell align="right">{model.accuracyType}</TableCell>
                      <TableCell align="right">{model.accuracyValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </StyledCard>
  );
}
