import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../Button";

export const Wrapper = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  padding: 0px;
  border-radius: 8px 8px 0 0;
  -webkit-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.15);
  margin: 10px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  border-bottom: ${({ selected }) =>
    selected ? `2px solid ${theme.colors.secondary}` : "0px"};
`;

export const Item = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

export const Separator = styled.div`
  height: 30px;
  width: 1px;
  background-color: ${theme.colors.grey};
`;

export const StyledButton = styled(Button)`
  padding: 0px 0px 0px 0px;
  color: black;
`;
