import Link from "next/link";
import PageTemplate from "../../components/PageTemplate";
import NewButton from "../../components/Button/NewButton";

import {
  Container,
  StyledBox,
  Input,
  Question,
} from "./styles";
import { useEffect, useState } from "react";
import useApi from "../../services/useApi";
import { Creators as alertActions } from "../../store/ducks/alert";
import { useDispatch } from "react-redux";
import router from "next/router";

export default function ChangePassword() {
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
          <h2>Change Your Password</h2>
          <Input
            name="new_password"
            label="New Password"
            value={account["new_password"]}
            onChange={handleChange}
          />
          <Input
            name="confirm_new_password"
            label="Confirm New Password"
            value={account["confirm_new_password"]}
            onChange={handleChange}
          />
          <Question>
            Use 8 or more characters.
          </Question>
          <NewButton
            color="primary"
            disabled={!isAccountValid}
            loading={isSubmissionLoading}
            onClick={submitSignIn}
          >
            Change Password
          </NewButton>
        </StyledBox>
      </Container>
    </PageTemplate>
  );
}