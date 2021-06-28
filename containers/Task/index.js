import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import PageTemplate from "../../components/PageTemplate";
import DescriptionCard from "../../components/DescriptionCard";
import CardBenchmark from "../../components/CardBenchmark";

import tasksData from "./tasksData.json";

import { Container } from "./styles";

export default function Task({ benchmarks }) {
  const router = useRouter();

  const [taskId, setTaskId] = useState("");
  const [isPageLoading, setPageIsLoading] = useState(true);

  const [task, setTask] = useState({});

  useEffect(() => {
    console.log('benchmarks', benchmarks);
    
    if (!router.isReady) return;

    const { taskId } = router.query;
    const isTaskIdCorrect = tasksData.hasOwnProperty(taskId);

    if (isTaskIdCorrect) {
      setTaskId(taskId);
      setTask(benchmarks);

      setPageIsLoading(false);
    } else {
      router.push("/tasks");
    }
  }, [router.isReady]);

  return (
    <PageTemplate>
      <Container>
        {!isPageLoading && (
          <>
            <DescriptionCard
              icon={task.task_image}
              title={task.task_name}
              description={task.task_description}
              isH1
              imageBorder
            />

            {/* Benchmarks */}
            {task?.datasets?.length > 0 && (
              <>
                <h2>Benchmarks</h2>
                <Grid container spacing={2}>
                  {task.datasets.map((benchmark, index) => (
                    <Grid item xs={12} key={index}>
                      <CardBenchmark benchmark={benchmark} taskId={taskId} />
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
