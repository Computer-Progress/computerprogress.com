import { Typography, Box, Paper, Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Carousel from "react-material-ui-carousel";

export default function CollaborateImportance() {
  const items = [
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
  ];

  return (
    <Box py={3}>
      <Typography variant="h1" align="center">
        People talking about the importance of computing power
      </Typography>

      <Box
        display="flex"
        mt={5}
        borderRadius={10}
        boxShadow={2}
        alignItems="center"
      >
        <Carousel
          indicators={false}
          navButtonsAlwaysVisible
          navButtonsProps={{
            // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
            style: {
              backgroundColor: "transparent",
            },
          }}
          PrevIcon={<ArrowBackIosIcon color="primary" fontSize="large" />}
          NextIcon={<ArrowForwardIosIcon color="primary" fontSize="large" />}
        >
          {items.map((quote, index) => (
            <Quote quote={quote} key={index} />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}

function Quote({ quote }) {
  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="300px"
        width="80%"
      >
        <Box>
          <Typography align="center" variant="h3">
            {quote.quote}
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1">{quote.source}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
