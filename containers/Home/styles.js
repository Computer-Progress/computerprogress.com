import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr;
  grid-column-gap: 32px;
  grid-row-gap: 16px;
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

  @media only screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    > .chart{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  }
  
`;



export const Header = styled.header`
position: relative;
`