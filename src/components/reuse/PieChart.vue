<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col style="height: 50px;">
        <v-radio-group
          v-model="currentObjectType"
          row
        >
          <v-radio
            v-for="(type, idx) in objectTypes"
            cache-items
            :loading="loading"
            :label="type"
            :value="objectTypes[idx]"
            :key="`${idx}-${type}`"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <div id="chart-pie" v-if="!loading && currentChartOptions">
      <apexchart
        v-if="currentSeries"
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
      if (!total_detections || (total_detections && total_detections.length < 1)) {
        this.loading = false;
        return;
      }
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
        const distributionSizesOrder = Object.keys(distributions).sort((d1, d2) => ( Number(d1.match(/^\d+/)[0]) - Number(d2.match(/^\d+/)[0]) ));
        for (let distributionSize of distributionSizesOrder) {
          currentOptions.labels.push(distributionSize);
          currentSeries.push(distributions[distributionSize]);
        }
        const sum = currentSeries.reduce((s, c) => s+c, 0);
        if (sum > 0) {
          chartOptions[objectType] = currentOptions;
          series[objectType] = currentSeries;
          objectTypes.push(objectType);
        }
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
