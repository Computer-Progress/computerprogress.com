import { Card, Typography, Box, Divider } from "@material-ui/core";

export default function TaskTableSOTA() {
  return (
    <Card>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        <Box>
          <Typography variant="h3">
            <Box fontWeight="bold">State-of-the-Art</Box>
          </Typography>
        </Box>

        <Box alignSelf="flex-start" mt={1}>
          <Typography variant="subtitle2">Accuracy</Typography>
        </Box>

        <Box mt={1}>
          <Typography variant="h2" component="span">
            00
          </Typography>
        </Box>

        <Box mt={1} style={{ width: "100%" }}>
          <Divider />
        </Box>

        <Box alignSelf="flex-start" mt={1}>
          <Typography variant="subtitle2">Hardware Burden</Typography>
        </Box>

        <Box mt={1}>
          <Typography variant="h2" component="span">
            00
          </Typography>
        </Box>

        <Box mt={1} style={{ width: "100%" }}>
          <Divider />
        </Box>

        <Box alignSelf="flex-start" mt={1}>
          <Typography variant="subtitle2">Model</Typography>
        </Box>

        <Box
          mt={1}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          <Typography variant="h3" component="span" noWrap>
            NASNetA (6@4032) sasas
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
