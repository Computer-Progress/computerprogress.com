import styled from "styled-components";

import { Box } from "@material-ui/core";

import Carousel from "react-material-ui-carousel";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import QuotesOpen from "../../public/quotes-open.svg";
import QuotesClose from "../../public/quotes-close.svg";

export const StyledFlexboxCard = styled(Box).attrs({
  display: "flex",
  height: "300px",
  borderRadius: 10,
  boxShadow: 2,
  alignItems: "center",
})``;

export const StyledCarousel = styled(Carousel).attrs({
  interval: 6 /* segundos */ * 1000,
  indicators: false,
  navButtonsAlwaysVisible: true,
  navButtonsProps: {
    style: {
      backgroundColor: "transparent",
    },
  },
})`
  width: 100%;
`;

export const StyledFlexboxContainer = styled(Box).attrs({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "250px",
})``;

export const StyledFlexboxContent = styled(Box).attrs({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80%",
  width: "85%",
  position: "relative",
})``;

export const StyledArrowPrev = styled(ArrowBackIosIcon).attrs({
  color: "primary",
  fontSize: "large",
})``;

export const StyledArrowNext = styled(ArrowForwardIosIcon).attrs({
  color: "primary",
  fontSize: "large",
})``;

export const StyledQuotesOpen = styled(QuotesOpen)`
  position: absolute;
  top: 0;
  left: 0;
`;

export const StyledQuotesClose = styled(QuotesClose)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
