import { Avatar } from "@material-ui/core";
import { Icon } from "@material-ui/core";
import { Card, Typography, Box } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

import { StyledChip } from "./styles";

export default function TableOptions({
  options,
  selectedOption,
  setSelectedOption,
  optionsTitle,
  secondaryOptions,
  selectedSecondaryOption,
  setSelectedSecondaryOption,
  secondaryOptionsTitle,
  fieldName,
}) {
  return (
    <Card style={{ height: "100%", borderRadius: "16px 0 0 16px" }}>
      <Box display="flex" flexDirection="column" p={2}>
        <Typography variant="h5">{optionsTitle}</Typography>

        <Box display="flex" flexDirection="row" paddingBottom={3} flexWrap="wrap">
          {options.map((option, index) => (
            <Box mt={2} key={`${option[fieldName]}${index}`}>
              <StyledChip
                label={option[fieldName]}
                avatar={selectedOption === index ? <DoneIcon /> : null}
                onClick={() => setSelectedOption({option, index})}
              />
            </Box>
          ))}
        </Box>
        {secondaryOptions ? (
          <>
            <Typography variant="h5">{secondaryOptionsTitle}</Typography>
            <Box display="flex" flexDirection="row" paddingBottom={3} flexWrap="wrap">
              {secondaryOptions.map((option, index) => (
                <Box mt={2} key={`${option[fieldName]}${index}`}>
                  <StyledChip
                    label={option[fieldName]}
                    avatar={selectedSecondaryOption === index ? <DoneIcon /> : null}
                    onClick={() => setSelectedSecondaryOption({option, index})}
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
