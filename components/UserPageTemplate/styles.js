import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../../components/Button"
import { Grid, Box } from "@material-ui/core";


export const GridItem = styled(Grid).attrs({
  item: true,
})`
  order: ${({ $order }) => $order};
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

export const MainGrid = styled(Grid).attrs({
  container: true,
  spacing: 3
})`
  margin-bottom: 50px !important;
`


export const AllTasksButton = styled(Button)`
  color: #9E1FFF !important;
`;

export const Header = styled.header`
position: relative;
`

export const Route = styled.a`
`

export const Path = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ selected }) => selected ? theme.colors.primary : theme.colors.black};
  font-weight: ${({ selected }) => selected ? 'bold' : 'normal'};
  font-size: 20px;

  p {
    margin: 0px 0px 0px 20px;
    padding: 0px 0px 0px 0px;
  }
`

export const Menu = styled(Box).attrs({
  display: "flex",
  flex: 1,
})`
  border-right: ${({ inside, isMobile }) => inside && !isMobile ? `1px solid ${theme.colors.grey}` : '0px'};
  margin-right: ${({ inside }) => inside ? `30px` : '0px'};
  padding-bottom: ${({ inside, isMobile }) => inside && !isMobile ? '200px' : '0px'};

  h3 {
    margin-bottom: 30px;
    font-weight: 500;
  }

  a {
    padding: 20px;
  }
`