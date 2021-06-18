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
          <FooterWave />
          <Container>
            <Text big>Developed by:</Text>
            <Logos>
              <div>
                <p>Neil Weasfdgf</p>
                <Mit />
              </div>
              <div>
                <p>Neil Weasfdgf</p>
                <Unb />
              </div>
              <div>
                <p>Neil Weasfdgf</p>
                <Yonsei />
              </div>
              <div>
                <p>Neil Weasfdgf</p>
                <MitIbm />
              </div>
            </Logos>
            <Copyright>© 2021 Computer Progress</Copyright>
          </Container>
      </HomeWrapper>
    );
  }

  return (
    <Wrapper>
      <Copyright>© 2021 Computer Progress</Copyright>
    </Wrapper>
  )
}