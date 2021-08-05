import UserPageTemplate from "../../components/UserPageTemplate";
import { MuiTheme } from "../../styles/theme";
import { Title } from "./styles";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Box, Button, Divider, Grid, TextField } from "@material-ui/core";

export default function Review() {
  // const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));
  const userState = useSelector((state) => state.UserReducer);

  useEffect(() => {
    console.log(userState);
  }, [userState]);

  return (
    <UserPageTemplate selectedPage={0}>
      <Title>Profile</Title>

      <Grid container>
        <Grid item xs={6} container spacing={3}>
          <Grid item xs={6}>
            <TextField label="First name" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Last name" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{ borderRadius: "100px" }}
              color="primary"
              variant="contained"
              disableElevation
            >
              <Box px={3}>Update profile</Box>
            </Button>
          </Grid>

          <Divider />

          <Grid item xs={6}>
            <TextField
              label="Current password"
              variant="outlined"
              fullWidth
              type="password"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="New password"
              variant="outlined"
              fullWidth
              type="password"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Confirm new password"
              variant="outlined"
              fullWidth
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
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
