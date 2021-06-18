import { Container, useTheme, useMediaQuery } from "@material-ui/core";

import PageTemplate from "../../components/PageTemplate";
import DescriptionCard from "../../components/DescriptionCard";
import ContributorsContainer from "../../components/ContributorsContainer";

const textBlocks = [
  {
    icon: "icon-background-filetext.svg",
    title: "Our paper",
    description:
      "Computer progress is a platform for viewing paper data that\
              addresses the computational limits of deep learning. Our\
              inspiration for creating this site was the paper The Computational\
              Limits of Deep Learning, where one of the group members, Gabriel\
              F. Manso, is one of the authors of the paper.\
              The platform was created in conjunction with students and\
              professors from YONSEI University, who validated our product, and\
              helped us to improve it. This platform is open source and is open\
              to contributions from new employees.",
  },
  {
    icon: "icon-background-target.svg",
    title: "Our mission",
    description:
      "Our mission is to make it easier to view paper data that deal with\
    Deep Learning, and concentrate that knowledge in a platform. In\
    addition, we also want to engage researchers in the field to put\
    their papers on our platform and also become contributors and\
    reviewers of papers to be submitted by other contributors.",
  },
];

const contributors = [
  {
    name: "Neil C. Thompson",
    workPlace: "MIT",
    position: "Researcher",
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
    position: "Researcher",
    imageName: "keeheon-lee.png",
  },
  {
    name: "Gabriel F. Manso",
    workPlace: "UnB/MIT",
    position: "Researcher",
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
    position: "Front-end Engineer",
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
  {
    name: "João Zarbiélli",
    workPlace: "UnB",
    position: "Software Engineer",
    imageName: "joao-zarbielli.png",
  },
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

          <DescriptionCard
            icon={textBlocks[0].icon}
            title={textBlocks[0].title}
            description={textBlocks[0].description}
          />

          <ButtonContainer>
            <StyledButton>See our paper</StyledButton>
          </ButtonContainer>

          <DescriptionCard
            icon={textBlocks[1].icon}
            title={textBlocks[1].title}
            description={textBlocks[1].description}
          />

          <ContributorsContainer contributors={contributors} />
        </Container>
      </PageTemplate>
    </div>
  );
}
