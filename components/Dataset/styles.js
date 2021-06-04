import styled from "styled-components";
import { Button } from "../Button/styles";

export const Wrapper = styled.div`
    flex: 1 1 20%;

max-width: 20%;
padding: 32px 24px;
border-radius: 16px  0 0 16px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  h4{
    font-family: 'Montserrat';
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 29px;
display: flex;
align-items: center;
text-align: center;
margin-bottom: 1.5rem;
  }
`;

export const Item = styled(Button)`
margin-bottom: 1rem;
font-family: 'Montserrat';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 20px;
display: flex;
align-items: center;
text-align: center;
color: #2000E5;
${({ selected }) => selected && `border: 1px solid #2000E5`}

`;