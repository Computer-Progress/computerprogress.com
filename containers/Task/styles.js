import styled from "styled-components";

export const Container = styled.div`
  width: 70%;
  margin: 0 auto;

  @media (max-width: 600px) {
    width: 85%;
  }
    h2 {
    font-family: 'Montserrat';
    font-weight: 500;
    margin: 50px 0;
    padding-top: 0;
    flex: 1;
    text-align: center;
  }
`;
