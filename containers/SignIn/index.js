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

export default function SignIn() {
  const api = useApi()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({
    open: false,
    message: 'Error',
  });

  const login = () => {
    if (!email) {
      setAlert({
        open: true,
        message: 'Por favor, preencha o campo email'
      })
    }
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
          <Input label="Email" onChange={(text) => setEmail(text)} />
          <Input label="Password" onChange={(text) => setPassword(text)} />
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

