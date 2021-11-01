import { CollaborateButton, Wrapper, Container, Text, Call } from "./styles.js";

export default function Collaborate() {
  return (
    <Wrapper>
      <Container>
        <Text> You can change everything! </Text>
        <Call> Help the world understand the computational demands of Deep Learning...</Call>
        <CollaborateButton link="/collaborate">
          SEE HOW TO COLLABORATE
        </CollaborateButton>
      </Container>
    </Wrapper>
  );
}
