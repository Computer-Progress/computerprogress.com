import styled from "styled-components";
import theme from "../../styles/theme";
import { Button } from "@material-ui/core";

export const StyledTitle = styled.h1`
  font-weight: 500;
`;

export const GridContainer = styled.div`
  display: grid;

  grid-template-columns: ${(props) => (props.$mobile ? "3rem" : "5rem")} 1fr;
  grid-template-rows: auto auto;

  grid-column-gap: ${(props) => (props.$mobile ? "1rem" : "2rem")};

  img {
    width: 100%;

    grid-row: ${(props) => (props.$mobile ? 1 : "1 / span 2")};
    align-self: center;
  }

  h2 {
    font-size: 1.9rem;
    font-weight: 400;
    align-self: bottom;
  }

  p {
    grid-column: ${(props) => (props.$mobile ? "1 / span 2" : 0)};
    align-self: top;
    margin-top: 0;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 1rem 0;
`;

export const StyledButton = styled(Button).attrs({
  variant: "contained",
  color: "primary",
  size: "large",
  disableElevation: true,
})`
  text-align: center;
  border-radius: 30px !important;
  color: white;
  background: linear-gradient(
    to right,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
`;
