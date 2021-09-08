import Link from "next/link";
import PageTemplate from "../../components/PageTemplate";
import NewButton from "../../components/Button/NewButton";

import { Container, StyledBox, Input, Question } from "./styles";
import { useEffect, useState } from "react";
import useApi from "../../services/useApi";
import { Creators as alertActions } from "../../store/ducks/alert";
import { useDispatch } from "react-redux";
import router from "next/router";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function ChangePassword({ token }) {
  const api = useApi();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  function passwordConfirmationMatch(passwordConfirmation) {
    return passwordConfirmation === getValues("password");
  }

  async function onSubmit(data) {
    setIsLoading(true);

    await api
      .post(`/reset-password/`, {
        token: token,
        new_password: data.password,
      })
      .then((response) => {
        dispatch(
          alertActions.openAlert({
            open: true,
            message: `Successfully updated your password.`,
            type: "success",
          })
        );

        router.push("/signin");
      })
      .catch((error) => {
        dispatch(
          alertActions.openAlert({
            open: true,
            message: error.response?.data?.detail ?? error.message,
            type: "error",
          })
        );
      })
      .then(() => {
        setIsLoading(false);
        router.push("/signin");
      });
  }

  return (
    <PageTemplate>
      <Container>
        <StyledBox>
          <h2>Change your password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              variant="outlined"
              style={{ marginBottom: "12px" }}
              fullWidth
            >
              <InputLabel error={Boolean(errors.password)}>
                New password
              </InputLabel>

              <OutlinedInput
                {...register("password", { required: true, minLength: 8 })}
                error={Boolean(errors.password)}
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
                labelWidth={75}
              />

              {errors.password && (
                <FormHelperText error>Use 8 or more characters</FormHelperText>
              )}
            </FormControl>

            <FormControl
              variant="outlined"
              style={{ marginBottom: "12px" }}
              fullWidth
            >
              <InputLabel error={Boolean(errors.passwordConfirmation)}>
                Confirm new password
              </InputLabel>

              <OutlinedInput
                {...register("passwordConfirmation", {
                  required: true,
                  validate: passwordConfirmationMatch,
                })}
                error={Boolean(errors.passwordConfirmation)}
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

              {errors.passwordConfirmation && (
                <FormHelperText error>Passwords does not match</FormHelperText>
              )}
            </FormControl>
          </form>

          {/* <Question>Use 8 or more characters.</Question> */}
          <NewButton
            color="primary"
            loading={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Change Password
          </NewButton>
        </StyledBox>
      </Container>
    </PageTemplate>
  );
}
