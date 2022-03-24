<template>
  <v-container fluid class="py-0">
    <div class="container">            
      <line-chart v-if="displayChart" :chart-data.sync="chartData" @updateSeries="updateSeries" @stopLiveUpdate="stopLiveUpdate" @getChartData="getChartData" :height="140"
        :chartOptions.sync="chartOptions" :reset="resetChart" ref="liveChart" @click-chart-element="(el) => {}"/>
      <v-skeleton-loader
        v-else
        v-bind="attrs"
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </div>
      <v-row no-gutters>
          <v-col cols="12" align-self="center">
            <v-row justify="space-around" no-gutters>
              <v-col cols="6" align-self="center">
                <v-row no-gutters>
                  <v-col cols="5" align-self="center" no-gutters>
                    <v-btn
                      rounded
                      color="primary"
                      :loading="loading"
                      @click.native="startLiveUpdate"
                      :disabled="resetDisabled"
                      class="background--text text-caption"
                    >
                      Reset Zoom
                      <v-icon right dark>mdi-restart</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="6" align-self="center">
                    <v-switch
                      v-model="liveMode"
                      color="primary"
                      :label="`Live Mode: ${liveMode ? 'On' : 'Off'}`"
                      :loading="loading"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3" align-self="center">
                <v-dialog
                  ref="dialogFrom"

                  v-model="timeFromModal"
                  :return-value.sync="timeFrom"
                  max-width="350px"
                  persistent
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="timeFrom"
                      clearable
                      label="Begin From"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    clearable
                    use-seconds
                    v-if="timeFromModal"
                    v-model="timeFrom"
                    full-width
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="timeFromModal = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialogFrom.save(timeFrom)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
              <v-col cols="3">
                <v-dialog
                  ref="dialogTo"
                  v-model="timeToModal"
                  :return-value.sync="timeTo"
                  max-width="350px"
                  persistent
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      clearable
                      v-model="timeTo"
                      label="End At"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    use-seconds
                    v-if="timeToModal"
                    v-model="timeTo"
                    full-width
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="timeToModal = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialogTo.save(timeTo)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import DataService from "@/api/services/data-service";
import LineChart from "./LineChart.vue";
import colors from 'vuetify/lib/util/colors'
import { GlobalChartConfig } from '@/models/config';
import { annotationsConfig } from '@/models/config/chartjs/annotations';
import { streamingConfig } from '@/models/config/chartjs/streaming';
function addOpacity(color, opacity) {
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}
const DatasetSettings = [
  {
    borderColor: addOpacity(colors.amber.darken1, 0.65),
    backgroundColor: addOpacity(colors.blueGrey.lighten5, 0.8),
    pointBorderColor: addOpacity(colors.indigo.lighten2, 0.8),
    pointBackgroundColor: addOpacity(colors.amber.darken1, 0.3),
    pointBorderWidth: 1,
  },
  {
    borderColor: addOpacity(colors.deepOrange.darken1, 0.65),
    backgroundColor: addOpacity(colors.lime.lighten5, 0.8),
    pointBorderColor: addOpacity(colors.lightGreen.lighten3, 0.8),
    pointBackgroundColor: addOpacity(colors.deepOrange.darken1, 0.65),
    pointBorderWidth: 1,
  },
  {
    borderColor: addOpacity(colors.purple.darken1, 0.65),
    backgroundColor: addOpacity(colors.teal.lighten5, 0.8),
    pointBorderColor: addOpacity(colors.yellow.lighten2, 0.8),
    pointBackgroundColor: addOpacity(colors.purple.darken1, 0.5),
    pointBorderWidth: 1,
  },
  {
    borderColor: addOpacity(colors.lightGreen.darken1, 0.65),
    backgroundColor: addOpacity(colors.indigo.lighten5, 0.8),
    pointBorderColor: addOpacity(colors.lime.darken3, 0.8),
    pointBackgroundColor: addOpacity(colors.lightGreen.darken1, 0.3),
    pointBorderWidth: 1,
  },
  {
    borderColor: addOpacity(colors.orange.darken1, 0.65),
    backgroundColor: addOpacity(colors.red.lighten5, 0.8),
    pointBorderColor: addOpacity(colors.orange.darken1, 0.8),
    pointBackgroundColor: addOpacity(colors.orange.darken1, 0.3),
    pointBorderWidth: 1,
  },
];

