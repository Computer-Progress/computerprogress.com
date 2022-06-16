import { Grid, Typography, Box, Container } from "@material-ui/core";
import Image from 'next/image'

export default function Home({ tasks }) {
  return (
    <>
      <Box
        position={"fixed"}
        top={0}
        flex
        width={"100%"}
        justifyContent={"center"}
        paddingY={2}
        color={"white"}
        bgcolor={"#AA3248"}
        fontWeight={"bold"}
      >
        <Container>
        <Box display={"flex"} gridGap="10px" justifyContent="center">
          <Image
            src="/logo.svg"
            alt="Picture of the author"
            width={30}
            height={30}
          />
          <Typography style={{fontWeight:600}} variant="h2">Computer Progress</Typography>
          </Box>
        </Container>
      </Box>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh", backgroundColor: "#eee" }}
      >
        <Grid item >
          <Typography style={{color:"#373b45"}}   align="center" variant="h1">
            We are currently working on updates!
          </Typography>
          <Typography style={{color:"#373b45"}}  align="center" variant="h2">
            We will be back soon! Stay tuned!
          </Typography>
        </Grid>
        <Grid>
          <Image
            src="/futuretech.svg"
            alt="Picture of the author"
            width={250}
            height={250}
          />
        </Grid>
      </Grid>
      <Box
        position={"fixed"}
        paddingY={2}
        bottom={0}
        color={"white"}
        width={"100%"}
        bgcolor={"#AA3248"}
      >
        <Container>
          <Box display={"flex"} justifyContent="space-between">
            <Typography variant="h4">
              Need something?   hello@computerprogress.org
            </Typography>
            <Typography variant="h4">© 2022 Computer Progress</Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
