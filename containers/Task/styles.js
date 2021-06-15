import styled from "styled-components";

export const Container = styled.div`
  width: 70%;
  margin: 0 auto;

  @media (max-width: 600px) {
    width: 85%;
  }
`;

export const SectionWrapper = styled.section`
  padding: 1.5rem 0;

  display: grid;
  grid-template-columns: 10rem 1fr;
  grid-gap: 1.5rem;

  align-items: center;

  * {
    margin: 0;
  }

  img {
    grid-row: 1 / span 2;

    height: auto;
    width: 100%;

    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  }

  h1 {
    font-size: 2.4rem;
  }

  @media (max-width: 991px) {
    grid-template-columns: 4.5rem 1fr;

    img {
      grid-row: 1;
      padding: 0.5rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    p {
      grid-column: 1 / span 2;
    }
  }
`;
