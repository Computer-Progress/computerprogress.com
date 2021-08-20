import { StyledButton, StyledBox, StyledCircularProgress } from "./styles";
import { ChevronDown as ChevronDownIcon } from "react-feather";
import { Box, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";

export default function Button({ children, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  function openMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  return (
    <>
    <StyledButton {...props} onClick={openMenu}>
      <StyledBox {...props}>
        {props.loading ? <StyledCircularProgress /> : children}

        {props.options?.length >= 0 && (
          <Box display="flex" ml={1} alignItems="center">
            <ChevronDownIcon size={20} />
          </Box>
        )}
      </StyledBox>
    </StyledButton>
    {props.options?.length >= 0 && (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {props.options.map((option) => (
          <MenuItem>{option}</MenuItem>
        ))}
      </Menu>
    )}
    </>
  );
}
