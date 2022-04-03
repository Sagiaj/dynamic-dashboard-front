export const annotationsConfig = {
    // Defines when the annotations are drawn.
    // This allows positioning of the annotation relative to the other
    // elements of the graph.
    //
    // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
    // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
    drawTime: 'afterDatasetsDraw',
    // Mouse events to enable on each annotation.
    // Should be an array of one or more browser-supported mouse events
    // See https://developer.mozilla.org/en-US/docs/Web/Events
    events: ['click'],
    // Double-click speed in ms used to distinguish single-clicks from 
    // double-clicks whenever you need to capture both. When listening for
    // both click and dblclick, click events will be delayed by this
    // amount.
    dblClickSpeed: 350,
    // Array of annotation configuration objects
    // See below for detailed descriptions of the annotation options
    annotations: [{
            type: 'line',
            // optional drawTime to control layering, overrides global drawTime setting
            // drawTime: 'afterDatasetsDraw',
            // optional annotation ID (must be unique)
            // id: 'red-line',
            // set to 'vertical' to draw a vertical line
            mode: 'horizontal',
            // ID of the scale to bind onto
            scaleID: 'bacteria',
            // Data value to draw the line at
            value: 25,
            // Optional value at which the line draw should end
            // endValue: 26,
            // Line color
            borderColor: 'red',
            // Line width
            borderWidth: 5,
            // Line dash
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
            // borderDash: [2, 2],
            // Line Dash Offset
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
            // borderDashOffset: 5,
            label: {
                // Background color of label, default below
                backgroundColor: 'rgba(0,0,0,0.8)',
                // Font family of text, inherits from global
                fontFamily: "sans-serif",
                // Font size of text, inherits from global
                fontSize: 12,
                // Font style of text, default below
                fontStyle: "bold",
                // Font color of text, default below
                fontColor: "#fff",
                // Padding of label to add left/right, default below
                xPadding: 6,
                // Padding of label to add top/bottom, default below
                yPadding: 6,
                // Radius of label rectangle, default below
                cornerRadius: 6,
                // Anchor position of label on line, can be one of: top, bottom, left, right, center. Default below.
                position: "center",
                // Adjustment along x-axis (left-right) of label relative to above number (can be negative)
                // For horizontal lines positioned left or right, negative values move
                // the label toward the edge, and positive values toward the center.
                xAdjust: 0,
                // Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
                // For vertical lines positioned top or bottom, negative values move
                // the label toward the edge, and positive values toward the center.
                yAdjust: 0,
                // Whether the label is enabled and should be displayed
                enabled: true,
                // Text to display in label - default is null
                content: "Detections threshold"
            },
            // Mouse event handlers - be sure to enable the corresponding events in the
            // annotation events array or the event handler will not be called.
            // See https://developer.mozilla.org/en-US/docs/Web/Events for a list of
            // supported mouse events.
            onMouseenter: function (e) { },
            onMouseover: function (e) { },
            onMouseleave: function (e) { },
            onMouseout: function (e) { },
            onMousemove: function (e) { },
            onMousedown: function (e) { },
            onMouseup: function (e) { },
            onClick: function (e) { },
            onDblclick: function (e) { },
            onContextmenu: function (e) { },
            onWheel: function (e) { }
        }]
};
//# sourceMappingURL=annotations.js.map