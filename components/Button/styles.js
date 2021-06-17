import styled from "styled-components";
import theme from "../../styles/theme";
import { Button as MaterialButton } from '@material-ui/core';

export const Button = styled(MaterialButton).attrs(({ variant, primary }) => ({
  variant: variant || primary ? 'default' : 'contained',
  disableElevation: true,
}))`
  border-radius: 100px !important;
  cursor: pointer;
  background: ${({ primary, background, contained }) =>
    background || contained ? 'linear-gradient(268.88deg, rgba(255, 255, 255, 0.1) -7.38%, #9E1FFF 104.79%), #6047FF' : primary ? theme.colors.white : "transparent"} !important;
  color: ${({ primary, color }) =>
    color || primary ? theme.colors.secondary : theme.colors.white} !important;
  ${({cta}) => cta && `
  background: linear-gradient(268.88deg, rgba(255, 255, 255, 0.1) -7.38%, #9E1FFF 104.79%), #6047FF;
  color: white;
  `}
  transition: all 0.3s ease-in-out !important;
  &:hover {
    opacity: 0.8;
  }
`;
