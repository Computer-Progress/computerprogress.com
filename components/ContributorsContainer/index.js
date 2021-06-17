import { useEffect, useState } from "react";
import ContributorCard from "../ContributorCard";

import { StyledH2, ContributorsFlexBox } from "./style";

export default function ContributorsContainer({ contributors }) {
  const [researchers, setResearchers] = useState([]);
  const [otherContributors, setOtherContributors] = useState([]);

  useEffect(() => {
    const researchers = contributors.filter(
      ({ position }) => position === "Researcher"
    );

    const otherContributors = contributors.filter(
      ({ position }) => position !== "Researcher"
    );

    setResearchers(researchers);
    setOtherContributors(otherContributors);
  }, [contributors]);

  return (
    <>
      <StyledH2>Our team</StyledH2>

      <ContributorsFlexBox>
        {researchers.map((contributor) => (
          <ContributorCard contributor={contributor} />
        ))}
      </ContributorsFlexBox>

      <ContributorsFlexBox>
        {otherContributors.map((contributor) => (
          <ContributorCard contributor={contributor} />
        ))}
      </ContributorsFlexBox>
    </>
  );
}
