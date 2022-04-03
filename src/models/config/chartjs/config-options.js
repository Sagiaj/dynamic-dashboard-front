// import { annotationsConfig } from "./annotations";
import { scalesConfig } from "./scales";
import { streamingConfig } from "./streaming";
import { zoomConfig } from "./zoom";
export const configOptions = {
    title: {
        display: true,
        text: 'Per 1ml',
        fontSize: 14,
        position: "left"
    },
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
    responsiveAnimationDuration: 0,
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
};
//# sourceMappingURL=config-options.js.map