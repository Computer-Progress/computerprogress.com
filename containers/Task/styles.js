
import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 85%;
  }
  h2 {
    font-family: 'Montserrat';
    font-weight: 500;
    margin: 100px 0 50px 0;
    padding-top: 0;
    flex: 1;
  }
  h4 {
    font-family: 'Montserrat';
    font-weight: 10;
    font-size: 12px;
  }
  p {
    font-family: 'Montserrat';
    font-weight: 500;
  }
`;