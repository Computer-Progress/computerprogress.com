import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Creators as alertActions } from "../../store/ducks/alert";
import { Creators as userActions } from "../../store/ducks/user";
import useApi from "../../services/useApi";
import { Creators as navigationActions } from '../../store/ducks/navigation'

import PageTemplate from "../../components/PageTemplate";
import Alert from "../../components/Alert";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@material-ui/core";
import {
  Container,
  StyledBox,
  InfoContainer,
  Input,
  Question,
  SignButton,
  Divider,
  StyledAlert,
} from "./styles";
import NewButton from "../../components/Button/NewButton";

import { GridOffTwoTone } from "@material-ui/icons";

export default function SignIn({ hasEmailConfirmationSucceed }) {
  // console.log(hasEmailConfirmationSucceed);
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.UserReducer);
  const navigationState = useSelector((state) => state.navigation);

  const api = useApi();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  console.log('navigationState', navigationState)

  const onChange = (value, fieldName) => {
    let myInfo = userInfo;

    myInfo[fieldName] = value;
    setUserInfo(myInfo);
  };

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/me");
      const user = response.data;
      if (user?.email) {
        dispatch(userActions.login({ ...user, ...userState }));
        if (navigationState?.url) {
          router.push(navigationState.url)
          dispatch(navigationActions.clearUrl());
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      setLoading(false);
      dispatch(
        alertActions.openAlert({
          open: true,
          message: error.message,
          type: "error",
        })
      );
    }
  };

  useEffect(() => {
    if (userState?.token && !userState?.id) {
      getUserInfo();
    }
  }, [userState]);

  const login = async () => {
    const validations = ["email", "password"];
    const isInvalid = validations.some((item) => {
      if (!userInfo[item]) {
        dispatch(
          alertActions.openAlert({
            open: true,
            message: `Please, insert the ${item}`,
            type: "warning",
          })
        );
        return true;
      }
      return false;
    });

    if (isInvalid) return;
    setLoading(true);
    const { email, password } = userInfo;
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    try {
      const response = await api.post("login/access-token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { data } = response;
      let user = {
        token: `${data.token_type} ${data.access_token}`,
      };
      dispatch(userActions.login(user));
    } catch (error) {
      setLoading(false);
      dispatch(
        alertActions.openAlert({
          open: true,
          message: error.message,
          type: "error",
        })
      );
    }
  };

  return (
    <PageTemplate>
      <Container>
        <StyledBox>
          <h2>Sign In</h2>

          {hasEmailConfirmationSucceed && (
            <Box pb={2}>
              <StyledAlert>Your email has been confirmed!</StyledAlert>
            </Box>
          )}

          <Input
            label="Email"
            onChange={(event) => onChange(event.target.value, "email")}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(event) => onChange(event.target.value, "password")}
          />
          <Question>Forgot your password?</Question>
          <SignButton onClick={login}>
            {loading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "SIGN IN"
            )}
          </SignButton>
          <Divider />
          <Question>Don't have an account?</Question>
          <Link href="/signup">
            <a>
              <NewButton color="secondary">Sign up</NewButton>
            </a>
          </Link>
        </StyledBox>
      </Container>
    </PageTemplate>
  );
}
