import { CollaborateButton, Wrapper, Container, Text, Call } from "./styles.js";

export default function Collaborate() {
  return (
    <Wrapper>
      <Container>
        <Text> Your help can change everything! </Text>
        <Call> Collaborate on the understanding of the computational progress!</Call>
        <CollaborateButton link='/collaborate'>SEE HOW TO COLLABORATE</CollaborateButton>
      </Container>
    </Wrapper>
  );
}

