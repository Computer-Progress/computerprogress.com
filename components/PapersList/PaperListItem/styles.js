import styled from "styled-components";
import theme from "../../../styles/theme";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(50px, 1fr) minmax(100px, 2fr) minmax(150px, 2fr) ${({ accuracy_list }) => accuracy_list.map(item => 'minmax(100px, 1fr)')} minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
  width: 100%;
  padding: 15px 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
`;

export const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${theme.colors.grey};
`;

export const Text = styled.p`
  font-weight: normal;
  word-wrap:break-word;
  padding: 0px 3px;
  font-size: ${({title}) => title ? '14px' : '12px'};
  color: ${({link}) => link ? theme.colors.secondary : theme.colors.black};
  text-align: ${({right}) => right ? 'right' : 'left'}
`;