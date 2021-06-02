import React, { useState, useEffect } from "react";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts.src.js";
import HighchartsExporting from "highcharts/modules/exporting";
import regression from "regression";

const chart = ({ data, label, isByYear }) => {
  const [chartOptions, setChartOptions] = useState({})

  const generateChart = (list, label) => {
    let data_points = [];
    let info_points = [];

    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      let x, y;
      x = isByYear ? element.year : Math.log10(element.hardware_burden);
      y = 1 / (1 - element.accuracy);

      const point = [x, y];

      data_points.push(point);

      const info = {
        type: "scatter",
        data: [point],
        showInLegend: false,
        name: element.model,
        marker: {
          symbol: "circle",
          radius: 3,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      };
      info_points.push(info);
    }

    const result = regression.linear(data_points);
    result.points.sort((a, b) => a[1] - b[1]);
    console.log("regression", result);

    const chart = {
      chart: {
        height: 500
      },
      plotOptions: {
        scatter: {
          dataLabels: {
            enabled: false,
            format: "{series.name}"
          },
          enableMouseTracking: true,
          color: "#073b4c",
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormatter: function () {
              console.log("Format", this);
              let y = (1 - 1 / this.y) * 100;
              y = Math.round(y * 100) / 100;
              let x = Math.round(this.x * 100) / 100;
              return `${label}: ${y}% - ${isByYear ? `Year: ${x}` : `Computation: 10e+${x}`} `;
            }
          }
        },
        line: {
          color: "#00b4d8"
        }
      },

      series: [
        ...info_points,
        {
          type: "line",
          showInLegend: true,
          name: result.string
            .replace("x", isByYear ? " Year" : " log(Computation)")
            .replace("+ -", " - ")
            .replace("y", "1 / Error"),
          data: [result.points[0], result.points[result.points.length - 1]],
          marker: {
            enabled: false
          },
          states: {
            hover: {
              lineWidth: 2
            }
          },
          enableMouseTracking: true
        }
      ],

      legend: {
        layout: "vertical",
        align: "center",
        verticalAlign: "top"
      },

      title: {
        text: ""
      },
      xAxis: {
        title: {
          text: isByYear ? 'YEAR' : "COMPUTATION (HARDWARE BURDEN)",
          margin: 20,
          style: {
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "Trebuchet MS, Verdana, sans-serif"
          }
        },
        tickInterval: 1,
        labels: {
          style: {
            fontSize: 13
          },
          formatter: function () {
            return isByYear ? this.value : "10e+" + this.value;
          }
        }
      },
      yAxis: {
        title: {
          text: label,
          margin: 20,
          style: {
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "Trebuchet MS, Verdana, sans-serif"
          }
        },
        labels: {
          style: {
            fontSize: 13
          },
          formatter: function () {
            let label = (1 - 1 / this.value) * 100;
            return `${parseInt(label)}%`;
          }
        }
      }
    };
    setChartOptions(chart);
  };

  useEffect(() => {
    generateChart(data, label);
  }, [data, label, isByYear])


  if (typeof Highcharts === "object") {
    HighchartsExporting(Highcharts);
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
}
export default chart;

