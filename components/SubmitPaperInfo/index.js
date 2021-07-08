import {
  Grid,
  Typography,
  TextField,
  Divider,
  IconButton,
  Box,
  FormControl,
} from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import {
  StyledCard,
  StyledBoxContainer,
  StyledBoxItem,
  StyledTextField,
} from "./styles";
import { InputAdornment } from "@material-ui/core";
import { useState } from "react";

export default function SubmitPaperInfo() {
  const [paperInfo, setPaperInfo] = useState({
    title: "",
    link: "",
    codeLink: "",
    releaseDate: "",
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
    <StyledCard>
      <StyledBoxContainer>
        <Grid container spacing={3}>
          <Grid item xs={6} container spacing={1} alignContent="flex-start">
            <Grid item xs={12}>
              <Typography variant="h3">Paper</Typography>
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
              <StyledTextField
                name="releaseDate"
                label="Release date"
                value={paperInfo.releaseDate}
                variant="outlined"
                onChange={handlePaperInfoChange}
              />
            </Grid>
          </Grid>
          {/* <Grid item>
            <Divider orientation="vertical" />
          </Grid> */}

          <Grid item xs={6} container spacing={1} alignContent="flex-start">
            <Grid item xs={12}>
              <Typography variant="h3">Authors</Typography>
            </Grid>

            <Grid item xs={12}>
              <form onSubmit={addAuthor}>
                <StyledTextField
                  placeholder="Author name"
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

                  <Divider />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </StyledCard>
  );
}
