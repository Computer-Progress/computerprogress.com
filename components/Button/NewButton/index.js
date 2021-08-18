import { StyledButton, StyledBox, StyledCircularProgress } from "./styles";

export default function Button({ children, ...props }) {
  return (
    <StyledButton {...props}>
      <StyledBox>
        {props.loading ? <StyledCircularProgress /> : children}
      </StyledBox>
    </StyledButton>
  );
}
