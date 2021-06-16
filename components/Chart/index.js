import React, { useState, useEffect } from "react";
import { ChartWrapper } from './styles'
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
          fillColor: "#8f00ff",
          radius: 4,
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
              return `${label}: ${y}% - ${isByYear ? `Year: ${x}` : `Computation: 10e+${x.toFixed(1)}`} `;
            }
          }
        },
        line: {
          color: "#000000"
        }
      },

      series: [
        ...info_points,
        {
          type: "line",
          showInLegend: true,
          color: "#000000",
          name: result.string
            .replace("x", isByYear ? " Year" : " log(Hardware Burden)")
            .replace("+ -", " - ")
            .replace("y", label),
          data: [result.points[0], result.points[result.points.length - 1]],
          marker: {
            enabled: false
          },
          states: {
            hover: {
              lineWidth: 3
            }
          },
          enableMouseTracking: false
        }
      ],

      legend: {
        layout: "vertical",
        align: "center",
        verticalAlign: "top",
        symbolHeight: .001,
        symbolWidth: .001,
        symbolRadius: .001,
        fontFamily: "Montserrat, sans-serif",
      },
      credits: {
        enabled: false
      },
      title: {
        text: "",
      },
      xAxis: {
        title: {
          text: isByYear ? 'Year' : "Computation (Hardware Burden)",
          margin: 20,
          style: {
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "Montserrat, sans-serif"
          }
        },
        tickInterval: 1,
        labels: {
          style: {
            fontSize: 15,
            fontFamily: "Montserrat, sans-serif"
          },
          formatter: function () {
            return isByYear ? this.value : "10e+" + this.value;
          }
        }
      },
      yAxis: {
        title: {
          text: "Accuracy (" + label + ")",
          margin: 20,
          style: {
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "Montserrat, sans-serif"
          }
        },
        labels: {
          style: {
            fontSize: 15,
            fontFamily: "Montserrat, sans-serif"
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
    <ChartWrapper>

      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </ChartWrapper>
  );
}
export default chart;

