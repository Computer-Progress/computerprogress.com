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
    color || primary ? "#8f00ff" : theme.colors.white};
  ${({cta}) => cta && `
  background: #2000E5;
  color: white;
  `}
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;
