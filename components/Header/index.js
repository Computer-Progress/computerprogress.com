import { ThemeProvider } from "@material-ui/core/styles";
import { AppBar, Toolbar, Box, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MuiTheme } from "../../styles/theme";

import { StyledAppBar, StyledToolbarBox, StyledSpacer } from "./styles";

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
    <ThemeProvider theme={MuiTheme}>
      <StyledAppBar>
        <Toolbar>
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
                  <Box mr={2}>
                    <Button href={href} color="secondary">
                      {text}
                    </Button>
                  </Box>
                ))}
              </>
            )}

            <Box mr={2}>
              <Button
                size={isMobileSM ? "small" : "medium"}
                color="secondary"
                href="/sign_up"
              >
                Sign up
              </Button>
            </Box>

            <Box>
              <Button
                size={isMobileSM ? "small" : "medium"}
                color="primary"
                href="/sign_in"
              >
                Sign in
              </Button>
            </Box>
          </StyledToolbarBox>
        </Toolbar>

        {isMobileSM && (
          <Toolbar>
            <StyledToolbarBox justifyContent="space-between">
              {links.map(({ text, href }) => (
                <Box>
                  <Button
                    href={href}
                    size={isMobileSM ? "small" : "medium"}
                    color="secondary"
                  >
                    {text}
                  </Button>
                </Box>
              ))}
            </StyledToolbarBox>
          </Toolbar>
        )}
      </StyledAppBar>
    </ThemeProvider>
  );
}
