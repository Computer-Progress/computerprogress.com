import { ArrowsExpandIcon, DownloadIcon } from "@heroicons/react/outline";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import { useEffect, useRef } from "react";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

export default function Chart({
  dataset,
  xAxis,
  yAxis,
  downloadCSV,
  benchmark,
}) {
  function formatFLOPs(flops, decimals = 2) {
    const parsedFlops = Number(flops);
    if (parsedFlops === 0) return "0 flops";

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "FLOPs",
      "KFLOPs",
      "MFLOPs",
      "GFLOPs",
      "TFLOPs",
      "PFLOPs",
      "EFLOPs",
      "ZFLOPs",
      "YFLOPs",
    ];

    const i = Math.floor(Math.log(parsedFlops) / Math.log(k));

    return (
      parseFloat((parsedFlops / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    );
  }
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
    return {
      slope,
      intercept,
      r2,
      points: [
        [x1, y1],
        [x2, y2],
      ],
    };
  };
  const scatterData = dataset.map((model) => {
    return {
      x:
        xAxis.column === "HARDWARE BURDEN (GFLOPS)"
          ? Math.log10(model[xAxis.column])
          : Number(model[xAxis.column]),
      y:
        yAxis.column === "HARDWARE BURDEN (GFLOPS)"
          ? Math.log10(model[yAxis.column])
          : Number(model[yAxis.column]),
      name: model["TEAM"],
      color: "#aa3248",
    };
  });

 

  const lineData = () => {
    const x = dataset.map((model) => {
      if (xAxis.column === "HARDWARE BURDEN (GFLOPS)") {
        return Math.log10(model[xAxis.column]);
      }
      return Number(model[xAxis.column]);
    });
    const y = dataset.map((model) => {
      if (yAxis.column === "HARDWARE BURDEN (GFLOPS)") {
        return Math.log10(model[yAxis.column]);
      }
      return Number(model[yAxis.column]);
    });
    const lr = linearRegressionLine(x, y);
    return lr.points;
  };

  const chartOptions = {
    chart: {
      spacingBottom: 25,
      spacingTop: 50,
      height: 600, // 16:9 ratio
      events: {
        render: function () {
          if (this.labelRender) {
            try {
              this.labelRender.destroy();
            } catch (e) {
              console.log(e);
            }
          }
          let text;
          if (yAxis.column === "GDT_TS" && xAxis.column === "YEAR") {
            text = '<span class="text-lg text-gray-600">GDT_TS = 37.6 Year + 1111.0</span>';
          } else if (
            yAxis.column === "GDT_TS" &&
            xAxis.column === "HARDWARE BURDEN (GFLOPS)"
          ) {
            text =
              '<span class="text-lg text-gray-600">GDT_TS = 242.4 log<sub>10</sub> (HARDWARE BURDEN) + 1078.1</span>';
          } else if (
            yAxis.column === "HARDWARE BURDEN (GFLOPS)" &&
            xAxis.column === "YEAR"
          ) {
            text =
              '<span class="text-lg text-gray-600">HARDWARE BURDEN = 10<sup>0.14 Year + 0.44</sup></span>';
          }
          if (text) {
            this.labelRender = this.renderer
              .text(
                text,
                (this.chartWidth / 3.5) * 2,
                (this.chartHeight / 3) * 2,
                true
              )
              .attr({
                zIndex: 6,
              })
              .add();
            this.labelRender.attr({
              x: (this.chartWidth / 3.5) * 2,
              y: (this.chartHeight / 3) * 2,
            });
            this.labelRender.toFront();
          }
        },

        beforePrint: function () {
          this.update({
            credits: {
              enabled: true,
              text:
                '<a target="_blank" href="https://arxiv.org/abs/2206.14007">' +
                "Ⓒ The Importance of (Exponentially More) Computing Power, N.C. THOMPSON, SHUNING GE, K. LEE, G.F. MANSO</a>",
            },
          });
        },
        afterPrint: function () {
          this.update({
            credits: {
              enabled: true,
              text:
                '<a target="_blank" href="https://arxiv.org/abs/2206.14007">' +
                "Ⓒ The Importance of (Exponentially More) Computing Power, N.C. THOMPSON, SHUNING GE, K. LEE, G.F. MANSO</a>" +
                ' [<a target="_blank" href="https://dblp.org/rec/journals/corr/abs-2007-05558.html">CITE</a>, <a target="_blank" href="https://dblp.uni-trier.de/rec/journals/corr/abs-2007-05558.html?view=bibtex">BibTex</a>]',
            },
          });
        },
      },
    },
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
        margin: 5,
        style: {
          fontSize: 22,
        },
      },
      minPadding: 0.099,
      maxPadding: 0.099,

      allowDecimals: false,
      labels: {
        style: {
          fontSize: 25,
        },
        useHTML: true,
        formatter: function () {
          if (xAxis.column === "HARDWARE BURDEN (GFLOPS)") {
            return `<span class="text-lg">10<sup>${this.value}</sup></span>`;
          }
          return `<span class="text-lg">${this.value}</span>`;
        },
      },
    },
    credits: {
      enabled: true,
      style: {
        margin: 10,
      },
      position: {
        align: "center",
        y: -5,
      },
      useHTML: true,
      href: "",
      text:
        '<a target="_blank" href="https://arxiv.org/abs/2206.14007">' +
        "Ⓒ The Importance of (Exponentially More) Computing Power, N.C. THOMPSON, SHUNING GE, K. LEE, G.F. MANSO</a>" +
        ' [<a style="color: black;" target="_blank" href="https://dblp.org/rec/journals/corr/abs-2007-05558.html">CITE</a>, <a style="color: black;" target="_blank" href="https://dblp.uni-trier.de/rec/journals/corr/abs-2007-05558.html?view=bibtex">BibTex</a>]',
    },
    yAxis: {
      title: {
        text: yAxis.name,
        margin: 30,
        style: {
          fontSize: 22,
        },
      },
      max: yAxis.column === "GDT_TS" ? 100 : undefined,
      min: 0,
      // allowDecimals: false,
      maxPadding: 0,
      // showLastLabel: false,

      labels: {
        // y: -11,
        // x: 0,
        useHTML: true,
        // align: "left",
        formatter: function () {
          if (yAxis.column === "HARDWARE BURDEN (GFLOPS)") {
            return `<span class="text-lg">10<sup>${this.value}</sup></span>`;
          }
          return `<span class="text-lg">${this.value}</span>`;
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
        const formatAxis = (value, column) => {
          if (column === "HARDWARE BURDEN (GFLOPS)") {
            return `<span class="">10<sup>${value}</sup></span>`;
          }
          return `<span class="">${value}</span>`;
        };
        return `<div class="bg-white block px-3 py-2 mt-[1px] ml-[1px]"> <b>${
          this.point.name
        }</b><br>${yAxis.name}: ${formatAxis(this.y, yAxis.column)} <br> ${
          xAxis.name
        }: ${formatAxis(this.x, xAxis.column)}</div>`;
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
        dataLabels: {
          enabled: true,
          align: 'left',
          x: -5,
          formatter: function () {
            return `<span class="text-md">${this.point.name}</span>`;
          }
        },
        marker: {
          radius: 4,
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
    exporting: {
      enabled: false,
      allowHTML: true,
      scale: 5,
      sourceWidth: 1200,
      menuItemDefinitions: {
        // Custom definition
        label: {
          onclick: function () {
            downloadCSV();
          },
          text: "Download data (CSV)",
        },
      },
      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen",
            "printChart",
            "separator",
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
            "separator",
            "label",
          ],
        },
      },
    },
  };
  useEffect(() => {
    for (var i = 0; i < Highcharts.charts.length; i++) {
      if (Highcharts.charts[i] !== undefined) {
        Highcharts.charts[i].reflow();
      }
    }
  });

  function ChartFullScreen() {
    const chart = Highcharts.charts.find((chart) => chart !== undefined);
    if (chart) {
      chart.fullscreen.toggle();
    }
  }

  function downloadGraph() {
    const chart = Highcharts.charts.find((chart) => chart !== undefined);
    if (chart) {
      chart.exportChart(
        {
          type: "image/png",
          filename: benchmark,
        },
        {
          credits: {
            enabled: true,
            text:
              '<a target="_blank" href="https://arxiv.org/abs/2206.14007">' +
              "Ⓒ The Importance of (Exponentially More) Computing Power, N.C. THOMPSON, SHUNING GE, K. LEE, G.F. MANSO</a>",
          },
        }
      );
    }
  }

  function printGraph() {
    const chart = Highcharts.charts.find((chart) => chart !== undefined);
    if (chart) {
      chart.print();
    }
  }

  return (
    <div className="w-full relative">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <div className="flex items-center justify-end gap-4 mt-3 px-2 sm:px-0 lg:absolute bottom-0.5 right-0">
        <button
          className="flex gap-1 items-center uppercase  hover:underline text-[#AA3248] text-sm rounded-lg"
          onClick={() => ChartFullScreen()}
        >
          <ArrowsExpandIcon className="w-4 h-4" />
          full screen
        </button>

        <button
          className="flex gap-1 items-center uppercase hover:underline text-[#AA3248] text-sm rounded-lg"
          onClick={() => downloadGraph()}
        >
          <DownloadIcon className="w-4 h-4" /> graph
        </button>
        <button
          className="flex gap-1 items-center uppercase hover:underline text-[#AA3248] text-sm rounded-lg"
          onClick={() => downloadCSV()}
        >
          <DownloadIcon className="w-4 h-4" /> data
        </button>
      </div>
    </div>
  );
}
