
<template>
    <div id="app">
         <ejs-chart id= "container" :title='title' ref="graphs" :primaryXAxis='primaryXAxis' :crosshair='crosshair' :tooltip='tooltip' :animation="animation" :zoomSettings="zoom" :legendSettings="legend">
            <e-series-collection>
                <e-series v-for="(serie, idx) in objectTypes"
                  :key="`object-type-${objectTypes[idx]}`"
                  :dataSource='seriesData' type='Line' xName='x'
                  :yName='serie'
                  :name="serie"
                  :marker='marker'
                >
                </e-series>
                <!-- <e-series :dataSource='seriesData' type='Line' xName='x' yName='y' :marker='marker'> </e-series>
                <e-series :dataSource='seriesData' type='Line' xName='x' yName='y1' :marker='marker'> </e-series>
                <e-series :dataSource='seriesData' type='Line' xName='x' yName='y2' :marker='marker'> </e-series>
                <e-series :dataSource='seriesData' type='Line' xName='x' yName='y3' :marker='marker'> </e-series>
                <e-series :dataSource='seriesData' type='Line' xName='x' yName='y4' :marker='marker'> </e-series> -->
            </e-series-collection>
        </ejs-chart>
    </div>
</template>
<script>
import Vue from "vue";
import { ChartPlugin, LineSeries, Legend, Crosshair, DateTime, Tooltip, Chart, Zoom } from "@syncfusion/ej2-vue-charts";
import moment from "moment"
import APIDataPollingIntervalSingleton from '@/utilities/api-data-polling-interval-singleton';

Vue.use(ChartPlugin);

export default {
    mounted() {
        this.appendData();

    },
    methods: {
      startLiveUpdate() {
        const api_poller = APIDataPollingIntervalSingleton.getInstance();
        api_poller.setInterval(this.appendData, 1000);
      },
      stopLiveUpdate() {
        const api_poller = APIDataPollingIntervalSingleton.getInstance();
        api_poller.clearInterval();
      },
      appendData() {
        // const currentts = this.lastFetched + 1000;
        const newDate = new Date().getTime();
        // const dataPoints = await DataService.getDetections(this.lastFetched, null);
        if (this && this.seriesData) {
          if (newDate >= this.primaryXAxis.maximum) {
            this.primaryXAxis.maximum = newDate + 10*1000;
            this.primaryXAxis.minimum += 10*1000;
            this.$refs.graphs.ej2Instances.axisCollections[0].minimum = this.primaryXAxis.minimum;
            this.$refs.graphs.ej2Instances.axisCollections[0].maximum = this.primaryXAxis.maximum;
          }
          this.seriesData.push({ x: newDate, y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100) , y2: Math.floor(Math.random() * 100) , y3: Math.floor(Math.random() * 100) , y4: Math.floor(Math.random() * 100) })
          // (<Chart>this.$refs.graphs).lineSeriesModule.doAnimation(this.seriesData[0])
            // this.$refs.graphs.ej2Instances.animate();
          // this.seriesData.push({ x: new Date().getTime(), })
          // this.seriesData.push({ x: new Date().getTime(), })
          // this.seriesData.push({ x: new Date().getTime(), })
          // this.seriesData.push({ x: new Date().getTime(), })
      }
      // if (dataPoints && dataPoints.timestamps && datapoints.timestamps.length > 0) {
      //   if (!this.firstFetched) {
      //     this.firstFetched = true;
      //     this.lastFetched = moment().utc().unix() * 1000;
      //   } else {
      //     this.lastFetched = this.lastFetched + 1000;
      //   }
      // }
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
        legend: {
          toggleVisibility: true
        },
        zoom: {
            enableMouseWheelZooming: true,
            mode: "X",
            enablePinchZooming: true,
            enablePan: true
            // enableSelectionZooming: true
        },
        animation:{
            enable: true,
            duration: 2000,
            delay: 200
        },
        timezoneOffset: new Date().getTimezoneOffset() * 1000,
        objectTypes: ["y","y1","y2","y3","y4"],
        seriesData: [
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) },
            // { x: moment().utc().unix()*1000 + Math.floor(Math.random() * 84600), y: Math.floor(Math.random() * 100), y1: Math.floor(Math.random() * 100), y2: Math.floor(Math.random() * 100), y3: Math.floor(Math.random() * 100), y4: Math.floor(Math.random() * 100) }
              ],
      primaryXAxis: {
            title: 'Seconds',
            minimum: new Date().getTime() - 1000 * (30 * 1),
            maximum: new Date().getTime() + 1000*(10 * 1),
            // maximum: moment().utc().endOf("day").unix(),
            interval: 1000,
            intervalType: 'Seconds',
            valueType: 'DateTime'
        },
        title: "Live Object Detections",
        crosshair: {  enable: true, lineType: 'Vertical' },
        tooltip: { enable: true, shared: true, format: '${series.name} : ${point.x} : ${point.y}' },
        marker: { visible: true }
    };
  },
  provide: {
    chart: [LineSeries, Crosshair, DateTime, Tooltip, Legend, Zoom]
  },
};
</script>
<style>
 #container {
   height: 350px;
 }
</style>