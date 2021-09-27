import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 15px;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in !important;
  &:hover {
    opacity: 0.55;
    transform: scale(1.04);
    cursor: pointer;
  }
  p {
    font-size: 15px;
    font-weight: 500;
    align-items: center;
    display: flex;
    margin-left: 50px;
    justify-content: center;
    margin-top: 30px;
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
    margin: 0 0 0 0;
    padding-top: 0;
    flex: 1;
    text-align: center;
  }
`;

export const Image = styled.img`
  width: 50px;
  margin: 10px 0;
`;


