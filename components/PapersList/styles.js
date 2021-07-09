import styled from "styled-components";
import theme from "../../styles/theme";

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 20px;
  margin: 20px 0px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  overflow: auto;
  overflow-x: auto;
  width: 100%;
`;