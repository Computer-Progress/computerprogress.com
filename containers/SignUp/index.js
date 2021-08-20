// import { useState } from 'react';
import Link from "next/link";
import PageTemplate from "../../components/PageTemplate";
import NewButton from "../../components/Button/NewButton";

import {
  Container,
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

export default function SignUp() {
  const api = useApi();
  const dispatch = useDispatch();

  const emptyAccount = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const [account, setAccount] = useState(emptyAccount);

  const [isAccountValid, setIsAccountValid] = useState(false);
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);

  useEffect(() => {
    const isSomeInputEmpty = Object.values(account).some(
      (input) => input.length === 0
    );

    setIsAccountValid(!isSomeInputEmpty);
  }, [account]);

  function handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    setAccount({ ...account, [key]: value });
  }

  async function submitSignIn() {
    setIsSubmissionLoading(true);

    try {
      const response = await api.post("/users/open", account);

      dispatch(
        alertActions.openAlert({
          open: true,
          message: `An email confirmation was sent to ${account.email}.`,
          type: "info",
        })
      );

      setIsSubmissionLoading(true);
      setAccount(emptyAccount);
      router.push("/signin");
    } catch (error) {
      dispatch(
        alertActions.openAlert({
          open: true,
          message: error.message,
          type: "error",
        })
      );
    }
    setIsSubmissionLoading(false);
  }
  return (
    <PageTemplate>
      <Container>
        <StyledBox>
          <h2>Sign Up</h2>
          <Input
            name="first_name"
            label="First name"
            value={account["first_name"]}
            onChange={handleChange}
          />
          <Input
            name="last_name"
            label="Last name"
            value={account["last_name"]}
            onChange={handleChange}
          />
          <Input
            name="email"
            label="Email"
            value={account["email"]}
            onChange={handleChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={account["password"]}
            onChange={handleChange}
          />
          <Input
            name="passwordConfirmation"
            label="Confirm password"
            type="password"
            value={account["passwordConfirmation"]}
            onChange={handleChange}
          />
          <Question>
            Use 8 or more characters with a mix of letters, numbers & simbols
          </Question>
          <NewButton
            color="primary"
            disabled={!isAccountValid}
            loading={isSubmissionLoading}
            onClick={submitSignIn}
          >
            Sign in
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
      </Container>
    </PageTemplate>
  );
}
