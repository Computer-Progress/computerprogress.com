import Link from "next/link";

import { Box, Typography } from "@material-ui/core";
import { StyledFlexbox, StyledButton} from "./styles";

export default function CollaborateInvite() {
  return (
    <StyledFlexbox>
      <Box>
        <Typography variant="h2">
          <Box fontWeight="bold">
            You can change everything!
          </Box>
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography variant="h6">
          <Box fontSize="1.5rem">
            Collaborate on the understanding of the computational progress!
          </Box>
        </Typography>
      </Box>
      <Box mt={5}>
        <Link href="/collaborate">
          <StyledButton>See how to collaborate</StyledButton>
        </Link>
      </Box>
    </StyledFlexbox>
  );
}
