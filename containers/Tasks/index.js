import { useState } from "react";
import PageTemplate from "../../components/PageTemplate";
import Task from "../../components/Task";
import Link from "next/link";

import ImageClassification from "../../public/image-classification.svg";
import ObjectDetection from "../../public/object-detection.svg";
import QuestionAnswering from "../../public/question-answering.svg";
import NamedEntityRecognition from "../../public/named-entity-recognition.svg";
import MachineTranslation from "../../public/machine-translation.svg";
import PoseEstimation from "../../public/pose-estimation.svg";
import { ItemsWrapper, Container } from "./styles";

export default function Tasks() {
  const [tasks] = useState([
    {
      name: "Image Classification",
      icon: ImageClassification,
      taskId: "image-classification",
    },
    {
      name: "Object Detection",
      icon: ObjectDetection,
      taskId: "object-detection",
    },
    {
      name: "Question Answering",
      icon: QuestionAnswering,
      taskId: "question-answering",
    },
    {
      name: "Named Entity Recognition",
      icon: NamedEntityRecognition,
      taskId: "named-entity-recognition",
    },
    {
      name: "Machine Translation",
      icon: MachineTranslation,
      taskId: "machine-translation",
    },
    {
      name: "Pose Estimation",
      icon: PoseEstimation,
      taskId: "pose-estimation",
    },
  ]);

  const renderItem = (item) => (
    <Link href={{ pathname: `/tasks/${item.taskId}` }} key={item.taskId}>
      <a>
        <Task item={item} />
      </a>
    </Link>
  );

  return (
    <PageTemplate>
      <Container>
        <h1>Tasks</h1>
        <ItemsWrapper>
          {tasks.map((item, index) => renderItem(item, index))}
        </ItemsWrapper>
      </Container>
    </PageTemplate>
  );
}
