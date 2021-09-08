import { StyledImage } from "./style";

export default function ContributorImage({ imageName }) {
  return <StyledImage src={`/team/${imageName}`} />;
}
