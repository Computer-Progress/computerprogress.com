import React, { useState, useEffect } from "react";
import { ChartWrapper } from "./styles";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import regression from "regression";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MuiTheme } from "../../styles/theme";

const Chart = ({ data, label, isByYear, computingPower }) => {
  const isMobileXS = useMediaQuery(MuiTheme.breakpoints.down("xs"));

  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "Loading...",
    },
  });
  const generateChart = (list, label) => {
    let data_points = [];
    let info_points = [];

    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element[label] && element[computingPower.value]) {
        let x, y;
        x = isByYear
          ? new Date(element.paper_publication_date).getFullYear()
          : Math.log10(element[computingPower.value]);
        y = 1 / (1 - element[label] / 100);
        const point = [x, y];

        data_points.push(point);

        const info = {
          type: "scatter",
          data: [point],
          showInLegend: false,
          name: element.name,
          marker: {
            symbol: "circle",
            fillColor: "#9E1FFF",
            radius: 4,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        };
        info_points.push(info);
      }
    }

    const result = regression.linear(data_points);
    result.points.sort(([a, b], [c, d]) => c - a || b - d);

    const chart = {
      plotOptions: {
        scatter: {
          dataLabels: {
            enabled: false,
            format: "{series.name}",
          },
          enableMouseTracking: true,
          color: "#073b4c",
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormatter: function () {
              let y = (1 - 1 / this.y) * 100;
              y = Math.round(y * 100) / 100;
              let x = Math.round(this.x * 100) / 100;
              return `${label}: ${y}% - ${
                isByYear
                  ? `Year: ${x}`
                  : `Computation: 10e${x < 0 ? "" : "+"}${x.toFixed(1)}`
              } `;
            },
          },
        },
        line: {
          color: "#000000",
        },
      },

      series: [
        ...info_points,
        {
          type: "line",
          showInLegend: true,
          color: "#000000",
          name: result.string
            .replace("x", isByYear ? " Year" : ` log(${computingPower.name})`)
            .replace("+ -", " - ")
            .replace("y", label),
          data: [result.points[0], result.points[result.points.length - 1]],
          marker: {
            enabled: false,
          },
          states: {
            hover: {
              lineWidth: 3,
            },
          },
          enableMouseTracking: false,
        },
      ],

      legend: {
        layout: "vertical",
        align: "center",
        verticalAlign: "top",
        symbolHeight: 0.001,
        symbolWidth: 0.001,
        symbolRadius: 0.001,
        fontFamily: "Montserrat, sans-serif",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        title: {
          text: isByYear ? "Year" : `Computation (${computingPower.name})`,
          margin: 20,
          style: {
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "Montserrat, sans-serif",
          },
        },
        tickInterval: 1,
        labels: {
          style: {
            fontSize: 15,
            fontFamily: "Montserrat, sans-serif",
          },
          formatter: function () {
            return isByYear
              ? this.value
              : `10e${parseFloat(this.value) < 0 ? "" : "+"}` + this.value;
          },
        },
      },
      yAxis: {
        title: {
          text: "Accuracy (" + label + ")",
          margin: 20,
          style: {
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "Montserrat, sans-serif",
          },
        },
        labels: {
          style: {
            fontSize: 15,
            fontFamily: "Montserrat, sans-serif",
          },
          formatter: function () {
            let label = (1 - 1 / this.value) * 100;
            return `${this.value ? label.toFixed(1) : 0}%`;
          },
        },
      },
    };
    setChartOptions(chart);
  };

  useEffect(() => {
    generateChart(data, label);
  }, [data, label, isByYear, computingPower]);

  if (typeof Highcharts === "object") {
    HighchartsExporting(Highcharts);
  }

  return (
    <ChartWrapper>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ChartWrapper>
  );
};

export default Chart;
