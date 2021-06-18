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
                <div>
                  <p>Neil C. Thompson</p>
                  <Mit />
                </div>
                <div>
                  <p>Gabriel F. Manso</p>
                  <Unb />
                </div>
                <div>
                  <p>Keeheon Lee</p>
                  <Yonsei />
                </div>
                <div>
                  <p>Kristjan Greenewald</p>
                  <MitIbm />
                </div>
            </Logos>
            <Copyright>© 2021 Computer Progress</Copyright>
          </Container>
          <FooterWave />
      </HomeWrapper>
    );
  }

  return (
    <Wrapper>
      <Copyright>© 2021 Computer Progress</Copyright>
    </Wrapper>
  )
}