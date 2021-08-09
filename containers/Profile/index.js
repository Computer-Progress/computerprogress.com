import UserPageTemplate from "../../components/UserPageTemplate";
import { MuiTheme } from "../../styles/theme";
import { Title } from "./styles";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

export default function Profile() {
  // const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));
  const userState = useSelector((state) => state.UserReducer);

  console.log(userState);

  useEffect(() => {
    console.log(userState);
  }, [userState]);

  return (
    <UserPageTemplate selectedPage={0}>
      <Grid container display="flex">
        <Grid item xs={12}>
          <Box py={3}>
            <Typography variant="h2">Profile</Typography>
          </Box>
        </Grid>

        <Grid item xs={6} container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="First name"
              value={userState.first_name}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last name"
              value={userState.last_name}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Email"
              value={userState.email}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled
              style={{ borderRadius: "100px" }}
              color="primary"
              variant="contained"
              disableElevation
            >
              <Box px={3}>Update profile</Box>
            </Button>
          </Grid>

          <Divider />

          <Grid item xs={7}>
            <TextField
              label="Current password"
              variant="outlined"
              fullWidth
              type="password"
            />
          </Grid>

          <Grid item xs={7}>
            <TextField
              label="New password"
              variant="outlined"
              fullWidth
              type="password"
            />
          </Grid>

          <Grid item xs={7}>
            <TextField
              label="Confirm new password"
              variant="outlined"
              fullWidth
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled
              style={{ borderRadius: "100px" }}
              color="primary"
              variant="contained"
              disableElevation
            >
              <Box px={3}>Update password</Box>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </UserPageTemplate>
  );
}
