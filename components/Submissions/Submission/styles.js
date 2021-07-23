import styled from "styled-components";
import { Chip } from "@material-ui/core";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 0px 0px;
  flex-direction: column;
  border-radius: 16px;
`;

export const Info = styled.p`
  font-size: 10px;
  text-align: right;
  align-self: ${({ right }) => right ? 'right' : 'left'};
`

export const StyledChip = styled(Chip).attrs({
  // size: "small",
})`
  max-width: 100%;
  margin-right: 10px !important;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const SmallDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`



