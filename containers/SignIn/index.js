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
        <InfoContainer>
          <h2>You can change everything!</h2>
          <p>
            Collaborate on the understanding of the computational progress!
          </p>
        </InfoContainer>
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

