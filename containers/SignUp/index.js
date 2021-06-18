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

export default function SignUp() {
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
          <h2>Sign Up</h2>
          <Input label="Email" />
          <Input label="Name" />
          <Input label="Last Name" />
          <Input label="Password" />
          <Input label="Confirm Password" />
          <Question>Use 8 or more characters with a mix of letters, numbers & simbols</Question>
          <SignButton>SIGN UP</SignButton>

          <Question margin>By signing up, you agree to our Data Policy</Question>
          <Divider />
          <Question>Have an account?</Question>
          <SignButton variant="outlined">SIGN IN</SignButton>
        </StyledBox>
      </Container>
    </PageTemplate>
  )
}

