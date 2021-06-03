import { Wrapper, Container, Logos, Text, Copyright } from "./styles.js";
import Wave from "react-wavify";
import FooterWave from "../FooterWave";
import Mit from "../../public/mit.svg";
import Unb from "../../public/unb.svg";
import Yonsei from "../../public/yonsei.svg";
import MitIbm from "../../public/mit-ibm.svg";

export default function Footer() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}