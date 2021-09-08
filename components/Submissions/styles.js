import styled from "styled-components";
import { TextField, Select } from "@material-ui/core";
import theme from "../../styles/theme";
import * as Icon from "react-feather";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const Separator = styled.div`
  height: 1px;
  width: 100%;
  margin-top: 5px;
  background-color: ${({ blue }) => (blue ? "#9E1FFF" : theme.colors.grey)};
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Image = styled.img`
  width: 50px;
`;

export const SearchIcon = styled(Icon.Search)`
  margin: 12px 10px 0px 0px;
`;

export const Input = styled(TextField).attrs({
  size: "small",
  fullWidth: true,
  InputProps: { disableUnderline: true },
})``;

export const Selector = styled(Select).attrs({
  disableUnderline: true,
})`
  min-width: 150px;
  margin-top: 12px;
`;

export const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
