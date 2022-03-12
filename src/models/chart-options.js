export const lineGraphChartOptions = {
    chart: {
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 1000
            }
        },
        height: 350,
        type: "line",
        stacked: false,
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: [1, 1, 4],
    },
    title: {
        text: `Live Number of particles per object type`,
        align: "left",
        offsetX: 110,
    },
    xaxis: {
        // tickPlacement: 'on',
        // min: 5,
        // max: 10,
        type: "datetime",
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        categories: [],
        range: 60000 // last minute
    },
    yaxis: [
        {
            seriesName: "0 - 3",
            show: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: "#008FFB",
            },
            labels: {
                style: {
                    colors: "#008FFB",
                },
            },
            title: {
                text: "Size(um)",
                style: {
                    color: "#008FFB",
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        {
            seriesName: "3 - 6",
            show: true,
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: "#00E396",
            },
            labels: {
                style: {
                    colors: "#00E396",
                },
            },
            title: {
                text: "Size(um)",
                style: {
                    color: "#00E396",
                },
            },
        },
        {
            seriesName: "6 - 9",
            show: true,
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: "#FEB019",
            },
            labels: {
                style: {
                    colors: "#FEB019",
                },
            },
            title: {
                text: "Size(um)",
                style: {
                    color: "#FEB019",
                },
            },
        },
        {
            seriesName: "9 - 12",
            show: true,
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: "#FEB019",
            },
            labels: {
                style: {
                    colors: "#FEB019",
                },
            },
            title: {
                text: "Size(um)",
                style: {
                    color: "#FEB019",
                },
            },
        },
        {
            seriesName: "12+",
            show: true,
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: "#FEB019",
            },
            labels: {
                style: {
                    colors: "#FEB019",
                },
            },
            title: {
                text: "Size(um)",
                style: {
                    color: "#FEB019",
                },
            },
        },
    ],
    tooltip: {
        x: {
            format: "dd MM yyyy HH:mm:ss"
        },
        fixed: {
            enabled: true,
            position: "topLeft",
            offsetY: 30,
            offsetX: 60,
        },
    },
    legend: {
        horizontalAlign: "left",
        offsetX: 40,
    },
};
//# sourceMappingURL=chart-options.js.map