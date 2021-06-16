import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { GridContainer, GridItem, GridItemContainer, ImageBox } from "./styles";

export default function CardDescription(props) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <GridContainer>
      {isLargeScreen && (
        <GridItem $alignSelf="center" xs={3} sm={4} md={3} lg={2}>
          <ImageBox>
            <img src={`/${props.icon}`} />
          </ImageBox>
        </GridItem>
      )}

      <GridItemContainer md={9} lg={10}>
        <GridItem $alignSelf="end">
          <h1>{props.title}</h1>
        </GridItem>

        <GridItem>
          <p>{props.description}</p>
        </GridItem>
      </GridItemContainer>
    </GridContainer>
  );
}
