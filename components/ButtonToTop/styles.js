import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../../components/Button"
import UpIcon from '@material-ui/icons/ExpandLess';

export const BackToTop = styled(Button)`
  border-radius: 50px;
  display: none;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  background: ${theme.colors.primary};
  padding: 0px 0px;
  width: 60px;
  height: 60px;
`;

export const BackToTopIcon = styled(UpIcon).attrs({
  style: { width: 40, height: 40},
})``;