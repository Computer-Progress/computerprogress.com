// import { useState } from 'react';
import Link from "next/link";
import PageTemplate from "../../components/PageTemplate";
import NewButton from "../../components/Button/NewButton";

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

export default function SignUp() {
  const api = useApi();
  const dispatch = useDispatch();
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);

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
            message: `An email confirmation was sent to ${account.email}.`,
            type: "info",
          })
        );
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

    return;

    router.push("/signin"); // params pra mostrar a mensagem de confirmacao
    console.log(response);

    setIsSubmissionLoading(true);
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
          <Input
            {...register("password", { required: true, minLength: 8 })}
            error={Boolean(errors.password)}
            helperText={errors.password && "Use 8 or more characters"}
            label="Password"
            type="password"
          />
          <Input
            {...register("passwordConfirmation", {
              required: true,
              validate: passwordConfirmationMatch,
            })}
            error={Boolean(errors.passwordConfirmation)}
            helperText={
              errors.passwordConfirmation && "Passwords does not match"
            }
            label="Confirm password"
            type="password"
          />
          {/* <Question>
            Use 8 or more characters with a mix of letters, numbers & simbols.
          </Question> */}
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
