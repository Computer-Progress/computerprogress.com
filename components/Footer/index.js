import { Wrapper, HomeWrapper, Container, Logos, Text, Copyright } from "./styles.js";
import FooterWave from "../FooterWave";

export default function Footer({ isHome }) {

  if (isHome) {
    return (
      <HomeWrapper>
          <Container>
            <Text big>Idealized by:</Text>
            <Logos>
                <div>
                  <h3>Gabriel F. Manso</h3>
                  <p>University of Brasilia</p>
                </div>
                <div>
                  <h3>Keeheon Lee</h3>
                  <p>Yonsey University</p>
                </div>
                <div>
                  <h3>Kristjan Greenewald</h3>
                  <p>MIT-IBM Watson AI Lab</p>
                </div>
                <div>
                  <h3>Neil C. Thompson</h3>
                  <p>MIT's Computer Science and Artificial Inteligence Lab</p>
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