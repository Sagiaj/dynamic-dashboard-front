<template>
    <v-container grid-list-xl>
        <v-row>
            <v-col>
                <div id="chart-container">
                    <fusioncharts
                        :width="width"
                        :height="height"
                        :type="type"
                        :dataFormat="dataFormat"
                        :dataSource="dataSource"
                    >
                        FusionCharts will render here...
                    </fusioncharts>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { GlobalChartConfig } from "@/models/config/index";
// const config = GlobalChartConfig.fusionCharts.config;

export default {
    name: "LineChartFusionCharts",
    data() {
        return {
            config: {
                type: "column2d", // The chart type
                width: "700", // Width of the chart
                height: "400", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                // Chart Configuration
                chart: {
                    caption: "Countries With Most Oil Reserves [2017-18]",   //Set the chart caption
                    subCaption: "In MMbbl = One Million barrels",            //Set the chart subcaption
                    xAxisName: "Country",             //Set the x-axis name
                    yAxisName: "Reserves (MMbbl)",    //Set the y-axis name
                    numberSuffix: "K",
                    theme: "fusion"                   //Set the theme for your chart
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
        }
    }
}
</script>