import { StyledBox, FlexBox, FlexItem, StyledDivider } from "./style";

export default function CardBenchmark(props) {
  return (
    <StyledBox boxShadow={1} borderRadius={10} px={3} py={1}>
      <h3>{props.benchmark.title}</h3>

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
    </StyledBox>
  );
}
