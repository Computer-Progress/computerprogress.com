import styled from "styled-components";
import theme from "../../styles/theme";
import DefaultButton from "../../components/Button"
import InfoIcon from '@material-ui/icons/Info';

export const Wrapper = styled.div`
  display: flex;
  padding: 32px;
  padding-bottom: 20px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  width: 300px !important;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    background-color: ${theme.colors.white};
  .blockWrapper {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
  justify-content: space-between;
  }

  @media only screen and (max-width: 1200px) {
    display: none
  }
`;

export const StateOfArt = styled.div`
  font-family: 'Montserrat';
  font-size: 22px;
  font-weight: 600 ;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #1a1515;
`;

export const Acurracy = styled.div`
  margin: 16px 64px 8px 16px;
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #1a1515;
`;

export const Percentage = styled.div`
  margin: 8px 106px 17px 105px;
  font-family: 'Montserrat';
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #1a1515;
`;

export const PurpleInfoIcon = styled(InfoIcon)`
color: #9E1FFF !important;
`;

export const HardwareBurdenTooltip = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Line = styled.div`
  width: 100%;
  margin: 0rem auto;
  background-color: #c4c4c4;
  height: 1px;
`;

export const Block = styled.div`
  h4 {
    font-family: 'Montserrat';
    font-size: 36px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    justify-content: center;
    color: #1a1515;
    span{
    font-size: 18px;
    bottom: 0;

    }
    sup{
    font-size: 28px;
      margin-bottom: 15px;
    }
  }
  p {
    font-family: 'Montserrat';
    font-size: 18px;
    font-weight: 500;
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
    font-family: 'Montserrat';
    font-size: 18px;
    font-weight: 500;
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
    font-weight: 700;
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
font-size: 16px;`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
