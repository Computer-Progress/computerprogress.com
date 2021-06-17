import { Container, useTheme, useMediaQuery } from "@material-ui/core";

import PageTemplate from "../../components/PageTemplate";
import ContributorsContainer from "../../components/ContributorsContainer";

const contributors = [
  {
    name: "Neil C. Thompson",
    workPlace: "MIT",
    position: "Researcher Scientist",
    imageName: "neil-thompson.png",
  },
  {
    name: "Kristjan Greenewald",
    workPlace: "MIT-IBM Watson AI Lab",
    position: "Researcher",
    imageName: "kristjan-greenewald.png",
  },
  {
    name: "Keeheon Lee",
    workPlace: "Yonsei University",
    position: "Assistant Professor",
    imageName: "keeheon-lee.png",
  },
  {
    name: "Gabriel F. Manso",
    workPlace: "UnB",
    position: "Undergraduate Student",
    imageName: "gabriel-manso.png",
  },
  {
    name: "Andrew Lucas",
    workPlace: "UnB",
    position: "Software Engineer",
    imageName: "andrew-lucas.png",
  },
  {
    name: "Guilherme Banci",
    workPlace: "UnB",
    position: "Front-end Developer",
    imageName: "guilherme-banci.png",
  },
  {
    name: "Irwin Schmitt",
    workPlace: "UnB",
    position: "Front-end Developer",
    imageName: "irwin-schmitt.png",
  },
  {
    name: "João Egewarth",
    workPlace: "UnB",
    position: "UI/UX Designer",
    imageName: "joao-egewarth.png",
  },
  // {
  //   name: "João Zarbiélli",
  //   workPlace: "UnB",
  //   position: "Software Engineer",
  //   imageName: "joao-zarbielli.png",
  // },
];

import {
  StyledTitle,
  GridContainer,
  StyledButton,
  ButtonContainer,
} from "./styles.js";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <PageTemplate>
        <Container>
          <StyledTitle>About us</StyledTitle>

          <GridContainer $mobile={isMobile}>
            <img src="/icon-background-1.svg" />

            <h2>Our paper (abstract)</h2>

            <p>
              Deep learning's recent history has been one of achievement:
              from triumphing over humans in the game of Go to world-leading 
              performance in image recognition, voice recognition, translation, 
              and other tasks. But this progress has come with a voracious appetite for computing power. 
              This article reports on the computational demands of Deep Learning applications in five 
              prominent application areas and shows that progress in all five is strongly reliant on 
              increases in computing power. Extrapolating forward this reliance reveals that progress 
              along current lines is rapidly becoming economically, technically, and environmentally 
              unsustainable. Thus, continued progress in these applications will require dramatically 
              more computationally-efficient methods, which will either have to come from changes to 
              deep learning or from moving to other machine learning methods.
            </p>
          </GridContainer>

          <ButtonContainer>
            <StyledButton>Read our paper</StyledButton>
          </ButtonContainer>

          <GridContainer $mobile={isMobile}>
            <img src="/icon-background-1.svg" />

            <h2>Our mission</h2>

            <p>
              Understanding the role that computing power plays in Deep Learning is extremely important.
              Our study (link) shows that over 1000 Deep Learning papers were visited, and only 12.9% of 
              them reported computer resource data correctly.  Our mission is to make clear the huge role 
              that computing power has played in this area. We really want to encourage the computer science 
              community to pay attention to this issue and contribute to understanding the progress of Deep 
              Learning from this prespective.
            </p>
          </GridContainer>

          <ContributorsContainer contributors={contributors} />
        </Container>
      </PageTemplate>
    </div>
  );
}
