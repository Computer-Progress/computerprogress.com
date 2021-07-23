import PageTemplate from "../../components/PageTemplate";
import { MuiTheme } from "../../styles/theme";
import { Grid, Box, Button } from "@material-ui/core";
import * as Icon from 'react-feather';

import TaskTable from "../../components/TaskTable";
import CollaborateInvite from "../../components/CollaborateInvite";
import { useMediaQuery } from "@material-ui/core";
import { GridItem, Route, Menu, MainGrid, Path } from './styles';
import theme from '../../styles/theme';

export default function UserPageTemplate({ selectedPage, children }) {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));

  const pages=[
    {
      name: 'Profile',
      path: '/',
      icon: <Icon.User /> 
    },
    {
      name: 'Submissions',
      path: '/papers/submissions',
      icon: <Icon.File />
    },
    {
      name: 'Review',
      path: '/papers/review',
      icon: <Icon.Clipboard />
    },
  ]

  return (
      <PageTemplate>
        <MainGrid container spacing={1}>
          <GridItem xs={3}>
            <Menu flexDirection={isMobile ? 'row' : 'column'}>
              {!isMobile ? (
                <h3>Account</h3>
              ) : null}
              {pages.map((page, index) => (

                <Route href={page.path}>
                  <Path selected={index === selectedPage}>
                    {page.icon}
                    <p>
                      {page.name}
                    </p>
                  </Path>
                </Route>
              ))}
            </Menu>
          </GridItem>
          <GridItem xs={12} lg={9}>
            <Box display="flex" flexDirection="column" lg={9}>
              {children}
            </Box>
          </GridItem>
        </MainGrid>
      </PageTemplate>
  );
}
