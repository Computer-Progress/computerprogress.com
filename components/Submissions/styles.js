import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const Separator = styled.div`
  height: 1px;
  width: 100%;
  margin-top: 5px;
  background-color: ${({ blue }) => blue ? '#9E1FFF' : theme.colors.grey};
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
  h3 {
    font-family: 'Montserrat';
    font-weight: 500;
    margin: 0 0 0 20px;
    padding-top: 0;
    flex: 1;
    text-align: center;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Image = styled.img`
  width: 50px;
`;

export const Input = styled(TextField).attrs({
  size: "small",
})`
  border-bottom-widht: 0px !important;

  &&:before {
    borderBottom: "none"
  }

  &&:after {
    borderBottom: "none"
  }
`



