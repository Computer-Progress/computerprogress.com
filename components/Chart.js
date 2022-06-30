import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

export default function Chart({ dataset, xAxis, yAxis }) {
  const linearRegressionLine = (x, y) => {
    const xs = [];
    const ys = [];
    for (let i = 0; i < x.length; i++) {
      xs.push(x[i]);
      ys.push(y[i]);
    }
    const n = xs.length;
    const sum_x = xs.reduce((a, b) => a + b, 0);
    const sum_y = ys.reduce((a, b) => a + b, 0);
    const sum_xy = xs.reduce((a, b, i) => a + b * ys[i], 0);
    const sum_xx = xs.reduce((a, b, i) => a + b * b, 0);
    const sum_yy = ys.reduce((a, b, i) => a + b * b, 0);
    const slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    const intercept = (sum_y - slope * sum_x) / n;
    const r =
      (n * sum_xy - sum_x * sum_y) /
      Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y));
    const r2 = r * r;
    const x1 = Math.min.apply(null, xs);
    const x2 = Math.max.apply(null, xs);
    const y1 = slope * x1 + intercept;
    const y2 = slope * x2 + intercept;
    return [
      [x1, y1],
      [x2, y2],
    ];
  };
  const scatterData = dataset.map((model) => {
    return {
      x:
        xAxis.column === "year"
          ? model[xAxis.column]
          : Math.log10(model[xAxis.column]),
      y: Math.log10(1 / (1 - model[yAxis.column] / 100)),
      name: model.name,
      relevant: model.relevant,
      color: "#aa3248",
    };
  });

  const lineData = () => {
    const x = dataset.map((model) => {
      if (xAxis.column === "year") {
        return model[xAxis.column];
      }

      return Math.log10(model[xAxis.column]);
    });
    const y = dataset.map((model) => {
      return Math.log10(1 / (1 - model[yAxis.column] / 100));
    });
    const lr = linearRegressionLine(x, y);
    return lr;
  };
  const chartOptions = {
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      title: {
        enabled: true,
        text: xAxis.name,
      },
      minPadding: 0.05,
      maxPadding: 0.05,
      allowDecimals: xAxis.column !== "year",
      labels: {
        useHTML: true,
        formatter: function () {
          if (xAxis.column === "year") {
            return `<span>${this.value}</span>`;
          }
          return `10<sup>${this.value.toFixed(1)}</sup>`;
        },
      },
    },
    yAxis: {
      title: {
        text: yAxis.name,
      },
      labels: {
        formatter: function () {
          let label = (1 - 10 ** -this.value) * 100;
          label = Math.round(label * 100) / 100;
          return `${this.value ? label.toFixed(1) : 0}%`;
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      useHTML: true,
      padding: 0,
      formatter: function () {
        let y = (1 - 10 ** -this.y) * 100;
        y = Math.round(y * 100) / 100;
        let x = Math.round(this.x * 100) / 100;
        return `<div class="bg-white block px-3 py-2 mt-[1px] ml-[1px]"> ${
          this.point.name
        }<br>${yAxis.name}: ${y}% <br> ${xAxis.name}: 10<sup>${x.toFixed(
          1
        )}</sup></div>`;
      },
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: "rgb(100,100,100)",
            },
          },
        },
        style: {
          color: "#aa3248",
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
      },
    },
    series: [
      {
        type: "scatter",
        name: "Observations",
        data: scatterData,
        marker: {
          radius: 4,
        },
        dataLabels: {
          enabled: true,
          allowOverlap: false,
          padding: 5,

          useHTML: true,
          formatter: function () {
            if (this.point.relevant) return this.point.name;
          },
        },
      },
      {
        type: "line",
        name: "Regression Line",
        data: lineData(),
        marker: {
          enabled: false,
        },
        dataLabels: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 0,
          },
        },
        enableMouseTracking: false,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
