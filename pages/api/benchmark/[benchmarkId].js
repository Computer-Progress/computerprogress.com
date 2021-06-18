import { benchmarkData } from "../../../data/benchmarkData";

export default (req, res) => {
  const { benchmarkId } = req.query;

  res.status(200).json(benchmarkData[benchmarkId]);
};
