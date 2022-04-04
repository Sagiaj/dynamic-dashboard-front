import Chart from "chart.js";
import { scalesConfig } from "./scales";
import { streamingConfig } from "./streaming";
import { zoomConfig } from "./zoom";

export const configOptions = <Chart.ChartOptions>{
    title: {
        display: true,
        text: 'Per 1ml',
        fontSize: 14,
        position: "left"
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
