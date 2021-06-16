import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box, Divider, Grid, Typography } from "@material-ui/core";

import PageTemplate from "../../components/PageTemplate";
import CardDescription from "../../components/CardDescription";

import tasksData from "./tasksData.json";

import { Container } from "./styles";

const benchmarks = [
  {
    title: "ImageNet",
    bestModel: "Multi Scale Spatial Attention",
    paper:
      "Semantic Segmentation With Multi Scale Spatial Attention For Self Driving Cars",
    BLEU: 83.69,
    hardwareBurden: "10²²",
    publicationDate: "Aug./2021",
  },
  {
    title: "ImageNet",
    bestModel: "Multi Scale Spatial Attention",
    paper:
      "Semantic Segmentation With Multi Scale Spatial Attention For Self Driving Cars",
    BLEU: 83.69,
    hardwareBurden: "10²²",
    publicationDate: "Aug./2021",
  },
];

export default function Task() {
  const router = useRouter();

  const [taskId, setTaskId] = useState("");
  const [isPageLoading, setPageIsLoading] = useState(true);

  const [task, setTask] = useState({});

  useEffect(() => {
    if (!router.isReady) return;

    const { taskId } = router.query;
    const isTaskIdCorrect = tasksData.hasOwnProperty(taskId);

    if (isTaskIdCorrect) {
      setTaskId(taskId);
      setTask(tasksData[taskId]);

      setPageIsLoading(false);
    } else {
      router.push("/tasks");
    }
  }, [router.isReady]);

  return (
    <PageTemplate>
      <Container>
        {isPageLoading ? (
          <span>Page is loading.</span>
        ) : (
          <>
            <CardDescription
              icon={task.icon}
              title={task.title}
              description={task.description}
            />

            {/* Benchmarks */}
            {benchmarks.length > 0 && (
              <>
                <Typography variant="h4">Benchmarks</Typography>

                <Grid container spacing={2}>
                  {benchmarks.map((benchmark, index) => (
                    <Grid item xs={12} key={index}>
                      <Box boxShadow={1} borderRadius={10} px={3} py={1}>
                        <Typography variant="h5">{benchmark.title}</Typography>

                        <Divider />

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} lg={2}>
                            <Typography>Best model</Typography>

                            <Typography>{benchmark.bestModel}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} lg={4}>
                            <Typography>Paper</Typography>

                            <Typography>{benchmark.paper}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={4} lg={2}>
                            <Typography>BLEU</Typography>

                            <Typography>{benchmark.BLEU}%</Typography>
                          </Grid>
                          <Grid item xs={12} sm={4} lg={2}>
                            <Typography>Hardware Burden</Typography>

                            <Typography>{benchmark.hardwareBurden}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={4} lg={2}>
                            <Typography>Publication date</Typography>

                            <Typography>{benchmark.publicationDate}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </>
        )}
      </Container>
    </PageTemplate>
  );
}
