import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card } from "@material-ui/core";

import PageTemplate from "../../components/PageTemplate";
import tasksData from "./tasksData.json";

import { Container, SectionWrapper } from "./styles";

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
          <SectionWrapper>
            <img src={`/${task.icon}`} />

            <h1>{task.title}</h1>

            <p>{task.description}</p>
          </SectionWrapper>
        )}
      </Container>
    </PageTemplate>
  );
}
