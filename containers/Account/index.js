import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MuiTheme } from "../../styles/theme";
import { Grid, Box, Typography, Tabs, Tab, Divider } from "@material-ui/core";
import * as Icon from "react-feather";
import PrivatePage from "../../components/PrivatePage";
import { useMediaQuery } from "@material-ui/core";

import PageTemplate from "../../components/PageTemplate";
import Profile from "../../components/Profile";
import PaperList from "../../components/PaperList";

const pages = [
  {
    name: "Profile",
    pathname: "/profile",
    icon: <Icon.User />,
    component: <Profile />,
  },
  {
    name: "Submissions",
    pathname: "/papers/submissions",
    icon: <Icon.File />,
    component: <PaperList />,
  },
  {
    name: "Reviews",
    pathname: "/papers/reviews",
    icon: <Icon.Clipboard />,
    component: <PaperList isReviewer />,
  },
];

function UserPageTemplate({ pathname }) {
  const router = useRouter();

  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("sm"));
  const [selectedPage, setSelectedPage] = useState(
    pages.findIndex((page) => page.pathname === pathname)
  );
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const routeIndex = pages.findIndex((page) => page.pathname === pathname);
    setSelectedPage(routeIndex);
    setFirstRender(false);
  }, []);

  useEffect(() => {
    const routeIndex = pages.findIndex((page) => page.pathname === pathname);
    setSelectedPage(routeIndex);
  }, [router.pathname]);

  function handleChange(event, newValue) {
    router.push(pages[newValue].pathname, undefined, { shallow: true });
  }

  return (
    <PageTemplate>
      {selectedPage >= 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} container>
            <Grid item xs={12}>
              <Box py={3}>
                <Typography variant="h3">Account</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={10} style={{ height: "100%" }}>
              <Tabs
                value={selectedPage}
                orientation={isMobile ? "horizontal" : "vertical"}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                scrollButtons="auto"
                centered
                TabIndicatorProps={
                  !isMobile && {
                    style: {
                      display: "none",
                    },
                  }
                }
                onChange={handleChange}
              >
                {pages.map((page) => (
                  <Tab
                    key={page.name}
                    label={
                      <Box
                        display="flex"
                        style={{ width: "100%" }}
                        justifyContent={isMobile ? "center" : "flex-start"}
                      >
                        {!isMobile && <Box pr={2}>{page.icon}</Box>}
                        <Typography
                          variant={isMobile ? "body1" : "h6"}
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

            {!isMobile && (
              <Grid item xs={2}>
                <Box
                  display="flex"
                  justifyContent="center"
                  style={{ height: "100%", width: "100%" }}
                >
                  <Divider orientation="vertical" />
                </Box>
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} md={9}>
            <Box pt={3} pb={4}>
              <Grid container>
                {!isMobile && (
                  <Grid item xs={12}>
                    <Box pb={3}>
                      <Typography variant="h2">
                        {pages[selectedPage].name}
                      </Typography>
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12}>
                  {pages[selectedPage].component}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </PageTemplate>
  );
}

export default PrivatePage(UserPageTemplate)
