import { Svg, Path, Wrapper, Container, Text, Call } from "./styles.js";
import Circuit from '../Circuit'
import Button from '../Button'

export default function Collaborate() {
  return (
    <Wrapper>
      <Container>
        <Circuit />
        <Text> Your help can change everything! </Text>
        <Call> Collaborate for the understanding of hardware <br /> burden influence in machine learning.</Call>
        <Button link='/collaborate' cta>SEE HOW TO COLLABORATE</Button>
      </Container>
    </Wrapper>
  );
}