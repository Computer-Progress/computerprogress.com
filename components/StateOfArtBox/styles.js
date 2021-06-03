import styled from "styled-components";
import theme from "../../styles/theme";
import DefaultButton from "../../components/Button"
export const Wrapper = styled.div`
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: ${theme.colors.white};
`;

export const StateOfArt = styled.div`
  font-family: Montserrat;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #1a1515;
`;

export const Acurracy = styled.div`
  margin: 16px 64px 8px 16px;
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #1a1515;
`;

export const Percentage = styled.div`
  margin: 8px 106px 17px 105px;
  font-family: Montserrat;
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #1a1515;
`;

export const Line = styled.div`
  width: 100%;
  margin: 1.5rem auto;
  background-color: #c4c4c4;
  height: 1px;
`;

export const Block = styled.div`
  padding: 7px 10px;
  h4 {
    font-family: Montserrat;
    font-size: 36px;
    padding: 0px 0px 0px 0px;
    margin: 0px 0px 0px 0px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #1a1515;
  }
  p {
    font-family: Montserrat;
    font-size: 18px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #1a1515;
  }
`;

export const ModelBlock = styled.div`
  p {
    font-family: Montserrat;
    font-size: 18px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #1a1515;
  }
  h5 {
    flex: 1;
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    padding: 0px 0px 20px 0px;
    margin: 0px 0px 0px 0px;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #000000;
  }
`;

export const Button = styled(DefaultButton)`
  padding: 0px 0px 0px 0px;
  margin: 0px 0px 0px 0px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
