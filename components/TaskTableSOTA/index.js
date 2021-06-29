import {
  Card,
  Typography,
  Box,
  Divider,
  Button,
  Tooltip,
  IconButton,
} from "@material-ui/core";

import InfoIcon from "@material-ui/icons/Info";

export default function TaskTableSOTA({ sota }) {
  return (
    <Card style={{ height: "100%", borderRadius: "16px" }}>
      <Box
        style={{ height: "100%" }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        p={4}
      >
        <Box>
          <Typography variant="h3">
            <Box fontWeight="bold">State-Of-The-Art</Box>
          </Typography>
        </Box>

        <Box alignSelf="flex-start" mt={1}>
          <Typography variant="h6">
            <Box fontWeight="bold">Accuracy:</Box>
          </Typography>
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
          <Typography variant="h6">
            <Box fontWeight="bold">
              Hardware Burden
              <Tooltip title="The computational capability of the hardware used to train the model, calculated as the number of processors multiplied by the computation rate and time.">
                <IconButton size="small" edge="end">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              :
            </Box>
          </Typography>
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
          <Typography variant="h6">
            <Box fontWeight="bold">Model:</Box>
          </Typography>
        </Box>

        <Box mt={1}>
          <Typography variant="subtitle1" component="span" noWrap>
            <Box fontWeight="500">{sota.sota_name}</Box>
          </Typography>
        </Box>

        <Box mt={1}>
          <Button href={sota.sota_paper_link}>
            <Typography variant="button" style={{ color: "#9E1FFF" }}>
              View paper
            </Typography>
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
