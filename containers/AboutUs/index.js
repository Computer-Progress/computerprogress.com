import { Container } from "@material-ui/core";
import PageTemplate from "../../components/PageTemplate";
import DescriptionCard from "../../components/DescriptionCard";
import ContributorsContainer from "../../components/ContributorsContainer";
import { textBlocks, researchers, otherContributors } from "./aboutUsData";

import { StyledTitle, StyledButton, ButtonContainer } from "./styles.js";

export default function AboutUs() {
  return (
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

        <ContributorsContainer
          researchers={researchers}
          otherContributors={otherContributors}
        />
      </Container>
    </PageTemplate>
  );
}
