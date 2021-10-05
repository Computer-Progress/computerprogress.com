import styled from "styled-components";

export const StyledCircle = styled.circle`
    r: 4
`;

export const StyledRect = styled.rect`
    rx: 4
`;

export const MediumRect = styled(StyledRect).attrs({
    width: 48,
    height: 48,
})``
