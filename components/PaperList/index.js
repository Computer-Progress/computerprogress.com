import { useEffect, useState } from "react";
import {
  Box,
  Card,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Input,
  MenuItem,
  Select,
  TextField,
  Divider,
  Typography,
  Chip,
  useMediaQuery,
} from "@material-ui/core";
import {
  Search as SearchIcon,
  User as UserIcon,
  Clock as ClockIcon,
  Info as InfoIcon,
  XCircle as XCircleIcon,
  CheckCircle as CheckCircleIcon,
} from "react-feather";
import { MuiTheme } from "../../styles/theme";

const mockedSubmissions = [
  {
    id: 0,
    title:
      "Segmentation Transformer: Object-Contextual Representations for Semantic Segmentation",
    tasks: ["Semantic Segmentation", "Panoptic Segmentation"],
    submitted_by: "João Egewarth",
    last_update: "2021-08-14",
    status: "review-pending",
    link: "string",
    code_link: "string",
  },
  {
    id: 1,
    title:
      "Segmentation Transformer: Object-Contextual Representations for Semantic Segmentation",
    tasks: ["Semantic Segmentation", "Panoptic Segmentation"],
    submitted_by: "João Egewarth",
    last_update: "2021-08-14",
    status: "need-information",
    link: "string",
    code_link: "string",
  },
  {
    id: 2,
    title:
      "Segmentation Transformer: Object-Contextual Representations for Semantic Segmentation",
    tasks: ["Semantic Segmentation", "Panoptic Segmentation"],
    submitted_by: "João Egewarth",
    last_update: "2021-08-14",
    status: "approved",
    link: "string",
    code_link: "string",
  },
  {
    id: 3,
    title:
      "Segmentation Transformer: Object-Contextual Representations for Semantic Segmentation",
    tasks: ["Semantic Segmentation", "Panoptic Segmentation"],
    submitted_by: "João Egewarth",
    last_update: "2021-08-14",
    status: "declined",
    link: "string",
    code_link: "string",
  },
];

const statusFilters = [
  { value: "all", title: "All status" },
  { value: "pending", title: "Pending" },
  { value: "reviewed", title: "Reviewed" },
];

const status = {
  "review-pending": {
    icon: <ClockIcon size={14} />,
    title: "Review pending",
  },
  "need-information": {
    icon: <InfoIcon size={14} />,
    title: "Need information",
  },
  approved: {
    icon: <CheckCircleIcon size={14} />,
    title: "Approved",
  },
  declined: {
    icon: <XCircleIcon size={14} />,
    title: "Declined",
  },
};

export default function PaperList() {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("sm"));

  const [filters, setFilters] = useState({
    query: "",
    status: "",
  });
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissions();
  }, []);

  function getSubmissions() {
    // fetch
    setSubmissions(mockedSubmissions);
  }

  function handleFiltersChange(event) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  return (
    <Card style={{ borderRadius: "16px" }}>
      <Box p={3}>
        <Grid container>
          {/* Search */}
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={9}>
                <TextField
                  name="query"
                  value={filters.query}
                  onChange={handleFiltersChange}
                  placeholder="Search"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <Select
                    name="status"
                    value={filters.status}
                    onChange={handleFiltersChange}
                    input={
                      <Input
                        style={{
                          textAlign: "right",
                          paddingRight: "5px",
                        }}
                      />
                    }
                    disableUnderline={true}
                  >
                    {statusFilters.map(({ value, title }) => (
                      <MenuItem value={value} key={value}>
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box pt={1} pb={2}>
                  <Divider />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Submissions list */}
          {submissions.map((submission) => (
            <Grid item xs={12} container key={submission.id}>
              <Grid item xs={12}>
                <Typography variant="h6">{submission.title}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" flexWrap="wrap" py={3}>
                  {submission.tasks.map((task) => (
                    <Box mr={1} mb={1} key={task}>
                      <Chip label={task} />
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={5} container>
                <Grid item container alignItems="center" spacing={1}>
                  <Grid item>
                    <Box display="flex">
                      <UserIcon size={14} />
                    </Box>
                  </Grid>

                  <Grid item>
                    <Typography variant="subtitle1">
                      Submitted by {submission.submitted_by}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                md={7}
                container
                alignItems="center"
                justifyContent={isMobile ? "flex-start" : "flex-end"}
                spacing={1}
              >
                <Grid item>
                  <Typography component="span" variant="subtitle1">
                    Last updated on {submission.last_update}.{" "}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography component="span" variant="subtitle1">
                    {status[submission.status].title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Box display="flex">{status[submission.status].icon}</Box>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Box pt={1} pb={2}>
                  <Divider />
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}
