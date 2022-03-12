<template>
  <v-container grid-list-xl fluid>
     <v-select
      label="Object Types"
      autocomplete
      :loading="loading"
      cache-items
      chips
      required
      :items="objectTypes"
      v-model="currentObjectType"
    ></v-select>
    <div id="chart" v-if="!loading">
      <apexchart
        type="pie"
        width="380"
        :options="currentChartOptions"
        :series="currentSeries"
      ></apexchart>
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
    this.loading = true;
    try {
      const total_detections = await DataService.getTotalDetectionsByType();
      const detection_distributions = {};
      const objectTypes = [];
      const chartOptions = {};
      const series = {};

      for (const detection of total_detections) {
        const objectType = detection._id.type;
        let distributionSize = detection.detection_type[0];
        if (distributionSize.indexOf("12") === 0) { distributionSize = "12+" };
        if (!detection_distributions[objectType]) detection_distributions[objectType] = {};
        detection_distributions[objectType][distributionSize] = Number(detection.total);
      }

      for (let objectType in detection_distributions) {
        const currentSeries = [];
        const currentOptions = { chart: { width: 380, type: "pie" }, labels: [], responsive: [ { breakpoint: 480, options: { chart: { width: 200, }, legend: { position: "bottom" } } } ] };
        const distributions = detection_distributions[objectType];
        for (let distributionSize in distributions) {
          currentOptions.labels.push(distributionSize);
          currentSeries.push(distributions[distributionSize]);
        }
        chartOptions[objectType] = currentOptions;
        series[objectType] = currentSeries;
        objectTypes.push(objectType);
      }
      this.currentObjectType = objectTypes[0];
      this.objectTypes = objectTypes;
      this.series = series;
      this.chartOptions = chartOptions;
    } catch (err) {
      console.log("Failed fetching total detections by type. Error=", err);
    }
    this.loading = false
  },
  computed: {
    currentSeries() {
      return this.series[this.currentObjectType];
    },
    currentChartOptions() {
      return this.chartOptions[this.currentObjectType];
    }
  },
  data() {
    return {
      objectTypes: [],
      series: {},
      chartOptions: {},
      currentObjectType: null,
      loading: true
    };
  },
};
</script>
