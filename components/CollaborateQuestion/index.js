import { Box, Typography } from "@material-ui/core";

export default function CollaborateQuestion() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mt={3}>
        <Typography variant="h2" align="center">
          Any question?
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography align="center" component="span">
          Don’t hesitate to contact our team:{" "}
          <Box display="inline" fontWeight="500">
            <a href="mailto:contact@computerprogress.com">
              contact@computerprogress.com
            </a>
          </Box>
          .
        </Typography>
      </Box>
    </Box>
  );
}
