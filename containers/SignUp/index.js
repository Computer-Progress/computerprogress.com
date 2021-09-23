// import { useState } from 'react';
import Link from "next/link";
import PageTemplate from "../../components/PageTemplate";
import NewButton from "../../components/Button/NewButton";
import PublicPageOnly from "../../components/PublicPageOnly";
import {
  FormContainer,
  StyledBox,
  InfoContainer,
  Input,
  Question,
  SignButton,
  Divider,
} from "./styles";
import { useEffect, useState } from "react";
import useApi from "../../services/useApi";
import { Creators as alertActions } from "../../store/ducks/alert";
import { useDispatch } from "react-redux";
import router from "next/router";
import { useForm } from "react-hook-form";
import {
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function SignUp() {
  const api = useApi();
  const dispatch = useDispatch();
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  function passwordConfirmationMatch(passwordConfirmation) {
    return passwordConfirmation === getValues("password");
  }

  const onSubmit = async (data) => {
    setIsSubmissionLoading(true);

    await api
      .post(
        "/users/open",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        dispatch(
          alertActions.openAlert({
            open: true,
            message: `An email confirmation was sent to ${getValues("email")}.`,
            type: "info",
          })
        );

        reset();
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
        setIsSubmissionLoading(false);
      });
  };

  return (
    <PageTemplate>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <StyledBox>
          <h2>Sign Up</h2>
          <Input
            {...register("firstName", { required: true })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName && "First name is required"}
            label="First name"
          />
          <Input
            {...register("lastName", { required: true })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName && "Last name is required"}
            label="Last name"
          />
          <Input
            {...register("email", { required: true })}
            error={Boolean(errors.email)}
            helperText={errors.email && "Email is required"}
            label="Email"
          />

          <FormControl
            variant="outlined"
            style={{ marginBottom: "12px" }}
            fullWidth
          >
            <InputLabel error={Boolean(errors.password)}>Password</InputLabel>

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
              Confirm password
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

          <NewButton
            color="primary"
            loading={isSubmissionLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Sign up
          </NewButton>

          <Question margin>
            By signing up, you agree to our Data Policy
          </Question>
          <Divider />
          <Question>Have an account?</Question>
          <Link href="/signin">
            <a>
              <NewButton color="secondary">Sign in</NewButton>
            </a>
          </Link>
        </StyledBox>
      </FormContainer>
    </PageTemplate>
  );
}

export default PublicPageOnly(SignUp);
