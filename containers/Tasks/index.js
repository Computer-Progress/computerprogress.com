import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";
import { Container } from "./styles";

import PageTemplate from "../../components/PageTemplate";
import Task from "../../components/Task";

import { Box, Grid } from "@material-ui/core";

export default function Tasks({ tasks }) {
  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate>
        <h1>Tasks</h1>
        <Box my={3}>
          <Grid container spacing={5} wrap="wrap">
            {tasks.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.identifier}>
                <Task item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </PageTemplate>
    </ThemeProvider>
  );
}
