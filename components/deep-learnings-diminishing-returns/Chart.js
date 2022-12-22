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
import { useEffect, useRef, useState } from "react";
import Tooltip from "../Tooltip";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

export default function Chart({
  bests,
  dataset,
  xAxis,
  yAxis,
  downloadData,
  benchmark,
}) {
  const chartComponent = useRef(null);
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

  const [slope, setSlope] = useState(0);
  const [intercept, setIntercept] = useState(0);

  useEffect(() => {
    const x = bests.map((model) => {
      return Number(model["year"]);
    });
    const y = bests.map((model) => {
      return Math.log10(model["error"] / 100);
    });
    const lr = linearRegressionLine(x, y);
    setSlope(lr.slope);
    setIntercept(lr.intercept);
  }, [bests]);

  const scatterData = bests.map((model) => {
    return {
      x: model["year"],
      y: Math.log10(model["error"] / 100),
      name: model.name,
      relevant: model.relevant,
      color: "#aa3248",
    };
  });

  const regressionsLine = () => {
    const xs = bests.map((model) => {
      return Number(model["year"]);
    });
    const x1 = Math.min.apply(null, xs);
    const y1 = slope * x1 + intercept;
    // x2 when y = 3 percent error
    const x2 = Math.max.apply(null, xs);
    const y2 = slope * x2 + intercept;
    const twoPercentX = (Math.log10(2 / 100) - intercept) / slope;
    const twoPercentY = Math.log10(2 / 100);

    return [
      [x1, y1],
      [twoPercentX, twoPercentY],
    ];
  };

  const ThreeAndFivePercentMark = () => {
    const threePercentX = (Math.log10(3 / 100) - intercept) / slope;
    const threePercentY = Math.log10(3 / 100);
    // x2 when y = 3 percent error
    const fivePercentX = (Math.log10(5 / 100) - intercept) / slope;
    const fivePercentY = Math.log10(5 / 100);

    return [
      {
        x: threePercentX,
        y: threePercentY,
        name: "3%",
        color: "black",
      },
      {
        x: fivePercentX,
        y: fivePercentY,

        name: "5%",
        color: "black",
      },
    ];
  };

  const chartOptions = {
    chart: {
      spacingTop: 25,
      height: 500, // 16:9 ratio
      events: {
        beforePrint: function () {
          this.update({
            credits: {
              enabled: true,
              text:
                '<a target="_blank" href="https://spectrum.ieee.org/deep-learning-computational-cost">' +
                "Ⓒ Deep Learning's Diminishing Returns: The Cost of Improvement is Becoming Unsustainable, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>",
            },
          });
        },
        afterPrint: function () {
          this.update({
            credits: {
              enabled: true,
              text:
                '<a target="_blank" href="https://spectrum.ieee.org/deep-learning-computational-cost">' +
                "Ⓒ Deep Learning's Diminishing Returns: The Cost of Improvement is Becoming Unsustainable, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>" +
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
        text: "YEAR",
        margin: 5,
        style: {
          fontSize: 22,
        },
      },
      minPadding: 0.099,
      maxPadding: 0.06,
      startOnTick: false,

      max: 2032,

      allowDecimals: false,
      labels: {
        style: {
          fontSize: 25,
        },
        useHTML: true,
        formatter: function () {
          return `<span class="text-lg">${this.value}</span>`;
        },
      },
    },
    credits: {
      enabled: false,
      style: {
        margin: 10,
      },
      position: {
        align: "center",
        y: -5,
        x: 15,
      },
      useHTML: true,
      href: "",
      text:
        '<a target="_blank" href="https://spectrum.ieee.org/deep-learning-computational-cost">' +
        "Ⓒ Deep Learning's Diminishing Returns: The Cost of Improvement is Becoming Unsustainable, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>" +
        "",
    },
    yAxis: {
      tickAmount: 5,
      title: {
        text: "TOP 1 SCORE (% ERROR)",
        margin: 30,
        style: {
          fontSize: 22,
        },
      },
      maxPadding: 0,
      // type: "logarithmic",
      max: 0,
      min: -2,

      labels: {
        y: -3,
        x: 0,
        align: "left",
        formatter: function () {
          let label = 10 ** this.value * 100;
          label = Math.round(label * 100) / 100;
          return `<span class=" text-lg">${label.toFixed(0)}%</span>`;
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
        let y = 10 ** this.y * 100;
        y = Math.round(y * 100) / 100;
        let x = this.x;

        let name = ["5%", "3%"].includes(this.point.name)
          ? ""
          : `<b>${this.point.name}</b><br>`;

        return `<div class="bg-white block px-3 py-2 mt-[1px] ml-[1px]">${name}Error: ${y}% <br> Year: <span class="">${Number(
          x
        ).toFixed(0)}</span></div>`;
      },
    },
    plotOptions: {
      scatter: {
        point: {
          events: {
            mouseOver: function (chart) {
              const otherChart = Highcharts.charts.find(
                (c) => c !== this.series.chart && c
              );
              if (otherChart) {
                const otherIndex = otherChart.series[
                  this.series.index
                ].data.findIndex((d) => d.name === this.name);
                otherChart.tooltip.refresh(
                  otherChart.series[this.series.index].data[otherIndex]
                );
              }
            },
            mouseOut: function (chart) {
              const otherChart = Highcharts.charts.find(
                (c) => c !== this.series.chart && c
              );
              if (otherChart) {
                otherChart.tooltip.hide();
              }
            },
          },
        },
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
        data: regressionsLine(),
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
        zoneAxis: "x",

        zones: [
          {
            value: 2022,
          },
          {
            dashStyle: "dash",
          },
        ],
      },
      {
        type: "scatter",
        name: "Observationss",
        data: ThreeAndFivePercentMark(),
        marker: {
          symbol:
            "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRZFKESuIOGSoThZERRy1CkWoEGqFVh1MLv2CJg1Jiouj4Fpw8GOx6uDirKuDqyAIfoA4OjkpukiJ/0sKLWI8OO7Hu3uPu3eAUC8zzeoYBzTdNlOJuJjJropdrwhhAH2IIiwzy5iTpCR8x9c9Any9i/Es/3N/jl41ZzEgIBLPMsO0iTeIpzdtg/M+cYQVZZX4nHjMpAsSP3Jd8fiNc8FlgWdGzHRqnjhCLBbaWGljVjQ14iniqKrplC9kPFY5b3HWylXWvCd/YSinryxzneYwEljEEiSIUFBFCWXYiNGqk2IhRftxH/+Q65fIpZCrBEaOBVSgQXb94H/wu1srPznhJYXiQOeL43yMAF27QKPmON/HjtM4AYLPwJXe8lfqwMwn6bWWFj0CwtvAxXVLU/aAyx1g8MmQTdmVgjSFfB54P6NvygL9t0DPmtdbcx+nD0CaukreAAeHwGiBstd93t3d3tu/Z5r9/QBr6HKk5/JFwQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YMFgADLdK5uMsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAIklEQVQ4y2NgIA78h2KCgImBymDUwFEDRw0cNXDUwKFiIADG8AIlhiI7xQAAAABJRU5ErkJggg==)",
        },
        dataLabels: {
          enabled: true,
          // left
          y: -5,
          style: {
            fontSize: "15px",
          },
          formatter: function () {
            return this.point.name;
          },
        },
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
              '<a target="_blank" href="https://spectrum.ieee.org/deep-learning-computational-cost">' +
              "Ⓒ Deep Learning's Diminishing Returns: The Cost of Improvement is Becoming Unsustainable, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>",
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

  function showTootip() {
    const chart = Highcharts.charts.filter((chart) => chart !== undefined);
    if (chart.length) {
      chart.forEach((c) => {
        c.tooltip.refresh(c.series[0].data[0]);
      });
    }
  }

  return (
    <div className="w-full relative">
      <HighchartsReact
        ref={chartComponent}
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
}
