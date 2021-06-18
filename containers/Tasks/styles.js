import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  h1 {
    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 24px;
    display: flex;
    margin: 50px 0px;
    }
`;

export const ItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 0 auto;
  grid-gap: 50px 100px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 12px;
`;