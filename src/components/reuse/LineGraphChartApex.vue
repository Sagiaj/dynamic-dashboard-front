<template>
  <v-container grid-list-xl>
    <v-row>
      <v-col>
        <apexchart
          type="line"
          height="700"
          :options.sync="chartOptions"
          :series="series"
          ref="liveChart"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import APIDataPollingIntervalSingleton from "@/utilities/api-data-polling-interval-singleton";
import DataService from "@/api/services/data-service";
import { lineGraphChartOptions } from "@/models/chart-options";

export default {
  name: "LineGraphChartApex",
  computed: {},
  watch: {
    "chartOptions.yaxis": {
      deep: true,
      handler(oldVal, newVal) {
        console.log("check this changeD!!!!", oldVal, newVal)
      }
    }
  },
  methods: {
    startLiveUpdate() {
      const api_poller = APIDataPollingIntervalSingleton.getInstance();
      api_poller.setInterval(this.updateSeries, 1000);
    },
    stopLiveUpdate() {
      const api_poller = APIDataPollingIntervalSingleton.getInstance();
      api_poller.clearInterval();
    },
    async getTodayCategories() {
      return ["0 - 3", "3 - 6", "6 - 9", "9 - 12", "12+"];
    },
    async updateSeries() {
      // const dataPoints = await DataService.getDetections(this.lastFetched, null);
      const currentts = this.lastFetched + 1000;
        const categs = await this.getTodayCategories();
        const dataPoints = { timestamps: [currentts] };
        for (let category of categs) {
          dataPoints[category] = [{ timestamp: currentts, amount: Math.floor(Math.random() * 10) }];
        }

      const { timestamps, ...series } = dataPoints;
      const categories = Object.keys(timestamps);

      let appendedSeries = [];
      for (let serieName in series) {
        let serie_index = this.series.findIndex(s => s && s.name === serieName);
        if (serie_index === -1) {
          serie_index = (this.series.length || 1) - 1;
          this.series.push({
            data: [],
            type: "line",
            name: serieName
          })
        }

        appendedSeries[serie_index] = { name: serieName, data: [] };
        for (let seriePoint of series[serieName]) {
          appendedSeries[serie_index].data.push({
            x: seriePoint.timestamp, y: seriePoint.amount || 0
          });
        }
      }
      console.log("to be pushed", appendedSeries);
      this.$refs.liveChart.appendData(appendedSeries, true);

      if (dataPoints && dataPoints.timestamps && categories && categories.length > 0) {
        if (!this.firstFetched) {
          this.firstFetched = true;
          this.lastFetched = moment().utc().unix() * 1000;
        } else {
          this.lastFetched = this.lastFetched + 1000;
        }
      }
    },
    async addSeriesCategories(categories_to_add) {
      if (categories_to_add && categories_to_add.length > 0) {
        this.chartOptions.xaxis.categories.push(...categories_to_add);
      } else {
        console.log("No categories to add.");
      }
    },
    async addSeriesDataPoints(series_of_objects_to_add, serie_index) {
      this.series[serie_index].data.push(...series_of_objects_to_add);
      // this.$refs.liveChart.updateSeries([{
      //   data: this.series[serie_index].data.map(a => a.amount || 0)
      // }], false, true);
    }
  },
  created() {
    this.startLiveUpdate();
  },
  beforeRouteLeave(to, from, next) {
    this.stopLiveUpdate();
    next(to);
  },
  beforeDestroy() {
    this.stopLiveUpdate();
  },
  async beforeMount() {},
  data() {
    return {
      series: [],
      chartOptions: lineGraphChartOptions,
      // lastFetched: moment().utc().unix() * 1000,
      lastFetched: moment().utc().startOf("day").unix() * 1000,
      categories: [],
      seriesData: [],
      firstFetched: false
    };
  }
};
</script>
