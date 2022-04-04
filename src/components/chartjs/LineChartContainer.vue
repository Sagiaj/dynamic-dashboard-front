<template>
  <v-container fluid class="py-0">
    <div class="container">
      <line-chart v-if="displayChart" :chart-data.sync="chartData" @updateSeries="updateSeries" @stopLiveUpdate="stopLiveUpdate" @getChartData="getChartData" :height="140"
        :chartOptions.sync="chartOptions" :threshold="SystemData.threshold" ref="liveChart"/>
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
  props: ["SystemData", "pointDensity"],
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
      this.chartData.datasets = [];
      this.firstFetched = false;
      this.resetDisabled = true;
      this.tickLiveUpdate();
    },
    async tickLiveUpdate() {
      this.startStreaming();
      this.liveMode = true;
      this.firstFetched = true;
      let ts_in_the_past = this.chartOptions.plugins.streaming.duration;
      if (this.$refs.liveChart) {
        ts_in_the_past = this.$refs.liveChart.$data.chart.options.scales.xAxes[0].realtime.duration;
      }
      await this.getChartData(moment().unix() * 1000 - ts_in_the_past, moment().unix() * 1000 - 1000);
      this.finishedFetchingData = true;
      this.$refs.liveChart.$data.chart.options.scales.xAxes[0].realtime.delay = 0;
    },
    startStreaming() {
      if (this.$refs.liveChart) {
        this.$refs.liveChart.setOnRefresh();
        this.$refs.liveChart.$data.chart.options.scales.xAxes[0].realtime.pause = false;
      }
    },
    stopStreaming() {
      if (this.$refs.liveChart) {
        this.$refs.liveChart.$data.chart.options.scales.xAxes[0].realtime.pause = true;
      }
    },
    stopLiveUpdate() {
      this.liveMode = false;
      this.stopStreaming();
      this.resetDisabled = false;
      this.firstFetched = false;
      if (this.$refs.liveChart) {
        this.$refs.liveChart.$data._chart.update();
      }
    },
    async getChartData(min, max, chart, live) {
      const dataPoints = await DataService.getDetections(Number(min), Number(max), Number(this.pointDensity));
      let { timestamps, ...detections } = dataPoints;
      for (let seriename in this.suggestedMaximums) {
        this.suggestedMaximums[seriename] = 0;
      }
      const datapointsPerSerie = this.getSerieDataPointsFromDetections(detections);
      await this.resetGraphHistory(datapointsPerSerie);
      const keys = Object.keys(timestamps).map(Number)
      this.lastFetched = Math.max(...keys);
      this.finishedFetchingData = true;
      if (this.$refs.liveChart) {
        this.$refs.liveChart.$data._chart.update();
      }
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
      try {
        const currentts = this.lastFetched + this.accumulatedMs;
        const dataPoints = await DataService.getDetections((from || this.lastFetched) + 1, to || currentts, Number(this.pointDensity));
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
      } catch (err) {
        console.log("Failed updateSeries. Error=", err);
      }
    },
    getSerieDataPointsFromDetections(detections) {
      const datapointsPerSerie = {};
      for (let serieName in detections) {
          let serie_index = this.chartData.datasets.findIndex(s => s && s.label === serieName);
          if (serie_index === -1) {
            serie_index = this.createSeriesDataset(serieName);
          } else {
            this.updateScaleStyles(serieName, serie_index);
          }

          const points_to_push = [];
          for (let seriePoint of detections[serieName]) {
            this.updateGraphMaximum(seriePoint, serieName, serie_index);
            points_to_push.push({ x: seriePoint.timestamp, y: seriePoint.amount });
          }
          datapointsPerSerie[serieName] = points_to_push;
        }
        return datapointsPerSerie;
    },
    createSeriesDataset(serieName) {
      let serie_index = this.chartData.datasets.push({
        data: [],
        fill: false,
        yAxisID: serieName,
        label: serieName,
        pointBorderWidth: 1,
        ...DatasetSettings[this.chartData.datasets.length]
      }) - 1;

      if (this.$refs.liveChart) { this.$refs.liveChart.$data._chart.update(); }

      this.chartOptions.scales.yAxes[serie_index] = {
        id: serieName,
        type: "linear",
        ticks: { beginAtZero: true, fontColor: DatasetSettings[this.chartData.datasets.length].borderColor },
        gridLines: { display: true }
      };

      if (this.$refs.liveChart) {
        this.$refs.liveChart.$data._chart.update();
      }

      this.suggestedMaximums[serieName] = 0;
      return serie_index;
    },
    appendSerieDataPoints(datapointsPerSerie) {
      for (let serieName in datapointsPerSerie) {
        const serie_index = this.chartData.datasets.findIndex(serie => serie.yAxisID === serieName);
        const points_to_push = datapointsPerSerie[serieName];
        this.chartData.datasets[serie_index].data.push(...points_to_push);
        if (this.$refs.liveChart) {
          this.$refs.liveChart.$data._chart.update();
        }
      }
    },
    updateGraphMaximum(seriePoint, serieName, serie_index) {
      if ((seriePoint.amount * 1.8) > this.suggestedMaximums[serieName]) {
        this.suggestedMaximums[serieName] = seriePoint.amount * 1.8;
        this.chartOptions.scales.yAxes[serie_index].ticks["suggestedMax"] = this.suggestedMaximums[serieName];
        this.chartOptions.scales.yAxes[serie_index].ticks["suggestedMin"] = 0;
        this.chartOptions.scales.yAxes[serie_index].ticks["min"] = 0;
        if (this.$refs.liveChart) {
          this.$refs.liveChart.$data._chart.scales[serieName].options.ticks["suggestedMax"] = this.suggestedMaximums[serieName];
          this.$refs.liveChart.$data._chart.scales[serieName].options.ticks["suggestedMin"] = 0;
          this.$refs.liveChart.$data._chart.scales[serieName].options.ticks["min"] = 0;
          this.$refs.liveChart.$data._chart.update();
        }
      }
    },
    updateScaleStyles(serieName, serie_index) {
      const fontColor = DatasetSettings[serie_index].borderColor;
      this.chartOptions.scales.yAxes[serie_index].ticks.fontColor = fontColor;

      if (this.$refs.liveChart) {
        this.$refs.liveChart.$data._chart.scales[serieName].options.ticks.fontColor = fontColor;
        this.$refs.liveChart.updateChartStyles();
        this.$refs.liveChart.$data._chart.update();
      }
    }
  },
  watch: {
    liveMode(cur, prev) {
      if (!!cur) {
        this.tickLiveUpdate();
      } else {
        this.$refs.liveChart.$data.liveMode = false;
      }
    },
    chosenTimeRange(cur) {
      if (!cur) { return; }
      this.startStreaming();
      const min = moment.utc().toISOString().split("T")[0] + " " + this.timeFrom;
      const max = moment.utc().toISOString().split("T")[0] + " " + this.timeTo;
      const minUtc = moment(min).utc().unix() * 1000;
      const maxUtc = moment(max).utc().unix() * 1000;

      this.$refs.liveChart.$data._chart.update();
      const now = (moment().utc().unix() * 1000);
      const duration = Math.abs(maxUtc - minUtc);
      let delay = now - maxUtc;

      this.resetDisabled = true;
      this.getChartData(minUtc, maxUtc).then(r => {
        this.stopStreaming();
        this.$refs.liveChart.$data.chart.options.scales.xAxes[0].realtime.duration = duration;
        this.$refs.liveChart.$data.chart.options.scales.xAxes[0].realtime.delay = delay;
        this.$refs.liveChart.$data.liveMode = false;
        this.$refs.liveChart.$data._chart.update();
        this.liveMode = false;
      });
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
      liveMode: true,
      resetDisabled: true,
      loading: false,
      timeToModal: null,
      timeTo: null,
      timeFromModal: null,
      timeFrom: null,
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
      firstFetched: false,
      chartOptions: GlobalChartConfig.chartjs,
      lastFetched: moment().unix() * 1000 - (60 * (60 * 1000)),
      accumulatedMs: 1000,
      chartData: {
        labels: [],
        datasets: []
      },
      finishedFetchingData: false,
      suggestedMaximums: {
        
      }
    };
  },
};
</script>
