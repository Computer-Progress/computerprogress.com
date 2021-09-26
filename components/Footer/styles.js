import styled from "styled-components";
import theme from "../../styles/theme";
import Mit from "../../public/mit.svg";

export const HomeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: linear-gradient(268.88deg, rgba(255, 255, 255, 0.1) -7.38%, #9E1FFF 104.79%), #4e33ff;
  font-size: .8rem;
  width: 100%;
  padding: 0 3.75%;
  margin-top: 50px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding:0 3.75%;
  padding-top: 100px;
  max-width: 1920px;
  margin: 0 auto;
`;

export const Logos = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  div {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  div div {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 120px;
  }

  div p {
    color: ${theme.colors.white};
    text-align: center;
  }


  div h3 {
    font-weight: bold;
    margin-bottom: 0;
    padding-bottom: 0;
    text-align: center;
    color: ${theme.colors.white};
  }

  @media only screen and (max-width: 1250px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    > div:last-child {
      grid-column: span 3;
      justify-content: flex-end;
      margin-top: 20px;
      svg {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
    > div:last-child {
      grid-column: span 1;
      justify-content: flex-end;
      margin-top: 0px;
    }
  }

  @media only screen and (max-width: 380px) {
    grid-template-columns: 1fr;
  }


`;

export const Text = styled.p`
  display: flex;
  justify-content: center !important;
  font-weight: 500px;
  font-size: 17px;
  color: ${theme.colors.white};
`

export const Copyright = styled.p`
  display: flex;
  justify-content: flex-end;
  color: ${theme.colors.white};
  text-align: right;
  font-size: 15px;
`

export const SupportEmail = styled.p`
  display: flex;
  justify-content: center !important;
  color: ${theme.colors.white};
  font-size: 15px;
`