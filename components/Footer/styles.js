import styled from "styled-components";
import theme from "../../styles/theme";

export const HomeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  background: linear-gradient(268.88deg, rgba(255, 255, 255, 0.1) -7.38%, #9E1FFF 104.79%), #4e33ff;
  font-size: .8rem;
  width: 100%;
  padding: 0 3.75%;
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

  div {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  div p {
    padding-bottom: 0px;
    margin-bottom: 5px;
    color: ${theme.colors.white};
  }
`;

export const Text = styled.p`
  display: flex;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${theme.colors.white};
`

export const Copyright = styled.p`
  display: flex;
  justify-content: flex-end;
  color: ${theme.colors.white};
  text-align: right;
  font-size: 14px;
`