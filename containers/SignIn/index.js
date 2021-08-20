// import { useState } from 'react';
import PageTemplate from "../../components/PageTemplate";

import {
  Container,
  StyledBox,
  InfoContainer,
  Input,
  Question,
  SignButton,
  Divider
} from './styles';

export default function SignIn() {
  return (
    <PageTemplate>
      <Container>
        <StyledBox>
          <h2>Sign In</h2>
          <Input label="Email" />
          <Input label="Password" />
          <Question >Forgot your password?</Question>
          <SignButton>SIGN IN</SignButton>
          <Divider />
          <Question>Don't have an account?</Question>
          <SignButton variant="outlined">SIGN UP</SignButton>
        </StyledBox>
      </Container>
    </PageTemplate>
  )
}

