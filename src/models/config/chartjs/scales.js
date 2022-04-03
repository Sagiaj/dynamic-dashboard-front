import moment from "moment";
export const scalesConfig = {
    xAxes: [
        {
            type: "realtime",
            distribution: "linear",
            ticks: { max: moment().unix() * 1000 + 5000, min: moment().utc().subtract(1, "hour").unix() * 1000, stepSize: 1, sampleSize: 10 },
            time: {
                displayFormats: {
                    hour: 'HH:mm',
                    minute: 'HH:mm',
                    second: 'HH:mm:ss',
                    millisecond: "HH:mm:ss"
                },
                unit: "minute",
                stepSize: 10
            },
            realtime: {
                duration: (60 * (60 * 1000)),
                ttl: (60 * (60 * 1000)),
                refresh: 1000,
                delay: 10000,
                pause: false
            }
        }
    ],
    yAxes: [{
            scaleLabel: {
                display: true
            }
        }]
};
//# sourceMappingURL=scales.js.map