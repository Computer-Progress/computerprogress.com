import styled from "styled-components";

import { Box } from "@material-ui/core";

export const ContainerGrid = styled.div`
  display: grid;

  grid-template-columns: ${(props) =>
      props.$isMobile ? "2rem" : props.$imageBorder ? "7rem" : "5rem"} 1fr;
  grid-template-rows: auto auto;

  grid-column-gap: ${(props) => (props.$isMobile ? "1rem" : "2rem")};

  margin-top: 50px;

  h1 {
    font-size: 1.7rem;
    font-weight: 500;
  }

  h2 {
    font-size: 1.9rem;
    font-weight: 400;
    align-self: bottom;
  }

  p {
    grid-column: ${(props) => (props.$isMobile ? "1 / span 2" : 0)};
    align-self: top;
    margin-top: 20;
    text-align: justify;
    font-size: 14px;
  }
`;

export const StyledTitle = styled.div`


  h2 {
    font-size: 1.4rem;
    font-weight: 400;
    align-self: bottom;
  }
`;

export const ImageBox = styled(Box).attrs(({ $imageBorder, $isMobile }) => {
  return (
    $imageBorder & !$isMobile && {
      borderRadius: 15,
      boxShadow: 1,
      padding: "0.7rem",
      ml: 0,
    }
  );
})`
  grid-row: ${(props) => (props.$isMobile ? 1 : "1 / span 2")};
  align-self: center;

  img {
    width: 100%;
    height: 100%;
  }
`;
