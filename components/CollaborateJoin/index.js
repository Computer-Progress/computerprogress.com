import { Box, Typography, Button } from "@material-ui/core";

import { StyledButton } from "./styles";

export default function CollaborateJoin() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mt={3}>
        <Typography variant="h2" align="center">
          Join us!
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h3" align="center">
          Join our community and start contributing to the future of artificial
          intelligence right now!
        </Typography>
      </Box>

      <Box mt={3}>
        <StyledButton>Submit paper</StyledButton>
      </Box>
    </Box>
  );
}
