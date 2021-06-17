import Head from "next/head";
import { Container, useTheme, useMediaQuery } from "@material-ui/core";
import PageTemplate from "../../components/PageTemplate";

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

            <h2>Our paper</h2>

            <p>
              Computer progress is a platform for viewing paper data that
              addresses the computational limits of deep learning. Our
              inspiration for creating this site was the paper The Computational
              Limits of Deep Learning, where one of the group members, Gabriel
              F. Manso, is one of the authors of the paper.
              <br />
              <br />
              The platform was created in conjunction with students and
              professors from YONSEI University, who validated our product, and
              helped us to improve it. This platform is open source and is open
              to contributions from new employees.
            </p>
          </GridContainer>

          <ButtonContainer>
            <StyledButton>See our paper</StyledButton>
          </ButtonContainer>

          <GridContainer $mobile={isMobile}>
            <img src="/icon-background-1.svg" />

            <h2>Our mission</h2>

            <p>
              Our mission is to make it easier to view paper data that deal with
              Deep Learning, and concentrate that knowledge in a platform. In
              addition, we also want to engage researchers in the field to put
              their papers on our platform and also become contributors and
              reviewers of papers to be submitted by other contributors.
            </p>
          </GridContainer>
        </Container>
      </PageTemplate>
    </div>
  );
}
