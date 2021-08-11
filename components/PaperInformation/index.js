import { useEffect, useState } from "react";

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
import { Controller } from "react-hook-form";

export default function PaperInformation(props) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [paper, setPaper] = useState({
    title: "",
    link: "",
    code_link: "",
    publication_date: null,
    authors: [],
  });
  const [newAuthor, setNewAuthor] = useState("");

  useEffect(() => {
    props.handlePaperInformationChange(paper);
  }, [paper]);

  function handleChange({ target: { name, value } }) {
    setPaper({ ...paper, [name]: value });
  }

  function addAuthor(event) {
    event.preventDefault();

    if (!newAuthor) {
      return;
    }

    const newPaper = { ...paper };
    newPaper["authors"].push(newAuthor);

    setPaper(newPaper);
    setNewAuthor("");
  }

  function removeAuthor(authorIndex) {
    const newPaper = { ...paper };
    newPaper.authors.splice(authorIndex, 1);

    setPaper(newPaper);
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
                  {...props.register("title", { required: true })}
                  error={!!props.errors["title"]}
                  helperText={!!props.errors["title"] && "Title is required"}
                  name="title"
                  label="Title"
                  value={paper.title}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <StyledTextField
                  {...props.register("link", { required: true })}
                  error={!!props.errors["link"]}
                  helperText={!!props.errors["link"] && "Link is required"}
                  name="link"
                  label="Link"
                  value={paper.link}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <StyledTextField
                  {...props.register("code_link", { required: false })}
                  error={!!props.errors["code_link"]}
                  helperText={
                    !!props.errors["code_link"] && "Code link is required"
                  }
                  name="code_link"
                  label="Code link"
                  value={paper.code_link}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <KeyboardDatePicker
                  name="publication_date"
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Release date"
                  format="MM/dd/yyyy"
                  value={paper.publication_date}
                  InputAdornmentProps={{ position: "end" }}
                  onChange={(date) =>
                    setPaper({
                      ...paper,
                      publication_date: date.toISOString().split('T')[0],
                    })
                  }
                  invalidDateMessage="Invalid date"
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
                    {...props.register(`Authors${props.index}`, { required: !paper.authors.length })}
                    error={!!props.errors[`Authors${props.index}`]}
                    helperText={!!props.errors[`Authors${props.index}`] && "At least one author is required"}
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
                          <IconButton onClick={addAuthor} size="small">
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={newAuthor}
                    onChange={(event) => setNewAuthor(event.target.value)}
                  />
                </form>

                {paper.authors.map((author, index) => (
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
