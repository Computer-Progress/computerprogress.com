import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 15px;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in !important;
  &:hover {
    opacity: 0.55;
  }
`;

export const Separator = styled.div`
  height: 1px;
  width: 100%;
  margin-top: 5px;
  background-color: #9E1FFF;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 5px;
  h3 {
    font-family: 'Montserrat';
    font-weight: 500;
    margin: 0 0 0 20px;
    padding-top: 0;
    flex: 1;
    text-align: center;
  }
`;

export const Image = styled.img`
  width: 50px;
`;


