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
        curve: "smooth",
        width: 3,
    },
    title: {
        text: `Live Number of particles per object type`,
        align: "left",
        offsetX: 110,
    },
    xaxis: {
        type: "datetime",
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        categories: [],
        range: 30000 // last minute
    },
    yaxis: [
        {
            max: 20,
            min: -10,
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
                intersect: false,
                shared: true,
                enabled: true,
            },
        },
        {
            max: 20,
            min: -10,
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
            max: 20,
            min: -10,
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
            max: 20,
            min: -10,
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
            max: 20,
            min: -10,
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
        }
    ],
    tooltip: {
        intersect: false,
        shared: true,
        x: {
            format: "dd MM yyyy HH:mm:ss"
        }
    },
    legend: {
        horizontalAlign: "left",
        offsetX: 40,
    },
};
export const ApexChartConfig2 = {
    chart: {
        id: "realtime",
        height: 350,
        type: "line",
        animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
                speed: 1000,
            },
        },
        toolbar: {
            show: true,
        },
        zoom: {
            enabled: true,
            type: 'x',
            autoScaleYaxis: false,
            zoomedArea: {
                fill: {
                    color: '#90CAF9',
                    opacity: 0.4
                },
                stroke: {
                    color: '#0D47A1',
                    opacity: 0.4,
                    width: 1
                }
            }
        }
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 3,
    },
    title: {
        text: "Dynamic Updating Chart",
        align: "left",
    },
    markers: {
        size: 0,
    },
    xaxis: {
        type: "datetime",
        range: 60000,
    },
    yaxis: {
        max: 20,
        min: -10
    },
    legend: {
        show: false,
    },
};
//# sourceMappingURL=chart-options.js.map