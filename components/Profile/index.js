import { useDispatch, useSelector } from "react-redux";
import useApi from "../../services/useApi";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";

export default function Profile() {
  const api = useApi();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [profileChanged, setProfileChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const userState = useSelector((state) => state.UserReducer);

  useEffect(() => {
    setProfile({
      firstName: userState.first_name ?? "",
      lastName: userState.last_name ?? "",
      email: userState.email ?? "",
    });

    setProfileChanged(false);
  }, [userState]);

  useEffect(() => {
    if (profile.firstName && profile.firstName !== userState.first_name) {
      setProfileChanged(true);
    } else if (profile.lastName && profile.lastName !== userState.lastName) {
      setProfileChanged(true);
    } else if (profile.email && profile.email !== userState.email) {
      setProfileChanged(true);
    } else {
      setProfileChanged(false);
    }
  }, [profile]);

  function handleProfileChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    setProfile({ ...profile, [key]: value });
  }

  async function updateProfile() {
    const body = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      email: profile.email,
    };

    const response = await api
      .put("/users/me", body)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          // Save new data
          // dispatch(...)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          value={profile.firstName}
          name="firstName"
          label="First name"
          variant="outlined"
          fullWidth
          onChange={handleProfileChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          value={profile.lastName}
          name="lastName"
          label="Last name"
          variant="outlined"
          fullWidth
          onChange={handleProfileChange}
        />
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <TextField
            value={profile.email}
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            onChange={handleProfileChange}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button
          disabled={!profileChanged}
          style={{ borderRadius: "100px" }}
          color="primary"
          variant="contained"
          disableElevation
          onClick={updateProfile}
        >
          <Box px={3}>Update profile</Box>
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Box pt={3} pb={1}>
          <Typography variant="h3">Change password</Typography>
        </Box>
        <Divider />
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Current password"
            variant="outlined"
            fullWidth
            type="password"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="New password"
            variant="outlined"
            fullWidth
            type="password"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Confirm new password"
            variant="outlined"
            fullWidth
            type="password"
          />
        </Grid>
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
  );
}
