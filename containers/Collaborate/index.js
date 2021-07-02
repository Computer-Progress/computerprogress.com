import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Typography,
  Box,
} from "@material-ui/core";

import PageTemplate from "../../components/PageTemplate";

import CollaborateImportance from "../../components/CollaborateImportance";
import CollaborateQuestion from "../../components/CollaborateQuestion";

import {
  StyledFlexboxSection,
  StyledBox,
  StyledTypographyBody1,
  StyledListIcon,
  StyledButton,
} from "./styles";

export default function Collaborate() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate>
        {/* Learn how to report computing power */}
        <StyledFlexboxSection>
          <Box mb={8}>
            <Typography variant="h1" align="center">
              Learn how to report computing power
            </Typography>
          </Box>

          <StyledBox>
            <StyledTypographyBody1>
              Two are the most usual ways used to report the computational
              burden of Deep Learning:
            </StyledTypographyBody1>
          </StyledBox>

          <StyledBox>
            <Typography variant="h2">Computation per network pass</Typography>
          </StyledBox>

          <StyledBox>
            <StyledTypographyBody1>
              The number of floating-point operations required for a single pass
              (i.e. weight adjustment), also measurable using multiply-adds, in
              a given deep learning model.
            </StyledTypographyBody1>
          </StyledBox>

          <StyledBox>
            <StyledTypographyBody1>
              To report this data, you can use either:
            </StyledTypographyBody1>

            <List>
              <ListItem>
                <ListItemIcon>
                  <StyledListIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Chip label="Gigaflops" /> or{" "}
                      <Chip label="Multiply-adds" />
                    </>
                  }
                />
              </ListItem>
            </List>
          </StyledBox>

          <StyledBox>
            <Typography variant="h2">Hardware burden</Typography>
          </StyledBox>

          <StyledBox>
            <StyledTypographyBody1>
              The computational capability of the hardware used to train the
              model, calculated as the number of processors multiplied by the
              computation rate and time.
            </StyledTypographyBody1>
          </StyledBox>

          <StyledBox>
            <StyledTypographyBody1>
              To report this data, you will need:
            </StyledTypographyBody1>

            <List>
              <ListItem>
                <ListItemIcon>
                  <StyledListIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<Chip label="TPU, GPU and CPU model" />}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StyledListIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<Chip label="Number of TPUs, GPUs and CPUs" />}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StyledListIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<Chip label="Training time in seconds" />}
                />
              </ListItem>
            </List>
          </StyledBox>
        </StyledFlexboxSection>

        {/* People talking about the importance of computing power */}
        <StyledFlexboxSection>
          <Box mb={8}>
            <Typography variant="h1" align="center">
              People talking about the importance of computing power
            </Typography>
          </Box>

          <StyledBox>
            <CollaborateImportance />
          </StyledBox>
        </StyledFlexboxSection>

        {/* Join us! */}
        <StyledFlexboxSection>
          {/* <CollaborateJoin /> */}

          <StyledBox>
            <Typography variant="h2" align="center">
              Join us!
            </Typography>
          </StyledBox>

          <StyledBox>
            <Typography variant="h3" align="center">
              Join our community and start contributing to the future of
              artificial intelligence right now!
            </Typography>
          </StyledBox>

          <StyledBox display="flex" justifyContent="center">
            <StyledButton>Submit paper</StyledButton>
          </StyledBox>
        </StyledFlexboxSection>

        <StyledFlexboxSection>
          <CollaborateQuestion />
        </StyledFlexboxSection>
      </PageTemplate>
    </ThemeProvider>
  );
}
