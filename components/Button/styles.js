import styled from "styled-components";
import theme from "../../styles/theme";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 32px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  background: ${({ primary, background }) =>
    background || primary ? theme.colors.white : "transparent"};
  color: ${({ primary, color }) =>
    color || primary ? theme.colors.black : theme.colors.white};
  ${({cta}) => cta && `
  background: linear-gradient(268.88deg, rgba(255, 255, 255, 0.1) -7.38%, #9E1FFF 104.79%), #6047FF;
  color: white;
  `}
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;
