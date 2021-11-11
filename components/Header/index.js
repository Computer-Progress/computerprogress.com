import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { MuiTheme } from "../../styles/theme";

import {
  Container,
  Toolbar,
  Box,
  Typography,
  useMediaQuery,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Button,
  IconButton,
  Divider,
} from "@material-ui/core";
import {
  StyledAppBar,
  StyledContainer,
  StyledToolbarBox,
  StyledSpacer,
  StyledButton,
  StyledBox,
  StyledBenchButton
} from "./styles";

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Logo from "../../public/logo_icon.svg";
import { ChevronDown as ChevronDownIcon } from "react-feather";
import * as Icon from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { Creators as userActions } from "../../store/ducks/user";

export default function Header({ isHome }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userState = useSelector((state) => state.UserReducer);

  const isMobileSM = useMediaQuery(MuiTheme.breakpoints.down("sm"));
  const isMobileXS = useMediaQuery(MuiTheme.breakpoints.down("xs"));

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [benchMenuAnchorEl, setBenchMenuAnchorEl] = useState(null);

  const [menuItems, setMenuItems] = useState([
    {
      title: "Profile",
      pathname: "/profile",
      icon: <Icon.User />,
      show: true,
    },
    {
      title: "Submissions",
      pathname: "/papers/submissions",
      icon: <Icon.File />,
      show: true,
    },
    {
      title: "Reviews",
      pathname: "/papers/reviews",
      icon: <Icon.Clipboard />,
      show: userState?.role !== "default",
    },
    {
      title: "Submit paper",
      pathname: "/submit-paper",
      icon: <Icon.PlusCircle />,
      show: true,
    },
  ]);
  const [menuBenchmarks, setMenuBenchmarks] = useState([
    {
      title: "ImageNet",
      pathname: "/tasks/image-classification/imagenet",
      show: true,
    },
    {
      title: "MS COCO",
      pathname: "/tasks/object-detection/ms-coco",
      show: true,
    },
    {
      title: "SQuAD 1.1",
      pathname: "/tasks/question-answering/squad11",
      show: true,
    },
    {
      title: "CoNLL-2003",
      pathname: "/tasks/named-entity-recognition/conll-2003",
      show: true,
    },
    {
      title: "WMT 2014 En-Fr",
      pathname: "/tasks/machine-translation/wmt2014-en-fr",
      show: true,
    },
    {
      title: "WMT 2014 En-Ge",
      pathname: "/tasks/machine-translation/wmt2014-en-ge",
      show: true,
    }
  ]);
  const [links, setLinks] = useState([
    {
      text: "Submit paper",
      href: "/submit-paper",
      show: true,
    },
    {
      text: "Collaborate",
      href: "/collaborate",
      show: true,
    },
    {
      text: "About us",
      href: "/aboutus",
      show: true,
    },
  ]);

  useEffect(() => {
    const newMenuItems = menuItems;
    const newLinks = links;

    const submitPaperMenuIndex = menuItems.findIndex(
      (item) => item.title === "Submit paper"
    );

    const submitPaperLinksIndex = links.findIndex(
      (item) => item.text === "Submit paper"
    );

    newMenuItems[submitPaperMenuIndex].show = isMobileXS;
    newLinks[submitPaperLinksIndex].show = !isMobileXS;

    setMenuItems([...newMenuItems]);
    setLinks([...newLinks]);
  }, [isMobileXS]);

  function getUserInitials() {
    if (!userState.first_name) {
      return <Icon.User />;
    }

    return `${userState.first_name[0]}${userState.last_name[0]}`;
  }

  function handleOpenMenu(event) {
    setMenuAnchorEl(event.currentTarget);
  }

  function handleOpenBenchMenu(event) {
    setBenchMenuAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setMenuAnchorEl(null);
  }

  function handleCloseBenchMenu() {
    setBenchMenuAnchorEl(null);
  }

  function goTo(index) {
    setMenuAnchorEl(null);
    router.push(menuItems[index]);
  }

  function goToBench(index) {
    setBenchMenuAnchorEl(null);
    router.push(menuBenchmarks[index]);
  }

  function logout() {
    dispatch(userActions.logout());
    router.push("/");
  }

  return (
    <StyledAppBar isHome={isHome && !isMobileSM}>
      <StyledContainer>
        <Toolbar disableGutters>
          <StyledToolbarBox>
            <StyledButton color="secondary" href="/">
              <Box mr={1}>
                <Logo />
              </Box>

              {!isMobileXS && (
                <Typography variant="h6">
                  <StyledBox fontWeight="fontWeightBold">
                    Computer Progress
                  </StyledBox>
                </Typography>
              )}
            </StyledButton>

            <StyledSpacer />

            {!isMobileSM && (
              <>
                {links.map(({ text, href }) => (
                  <Box key={href}>
                    <StyledButton size="large" href={href} color="secondary">
                      <Box fontSize="0.8rem" px={1}>
                        {text}
                      </Box>
                    </StyledButton>
                  </Box>
                ))}
                <Box>  
              <IconButton onClick={handleOpenBenchMenu}>
              <StyledBenchButton
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleOpenBenchMenu}
                endIcon={<ArrowDropDownIcon />}
                background= "transparent"
              >
                Benchmarks
              </StyledBenchButton>
              </IconButton>

              <Menu
                getContentAnchorEl={null}
                anchorEl={benchMenuAnchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={Boolean(benchMenuAnchorEl)}
                onClose={handleCloseBenchMenu}
              >
                {menuBenchmarks.map((menuBenchItem, index) =>
                  menuBenchItem.show ? (
                    <MenuItem
                      onClick={() => goToBench(index)}
                      key={menuBenchItem.title}
                    >
                      <Box display="flex">
                        <Box
                          display="inline-flex"
                          alignContent="center"
                          pr={2}
                        >
                        </Box>

                        <Box display="inline">{menuBenchItem.title}</Box>
                      </Box>
                    </MenuItem>
                  ) : null
                )}
              </Menu>
            </Box>
                <StyledSpacer />
              </>
            )}

            {userState?.role ? (
              <>
                <Box>
                  <IconButton onClick={handleOpenMenu}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <Avatar
                          style={{
                            width: 18,
                            height: 18,
                            backgroundColor: "#4e33ff",
                          }}
                        >
                          <Icon.ChevronDown />
                        </Avatar>
                      }
                    >
                      <Avatar
                        style={{ color: "#4e33ff", backgroundColor: "white" }}
                      >
                        {getUserInitials()}
                      </Avatar>
                    </Badge>
                  </IconButton>

                  <Menu
                    getContentAnchorEl={null}
                    anchorEl={menuAnchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleCloseMenu}
                  >
                    {menuItems.map((menuItem, index) =>
                      menuItem.show ? (
                        <MenuItem
                          onClick={() => goTo(index)}
                          key={menuItem.title}
                        >
                          <Box display="flex">
                            <Box
                              display="inline-flex"
                              alignContent="center"
                              pr={2}
                            >
                              {menuItem.icon}
                            </Box>

                            <Box display="inline">{menuItem.title}</Box>
                          </Box>
                        </MenuItem>
                      ) : null
                    )}

                    <Divider />

                    <MenuItem onClick={logout}>
                      <Box display="flex">
                        <Box display="inline-flex" alignContent="center" pr={2}>
                          <Icon.LogOut />
                        </Box>

                        <Box display="inline">Log out</Box>
                      </Box>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Box>
                  <StyledButton
                    size={isMobileSM ? "small" : "medium"}
                    color="secondary"
                    href="/signup"
                  >
                    {isMobileSM ? (
                      <Box px={1}>Sign up</Box>
                    ) : (
                      <Box fontSize="0.8rem" px={1}>
                        Sign up
                      </Box>
                    )}
                  </StyledButton>
                </Box>

                <Box>
                  <StyledButton size={"medium"} color="primary" href="/signin">
                    {isMobileSM ? (
                      "Sign in"
                    ) : (
                      <Box fontSize="0.8rem" px={1}>
                        Sign in
                      </Box>
                    )}
                  </StyledButton>
                </Box>
              </>
            )}
          </StyledToolbarBox>
        </Toolbar>

        {isMobileSM && (
          <Toolbar disableGutters>
            <StyledToolbarBox justifyContent="space-between">
              {links
                .filter(({ show }) => show)
                .map(({ text, href }) => (
                  <Box key={href}>
                    <StyledButton href={href} color="secondary">
                      <Box fontSize="0.8rem">{text}</Box>
                    </StyledButton>
                  </Box>
                ))}
            </StyledToolbarBox>
          </Toolbar>
        )}
      </StyledContainer>
    </StyledAppBar>
  );
}
