import { Card, Typography, Box, Divider, Button } from "@material-ui/core";
import parseExponential from "parse-exponential";

export default function TaskTableSOTA({ sota }) {
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
            {sota.sota_accuracy_value}
          </Typography>
          <Typography variant="h3" component="span">
            %
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
            {sota.sota_hardware_burden.toExponential()}
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
            {sota.sota_name}
          </Typography>
        </Box>

        <Box mt={1}>
          <Button color="primary" href={sota.sota_paper_link}>View paper</Button>
        </Box>
      </Box>
    </Card>
  );
}
