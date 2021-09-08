import ContributorImage from "../ContributorImage";

import {
  ContributorBox,
  StyledName,
  StyledPosition,
} from "./style";

export default function ContributorCard({ contributor }) {
  return (
    <ContributorBox border={1}>
      <ContributorImage imageName={contributor.imageName} />

      <StyledName>{contributor.name}</StyledName>

      <StyledPosition>{contributor.workPlace}</StyledPosition>

      <StyledPosition>{contributor.position}</StyledPosition>
    </ContributorBox>
  );
}
