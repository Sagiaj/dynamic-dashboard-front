import Chart from "chart.js";

export const zoomConfig = {
    limits: {
        y: {min: 0, max: 100},
        x: {min: 'original', max: 'original', minRange: (60 * (60 * 1000)) },
      },
    pan: {
        modifierKey: 'ctrl',
        enabled: true,
        mode: 'x',
        rangeMin: {
            x: null
        },
        rangeMax: {
            x: null
        },
        speed: 20,
        threshold: 10,
        onPan: function({chart}: { chart: Chart }) { console.log(`I'm panning!!!`); },
        onPanComplete: function({chart}: { chart: Chart }) { console.log(`I was panned!!!`); }
    },
    zoom: {
        enabled: true,
        drag: false,
        mode: 'x',
        rangeMin: {
            x: 1000 * 60 * 5
        },
        rangeMax: {
            x: 84600 * 1000 * 365
        },
        speed: 0.1,
        sensitivity: 5,
        onZoom: function({chart}: { chart: Chart }) { console.log(`I'm zooming!!!`); },
        onZoomComplete: function({chart}: { chart: Chart } ) { console.log(`I was zoomed!!!`); }
    }
}