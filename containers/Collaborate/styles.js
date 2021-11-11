import styled from "styled-components";

import { Box, Button, Typography, Container, Chip, ListItemIcon} from "@material-ui/core";

export const StyledContainer = styled(Container)`
  max-width: 1500px !important;
`;

export const StyledContainerJoinUs = styled(Container)`
  max-width: 1500px !important;
  margin: 50px 0;
`;

export const StyledFlexboxSection = styled(Box).attrs({
  my: 5,
})`
.citation{
  position: relative;
  background: #ebebeb;
  padding: 1rem;
  border: 1px dashed #cccccc;
  margin-top: 2rem;
  font-size: 15px;
  border-radius: 5px;
  button{
    position: absolute;
    right: 1rem;
    top: 1rem;
    border: none;
    border-radius: 5px;
    padding: 3px;
    cursor: pointer;
    :hover{
      transform: scale(1.05)
    }
    :active{
      transform: scale(1)
    }
  }
  pre{
    font-family: 'Courier New', Courier, monospace
  }
}
`;

export const StyledBoxTitle = styled(Box).attrs({
  mt: 5,
})`
  margin: 100px 0px !important;
`;

export const StyledBox = styled(Box).attrs({
  mt: 5,
  textAlign: "justify",
})``;

export const StyledTypographyBodyTitle = styled(Typography).attrs({
  variant: "body1",
})`
  font-weight: 500 !important;
  font-size: 40px !important;
`;

export const StyledTypographyBodyTitle2 = styled(Typography).attrs({
  variant: "h2",
})`
  font-weight: 500 !important;
  font-size: 25px !important;
`;

export const StyledTypographyBody1 = styled(Typography).attrs({
  variant: "body1",
})``;

export const StyledTypographyBody2 = styled(Typography).attrs({
  variant: "body1",
})`
  margin-bottom: 30px !important;
`;

export const StyledTypographyCard = styled(Typography).attrs({
  variant: "h1",
})`
  font-weight: 500 !important;
  font-size: 30px !important;
`;

export const StyledListIcon = styled.div`
  width: 4px;
  height: 4px;
  border: solid 4px #4e33ff;
  border-radius: 50%;
  background-color: #4e33ff;
`;

export const StyledButton = styled(Button).attrs({
  color: "primary",
  variant: "contained",
})`
  padding-right: 50px !important;
  padding-left: 50px !important;

  border-radius: 100px !important;
  box-shadow: none !important;

  color: white !important;
  background: linear-gradient(
      268.88deg,
      rgba(255, 255, 255, 0.1) -7.38%,
      #7100c9 104.79%
    ),
    #2000e5 !important;
`;

export const StyledChip = styled(Chip).attrs({
  variant:"outlined",
})`
  font-weight: 500 !important;
  font-size: 13px !important;
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  margin-right: -25px !important;
`;
