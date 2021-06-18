import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import PageTemplate from "../../components/PageTemplate";
import DescriptionCard from "../../components/DescriptionCard";
import CardBenchmark from "../../components/CardBenchmark";

import tasksData from "./tasksData.json";

import { StyledContainer } from "./styles";

export default function Task({ benchmarks }) {
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
      <StyledContainer>
        {!isPageLoading && (
          <>
            <DescriptionCard
              icon={task.icon}
              title={task.title}
              description={task.description}
              isH1
              imageBorder
            />

            {/* Benchmarks */}
            {benchmarks?.length > 0 && (
              <>
                <h2>Benchmarks</h2>

                <Grid container spacing={2}>
                  {benchmarks.map((benchmark, index) => (
                    <Grid item xs={12} key={index}>
                      <CardBenchmark benchmark={benchmark} taskId={taskId} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </>
        )}
      </StyledContainer>
    </PageTemplate>
  );
}
