import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.white};
  font-size: 2rem;
  width: 100%;
  padding: 0 3.75%;
  max-width: 1920px;
  margin: 0 auto;
  h4 {
    grid-column: span 2;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    margin: 0;
    align-items: center;
  }
  > .viewAll{
    display: flex;
    justify-content: center;
    align-items: center;
    button{

      font-weight: 500;
  font-size: 16px;
    }
  }
  > .chart{
    width: 100%;
    display: flex;
  }
`;



export const Title = styled.h3`
  color: ${theme.colors.secondary};
  font-weight: normal;
`