import { Path, Wrapper, Container, Text, Call } from "./styles.js";
import Circuit from '../Circuit'
import Button from '../Button'

export default function Collaborate() {
  return (
    <Wrapper>
      <Container>
        <Text> Your help can change everything! </Text>
        <Call> Collaborate on the understanding of the hardware <br /> burden influence on machine learning.</Call>
        <Button link='/collaborate' cta>SEE HOW TO COLLABORATE</Button>
      </Container>
    </Wrapper>
  );
}

