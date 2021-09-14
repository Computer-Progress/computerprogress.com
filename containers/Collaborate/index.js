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

import {
  StyledContainer,
  StyledFlexboxSection,
  StyledBox,
  StyledTypographyBody1,
  StyledListIcon,
  StyledButton,
  StyledBoxTitle,
  StyledTypographyBodyTitle,
  StyledTypographyBody2,
  StyledChip,
  StyledTypographyCard,
  StyledContainerJoinUs,
  StyledListItemIcon
} from "./styles";

export default function Collaborate() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate ignoreContainer>
        <StyledContainer>
          <StyledFlexboxSection>
            <StyledBoxTitle mb={8}>
              <StyledTypographyBodyTitle variant="h1" align="center">
                Learn how to report computing power
              </StyledTypographyBodyTitle>
            </StyledBoxTitle>

            <StyledBox>
              <StyledTypographyBody1>
                Two are the most usual ways used to report the computational
                burden in Deep Learning:
              </StyledTypographyBody1>
            </StyledBox>

            <StyledBox>
              <Typography variant="h2">1) Computations per network pass</Typography>
            </StyledBox>

            <StyledBox>
              <StyledTypographyBody1>
                Computations (or operations) per network passs the number of floating-point 
                operations required for a single pass in the network, also measurable using
                multiply-adds. 
              </StyledTypographyBody1>
            </StyledBox>

            <StyledBox>
              <StyledTypographyBody2>
                To report this data, you can either use:
              </StyledTypographyBody2>

              <List>
                <ListItem>
                  <StyledListItemIcon>
                    <StyledListIcon />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        <StyledChip label="Flops"/>    or   {"  "}
                        <StyledChip label="Multiply-adds"/>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </StyledBox>

            <StyledBox>
              <Typography variant="h2">2) Hardware burden</Typography>
            </StyledBox>

            <StyledBox>
              <StyledTypographyBody1>
                Hardware burden is the computational capability of the hardware used to train a
                model. It depends on the model training time and the computation of the hardware
                used to train the model.
              </StyledTypographyBody1>
            </StyledBox>

            <StyledBox>
              <StyledTypographyBody2>
                To report this data, you will need:
              </StyledTypographyBody2>

              <List>
                <ListItem>
                  <StyledListItemIcon>
                    <StyledListIcon />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={<StyledChip label="Hardware used (e.g TPU, GPU and/or CPU)"/>}
                  />
                </ListItem>

                <ListItem>
                  <StyledListItemIcon>
                    <StyledListIcon />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={<StyledChip label="Number of each hardware component used"/>}
                  />
                </ListItem>

                <ListItem>
                  <StyledListItemIcon>
                    <StyledListIcon />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={<StyledChip label="Training time"/>}
                  />
                </ListItem>
              </List>
            </StyledBox>
          </StyledFlexboxSection>
        </StyledContainer>

        <Box style={{ background: "#f9f9fe" }}>
          <StyledContainer>
            <StyledFlexboxSection>
              <Box mb={8}>
                <StyledTypographyCard variant="h1" align="center">
                  Why to understand the progress of computing?!
                </StyledTypographyCard>
              </Box>

              <StyledBox>
                <CollaborateImportance />
              </StyledBox>
            </StyledFlexboxSection>
          </StyledContainer>
        </Box>

        <StyledContainerJoinUs>
          <StyledFlexboxSection>

            <StyledBox>
              <Typography variant="h2" align="center">
                Join our community!
              </Typography>
            </StyledBox>

            <StyledBox>
              <Typography variant="h3" align="center">
                Start contributing to the progress of computing right now!
              </Typography>
            </StyledBox>

            <StyledBox display="flex" justifyContent="center">
              <a href="/submit-paper">
                <StyledButton>Submit paper</StyledButton>
              </a>
            </StyledBox>
          </StyledFlexboxSection>
        </StyledContainerJoinUs>

        <Box style={{ background: "#f9f9fe" }}>
          <StyledContainer>
            <StyledFlexboxSection>
              <StyledBox>
                <Typography variant="h2" align="center">
                  Any questions?
                </Typography>
              </StyledBox>

              <StyledBox>
                <Typography align="center">
                  Don’t hesitate to contact our team:{" "}
                  <strong>
                    <a href="mailto:hello@computerprogress.org">
                      hello@computerprogress.org
                    </a>
                  </strong>
                  .
                </Typography>
              </StyledBox>
            </StyledFlexboxSection>
          </StyledContainer>
        </Box>
      </PageTemplate>
    </ThemeProvider>
  );
}

