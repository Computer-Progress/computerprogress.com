import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../Button";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 15px;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${theme.colors.primary};
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 5px;
  h3 {
    margin: 0 0 0 1px;
    padding-top: 0;
    flex: 1;
    text-align: center;
  }
`;


