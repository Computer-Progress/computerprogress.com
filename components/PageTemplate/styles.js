import styled from "styled-components";
import { Container } from "@material-ui/core";

export const StyledContainer = styled(Container).attrs({
  // maxWidth: "xl",
})`
  min-height: 100% !important;
  margin: 1rem 0;
  max-width: 1500px !important;
  display: flex !important;
  flex: 1;
  flex-direction: column;

  h1 {
    font-weight: normal;
  }

  @media only screen and (max-width: 1450px) {
    margin: 0px 0px !important;
  }
`;
