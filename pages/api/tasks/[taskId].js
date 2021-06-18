import { benchmarkData } from "../../../data/benchmarkData";

const benchmarks = {
  "image-classification": [
    {
      id: "imagenet",
      title: "ImageNet1",
      bestModel: "Multi Scale Spatial Attention",
      paper:
        "Semantic Segmentation With Multi Scale Spatial Attention For Self Driving Cars",
      BLEU: 83.69,
      hardwareBurden: "10²²",
      publicationDate: "Aug./2021",
    },
    {
      id: "imagenet",
      title: "ImageNet2",
      bestModel: "Multi Scale Spatial Attention",
      paper:
        "Semantic Segmentation With Multi Scale Spatial Attention For Self Driving Cars",
      BLEU: 83.69,
      hardwareBurden: "10²²",
      publicationDate: "Aug./2021",
    },
  ],
  "object-detection": [
    {
      id: "imagenet",
      title: "ImageNet OD 1",
      bestModel: "Multi Scale Spatial Attention",
      paper:
        "Semantic Segmentation With Multi Scale Spatial Attention For Self Driving Cars",
      BLEU: 83.69,
      hardwareBurden: "10²²",
      publicationDate: "Aug./2021",
    },
    {
      id: "imagenet",
      title: "ImageNet OD 2",
      bestModel: "Multi Scale Spatial Attention",
      paper:
        "Semantic Segmentation With Multi Scale Spatial Attention For Self Driving Cars",
      BLEU: 83.69,
      hardwareBurden: "10²²",
      publicationDate: "Aug./2021",
    },
  ],
};

export default (req, res) => {
  const { taskId } = req.query;

  res.status(200).json(benchmarks[taskId]);
};
