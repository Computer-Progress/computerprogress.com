import { Card, Typography, Box } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

import { StyledChip } from "./styles";

export default function TableOptions(props) {
  return (
    <Card style={{ height: "100%", borderRadius: "16px 0 0 16px" }}>
      <Box display="flex" flexDirection="column" p={2}>
        <Typography variant="h5">{props.optionsTitle}</Typography>

        <Box display="flex" flexDirection="row" paddingBottom={3} flexWrap="wrap">
          {props.options.map((option, index) => (
            <Box mt={2} key={`${option[props.fieldName]}${index}`}>
              <StyledChip
                label={option[props.fieldName]}
                avatar={props.selectedOption === index ? <DoneIcon /> : null}
                onClick={() => props.setSelectedOption({option, index})}
              />
            </Box>
          ))}
        </Box>
        {props.secondaryOptions ? (
          <>
            <Typography variant="h5">{props.secondaryOptionsTitle}</Typography>
            <Box display="flex" flexDirection="row" paddingBottom={3} flexWrap="wrap">
              {props.secondaryOptions.map((option, index) => (
                <Box mt={2} key={`${option[props.fieldName]}${index}`}>
                  <StyledChip
                    label={option[props.fieldName]}
                    avatar={props.selectedSecondaryOption === index ? <DoneIcon /> : null}
                    onClick={() => props.setSelectedSecondaryOption({option, index})}
                  />
                </Box>
              ))}
            </Box>
          </>
        ) : null}
      </Box>
    </Card>
  );
}
