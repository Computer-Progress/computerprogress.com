import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import PageTemplate from "../../components/PageTemplate";
import tasksData from "./tasksData.json";

import { Container } from "./styles";

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
          <span>{`URL /${taskId} is correct!`}</span>
        )}
      </Container>
    </PageTemplate>
  );
}
