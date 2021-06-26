import { Grid, Card, useMediaQuery } from "@material-ui/core";
import { MuiTheme } from "../../styles/theme";
import { StyledGridItem } from "./styles";

export default function Domain() {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("sm"));

  return (
    <Grid container spacing={1}>
      <StyledGridItem $order={1}>
        <Card>Domain tabs</Card>
      </StyledGridItem>

      <StyledGridItem $order={2} sm={6} md={2}>
        <Card>Datasets</Card>
      </StyledGridItem>

      <StyledGridItem $order={isMobile ? 4 : 3} md={8}>
        <Card>Chart</Card>
      </StyledGridItem>

      <StyledGridItem $order={isMobile ? 3 : 4} sm={6} md={2}>
        <Card>SOTA</Card>
      </StyledGridItem>
    </Grid>
  );
}
