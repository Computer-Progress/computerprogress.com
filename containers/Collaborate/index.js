import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";
import { Copy as CopyIcon } from "react-feather";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Typography,
  Box,
  Tooltip
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
  StyledTypographyBodyTitle2,
  StyledTypographyBody2,
  StyledChip,
  StyledTypographyCard,
  StyledContainerJoinUs,
  StyledListItemIcon
} from "./styles";
import { useState } from "react";

export default function Collaborate() {
  const copyToClipboard = () => {
navigator.clipboard.writeText(`@article\{DBLP:journals/corr/abs-2007-05558,
  author    = {Neil C. Thompson and
              Kristjan H. Greenewald and
              Keeheon Lee and
              Gabriel F. Manso},
  title     = {The Computational Limits of Deep Learning},
  journal   = {CoRR},
  volume    = {abs/2007.05558},
  year      = {2020},
  url       = {https://arxiv.org/abs/2007.05558},
  eprinttype = {arXiv},
  eprint    = {2007.05558},
  timestamp = {Sat, 23 Jan 2021 01:12:47 +0100},
  biburl    = {https://dblp.org/rec/journals/corr/abs-2007-05558.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}`)
  .then(() => {
   setIsCopy(true)
  })
  };
  const [isCopy, setIsCopy] = useState(false)
  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate ignoreContainer>
        <StyledContainer>
          <StyledFlexboxSection>
            <StyledBoxTitle mb={8}>
              <StyledTypographyBodyTitle variant="h1" align="center">
                Reporting Data
              </StyledTypographyBodyTitle>
            </StyledBoxTitle>

            <StyledBox>
              <StyledTypographyBody1>
                All analyzes performed on our website were inspired and discussed in the paper <a href="https://arxiv.org/abs/2007.05558" target="_blank" style={{color: "#9E1FFF"}}>"The Computational Limits of Deep Learning"</a> (Thompson et al, 2020).
                If you use some of our resources, we kindly encourage you to cite us using the following reference:
              </StyledTypographyBody1>
            </StyledBox>
            
<div className='citation'>
  <Tooltip arrow title={isCopy? "Copied!" : "Copy"} onClose={()=>setIsCopy(false)}>
    <button onClick={()=>copyToClipboard()}><CopyIcon/></button>
  </Tooltip>
<pre>{
`@article\{DBLP:journals/corr/abs-2007-05558,
  author    = {Neil C. Thompson and
              Kristjan H. Greenewald and
              Keeheon Lee and
              Gabriel F. Manso},
  title     = {The Computational Limits of Deep Learning},
  journal   = {CoRR},
  volume    = {abs/2007.05558},
  year      = {2020},
  url       = {https://arxiv.org/abs/2007.05558},
  eprinttype = {arXiv},
  eprint    = {2007.05558},
  timestamp = {Sat, 23 Jan 2021 01:12:47 +0100},
  biburl    = {https://dblp.org/rec/journals/corr/abs-2007-05558.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}`}</pre>
</div>

            <StyledBox>
              <StyledTypographyBody1>
                If you also want to know a little more about the future of Deep Learning, you can also check out the paper <a href="https://spectrum.ieee.org/deep-learning-computational-cost" target="_blank" style={{color: "#9E1FFF"}}>"Deep Learning's Diminishing Returns"</a> (Thompson et al, 2021).
              </StyledTypographyBody1>
            </StyledBox>

            <StyledBoxTitle mb={8}>
              <StyledTypographyBodyTitle2 variant="h2" align="center">
                Estimating Computing Power in Deep Learning
              </StyledTypographyBodyTitle2>
            </StyledBoxTitle>
            
            <StyledBox>
              <StyledTypographyBody1>
                The ways we use to report computational burden in Deep Learning are:
              </StyledTypographyBody1>
            </StyledBox>
            

            <StyledBox>
              <Typography variant="h3">1) Computations per network pass</Typography>
            </StyledBox>

            <StyledBox>
              <StyledTypographyBody1>
                Computations (or operations) per network pass is the number of floating-point 
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
              <Typography variant="h3">2) Hardware burden</Typography>
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
                  People talking about this issue:
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
                Start contributing to the progress of Deep Learning right now!
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

