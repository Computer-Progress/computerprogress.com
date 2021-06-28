import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { StyledBox, FlexBox, FlexItem, StyledDivider } from "./style";

export default function CardBenchmark({ taskId, benchmark }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Link href={{ pathname: `/tasks/${taskId}/${benchmark.dataset_identifier}` }}>
      <a>
        <StyledBox px={3} py={1}>
          <h3>{benchmark.dataset_name}</h3>

          {isLargeScreen && (
            <>
              <StyledDivider />

              <FlexBox>
                <FlexItem>
                  <p>Best model</p>

                  <h4>{benchmark.sota_name}</h4>
                </FlexItem>
                <FlexItem pl={2}>
                  <p>Paper</p>

                  <h4>{benchmark.sota_paper_link}</h4>
                </FlexItem>
                <FlexItem pl={2} textAlign="center">
                  <p>{benchmark.accuracy_name}</p>

                  <h4>{benchmark.sota_accuracy_value}%</h4>
                </FlexItem>
                <FlexItem pl={2} textAlign="right">
                  <p>Hardware Burden</p>

                  <h4>{benchmark.sota_hardware_burden}</h4>
                </FlexItem>
                <FlexItem pl={2} textAlign="right">
                  <p>Publication date</p>

                  <h4>{benchmark.publicationDate}</h4>
                </FlexItem>
              </FlexBox>
            </>
          )}
        </StyledBox>
      </a>
    </Link>
  );
}
