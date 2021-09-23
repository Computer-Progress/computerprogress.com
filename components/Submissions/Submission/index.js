import {
  Wrapper,
  Info,
  StyledChip,
  Details,
  SmallDetails,
  UpdateDetails,
} from "./styles";

import * as Icon from "react-feather";


const Submission = ({ paper }) => {
  const status = {
    0: {
      text: "Review pending",
      icon: <Icon.Clock size={15} />,
    },
    1: {
      text: "Need information",
      icon: <Icon.AlertCircle size={15} />,
    },
    2: {
      text: "Declined",
      icon: <Icon.XCircle size={15} />,
    },
    3: {
      text: "Accepted",
      icon: <Icon.CheckCircle size={15} />,
    },
  };
  return (
    <Wrapper>
      <h2>{paper.name}</h2>
      <Details>
        {paper.models.map((item) => (
          <StyledChip label={item} />
        ))}
      </Details>
      {paper.submitted_by ? (
        <SmallDetails>
          <Info>Submitted by: {paper.submitted_by}</Info>
          <SmallDetails></SmallDetails>
          <UpdateDetails>
            <Info right>
              Last update {paper.last_update}. {status[paper.status].text}
            </Info>
            {status[paper.status].icon}
          </UpdateDetails>
        </SmallDetails>
      ) : (
        <UpdateDetails>
          <Info right>
            Last update {paper.last_update}. {status[paper.status].text}
          </Info>
          {status[paper.status].icon}
        </UpdateDetails>
      )}
    </Wrapper>
  );
};

export default Submission;
