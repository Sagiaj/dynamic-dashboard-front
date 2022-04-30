<template>
  <v-container grid-list-xl>
    <div id="chart">
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import DataService from '@/api/services/data-service';

export default {
  name: "ColumnsChart",
  components: {
    apexchart: VueApexCharts,
  },
  async beforeMount() {
    try {
      let seriesData = await DataService.getDetectionsHourlyAverage();
      seriesData = seriesData.sort((a, b) => b._id.hour - a._id.hour);
      for (let data of seriesData) {
        const series_idx = this.series.findIndex(serie => serie && serie.name && serie.name === data._id.type);

        if (series_idx === -1) {
          let seriename = data._id.type;
          series_idx = this.series.push({
            data: [],
            name: seriename
          }) - 1;
        }
        const hour = `${String(data._id.hour).padStart(2, 0)}:00`;
        if (this.chartOptions.xaxis.categories.findIndex(category => category === hour) === -1) {
          this.chartOptions.xaxis.categories.push(hour);
        }
        this.series[series_idx].data.push(Number(data.unitPerML).toFixed(1));
      }
    } catch (err) {
      console.log("Failed populating hourly average. Error=", err);
    }
  },
  data() {
    return {
      series: [],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: [],
            },
            yaxis: {
              title: {
                text: 'Detections hourly average (per 1mL)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "Average " + Number(val).toFixed(1) + " um"
                }
              }
            }
          }
    };
  },
};
</script>
