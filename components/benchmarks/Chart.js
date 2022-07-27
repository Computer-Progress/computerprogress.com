import { Menu } from "@headlessui/react";
import {
  ArrowsExpandIcon,
  ClipboardCopyIcon,
  DownloadIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import { useEffect, useState } from "react";
import Tooltip from "../Tooltip";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
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
        return Number(model[xAxis.column]);
      }

      return Math.log10(model[xAxis.column]);
    });
    const y = dataset.map((model) => {
      return Math.log10(1 / (1 - model[yAxis.column] / 100));
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
        beforePrint: function () {
          this.update({
            credits: {
              enabled: true,
              text:
                '<a target="_blank" href="https://arxiv.org/abs/2007.05558">' +
                "Ⓒ The Computational Limits of Deep Learning, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>",
            },
          });
        },
        afterPrint: function () {
          this.update({
            credits: {
              enabled: true,
              text:
                '<a target="_blank" href="https://arxiv.org/abs/2007.05558">' +
                "Ⓒ The Computational Limits of Deep Learning, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>" +
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
        text:
          xAxis.name === "Hardware Burden" ? "Hardware Burden (FLOPs)" : "Year",
        margin: 5,
        style: {
          fontSize: 22,
        },
      },
      minPadding: xAxis.column === "year" ? 0.099 : 0.102,
      maxPadding: 0.06,

      allowDecimals: false,
      labels: {
        style: {
          fontSize: 25,
        },
        useHTML: true,
        formatter: function () {
          if (xAxis.column === "year") {
            return `<span class="text-lg">${this.value}</span>`;
          }
          return `<span class="text-lg">10<sup>${this.value}</sup></span>`;
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
        x:15,
      },
      useHTML: true,
      href: "",
      text:
        '<a target="_blank" href="https://arxiv.org/abs/2007.05558">' +
        "Ⓒ The Computational Limits of Deep Learning, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>" +
        '',
    },
    yAxis: {
      title: {
        text: yAxis.name,
        margin: 30,
        style: {
          fontSize: 22,
        },
      },
      // allowDecimals: false,
      maxPadding: 0,
      // showLastLabel: false,

      labels: {
        y: -3,
        x: 0,
        align: "left",
        formatter: function () {
          let label = (1 - 10 ** -this.value) * 100;
          label = Math.round(label * 100) / 100;
          return `<span class=" text-lg">${
            this.value ? label.toFixed(0) : 0
          }%</span>`;
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
        const formatXAxis = (x) => {
          if (xAxis.column === "year") {
            return `<span class="">${x}</span>`;
          }
          return `<span class="">10<sup>${x}</sup></span>`;
        };
        return `<div class="bg-white block px-3 py-2 mt-[1px] ml-[1px]"> <b>${
          this.point.name
        }</b><br>${yAxis.name}: ${y}% <br> ${xAxis.name}: ${formatXAxis(
          x
        )}</div>`;
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
              '<a target="_blank" href="https://arxiv.org/abs/2007.05558">' +
              "Ⓒ The Computational Limits of Deep Learning, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>",
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
                text: `Thompson, N. C., Greenewld, K., Lee, K., & Manso, G. F. (2022). The Computational Limits of Deep Learning. arXiv preprint arXiv:——.`,
              },
              {
                name: "BibTex",
                text: `@article{DBLP:journals/corr/abs-2007-05558,
  author    = {Neil C. Thompson and
                Kristjan H. Greenewald and
                Keeheon Lee and
                Gabriel F. Manso},
  title     = {The Computational Limits of Deep Learning},
  journal   = {CoRR},
  volume    = {abs/2007.05558},
  year      = {2020},
  url       = {https://arxiv.org/abs/2007.05558},
  eprinttype = {arXiv},
  eprint    = {2007.05558},
  timestamp = {Sat, 23 Jan 2021 01:12:47 +0100},
  biburl    = {https://dblp.org/rec/journals/corr/abs-2007-05558.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
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
