import styled from "styled-components";

export const ChartWrapper = styled.div`
  flex: 1 1 80%;
  width: 100%;
  border-radius: 0 16px 16px 0;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  padding: 32px;
  padding-bottom: 20px;

  @media only screen and (max-width: 1015px) {
    border-radius: 16px 16px 16px 16px;
  }
`;
