import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { StyledBox, FlexBox, FlexItem, StyledDivider } from "./style";

export default function CardBenchmark(props) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Link href={{ pathname: `/tasks/${props.taskId}/${props.benchmark.id}` }}>
      <a>
        <StyledBox px={3} py={1}>
          <h3>{props.benchmark.title}</h3>

          {isLargeScreen && (
            <>
              <StyledDivider />

              <FlexBox>
                <FlexItem>
                  <p>Best model</p>

                  <h4>{props.benchmark.bestModel}</h4>
                </FlexItem>
                <FlexItem pl={2}>
                  <p>Paper</p>

                  <h4>{props.benchmark.paper}</h4>
                </FlexItem>
                <FlexItem pl={2} textAlign="center">
                  <p>BLEU</p>

                  <h4>{props.benchmark.BLEU}%</h4>
                </FlexItem>
                <FlexItem pl={2} textAlign="right">
                  <p>Hardware Burden</p>

                  <h4>{props.benchmark.hardwareBurden}</h4>
                </FlexItem>
                <FlexItem pl={2} textAlign="right">
                  <p>Publication date</p>

                  <h4>{props.benchmark.publicationDate}</h4>
                </FlexItem>
              </FlexBox>
            </>
          )}
        </StyledBox>
      </a>
    </Link>
  );
}
