import { useDispatch, useSelector } from "react-redux";
import useApi from "../../services/useApi";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import NewButton from "../Button/NewButton";
import { Creators as alertActions } from "../../store/ducks/alert";
import { Creators as userActions } from "../../store/ducks/user";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function Profile() {
  const api = useApi();
  const userState = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isProfileValid, setIsProfileValid] = useState(false);

  const [isProfileLoading, setIsProfileLoading] = useState(false);

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

  function handleInputChange(event, group) {
    const key = event.target.name;
    const value = event.target.value;

    if (group === "profile") {
      setProfile({ ...profile, [key]: value });
    } else if (group === "password") {
      setPassword({ ...password, [key]: value });
    }
  }

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  function passwordConfirmationMatch(passwordConfirmation) {
    return passwordConfirmation === getValues("newPassword");
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
      dispatch(userActions.login(body));
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

  async function updatePassword(data) {
    const body = {
      current_password: data.currentPassword,
      password: data.newPassword,
    };

    setIsPasswordLoading(true);

    await update(body, "password");

    reset();

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
          <FormControl variant="outlined" fullWidth>
            <InputLabel error={Boolean(errors.currentPassword)}>
              Current password
            </InputLabel>

            <OutlinedInput
              {...register("currentPassword", { required: true })}
              error={Boolean(errors.currentPassword)}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={145}
            />

            {errors.currentPassword && (
              <FormHelperText error>
                Current password is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel error={Boolean(errors.newPassword)}>
              New password
            </InputLabel>

            <OutlinedInput
              {...register("newPassword", { required: true, minLength: 8 })}
              error={Boolean(errors.newPassword)}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={120}
            />

            {errors.newPassword && (
              <FormHelperText error>Use 8 or more characters</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel error={Boolean(errors.newPasswordConfirmation)}>
              Confirm password
            </InputLabel>

            <OutlinedInput
              {...register("newPasswordConfirmation", {
                required: true,
                validate: passwordConfirmationMatch,
              })}
              error={Boolean(errors.newPasswordConfirmation)}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={148}
            />

            {errors.newPasswordConfirmation && (
              <FormHelperText error>Passwords does not match</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <NewButton
            loading={isPasswordLoading}
            onClick={handleSubmit(updatePassword)}
          >
            Update password
          </NewButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
