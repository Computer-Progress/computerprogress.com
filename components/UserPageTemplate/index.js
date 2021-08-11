import PageTemplate from "../../components/PageTemplate";
import { MuiTheme } from "../../styles/theme";
import { Grid, Box, Button, Typography, Tabs, Tab } from "@material-ui/core";
import * as Icon from "react-feather";

import { useMediaQuery } from "@material-ui/core";
import { useState } from "react";

const pages = [
  {
    name: "Profile",
    path: "/profile",
    icon: <Icon.User />,
  },
  {
    name: "Submissions",
    path: "/papers/submissions",
    icon: <Icon.File />,
  },
  {
    name: "Review",
    path: "/papers/review",
    icon: <Icon.Clipboard />,
  },
];

export default function UserPageTemplate(props) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("sm"));
  const [selectedPage, setSelectedPage] = useState(0);

  function handleChange(event, newValue) {
    setSelectedPage(newValue);
  }

  return (
    <PageTemplate>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} container>
          <Grid item xs={12}>
            <Box py={3}>
              <Typography variant="h2">Account</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Tabs
              value={selectedPage}
              orientation={isMobile ? "horizontal" : "vertical"}
              variant="scrollable"
              textColor="primary"
              scrollButtons="auto"
              centered
              TabIndicatorProps={{
                style: {
                  display: "none",
                },
              }}
              onChange={handleChange}
            >
              {pages.map((page, index) => (
                <Tab
                  label={
                    <Box
                      display="flex"
                      style={{ width: "100%" }}
                      justifyContent={isMobile ? "center" : "flex-start"}
                    >
                      <Box pr={2}>{page.icon}</Box>
                      <Typography
                        variant="h6"
                        style={{ textTransform: "none" }}
                      >
                        {page.name}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Grid>

          {/* {pages.map((page, index) => (
            <Grid item xs={12} key={page.name}>
              <Button
                fullWidth
                startIcon={page.icon}
                color={index === selectedPage ? "primary" : "default"}
                style={{ justifyContent: "flex-start", textTransform: "none" }}
              >
                <Box py={1} pl={2}>
                  <Typography
                    variant="h6"
                    color={index === selectedPage ? "primary" : "initial"}
                  >
                    {page.name}
                  </Typography>
                </Box>
              </Button>
            </Grid>
          ))} */}
          {/* <Tabs>
  {pages.map((page, index) => (
              <Tab label={page.name}
            ))}
  </Tabs> */}
        </Grid>

        <Grid item xs={9}>
          Profile
        </Grid>
      </Grid>
      {/* <StyledGridItem */}
      {/* <GridItem xs={3}>
          <Menu flexDirection={isMobile ? "row" : "column"}>
            {!isMobile ? <h3>Account</h3> : null}
            <Menu
              inside
              flexDirection={isMobile ? "row" : "column"}
              isMobile={isMobile}
            >
              {pages.map((page, index) => (
                <Route href={page.path}>
                  <Path selected={index === selectedPage}>
                    {page.icon}
                    <p>{page.name}</p>
                  </Path>
                </Route>
              ))}
            </Menu>
          </Menu>
        </GridItem>
        <GridItem xs={12} lg={9}>
          <Box display="flex" flexDirection="column" lg={9}>
            {props.children}
          </Box>
        </GridItem> */}
      {/* </StyledGridContainer> */}
    </PageTemplate>
  );
}
