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

export default function Tasks({ tasks }) {
  console.log(tasks);
  const renderItem = (item) => (
    <Link href={{ pathname: `/tasks/${item.identifier}` }} key={item.identifier}>
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
