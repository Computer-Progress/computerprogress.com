import PageTemplate from "../../components/PageTemplate";
import NewButton from "../../components/Button/NewButton";

import { Container, StyledBox, Input, Question } from "./styles";
import { useEffect, useState } from "react";
import useApi from "../../services/useApi";
import { Creators as alertActions } from "../../store/ducks/alert";
import { useDispatch } from "react-redux";
import router from "next/router";
import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const api = useApi();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    setIsLoading(true);
    await api
      .post(`/password-recovery/${data.email}`)
      .then((response) => {
        dispatch(
          alertActions.openAlert({
            open: true,
            message: `An email confirmation was sent to ${data.email}.`,
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
        setIsLoading(false);
      });
  }

  return (
    <PageTemplate>
      <Container>
        <StyledBox>
          <h2>Recover your password</h2>
          <Question>
            Enter your user account's verified email address and we will send
            you a link to reset your password.
          </Question>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("email", { required: true })}
              label="Email"
              error={Boolean(errors.email)}
              helperText={Boolean(errors.email) && "Invalid email"}
            />

            <NewButton
              color="primary"
              loading={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              Recover
            </NewButton>
          </form>
        </StyledBox>
      </Container>
    </PageTemplate>
  );
}
