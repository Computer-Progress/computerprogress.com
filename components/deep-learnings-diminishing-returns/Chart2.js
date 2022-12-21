import { Menu, RadioGroup } from "@headlessui/react";
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

  function formatMoney(value, unit = "", decimals = 2, spacing = false) {
    const parsedValue = Number(value);
    if (parsedValue === 0) return "0" + unit;

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [unit, "K" + unit, "M" + unit, "B" + unit, "T" + unit];

    const i = Math.floor(Math.log(parsedValue) / Math.log(k));

    return (
      parseFloat((parsedValue / Math.pow(k, i)).toFixed(dm)) +
      (spacing ? " " : "") +
      sizes[i]
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
    const x = dataset.map((model) => {
      return Math.log10(Number(model["hardware_burden"]));
    });
    const y = dataset.map((model) => {
      return Math.log10(model["error"] / 100);
    });
    const lr = linearRegressionLine(x, y);
    setSlope(lr.slope);
    setIntercept(lr.intercept);
  }, [dataset]);

  const scatterData = () => {
    const points = bests.map((model) => {
      return {
        x: Math.log10(Number(model["hardware_burden"])),
        y: Math.log10(model["error"] / 100),
        z: Math.log10(Number(model["hardware_burden"]) / 349756347991684000),
        money_equivalent: model.money_equivalent,

        name: model.name,
        relevant: model.relevant,
        year: model.year,
        color: "#aa3248",
      };
    });
    // sort by x value
    points.sort((a, b) => {
      return a.x - b.x;
    });
    const placement = [
      { y: 0, x: 0 },
      { y: 22, x: 0 },
      { y: 22, x: -10 },
      { y: 0, x: 0 },
      { y: 22, x: 10 },
      { y: 0, x: 0 },
      { y: 22, x: -10 },
      { y: 0, x: 0 },
      { y: 22, x: 10 },
    ];
    // add datalabel one top and one bottom
    return points.map((point, index) => {
      point.dataLabels = {
        enabled: true,
        ...placement[index % 9],
        format: "{point.year}",
        style: {
          color: "red",
          fontSize: "10px",
          fontWeight: "",
          textOutline: "0px",
        },
      };

      return point;
    });
  };

  const regressionsLine = () => {
    const xs = dataset.map((model) => {
      return Math.log10(Number(model["hardware_burden"]));
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
        z: Math.log10(10 ** threePercentX / 349756347991684000),
        money_equivalent: 10 ** threePercentX / 68740540540540600,
        name: "3%",
        color: "#000",
        year: 2029,
      },
      {
        x: fivePercentX,
        y: fivePercentY,
        z: Math.log10(10 ** fivePercentX / 349756347991684000),
        money_equivalent: 10 ** fivePercentX / 68740540540540600,
        name: "5%",
        color: "#000",
        year: 2026,
      },
    ];
  };

  const carbonPoints = () => {
    const americanYearX = Math.log10(36156);

    const americanLifeX = Math.log10(36156 * 78.54);

    const boulderMonthX = Math.log10((1.466276 * 1000000 * 2204.62) / 12);

    const nycMonthX = Math.log10((56.5 * 1000000 * 2204.62) / 12);

    const points = [
      {
        x: americanYearX,
        y: -((americanYearX * slope) / 349756347991684000 + intercept),
        name: "American Year",
        color: "blue",
      },
      {
        x: americanLifeX,
        y: -((americanLifeX * slope) / 349756347991684000 + intercept),

        name: "American Life",
        color: "blue",
      },
      {
        x: boulderMonthX,
        y: -((boulderMonthX * slope) / 349756347991684000 + intercept),

        name: "Boulder Month",
        color: "blue",
        fillColor: "red",
      },
      {
        x: nycMonthX,
        y: -((nycMonthX * slope) / 349756347991684000 + intercept),

        name: "NYC Month",
        color: "blue",
      },
    ];
    return points;
  };

  const topXAxis = [
    {
      plotLines: [
        {
          zIndex: 5,
          id: "plotlines",
          color: "#FF9999", // Red
          width: 2,
          value: Math.log10(36156), // Position, you'll have to translate this to the values on your x axis
          dashStyle: "dash",
          label: {
            text: "Avg. American (1 Year)",
            align: "left",
            x: 8,
            y: 5,
            style: {
              fontSize: 13,
            },
          },
        },
        {
          zIndex: 5,
          id: "plotlines",
          color: "#FF9999", // Red
          width: 2,
          value: Math.log10(36156 * 78.54), // Position, you'll have to translate this to the values on your x axis
          dashStyle: "dash",
          label: {
            text: "Avg. American (Lifetime)",
            align: "left",
            x: 8,
            y: 5,
            style: {
              fontSize: 13,
            },
          },
        },
        {
          zIndex: 5,

          id: "plotlines",
          color: "#FF9999", // Red
          width: 2,
          value: Math.log10((1.466276 * 1000000 * 2204.62) / 12), // Position, you'll have to translate this to the values on your x axis
          dashStyle: "dash",
          label: {
            text: "Boulder CO. (1 Month)",
            align: "left",
            x: 8,
            y: 5,
            style: {
              fontSize: 13,
            },
          },
        },
        {
          zIndex: 5,

          id: "plotlines",
          color: "#FF9999", // Red
          width: 2,
          value: Math.log10((56.5 * 1000000 * 2204.62) / 12), // Position, you'll have to translate this to the values on your x axis
          dashStyle: "dash",
          label: {
            text: "New York City (1 Month)",
            align: "left",
            x: 8,
            y: 5,
            style: {
              fontSize: 13,
            },
          },
        },
      ],

      position: "top",
      opposite: true,
      title: {
        enabled: true,
        text: "<div style='font-size: 22px;'><span >CO<sub>2</sub></span> EQUIVALENT EMISSIONS (lbs)</div>",
        useHTML: true,

        margin: 20,
        style: {
          fontSize: 22,
        },
      },
      min: Math.log10(10 ** 17.5 / 349756347991684000),
      max: Math.log10(10 ** 30 / 349756347991684000),

      // allowDecimals: false,
      labels: {
        style: {
          fontSize: 25,
        },
        useHTML: true,
        formatter: function () {
          return `<span class="text-lg">10<sup>${this.value}</sup></span>`;
        },
      },
    },
    {
      plotLines: [
        {
          zIndex: 5,

          id: "plotlines",
          color: "#FF9999", // Red
          width: 2,
          value: Math.log10(219000000000),
          dashStyle: "dash",
          label: {
            text: "Elon Musk Fortune (2022)",
            align: "left",
            x: 8,
            y: 5,
            style: {
              fontSize: 13,
            },
          },
        },
        {
          zIndex: 5,

          id: "plotlines",
          color: "#FF9999", // Red
          width: 2,
          value: Math.log10(41000000),
          dashStyle: "dash",
          label: {
            text: "Messi's Annual Salary  (2022)",
            align: "left",
            x: 8,
            y: 5,
            style: {
              fontSize: 13,
            },
          },
        },
        {
          zIndex: 5,

          id: "plotlines",
          color: "#FF9999", // Red
          width: 2,
          value: Math.log10(106440),
          dashStyle: "dash",
          label: {
            text: "Tesla Model S (2022)",
            align: "left",
            x: 8,
            y: 5,
            style: {
              fontSize: 13,
            },
          },
        },
      ],

      opposite: true,
      title: {
        enabled: true,
        text: "DOLLAR EQUIVALENT (USD)",
        useHTML: false,
        margin: 20,
        style: {
          fontSize: 22,
        },
      },

      min: Math.log10(10 ** 17.5 / 68740540540540600),
      max: Math.log10(10 ** 30 / 68740540540540600),
      minPadding: 0.099,
      maxPadding: 0.06,
      startOnTick: false,

      allowDecimals: false,
      labels: {
        style: {
          fontSize: 25,
        },
        useHTML: true,
        formatter: function () {
          return `<span class="text-lg">10<sup>${this.value}</sup></span>`;
        },
      },
    },
  ];

  const [selectedXAxis, setSelectedXAxis] = useState(topXAxis[0]);
  function switchAxis(axis) {
    chartComponent.current.chart.xAxis[1].removePlotLine("plotlines");
    if (selectedXAxis.title.text === topXAxis[1].title.text) {
      setSelectedXAxis(topXAxis[0]);
    } else {
      setSelectedXAxis(topXAxis[1]);
    }
  }

  useEffect(() => {
    // click on axis title to change axis
    const xAxis = chartComponent.current.chart.xAxis[1];
    xAxis.axisTitle.element.style.cursor = "pointer";
    xAxis.axisTitle.element.title = "pointer";

    xAxis.axisTitle.element.onclick = () => {
      switchAxis();
    };
  });

  const chartOptions = {
    chart: {
      spacingBottom: 25,
      // spacingTop: 50,
      height: 579, // 16:9 ratio
      events: {
        beforePrint: function () {
          this.update({
            credits: {
              enabled: true,
              text:
                '<a target="_blank" href="https://spectrum.ieee.org/deep-learning-computational-cost">' +
                "Ⓒ Deep Learning's diminishing returns, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>",
            },
          });
        },
        afterPrint: function () {
          this.update({
            credits: {
              enabled: true,
              text:
                '<a target="_blank" href="https://spectrum.ieee.org/deep-learning-computational-cost">' +
                "Ⓒ Deep Learning's diminishing returns, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>" +
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
    xAxis: [
      {
        title: {
          enabled: true,

          text: "COMPUTATION USED (FLOPS)",
          margin: 5,
          style: {
            fontSize: 22,
          },
        },
        zIndex: 15,

        min: 17.5,
        max: 30,
        minPadding: 0.099,
        maxPadding: 0.06,
        startOnTick: false,

        allowDecimals: false,
        labels: {
          style: {
            fontSize: 25,
          },
          useHTML: true,
          formatter: function () {
            return `<span class="text-lg">10<sup>${this.value}</sup></span>`;
          },
        },
      },
      selectedXAxis,
    ],
    credits: {
      enabled: true,
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
        "Ⓒ Deep Learning's diminishing returns, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>" +
        "",
    },
    yAxis: {
      tickPositions: [
        Math.log10(0.01),
        Math.log10(0.03),
        Math.log10(0.1),
        Math.log10(0.32),
      ],
      title: {
        text: "TOP 1 SCORE (% ERROR)",
        margin: 30,
        style: {
          fontSize: 22,
        },
      },
      gridLineWidth: 1,
      startOnTick: false,
      endOnTick: false,

      // type: "logarithmic",
      max: Math.log10(1),
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
        let error = `Error: ${y}% <br>`;
        let computation = `Computation Used: <span class="">10<sup>${Number(
          x
        ).toFixed(2)}</sup> FLOPS</span><br>`;
        let carbon = `Carbon: <span class="">10<sup>${this.point.z?.toFixed(
          2
        )}</sup> lbs</span><br>`;
        let dollar = `Dollar: <span class="">$${formatMoney(
          this.point.money_equivalent
        )}</sup></span><br>`;
        let year = `Year: ${this.point.year}<br>`;

        let html =
          `<div class="bg-white block px-3 py-2 mt-[1px] ml-[1px]">` +
          name +
          error +
          computation +
          carbon +
          dollar +
          year +
          `</div>`;

        return html;
      },
    },
    plotOptions: {
      scatter: {
        zIndex: 5,

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
        data: scatterData(),
        jitter: {
          x: 0.054,
        },
        marker: {
          radius: 5,
          lineColor: "white",
          lineWidth: 1,
        },
        dataLabels: {
          enabled: true,
          allowOverlap: true,
          padding: 5,
          position: "right",

          useHTML: true,
          formatter: function () {
            return this.point.year;
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
            value: 23.38,
          },
          {
            dashStyle: "dash",
          },
        ],
      },
      // {
      //   type: "scatter",
      //   name: "Observations",
      //   data: carbonPoints(),
      //   marker: {
      //     radius: 4,
      //   },
      //   xAxis: 1,
      //   dataLabels: {
      //     enabled: true,
      //     allowOverlap: false,
      //     padding: 5,
      //     formatter: function () {
      //       return this.point.name;
      //     },
      //   },
      // },

      {
        type: "scatter",
        name: "Observationss",
        data: ThreeAndFivePercentMark(),
        marker: {
          symbol:
            "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAdSURBVHgB5cchAQAACAOwQf/OYBB0+NwK47QnJwsUYwEnmla9JQAAAABJRU5ErkJggg==)",
        },
        dataLabels: {
          enabled: true,
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
    // const chart = Highcharts.charts.find((chart) => chart !== undefined);
    // // const chart = chartComponent.current.chart;
    // const type = {
    //   ".png": "image/png",
    //   ".svg": "image/svg+xml",
    //   ".pdf": "application/pdf",
    // }[format];
    // if (chart) {
    //   chart.exportChart(
    //     {
    //       type,
    //       filename: benchmark,
    //     },
    //     {
    //       credits: {
    //         enabled: true,
    //         text:
    //           '<a target="_blank" href="https://spectrum.ieee.org/deep-learning-computational-cost">' +
    //           "Ⓒ Deep Learning's diminishing returns, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>",
    //       },
    //     }
    //   );
    // }
    let chart;
    if (selectedXAxis.title.text === topXAxis[0].title.text) {
      chart = "/deep-learning-diminishing-returns-chart-enviromental-cost.png";
    } else {
      chart = "/deep-learning-diminishing-returns-chart-economic-cost.png";
    }
    fetch(chart)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = "deep-learning-diminishing-returns-chart.png";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("An error sorry"));
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
      {/* buttons to switch top x axis */}
      <div className="flex items-center justify-center gap-4 mt-3 px-2 sm:px-0 top-0 right-0">
        <button
          onClick={() =>
            selectedXAxis.title.text !== topXAxis[0].title.text &&
            switchAxis("carbon")
          }
          className={`${
            selectedXAxis.title.text === topXAxis[0].title.text
              ? "bg-[#AA3248] text-white"
              : "bg-white text-[#AA3248]"
          } rounded-lg px-2 py-1 text-sm font-semibold`}
        >
          Enviromental cost
        </button>
        <button
          onClick={() =>
            selectedXAxis.title.text !== topXAxis[1].title.text &&
            switchAxis("money")
          }
          className={`${
            selectedXAxis.title.text === topXAxis[1].title.text
              ? "bg-[#AA3248] text-white"
              : "bg-white text-[#AA3248]"
          } rounded-lg px-2 py-1 text-sm font-semibold`}
        >
          Economic cost
        </button>
      </div>

      <HighchartsReact
        ref={chartComponent}
        highcharts={Highcharts}
        options={chartOptions}
      />
      <div className="flex items-center justify-end gap-4 mt-3 px-2 sm:px-0 bottom-0.5 right-0">
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
                text: `Thompson, N. C., Greenewld, K., Lee, K., & Manso, G. F. (2022). Deep Learning's diminishing returns. arXiv preprint arXiv:2007.05558v2.`,
              },
              {
                name: "BibTex",
                text: `@article{DBLP:journals/corr/abs-2007-05558,
  author    = {Neil C. Thompson and
                Kristjan H. Greenewald and
                Keeheon Lee and
                Gabriel F. Manso},
  title     = {Deep Learning's diminishing returns},
  journal   = {CoRR},
  volume    = {abs/2007.05558v2},
  year      = {2020},
  url       = {https://spectrum.ieee.org/deep-learning-computational-cost},
  eprinttype = {arXiv},
  eprint    = {2007.05558v2},
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
        {/* <button
          className="flex gap-1 items-center uppercase  hover:underline text-[#AA3248] text-sm rounded-lg"
          onClick={() => ChartFullScreen()}
        >
          <ArrowsExpandIcon className="w-4 h-4" />
          full screen
        </button> */}
        <button
          className="flex gap-1 items-center uppercase  hover:underline text-[#AA3248] text-sm rounded-lg"
          onClick={() => downloadGraph()}
        >
          <DownloadIcon className="w-4 h-4" /> graph
        </button>
        <button
          className="flex gap-1 items-center uppercase  hover:underline text-[#AA3248] text-sm rounded-lg"
          onClick={() => downloadData("")}
        >
          <DownloadIcon className="w-4 h-4" /> data
        </button>
        {/* <Menu as={"div"} className="relative">
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
        </Menu> */}
        {/* <Menu as={"div"} className="relative">
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
        </Menu> */}
      </div>
    </div>
  );
}
