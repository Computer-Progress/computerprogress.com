import { useState } from "react";

import {
  Grid,
  Typography,
  TextField,
  Divider as MuiDivider,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from "@material-ui/core";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import Divider from "../Divider";

import { StyledCard, StyledBoxContainer, StyledTextField } from "./styles";

export default function SubmitPaperInfo() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  // const [selectedDate, handleDateChange] = useState(new Date());

  const [paperInfo, setPaperInfo] = useState({
    title: "",
    link: "",
    codeLink: "",
    releaseDate: null,
  });
  const [newAuthor, setNewAuthor] = useState("");
  const [authorsList, setAuthorsList] = useState([]);

  function handlePaperInfoChange({ target }) {
    let newPaperInfo = { ...paperInfo };
    newPaperInfo[target.name] = target.value;

    setPaperInfo(newPaperInfo);
  }

  function addAuthor(event) {
    event.preventDefault();

    if (newAuthor) {
      setAuthorsList([...authorsList, newAuthor]);
    }
  }

  function removeAuthor(authorIndex) {
    let newAuthors = [...authorsList];
    newAuthors.splice(authorIndex, 1);
    setAuthorsList(newAuthors);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledCard>
        <StyledBoxContainer>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={6}
              container
              spacing={3}
              alignContent="flex-start"
            >
              <Grid item xs={12}>
                <Typography variant="h3">Paper information</Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  name="title"
                  label="Title"
                  value={paperInfo.title}
                  variant="outlined"
                  onChange={handlePaperInfoChange}
                />
              </Grid>

              <Grid item xs={6}>
                <StyledTextField
                  name="link"
                  label="Link"
                  value={paperInfo.link}
                  variant="outlined"
                  onChange={handlePaperInfoChange}
                />
              </Grid>

              <Grid item xs={6}>
                <StyledTextField
                  name="codeLink"
                  label="Code link"
                  value={paperInfo.codeLink}
                  variant="outlined"
                  onChange={handlePaperInfoChange}
                />
              </Grid>

              <Grid item xs={6}>
                {/* <StyledTextField
                  name="releaseDate"
                  label="Release date"
                  value={paperInfo.releaseDate}
                  variant="outlined"
                  onChange={handlePaperInfoChange}
                /> */}

                <KeyboardDatePicker
                  name="releaseDate"
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Release date"
                  format="MM/dd/yyyy"
                  value={paperInfo.releaseDate}
                  InputAdornmentProps={{ position: "end" }}
                  onChange={(date) =>
                    setPaperInfo({ ...paperInfo, releaseDate: date })
                  }
                />
              </Grid>
            </Grid>
            {isLargeScreen && (
              <Grid item>
                <MuiDivider orientation="vertical" />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              md={6}
              container
              spacing={3}
              alignContent="flex-start"
            >
              <Grid item xs={12}>
                <Typography variant="h3">Authors</Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <form onSubmit={addAuthor}>
                  <TextField
                    placeholder="Author name"
                    margin="normal"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonAddOutlinedIcon size="small" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small">
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={(event) => setNewAuthor(event.target.value)}
                  />
                </form>

                {authorsList.map((author, index) => (
                  <Grid item key={index}>
                    <Box display="flex">
                      <Box my={1} display="inline-block" flexGrow={1}>
                        <Typography variant="body2">{author}</Typography>
                      </Box>

                      <Box display="inline-block">
                        <IconButton
                          size="small"
                          onClick={() => removeAuthor(index)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <MuiDivider />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </StyledBoxContainer>
      </StyledCard>
    </MuiPickersUtilsProvider>
  );
}
