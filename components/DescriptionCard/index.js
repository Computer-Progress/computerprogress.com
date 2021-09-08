import { useMediaQuery, useTheme } from "@material-ui/core";
import { ContainerGrid, StyledTitle, ImageBox } from "./style";

export default function DescriptionCard({
  icon,
  title,
  description,
  isH1,
  imageBorder,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ContainerGrid $isMobile={isMobile} $imageBorder={imageBorder}>
      <ImageBox $imageBorder={imageBorder} $isMobile={isMobile}>
        <img src={`${icon}`} />
      </ImageBox>

      <StyledTitle>{isH1 ? <h1>{title}</h1> : <h2>{title}</h2>}</StyledTitle>

      <p dangerouslySetInnerHTML={{ __html: description }} />
    </ContainerGrid>
  );
}
