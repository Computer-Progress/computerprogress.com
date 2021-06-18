import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../../components/Button"


export const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
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

  @media only screen and (max-width: 1235px) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: 1015px) {
    > .chart{
      flex-direction: column;
    }
  }
`;

export const AllTasksButton = styled(Button)`
  color: #9E1FFF !important;
`;

export const Header = styled.header`
position: relative;
`