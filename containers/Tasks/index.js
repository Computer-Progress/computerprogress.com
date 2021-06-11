import { useState } from 'react';
import PageTemplate from "../../components/PageTemplate";
import Task from "../../components/Task";

import ImageClassification from "../../public/image-classification.svg";
import ObjectDetection from "../../public/object-detection.svg";
import QuestionAnswering from "../../public/question-answering.svg";
import NamedEntityRecognition from "../../public/named-entity-recognition.svg";
import MachineTranslation from "../../public/machine-translation.svg";
import PoseEstimation from "../../public/pose-estimation.svg";
import { ItemsWrapper, Container } from './styles';

export default function Tasks() {
  const [tasks] = useState([
    {
      name: 'Image Classification',
      icon: ImageClassification,
      banchmark: 1
    },
    {
      name: 'Object Detection',
      icon: ObjectDetection,
      banchmark: 1
    },
    {
      name: 'Question Answering',
      icon: QuestionAnswering,
      banchmark: 1
    },
    {
      name: 'Named Entity Recognition',
      icon: NamedEntityRecognition,
      banchmark: 1
    },
    {
      name: 'Machine Translation',
      icon: MachineTranslation,
      banchmark: 1
    },
    {
      name: 'Pose Estimation',
      icon: PoseEstimation,
      banchmark: 1
    },
  ])

  const renderItem = (item) => (
    <Task item={item} />
  )

  return (
    <PageTemplate>
      <Container>
        <h1>Tasks</h1>
        <ItemsWrapper>
          {tasks.map(item => renderItem(item))}
        </ItemsWrapper>
      </Container>
    </PageTemplate>
  )
}
