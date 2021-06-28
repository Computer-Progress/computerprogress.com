import { Container, Toolbar, Box, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MuiTheme } from "../../styles/theme";

import {
  StyledAppBar,
  StyledToolbarBox,
  StyledSpacer,
  StyledButton,
} from "./styles";

import Button from "../Button";

import Logo from "../../public/logo_icon.svg";

export default function Header() {
  const isMobileSM = useMediaQuery(MuiTheme.breakpoints.down("sm"));
  const isMobileXS = useMediaQuery(MuiTheme.breakpoints.down("xs"));

  const links = [
    {
      text: "Tasks",
      href: "/tasks",
    },
    {
      text: "Contribute",
      href: "/contribute",
    },
    {
      text: "About us",
      href: "/about_us",
    },
  ];

  return (
    <StyledAppBar>
      <Container>
        <Toolbar disableGutters>
          <StyledToolbarBox>
            <Box mr={1}>
              <Logo />
            </Box>

            {!isMobileXS && (
              <Typography variant="h6">
                <Box fontWeight="fontWeightBold">Computer Progress</Box>
              </Typography>
            )}

            <StyledSpacer />

            {!isMobileSM && (
              <>
                {links.map(({ text, href }) => (
                  <Box mr={2} key={href}>
                    <StyledButton href={href} color="secondary">
                      {text}
                    </StyledButton>
                  </Box>
                ))}
              </>
            )}

            <Box mr={2}>
              <StyledButton
                size={isMobileSM ? "small" : "medium"}
                color="secondary"
                href="/sign_up"
              >
                Sign up
              </StyledButton>
            </Box>

            <Box>
              <StyledButton
                size={isMobileSM ? "small" : "medium"}
                color="primary"
                href="/sign_in"
              >
                Sign in
              </StyledButton>
            </Box>
          </StyledToolbarBox>
        </Toolbar>

        {isMobileSM && (
          <Toolbar disableGutters>
            <StyledToolbarBox justifyContent="space-between">
              {links.map(({ text, href }) => (
                <Box key={href}>
                  <StyledButton
                    href={href}
                    size={isMobileSM ? "small" : "medium"}
                    color="secondary"
                  >
                    {text}
                  </StyledButton>
                </Box>
              ))}
            </StyledToolbarBox>
          </Toolbar>
        )}
      </Container>
    </StyledAppBar>
  );
}
