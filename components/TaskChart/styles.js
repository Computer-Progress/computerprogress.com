import styled from "styled-components";

import { Grid } from "@material-ui/core";

export const StyledGridItem = styled(Grid).attrs({
  item: true,
  xs: 12,
})`
  order: ${({ $order }) => $order};
`;
