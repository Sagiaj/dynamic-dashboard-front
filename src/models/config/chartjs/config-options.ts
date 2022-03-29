import Chart from "chart.js";
// import { annotationsConfig } from "./annotations";
import { scalesConfig } from "./scales";
import { streamingConfig } from "./streaming";
import { zoomConfig } from "./zoom";

export const configOptions = <Chart.ChartOptions>{
    annotation: {
        drawTime: "afterDatasetsDraw",
        annotations: [
          {
            type: "line",
            scaleID: "initial",
            mode: "horizontal",
            value: 25,
            borderColor: "red",
            borderWidth: 0
          }
        ]
      },
    scales: scalesConfig,
    interaction: {
        intersect: false
    },
    animation: {
        duration: 100 // general animation time
    },
    hover: {
        animationDuration: 0 // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0, // animation duration after a resize
    tooltips: {
        mode: 'x',
        intersect: false,
        bodyFontSize: 18
    },
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        labels: {
            usePointStyle: true,
            font: {
                size: 24
            }
        },
    },
    plugins: {
        zoom: zoomConfig,
        // annotation: {
        //     drawTime: "afterDatasetsDraw",
        //     annotations: [
        //       {
        //         type: "line",
        //         scaleID: "bacteria",
        //         mode: "horizontal",
        //         value: 25,
        //         borderColor: "red",
        //         borderWidth: 0
        //       }
        //     ]
        //   },
        streaming: streamingConfig
    },
    transitions: {
        zoom: {
            animation: {
                duration: 100
            }
        }
    }
}
