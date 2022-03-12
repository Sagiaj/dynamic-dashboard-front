import Chart from "chart.js";

export const zoomConfig = {
    limits: {
        y: {min: 0, max: 100},
        x: {min: 'original', max: 'original', minRange: (60 * (60 * 1000)), minDuration: 1000, maxDuration: (60 * (60 * 1000)), maxDelay: 4000, minDelay: 0},
      },
    // Container for pan options
    pan: {
        modifierKey: 'ctrl',
        // Boolean to enable panning
        enabled: true,

        // Panning directions. Remove the appropriate direction to disable
        // Eg. 'y' would only allow panning in the y direction
        // A function that is called as the user is panning and returns the
        // available directions can also be used:
        //   mode: function({ chart }) {
        //     return 'xy';
        //   },
        mode: 'x',

        rangeMin: {
            // Format of min pan range depends on scale type
            x: null
        },
        rangeMax: {
            // Format of max pan range depends on scale type
            x: null
        },

        // On category scale, factor of pan velocity
        speed: 20,

        // Minimal pan distance required before actually applying pan
        threshold: 10,

        // Function called while the user is panning
        onPan: function({chart}: { chart: Chart }) { console.log(`I'm panning!!!`); },
        // Function called once panning is completed
        onPanComplete: function({chart}: { chart: Chart }) { console.log(`I was panned!!!`); }
    },

    // Container for zoom options
    zoom: {
        // Boolean to enable zooming
        enabled: true,

        // Enable drag-to-zoom behavior
        drag: false,

        // Drag-to-zoom effect can be customized
        // drag: {
        //      borderColor: 'rgba(225,225,225,0.3)'
        //      borderWidth: 5,
        //      backgroundColor: 'rgb(225,225,225)',
        //      animationDuration: 0
        // },

        // Zooming directions. Remove the appropriate direction to disable
        // Eg. 'y' would only allow zooming in the y direction
        // A function that is called as the user is zooming and returns the
        // available directions can also be used:
        //   mode: function({ chart }) {
        //     return 'xy';
        //   },
        mode: 'x',

        rangeMin: {
            // Format of min zoom range depends on scale type
            x: null
        },
        rangeMax: {
            // Format of max zoom range depends on scale type
            x: null
        },

        // Speed of zoom via mouse wheel
        // (percentage of zoom on a wheel event)
        speed: 0.1,

        // Minimal zoom distance required before actually applying zoom
        // threshold: 2,

        // On category scale, minimal zoom level before actually applying zoom
        sensitivity: 5,

        // Function called while the user is zooming
        onZoom: function({chart}: { chart: Chart }) { console.log(`I'm zooming!!!`); },
        // Function called once zooming is completed
        onZoomComplete: function({chart}: { chart: Chart } ) { console.log(`I was zoomed!!!`); }
    }
}