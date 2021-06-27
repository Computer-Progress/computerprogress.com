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
            <Text big>Idealized by:</Text>
            <Logos>
                <div>
                  <h3>Neil C. Thompson</h3>
                  <p>MIT's Computer Science and Artificial Inteligence Lab</p>
                </div>
                <div>
                  <h3>Gabriel F. Manso</h3>
                  <p>MIT-IBM Watson AI Lab</p>
                </div>
                <div>
                  <h3>Keeheon Lee</h3>
                  <p>Yonsey University</p>
                </div>
                <div>
                  <h3>Kristjan Greenewald</h3>
                  <p>University of Brasilia</p>
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