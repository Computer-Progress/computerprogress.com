import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Typography from "@material-ui/core/Typography";
import { Box, Paper } from "@material-ui/core";

import {
  PlusCircle as PlusCircleIcon,
  MinusCircle as MinusCircleIcon,
  UserPlus as UserPlusIcon,
  UserMinus as UserMinusIcon,
  Edit3 as Edit3Icon,
} from "react-feather";

export default function TimelineItem({ item, disableConnector }) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot>
          <TimelineSeparatorIcon type={item.type} />
        </TimelineDot>

        {!disableConnector && <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="h3">
          João added “Gabriel Casado” to authors.
        </Typography>

        <Typography variant="h4">1 hour ago.</Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

function TimelineSeparatorIcon({ type }) {
  switch (type) {
    case "add":
      return <PlusCircleIcon color="purple" />;

    case "remove":
      return <MinusCircleIcon color="red" />;

    case "edit":
      return <Edit3Icon color="purple" />;

    case "add-author":
      return <UserPlusIcon color="purple" />;

    case "remove-author":
      return <UserMinusIcon color="red" />;

    default:
      return <PlusCircleIcon color="purple" />;
  }
}
