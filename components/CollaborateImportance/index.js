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
      "Deep learning is not computationally expensive by accident, but by design. The same flexibility that makes it excellent at modeling diverse phenomena and outperforming expert models also makes it dramatically more computationally expensive.",
    source: "Thompson et al, 2021",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum sem nec lacus tincidunt commodo. Morbi nec dolor nulla. Integer.",
    source: "Praesent fermentum, 2021",
  },
  {
    quote: "a",
    source: "Praesent fermentum, 2021",
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
