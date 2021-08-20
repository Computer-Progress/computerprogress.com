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
import NewButton from "../Button/NewButton";
import { Creators as alertActions } from "../../store/ducks/alert";
import { Creators as userActions } from "../../store/ducks/user";
import { useEffect, useState } from "react";

export default function Profile() {
  const api = useApi();
  const dispatch = useDispatch();

  const emptyPassword = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  };

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [password, setPassword] = useState(emptyPassword);

  const [isProfileValid, setIsProfileValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const userState = useSelector((state) => state.UserReducer);

  useEffect(() => {
    setProfile({
      firstName: userState.first_name ?? "",
      lastName: userState.last_name ?? "",
      email: userState.email ?? "",
    });

    setIsProfileValid(false);
  }, [userState]);

  useEffect(() => {
    validateProfile();
  }, [profile]);

  useEffect(() => {
    validatePassword();
  }, [password]);

  function handleInputChange(event, group) {
    const key = event.target.name;
    const value = event.target.value;

    if (group === "profile") {
      setProfile({ ...profile, [key]: value });
    } else if (group === "password") {
      setPassword({ ...password, [key]: value });
    }
  }

  function validateProfile() {
    const profileChanges = [];
    if (profile.firstName && profile.firstName !== userState.first_name) {
      profileChanges.push(true);
    }

    if (profile.lastName && profile.lastName !== userState.last_name) {
      profileChanges.push(true);
    }

    if (profile.email && profile.email !== userState.email) {
      profileChanges.push(true);
    }

    const hasProfileChanged = profileChanges.some((change) => change);

    setIsProfileValid(hasProfileChanged);
  }

  function validatePassword() {
    const isPasswordEmpty = Object.values(password).some(
      (password) => password.length === 0
    );

    if (isPasswordEmpty) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  }

  async function update(body, type) {
    const successMessage = {
      profile: "Profile",
      password: "Password",
    };

    try {
      const response = await api.put("/users/me", body);

      dispatch(
        alertActions.openAlert({
          open: true,
          message: `${successMessage[type]} updated with success.`,
          type: "success",
        })
      );

      return response;
    } catch (error) {
      dispatch(
        alertActions.openAlert({
          open: true,
          message: error.message,
          type: "error",
        })
      );
    }
  }

  async function updateProfile() {
    const body = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      email: profile.email,
    };

    setIsProfileLoading(true);
    try {
      const response = await update(body, "profile");
      dispatch(userActions.login(body))
    } catch (error) {
      dispatch(
        alertActions.openAlert({
          open: true,
          message: error.message,
          type: "error",
        })
      );
    }

    // Save new user data
    // console.log(response.data);

    setIsProfileLoading(false);
  }

  async function updatePassword() {
    const body = {
      current_password: password.currentPassword,
      password: password.newPassword,
    };

    setIsPasswordLoading(true);

    await update(body, "password");

    setPassword({
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    });
    setIsPasswordLoading(false);
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
          onChange={(event) => handleInputChange(event, "profile")}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          value={profile.lastName}
          name="lastName"
          label="Last name"
          variant="outlined"
          fullWidth
          onChange={(event) => handleInputChange(event, "profile")}
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
            onChange={(event) => handleInputChange(event, "profile")}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <NewButton
            disabled={!isProfileValid}
            loading={isProfileLoading}
            onClick={updateProfile}
          >
            Update profile
          </NewButton>
        </Grid>
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
            name="currentPassword"
            label="Current password"
            variant="outlined"
            fullWidth
            type="password"
            value={password.currentPassword}
            onChange={(event) => handleInputChange(event, "password")}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="newPassword"
            label="New password"
            variant="outlined"
            fullWidth
            type="password"
            value={password.newPassword}
            onChange={(event) => handleInputChange(event, "password")}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="newPasswordConfirmation"
            label="Confirm new password"
            variant="outlined"
            fullWidth
            type="password"
            value={password.newPasswordConfirmation}
            onChange={(event) => handleInputChange(event, "password")}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <NewButton
            disabled={!isPasswordValid}
            loading={isPasswordLoading}
            onClick={updatePassword}
          >
            Update password
          </NewButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
