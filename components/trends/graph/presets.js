// TODO I should probably prettify this
export default function presets(mlp) {
  return [
    {
      name: "Three eras of compute",
      params: {
        showDoublingTimes: true,
        xAxis: "Publication date",
        yAxis: "Training compute (FLOPs)",
        startDate: mlp.date(1950, 1, 1),
        endDate: mlp.date(2022, 2, 1),
        startDlEra: mlp.date(2009, 12, 31),
        startLargeScaleEra: mlp.date(2015, 9, 1),
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
        outlierWindowSize: 2,
        labelPoints: false,
        plotRegressions: true,
        labelEras: true,
      },
    },
    {
      name: "Raw compute data",
      params: {
        xAxis: "Publication date",
        yAxis: "Training compute (FLOPs)",
        startDate: mlp.date(1950, 1, 1),
        endDate: mlp.date(2022, 2, 1),
        startDlEra: mlp.date(2009, 12, 31),
        startLargeScaleEra: mlp.date(2015, 9, 1),
        splitDlEra: true,
        splitLargeScaleEra: true,
        citationThreshold: 0,
        separateCategories: true,
        otherDomainThreshold: 10,
        outliersAction: "remove",
        largeScaleAction: "label",
        bigAlphagoAction: "ignore",
        recordSettersAction: "ignore",
        lowOutliersZValueThreshold: -2,
        highOutliersZValueThreshold: 0.76,
        outlierWindowSize: 2,
        labelPoints: false,
        plotRegressions: false,
        labelEras: true,
      },
    },
    {
      name: "Pre and post deep learning - compute",
      params: {
        xAxis: "Publication date",
        yAxis: "Training compute (FLOPs)",
        startDate: mlp.date(1950, 1, 1),
        endDate: mlp.date(2022, 2, 1),
        startDlEra: mlp.date(2009, 12, 31),
        startLargeScaleEra: mlp.date(2024, 9, 1),
        splitDlEra: true,
        splitLargeScaleEra: true,
        citationThreshold: 0,
        separateCategories: false,
        otherDomainThreshold: 10,
        outliersAction: "remove",
        largeScaleAction: "ignore",
        bigAlphagoAction: "ignore",
        recordSettersAction: "ignore",
        lowOutliersZValueThreshold: -2,
        highOutliersZValueThreshold: 0.76,
        outlierWindowSize: 2,
        labelPoints: false,
        plotRegressions: true,
        labelEras: true,
      },
    },
    {
      name: "Pre and post large scale models - compute",
      params: {
        xAxis: "Publication date",
        yAxis: "Training compute (FLOPs)",
        startDate: mlp.date(2009, 12, 31),
        endDate: mlp.date(2022, 2, 1),
        startDlEra: mlp.date(2009, 12, 31),
        startLargeScaleEra: mlp.date(2015, 9, 1),
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
        outlierWindowSize: 2,
        labelPoints: true,
        plotRegressions: true,
        labelEras: true,
      },
    },
    {
      name: "Large scale models - compute",
      params: {
        xAxis: "Publication date",
        yAxis: "Training compute (FLOPs)",
        startDate: mlp.date(2015, 9, 1),
        endDate: mlp.date(2022, 2, 1),
        startDlEra: mlp.date(2009, 12, 31),
        startLargeScaleEra: mlp.date(2015, 9, 1),
        splitDlEra: true,
        splitLargeScaleEra: true,
        citationThreshold: 0,
        separateCategories: false,
        otherDomainThreshold: 10,
        outliersAction: "remove",
        largeScaleAction: "isolate",
        bigAlphagoAction: "ignore",
        recordSettersAction: "ignore",
        lowOutliersZValueThreshold: -2,
        highOutliersZValueThreshold: 0.76,
        outlierWindowSize: 2,
        labelPoints: true,
        plotRegressions: true,
        labelEras: false,
      },
    },
    {
      name: "Outliers - compute",
      params: {
        xAxis: "Publication date",
        yAxis: "Training compute (FLOPs)",
        startDate: mlp.date(1990, 1, 1),
        endDate: mlp.date(2022, 2, 1),
        startDlEra: mlp.date(2009, 12, 31),
        startLargeScaleEra: mlp.date(2015, 9, 1),
        splitDlEra: true,
        splitLargeScaleEra: true,
        citationThreshold: 0,
        separateCategories: false,
        otherDomainThreshold: 10,
        outliersAction: "label",
        largeScaleAction: "label",
        bigAlphagoAction: "ignore",
        recordSettersAction: "ignore",
        lowOutliersZValueThreshold: -2,
        highOutliersZValueThreshold: 0.76,
        outlierWindowSize: 2,
        labelPoints: false,
        plotRegressions: false,
        labelEras: true,
      },
    },
    {
      name: "Record setting models - compute",
      params: {
        xAxis: "Publication date",
        yAxis: "Training compute (FLOPs)",
        startDate: mlp.date(1950, 1, 1),
        endDate: mlp.date(2022, 2, 1),
        startDlEra: mlp.date(2009, 12, 31),
        startLargeScaleEra: mlp.date(2015, 9, 1),
        splitDlEra: true,
        splitLargeScaleEra: true,
        citationThreshold: 0,
        separateCategories: false,
        otherDomainThreshold: 10,
        outliersAction: "ignore",
        largeScaleAction: "ignore",
        bigAlphagoAction: "remove",
        recordSettersAction: "isolate",
        lowOutliersZValueThreshold: -2,
        highOutliersZValueThreshold: 0.76,
        outlierWindowSize: 2,
        labelPoints: true,
        plotRegressions: true,
        labelEras: true,
      },
    },
    {
      name: "Domain trends - compute",
      params: {
        xAxis: "Publication date",
        yAxis: "Training compute (FLOPs)",
        startDate: mlp.date(2009, 12, 31),
        endDate: mlp.date(2022, 2, 1),
        startDlEra: mlp.date(2009, 12, 31),
        startLargeScaleEra: mlp.date(2015, 9, 1),
        splitDlEra: true,
        splitLargeScaleEra: false,
        citationThreshold: 0,
        separateCategories: true,
        otherDomainThreshold: 10,
        outliersAction: "remove",
        largeScaleAction: "ignore",
        bigAlphagoAction: "ignore",
        recordSettersAction: "ignore",
        lowOutliersZValueThreshold: -2,
        highOutliersZValueThreshold: 0.76,
        outlierWindowSize: 2,
        labelPoints: false,
        plotRegressions: true,
        labelEras: true,
      },
    },
    {
      name: "fig10",
      params: {
        xAxis: "Publication date",
        yAxis: "Training compute (FLOPs)",
        startDate: mlp.date(2012, 9, 1),
        endDate: mlp.date(2017, 12, 1),
        startDlEra: mlp.date(2012, 9, 1),
        startLargeScaleEra: mlp.date(2015, 9, 1),
        splitDlEra: true,
        splitLargeScaleEra: false,
        citationThreshold: 0,
        separateCategories: false,
        otherDomainThreshold: 10,
        outliersAction: "remove",
        largeScaleAction: "label",
        bigAlphagoAction: "ignore",
        recordSettersAction: "ignore",
        lowOutliersZValueThreshold: -2,
        highOutliersZValueThreshold: 0.76,
        outlierWindowSize: 2,
        labelPoints: false,
        plotRegressions: true,
        labelEras: true,
      },
    },
  ];
}
