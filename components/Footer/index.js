import { Wrapper, HomeWrapper, Container, Logos, Text, Copyright } from "./styles.js";
import FooterWave from "../FooterWave";
import Mit from "../../public/mit.svg";
import Unb from "../../public/unb.svg";
import Yonsei from "../../public/yonsei.svg";
import MitIbm from "../../public/mit-ibm.svg";

export default function Footer({ home }) {

  if (home) {
    return (
      <HomeWrapper>
          <Container>
            <Text big>Developed by:</Text>
            <Logos>
              <Mit />
              <Unb />
              <Yonsei />
              <MitIbm />
            </Logos>
            <Copyright>© 2021 Massachusetts Institute of Technology</Copyright>
          </Container>
          <FooterWave />
      </HomeWrapper>
    );
  }

  return (
    <Wrapper>
      <Copyright>© 2021 Massachusetts Institute of Technology</Copyright>
    </Wrapper>
  )
}