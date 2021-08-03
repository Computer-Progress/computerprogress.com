import { useState } from 'react';
import PageTemplate from "../../components/PageTemplate";
import Alert from "../../components/Alert";

import {
  Container,
  StyledBox,
  InfoContainer,
  Input,
  Question,
  SignButton,
  Divider
} from './styles';

import useApi from '../../services/useApi';
import { useDispatch } from 'react-redux';
import { Creators as alertActions } from '../../store/ducks/alert';

export default function SignIn() {
  const dispatch = useDispatch();
  const api = useApi()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const onChange = (value, fieldName) => {
    let myInfo = userInfo;

    myInfo[fieldName] = value;
    setUserInfo(myInfo);
  }

  const login = () => {
    console.log(userInfo)
    const validations = ['email', 'password']
    validations.some(item => {
      console.log(item)
      if (!userInfo[item]) {
        dispatch(alertActions.openAlert({
          open: true,
          message: `Please, insert the ${item}`,
          type: 'warning'
        }));
        return true;
      }
      return false;
    })
  }

  return (
    <PageTemplate>
      <Container>
        <InfoContainer>
          <h2>Your help can change everything</h2>
          <p>
            Collaborate for the understanding of hardware burden
            influence in machine learning.
          </p>
        </InfoContainer>
        <StyledBox>
          <h2>Sign In</h2>
          <Input label="Email" onChange={(text) => onChange(text, 'email')} />
          <Input label="Password" onChange={(text) => onChange(text, 'password')} />
          <Question >Forgot your password?</Question>
          <SignButton onClick={login}>SIGN IN</SignButton>
          <Divider />
          <Question>Don't have an account?</Question>
          <SignButton variant="outlined">SIGN UP</SignButton>
          <Alert open={alert.open} message={alert.message} close={() => setAlert({ open: false })} severity="warning" />
        </StyledBox>
      </Container>
    </PageTemplate>
  )
}

