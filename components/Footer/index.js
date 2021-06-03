import { Wrapper, Container, Text } from "./styles.js";
import Wave from "react-wavify";
import FooterWave from "../FooterWave";

export default function Footer() {
  return (
    <Wrapper>
        <Container>
          <Text>© 2021 Massachusetts Institute of Technology.</Text>
        </Container>
        <FooterWave />
    </Wrapper>
  );
}