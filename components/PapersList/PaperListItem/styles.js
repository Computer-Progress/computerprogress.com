import styled from "styled-components";
import theme from "../../../styles/theme";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr ${({ accuracy_list }) => accuracy_list.map(item => '1fr ')} 1fr 1fr;
  width: 100%;
  padding: 15px 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${theme.colors.grey};
`;

export const Text = styled.p`
  font-weight: normal;
  font-size: ${({title}) => title ? '14px' : '12px'};
  color: ${({link}) => link ? theme.colors.secondary : theme.colors.black};
  text-align: ${({right}) => right ? 'right' : 'left'}
`;