import { useEffect, useState, useRef } from "react";
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
import useApi from '../../services/useApi'
import { MuiTheme } from "../../styles/theme";
import { getRelativeTime } from '../../utils';
import { useSelector } from 'react-redux'
import Pagination from '@material-ui/lab/Pagination';
import {PaginationBox} from './styles';

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
  { value: "approved", title: "Approved" },
  { value: "declined", title: "Declined" },
];

const status = {
  "pending": {
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

export default function PaperList({ isReviewer }) {
  const api = useApi()
  const userState = useSelector((state) => state.UserReducer);
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("sm"));

  const [filters, setFilters] = useState({
    query: "",
    status: "all",
  });
  const [submissions, setSubmissions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const timeout = useRef(null)

  useEffect(() => {
    getSubmissions();
  }, [filters, page]);

  async function getSubmissions() {
    // fetch
    try {
      const response = await api.get(`submissions?${
        !isReviewer ? `owner_id=${userState?.id}&`
        : ''}limit=20&skip=${page - 1}&q=${search}${filters.status !== 'all' ? `&status=${filters.status}` : ''}`)

      // console.log(response.data)
      setSubmissions(response.data?.items);
      setTotal(Math.ceil(response.data.total / 20));
    } catch (error) {
      
    }
  }

  function handleFiltersChange(event) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  function handleSearchValueChange(event) {
    setSearch(event.target.value);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      getSubmissions()
    }, 500);
  }

  return (
    <>
    <Card style={{ borderRadius: "16px" }}>
      <Box p={3}>
        <Grid container>
          {/* Search */}
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={9}>
                <TextField
                  name="query"
                  value={search}
                  onChange={handleSearchValueChange}
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
          {!submissions.length ? (
            <PaginationBox>
              <Typography variant="h6">No submissions found</Typography>
            </PaginationBox>
          ) : null}
          {submissions.map((submission) => (
            <a href={`/review-paper/${submission.id}`}>
              <Grid item xs={12} container key={submission.id}>
                <Grid item xs={12}>
                  <Typography variant="h6">{submission?.data?.title}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" flexWrap="wrap" py={3}>
                    {submission?.data?.models?.map((model) => (
                      <Box mr={1} mb={1} key={model.task}>
                        <Chip label={model.task} />
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
                        Submitted by {submission.owner?.first_name} {submission.owner?.last_name}
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
                      Last updated on {getRelativeTime(new Date(submission.updated_at))}.{" "}
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
            </a>
          ))}
        </Grid>
      </Box>
    </Card>
    <PaginationBox>
      <Pagination count={total} page={page} onChange={(event, value) => setPage(value)} color="primary" />
    </PaginationBox>
    </>
  );
}
