const ChartOptionsChartJS = {
    getOptions() {
        return {
            scales: ChartOptionsChartJS.getScales(),
            plugins: {
                zoom: {
                    limits: {
                        x: { min: 'original', max: 'original', minRange: 60 * 1000 },
                    },
                    pan: {
                        enabled: true,
                        mode: 'x',
                        modifierKey: 'ctrl'
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        drag: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x'
                    }
                },
                title: {
                    display: true,
                    position: 'bottom',
                    text: "Test chart"
                }
            },
            transitions: {
                zoom: {
                    animation: {
                        duration: 100
                    }
                }
            }
        };
    },
    getPlugins() {
        return {
            colorschemes: {
                scheme: "brewer.Paired12"
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: "xy",
                    speed: 20,
                    threshold: 10,
                },
                zoom: {
                    enabled: true,
                    drag: false,
                    mode: (event) => {
                        return "xy";
                    },
                    speed: 0.1,
                    sensitivity: 3
                }
            }
        };
    },
    getScales() {
        return {
            xAxes: [
                {
                    type: "time",
                    time: {
                        unit: "second"
                    }
                }
            ],
            yAxes: []
        };
    }
};
const lineGraphChartOptions = {
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
const FusionChartConfig = {
    config: {
        type: "column2d",
        width: "700",
        height: "400",
        dataFormat: "json",
        dataSource: {
            // Chart Configuration
            chart: {
                caption: "Countries With Most Oil Reserves [2017-18]",
                subCaption: "In MMbbl = One Million barrels",
                xAxisName: "Country",
                yAxisName: "Reserves (MMbbl)",
                numberSuffix: "K",
                theme: "fusion" //Set the theme for your chart
            },
            // Chart Data - from step 2
            data: []
        }
    },
    dataSource: {
        chart: {
            caption: "Countries With Most Oil Reserves [2017-18]",
            subcaption: "In MMbbl = One Million barrels",
            xaxisname: "Country",
            yaxisname: "Reserves (MMbbl)",
            numbersuffix: "K",
            theme: "fusion"
        },
        data: []
    }
};
export const GlobalChartConfig = {
    chartjs: { options: ChartOptionsChartJS.getOptions(), scales: ChartOptionsChartJS.getScales() },
    apexcharts: { lineGraph: lineGraphChartOptions },
    fusionCharts: { config: FusionChartConfig.config, datasource: FusionChartConfig.dataSource }
};
//# sourceMappingURL=index.js.map