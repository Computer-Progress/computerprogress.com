import { StyledButton, StyledBox, StyledCircularProgress, StyledSelectButton } from "./styles";
import { ChevronDown as ChevronDownIcon } from "react-feather";
import { Box, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";

export default function Button({ children, onClick, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(0);

  function openMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function onPress() {
    onClick?.(selected)
  }

  return (
    <>
    <Box alignItems="center" display="flex" justifyContent="center">
      <StyledButton onClick={onPress} {...props}>
        <StyledBox {...props}>
          {props.loading ? <StyledCircularProgress /> : props.options ? props.options[selected].name : children}
        </StyledBox>
      </StyledButton>
      {props.options ? (
        <StyledSelectButton {...props} onClick={openMenu}>
          <StyledBox {...props}>
            <Box display="flex" ml={1} alignItems="center">
              <ChevronDownIcon size={20} />
            </Box>
          </StyledBox>
        </StyledSelectButton>
      ) : null}
    </Box>
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
        {props.options.map((option, index) => (
          <MenuItem onClick={() => {setSelected(index); closeMenu()}} selected={index === selected}>{option.name}</MenuItem>
        ))}
      </Menu>
    )}
    </>
  );
}
