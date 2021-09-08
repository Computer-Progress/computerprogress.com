import { useEffect, useState } from "react";
import ContributorCard from "../ContributorCard";

import { StyledH2, ContributorsFlexBox } from "./style";

export default function ContributorsContainer({
  researchers,
  otherContributors,
}) {
  return (
    <>
      <StyledH2>Research Team</StyledH2>

      <ContributorsFlexBox>
        {researchers.map((contributor) => (
          <ContributorCard contributor={contributor} key={contributor.name} />
        ))}
      </ContributorsFlexBox>
      
      <StyledH2>Web Development Team</StyledH2>

      <ContributorsFlexBox>
        {otherContributors.map((contributor) => (
          <ContributorCard contributor={contributor} key={contributor.name} />
        ))}
      </ContributorsFlexBox>
    </>
  );
}
