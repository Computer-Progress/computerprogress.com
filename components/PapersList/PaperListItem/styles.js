import styled from "styled-components";
import theme from "../../../styles/theme";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(50px, 0.2fr) minmax(150px, 2fr) minmax(
      150px,
      2fr
    ) ${({ accuracy_list }) =>
      accuracy_list.map((item) => "minmax(100px, 1fr)")} ${({
      showOperations,
    }) => (showOperations ? "minmax(100px, 1fr)" : "")} minmax(100px, 1fr) minmax(
      50px,
      0.2fr
    );
  row-gap: 10px;
  width: 100%;
  padding: 15px 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
  a {
    display: flex;
    align-items: baseline;
  }
`;

export const Separator = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  width: 100%;
  background-color: ${theme.colors.grey};
`;

export const Text = styled.p`
  display: flex;
  align-items: center;
  font-weight: normal;
  word-wrap: break-word;
  padding: 0px 3px;
  font-size: ${({ title }) => (title ? "14px" : "12px")};
  color: ${({ link }) => (link ? theme.colors.secondary : theme.colors.black)};
  text-align: ${({ right }) => (right ? "right" : "left")};
  cursor: ${({ hover }) => (hover ? "pointer" : "auto")};
  ${({ center }) =>
    center &&
    `
    justify-content: center;
    text-align: center;
  `}
  a {
    display: flex;
    align-items: center;
  }
  sup {
    padding-bottom: 15px;
  }
`;
