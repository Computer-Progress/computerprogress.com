import Script from "next/script";
import { useEffect, useState } from "react";
import { trendsGraph, mlp } from "./graph";

export default function Chart({ dataset, xAxis, yAxis }) {
  const [params, setParams] = useState({
    showDoublingTimes: true,
    xAxis: "Publication date",
    yAxis: "Training compute (FLOPs)",
    startDate: new Date(1950, 0, 1),
    endDate: new Date(2022, 1, 1),
    startDlEra: new Date(2009, 11, 31),
    startLargeScaleEra: new Date(2015, 8, 1),
    splitDlEra: true,
    splitLargeScaleEra: true,
    citationThreshold: 0,
    separateCategories: false,
    otherDomainThreshold: 10,
    outliersAction: "remove",
    largeScaleAction: "label",
    bigAlphagoAction: "ignore",
    recordSettersAction: "ignore",
    lowOutliersZValueThreshold: -2,
    highOutliersZValueThreshold: 0.76,
    parametersRange: [NaN,NaN],
    trainingComputeRange: [NaN,NaN],
    inferenceComputeRange: [NaN,NaN],
    trainingDatasetSizeRange: [NaN,NaN],
    inferenceComputePerParameterRange: [NaN,NaN],
    inferenceComputeTimesParameterRange: [NaN,NaN],
    outlierWindowSize: 2,
    labelPoints: false,
    plotRegressions: true,
    labelEras: true,
  });
  useEffect(() => {
    try {
      trendsGraph("#trends-graph", dataset.slice(0), { options: params });
    } catch (e) {
      console.log(e);
    }
    document.addEventListener(
      "graphChanged",
      function (e) {
        setParams(e.detail.params);
      },
      false
    );
    return () => {
      document.removeEventListener(
        "graphChanged",
        function (e) {
          console.log(e.detail);
        },
        false
      );
    };
  });
  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent("updateTrendsGraph", {
        detail: {
          params: { ...params, xAxis: xAxis.column, yAxis: yAxis.column },
        },
      })
    );
  }, [xAxis, yAxis]);

  return (
    <>
      <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8 mt-10">
        <div className="graph-wrapper">
          <div id="trends-graph"></div>
        </div>
      </div>
    </>
  );
}
