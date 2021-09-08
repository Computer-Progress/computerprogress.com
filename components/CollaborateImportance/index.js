import { Typography, Box, useMediaQuery } from "@material-ui/core";

import {
  StyledFlexboxCard,
  StyledCarousel,
  StyledFlexboxContainer,
  StyledFlexboxContent,
  StyledArrowPrev,
  StyledArrowNext,
  StyledQuotesOpen,
  StyledQuotesClose,
} from "./styles";

import { MuiTheme } from "../../styles/theme";

const quotes = [
  {
    quote:
      "Significant improvements in computing power is, the field of Deep Learning (DL) is growing at breakneck speed.",
    source: "AI Index Report, 2021",
  },
  {
    quote:
      "The computing power needed to train AI is now rising seven times faster than ever before.",
    source: "MIT Technology Review, 2019",
  },
  {
    quote:
      "Improvements in Computing Power and Reduction in Hardware Costs will Drive the Industry Growth.",
    source: "Emergen Research, 2021",
  },
  {
    quote:
      "Deep neural networks are very computationally expensive. This is a critical issue.",
    source: "Song Han, MIT",
  },
  {
    quote:
      "The actual computational burden of deep learning models is scaling more rapidly than (known) lower bounds from theory.",
    source: "Thompson et al, 2021",
  },
];

export default function CollaborateImportance() {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("sm"));

  return (
    <StyledFlexboxCard minHeight={isMobile ? "350px" : "300px"}>
      <StyledCarousel
        PrevIcon={<StyledArrowPrev />}
        NextIcon={<StyledArrowNext />}
      >
        {quotes.map((quote, index) => (
          <Quote quote={quote} key={index} />
        ))}
      </StyledCarousel>
    </StyledFlexboxCard>
  );
}

function Quote({ quote }) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("sm"));

  return (
    <StyledFlexboxContainer height={isMobile ? "300px" : "250px"}>
      <StyledFlexboxContent>
        <StyledQuotesOpen />
        <StyledQuotesClose />

        <Box width="90%">
          <Typography align="center" variant={isMobile ? "body1" : "h3"}>
            {quote.quote}
          </Typography>
        </Box>

        <Box mt={3} position="absolute" style={{ bottom: 0 }}>
          <Typography variant="subtitle1">
            <Box>{quote.source}</Box>
          </Typography>
        </Box>
      </StyledFlexboxContent>
    </StyledFlexboxContainer>
  );
}