export default {
  name: "LineChartContainer",
  components: { LineChart },
  props: ["SystemData"],
  computed: {
    displayChart() {
      return this.finishedFetchingData || this.chartData.datasets.length > 0;
    },
    chosenTimeRange() {
      return !this.timeToModal && !this.timeFromModal && this.timeTo && this.timeFrom && this.timeFrom < this.timeTo;
    }
  },
  methods: {
    startLiveUpdate(from, to) {
      this.finishedFetchingData = false;
      this.liveMode = true;
      this.firstFetched = false;
      this.resetDisabled = true;
      this.chartData.datasets = [];
      this.updateSeries(from || (moment().unix() * 1000 - 60 * 60 * 1000 ), to || ( moment().unix() * 1000 - 1000) ).then(() => {
        this.finishedFetchingData = true;
      });
    },
    tickLiveUpdate() {
      this.liveMode = true;
      this.firstFetched = true;
      // this.resetDisabled = true;
      // this.lastFetched = moment().unix() * 1000 - 60 * 1000;
      // this.chartData.datasets = [];
      // if (this.$refs.liveChart) {
        // this.$refs.liveChart.chart.options.plugins.streaming.pause = false;
      // }
      // this.updateSeries(null, moment().unix() * 1000 - 1000).then(r => {
      //   this.finishedFetchingData = true;
      // });
      // this.setupCleanupInterval();
      if (this.$refs.liveChart) {
        this.$refs.liveChart.setOnRefresh();
        this.$refs.liveChart.chart.options.plugins.streaming = streamingConfig;
        this.$refs.liveChart.chart.options.plugins.streaming.pause = false;
        this.$refs.liveChart.chart.options.plugins.streaming.onRefresh = this.$refs.liveChart.onRefresh;
        this.$refs.liveChart.options.plugins.streaming.onRefresh = this.$refs.liveChart.onRefresh;
        // this.$refs.liveChart.$data._chart.options.plugins.streaming.onRefresh = this.$refs.liveChart.onRefresh;
        // this.$refs.liveChart.chart.resetZoom();
        // this.$refs.liveChart.$data._chart.update();
        console.log(this.$refs.liveChart.chart)
      }
    },
    setupCleanupInterval() {
      const that = this;
      this.memoryClearupInterval = setInterval(() => {
        const min = moment().unix() * 1000 - 60 * 1000 + 1;
        const max = moment().unix() * 1000 + 5 * 1000;
        // this.chartData.datasets = [];
        that.getChartData(min, max, null, true).then(() => {
          this.chartOptions.plugins.annotations = annotationsConfig;
          this.chartOptions.plugins.streaming = streamingConfig;
          this.chartOptions.plugins.annotations.scaleID = this.chartData.datasets[0].yAxisID;
          this.chartOptions.plugins.annotations.value = this.SystemData.threshold;
          that.loading = false;
          if (that.$refs.liveChart) {
            // that.$refs.liveChart.$data._chart.update();
          }
        });
      }, 10000);
    },
    stopLiveUpdate() {
      // this.finishedFetchingData = false;
      this.liveMode = false;
      this.$refs.liveChart.chart.options.plugins.streaming.pause = true;
      // this.chartOptions.plugins.streaming.pause = true;
      // this.chartOptions.scales.xAxes[0].realtime.pause = true;
      this.resetDisabled = false;
      this.firstFetched = false;
      clearInterval(this.memoryClearupInterval);
      if (this.$refs.liveChart) {
        // this.$refs.liveChart.$data._chart.update();
      }
    },
    async getChartData(min, max, chart, live) {
      // this.finishedFetchingData = true;
      const dataPoints = await DataService.getDetections(Number(min), Number(max));
      let { timestamps, ...detections } = dataPoints;
      const datapointsPerSerie = this.getSerieDataPointsFromDetections(detections);
      await this.resetGraphHistory(datapointsPerSerie);
      const keys = Object.keys(timestamps).map(Number)
      this.lastFetched = Math.max(...keys);
      this.finishedFetchingData = true;
    },
    async resetGraphHistory(datapointsPerSerie) {
      try {
        for (let i = 0; i < this.chartData.datasets.length; i++) {
          this.chartData.datasets[i].data = datapointsPerSerie[this.chartData.datasets[i].yAxisID];
        }
      } catch (err) {
        console.log("Failed resetting graph history. Error=", err);
      }
    },
    async updateSeries(from, to) {
      this.loading = true;
      try {
        const currentts = this.lastFetched + this.accumulatedMs;
        const dataPoints = await DataService.getDetections((from || this.lastFetched) + 1, to || currentts);
        let { timestamps, ...detections } = dataPoints;
        timestamps = Object.keys(timestamps);

        const datapointsPerSerie = this.getSerieDataPointsFromDetections(detections);
        this.appendSerieDataPoints(datapointsPerSerie);

        if (!this.firstFetched) {
          this.firstFetched = true;
          this.lastFetched = moment().unix() * 1000;
        }

        if (dataPoints && dataPoints.timestamps && timestamps.length > 0) {
          this.lastFetched = currentts;
          this.accumulatedMs = 1000;
        } else {
          this.accumulatedMs += 1000;
        }

        if (this.$refs.liveChart) {
          // await this.$refs.liveChart.$data._chart.update();
        }
      } catch (err) {
        console.log("Failed updateSeries. Error=", err);
      }
      this.loading = false;
    },
    getSerieDataPointsFromDetections(detections) {
      const datapointsPerSerie = {};
      for (let serieName in detections) {
          let serie_index = this.chartData.datasets.findIndex(s => s && s.label === serieName);
          if (serie_index === -1) {
            serie_index = this.chartData.datasets.push({
                data: [],
                fill: false,
                yAxisID: serieName,
                label: serieName,
                pointBorderWidth: 1,
                ...DatasetSettings[this.chartData.datasets.length]
              }) - 1;

              this.chartOptions.scales.yAxes[serie_index] = {
                id: serieName,
                type: "linear",
                ticks: { max: 50, min: 0, stepSize: 0.1 },
                ticks: { beginAtZero: true },
                gridLines: {
                  display: false
                }
              };
          }

          const points_to_push = [];
          for (let seriePoint of detections[serieName]) {
            points_to_push.push({ x: seriePoint.timestamp, y: seriePoint.amount });
          }
          datapointsPerSerie[serieName] = points_to_push;
        }
        return datapointsPerSerie;
    },
    appendSerieDataPoints(datapointsPerSerie) {
      for (let serieName in datapointsPerSerie) {
        const serie_index = this.chartData.datasets.findIndex(serie => serie.yAxisID === serieName);
        const points_to_push = datapointsPerSerie[serieName];
        this.chartData.datasets[serie_index].data.push(...points_to_push);
      }
    }
  },
  watch: {
    liveSwitch(cur, prev) {
      if (!!cur) {
        this.tickLiveUpdate();
      } else {
        this.$refs.liveChart.$data.liveMode = false;
      }
    },
    liveMode(cur, prev) {
      if (!!cur) {
        this.tickLiveUpdate();
      }
    },
    chosenTimeRange(cur) {
      if (!cur) { return; }
      const min = moment().utc().toISOString().split("T")[0] + " " + this.timeFrom;
      const max = moment().utc().toISOString().split("T")[0] + " " + this.timeTo;
      const minUtc = moment(min).utc().unix() * 1000;
      const maxUtc = moment(max).utc().unix() * 1000;
      this.chartOptions.scales.xAxes[0].ticks.min = minUtc;
      this.chartOptions.scales.xAxes[0].ticks.max = maxUtc;
      this.$refs.liveChart.$data._chart.scales["x-axis-0"].min = minUtc;
      this.$refs.liveChart.$data._chart.scales["x-axis-0"].max = maxUtc;
      this.resetDisabled = true;
      this.getChartData(minUtc, maxUtc);
    }
  },
  mounted() {
    this.startLiveUpdate();
  },
  beforeRouteLeave(to, from, next) {
    this.stopLiveUpdate();
    next(to);
  },
  beforeDestroy() {
    this.stopLiveUpdate();
  },
  data() {
    return {
      liveSwitch: true,
      liveMode: true,
      resetDisabled: true,
      loading: false,
      timeToModal: null,
      timeTo: null,
      timeFromModal: null,
      timeFrom: null,
      memoryClearupInterval: null,
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
      rangesAreWatched: false,
      firstFetched: false,
      chartOptions: GlobalChartConfig.chartjs,
      lastFetched: moment().unix() * 1000 - (60 * (60 * 1000)),
      accumulatedMs: 1000,
      resetChart: 0,
      chartData: {
        labels: [],
        datasets: [],
        bufferedDatasets: []
      },
      finishedFetchingData: false
    };
  },
};
</script>
