import { Menu } from "@headlessui/react";

import { ArrowsExpandIcon, ClipboardCopyIcon, DownloadIcon } from "@heroicons/react/outline";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import { useEffect, useRef, useState } from "react";
import more from "highcharts/highcharts-more";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  more(Highcharts);
}

export default function Chart({
  dataset,
  xAxis,
  yAxis,
  downloadData,
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
  const scatterData = function () {
    const data = [];
    dataset.forEach((model, i) => {
      if (model[yAxis.column] && model[xAxis.column]) {
        data.push({
          id: i,
          x:
            xAxis.column === "GFLOPS"
              ? Math.log10(model[xAxis.column])
              : Number(model[xAxis.column]),
          y:
            yAxis.column === "GFLOPS"
              ? Math.log10(model[yAxis.column])
              : Number(model[yAxis.column]),
          color: "#aa3248",
          z: Number(model["# OF WEELS"]),
          name: model["DEPTH"],
        });
      }
    });

    return data;
  };

  const lineData = () => {
    const data = scatterData();
    const x = data.map(({ x }) => x);
    const y = data.map(({ y }) => y);

    const lr = linearRegressionLine(x, y);
    return lr.points;
  };

  function getSeries() {
    if (yAxis.column === "SUCCESS RATE" && xAxis.column === "GFLOPS") {
      return [
        {
          type: "bubble",
          name: "Observations",
          color: "#AA3248",
          step: false,
          lineWidth: 0,
          data: scatterData(),
          marker: {},
        },
        {
          type: "line",
          name: "Regression Line",
          color: "rgb(100,100,100)",
          data: lineData(),
          lineWidth: 2,
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
      ];
    } else if (yAxis.column === "GFLOPS" && xAxis.column === "YEAR") {
      return [
        {
          name: "Observationas",
          type: "scatter",
          step: true,
          id: xAxis.column + yAxis.column,
          color: "#AA3248",
          data: scatterData(),
          lineColor: "#AA3248",

          lineWidth: 1,
          marker: {
            radius: 3,
            fillColor: "#AA3248",
            lineColor: "#AA3248",

            lineWidth: 0,
          },
        },
      ];
    } else if (yAxis.column === "SUCCESS RATE" && xAxis.column === "YEAR") {
      return [
        {
          name: "Observationass",
          type: "scatter",
          step: false,
          id: xAxis.column + yAxis.column,
          color: "#AA3248",
          data: scatterData(),
          lineColor: "#AA3248",

          lineWidth: 0,
          marker: {
            symbol: "circle",

            radius: 3,
            fillColor: "#AA3248",
            lineColor: "#AA3248",

            lineWidth: 0,
          },
        },
        {
          type: "line",
          name: "Regression Line",
          color: "rgb(100,100,100)",
          data: lineData(),
          lineWidth: 2,
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
      ];
    }
  }
  const chartOptions = {
    chart: {
      spacingBottom: 25,

      spacingTop: 50,
      height: 600, // 16:9 ratio
      events: {
        
      },
    },
    legend: {
      enabled: false,
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
          if (xAxis.column === "GFLOPS") {
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
        x: 25,
        y: -5,
      },
      useHTML: true,
      href: "",
      text:
        '<a target="_blank" href="https://arxiv.org/abs/2206.14007">' +
        "Ⓒ The Importance of (Exponentially More) Computing Power, N.C. THOMPSON, S. GE, G.F. MANSO</a>" +
        '',
    },
    yAxis: {
      title: {
        text: yAxis.name,
        style: {
          fontSize: 22,
        },
      },

      // max: yAxis.column === "SUCCESS RATE" ? 3.2 : undefined,
      // min: yAxis.column === "SUCCESS RATE" ? 0.2 : undefined,
      // allowDecimals: false,
      maxPadding: 0,
      // showLastLabel: false,

      labels: {
        // y: -11,
        // x: 0,
        useHTML: true,
        // align: "left",
        formatter: function () {
          if (yAxis.column === "GFLOPS") {
            return `<span class="text-lg">10<sup>${this.value}</sup></span>`;
          }
          return `<span class="text-lg">${this.value}</span>`;
        },
      },
    },

    tooltip: {
      useHTML: true,
      padding: 0,
      formatter: function () {
        const formatAxis = (value, column) => {
          if (column === "GFLOPS") {
            return `<span class="">10<sup>${value.toFixed(2)}</sup></span>`;
          }
          return `<span class="">${value}</span>`;
        };
        const weels =
          yAxis.column === "GFLOPS"
            ? ""
            : `# of Weels: ${this.point.z}
        <br>`;

        return `<div class="bg-white block px-3 py-2 mt-[1px] ml-[1px]">
        ${weels}   ${yAxis.name}: ${formatAxis(this.y, yAxis.column)} <br> ${
          xAxis.name
        }: ${formatAxis(this.x, xAxis.column)}</div>`;
      },
    },
    plotOptions: {
      bubble: {
        maxSize: 30,
        jitter: {
          x: 0.05,
          y: 0.05,
        },
      },
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
    series: getSeries(),
    exporting: {
      enabled: false,
      allowHTML: true,
      scale: 5,
      sourceWidth: 1200,
      menuItemDefinitions: {
        // Custom definition
        label: {
          onclick: function () {
            downloadData();
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

  function downloadGraph(format) {
    const chart = Highcharts.charts.find((chart) => chart !== undefined);
    const type = {
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".pdf": "application/pdf",
    }[format];
    if (chart) {
      chart.exportChart(
        {
          type,
          filename: benchmark,
        },
        {
          credits: {
            enabled: true,
            text:
              '<a target="_blank" href="https://arxiv.org/abs/2206.14007">' +
              "Ⓒ The Importance of (Exponentially More) Computing Power, N.C. THOMPSON, S. GE, G.F. MANSO</a>",
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

  const [copied, setCopied] = useState(false);
  async function copyTextToClipboard(text) {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  return (
    <div className="w-full relative">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <div className="flex items-center justify-end gap-4 mt-3 px-2 sm:px-0 lg:absolute bottom-0.5 right-0">
      <Menu as={"div"} className="relative">
          {copied && (
            <div className="absolute rounded-lg bottom-full bg-black bg-opacity-70  z-50 font-normal leading-normal w-max max-w-xs text-sm  break-words ">
              <div className="text-white p-2 normal-case">Copied</div>
            </div>
          )}
          <Menu.Button className="flex gap-1 items-center uppercase hover:underline text-[#AA3248] text-sm rounded-lg">
            <ClipboardCopyIcon className="w-4 h-4" /> cite
          </Menu.Button>
          <Menu.Items className="z-10 absolute  w-max origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {[
              {
                name: "APA",
                text: `Thompson, N. C., Ge, S., & Manso, G. F. (2022). The importance of (exponentially more) computing power. arXiv preprint arXiv:2206.14007.`,
              },
              {
                name: "BibTex",
                text: `@article{thompson2022importance,
  title={The importance of (exponentially more) computing power},
  author={Thompson, Neil C and Ge, Shuning and Manso, Gabriel F},
  journal={arXiv preprint arXiv:2206.14007},
  year={2022}
}`,
              },
            ].map((item, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      copyTextToClipboard(item.text);
                    }}
                    className={`${
                      active ? "bg-[#AA3248] text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md  px-2 py-2 text-sm`}
                  >
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
        <button
          className="flex gap-1 items-center uppercase  hover:underline text-[#AA3248] text-sm rounded-lg"
          onClick={() => ChartFullScreen()}
        >
          <ArrowsExpandIcon className="w-4 h-4" />
          full screen
        </button>

        <Menu as={"div"} className="relative">
          <Menu.Button className="flex gap-1 items-center uppercase hover:underline text-[#AA3248] text-sm rounded-lg">
            <DownloadIcon className="w-4 h-4" /> graph
          </Menu.Button>
          <Menu.Items className="z-10 absolute  w-full origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {[".png", ".svg", ".pdf"].map((type, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      downloadGraph(type);
                    }}
                    className={`${
                      active ? "bg-[#AA3248] text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md  px-2 py-2 text-sm`}
                  >
                    {type}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
        <Menu as={"div"} className="relative">
          <Menu.Button className="flex gap-1 items-center uppercase hover:underline text-[#AA3248] text-sm rounded-lg">
            <DownloadIcon className="w-4 h-4" /> data
          </Menu.Button>
          <Menu.Items className="z-10 absolute  w-full origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {[".csv", ".xlsx"].map((type, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      downloadData(type);
                    }}
                    className={`${
                      active ? "bg-[#AA3248] text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md  px-2 py-2 text-sm`}
                  >
                    {type}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}
