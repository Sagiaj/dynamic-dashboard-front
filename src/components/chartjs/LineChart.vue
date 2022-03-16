<script>
import Chart from "chart.js";
import { Line, mixins } from 'vue-chartjs';
import { GlobalChartConfig } from '@/models/config';
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
import "chartjs-plugin-zoom";
import 'chartjs-plugin-streaming';

export default {
  extends:  Line,
  mixins: [mixins.reactiveProp],
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    chartOptions: {
      type: Object,
      default: null,
    },
    reset: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    liveMode(newVal) {
      if (!newVal) {
        this.$emit("stopLiveUpdate");
      }
    },
    chartData () {
      this.$data._chart.update()
    },
    reset: function (newval, oldval) {
      console.log("resetting zoom!!!!")
      this.resetZoom();
    }
  },
  methods: {
    onRefresh(chart) {
      if (this.liveMode) {
        this.$emit("updateSeries");
      }
    },
    resetZoom() {
      this.chart.resetZoom();
    },
    onClick(event, activeElements) {
      const element = this.chart.getElementAtEvent(event);
      if (element && element.length > 0) {
        this.$emit("click-chart-element", [element]);
        this.clickChartElement(element);
      }
    },
    defaultPanAndZoomLimits() {
      // this.chart.options.plugins.streaming.duration = 3600 * 1000;
      //pan
      // this.chart.options.plugins.zoom.pan.rangeMin.x = moment().utc().startOf("day").unix() * 1000;
      // this.chart.options.plugins.zoom.pan.rangeMin.y = -5;
      // this.chart.options.plugins.zoom.pan.rangeMax.x = moment().utc().endOf("day").unix() * 1000;
      // this.chart.options.plugins.zoom.pan.rangeMax.y = 20;

      //zoom
      // this.chart.options.plugins.zoom.zoom.rangeMin.x = moment().utc().startOf("day").unix() * 1000;
      // this.chart.options.plugins.zoom.zoom.rangeMax.x = moment().utc().endOf("day").unix() * 1000;
    }
  },
  mounted() {
    Chart.plugins.register([chartjsPluginAnnotation]);
    this.addPlugin([chartjsPluginAnnotation]);
    this.options = this.chartOptions || GlobalChartConfig.chartjs.options;
    this.options.onClick = this.onClick;


    // ZOOM
    this.options.plugins.zoom.zoom.onZoom = (event) => {
      if (!event.chart.isZooming) {
        // event.chart.options.scales.xAxes[0].realtime.duration = 3600 * 1000;
        this.liveMode = true;
        this.zoomChartInstance = event.chart;
        event.chart.isZooming = true;
      }
    };
    this.options.plugins.zoom.zoom.onZoomComplete = (event) => {
      const {min, max} = event.chart.scales['x-axis-0'];
      this.liveMode = false;
      this.zoomChartInstance = event.chart;
      event.chart.isZooming = false;
      this.$emit("getChartData", min, max, event.chart, false);
    };

    // PAN
    this.options.plugins.zoom.pan.onPan = (event) => {
      if (!event.chart.isPanning) {
        this.liveMode = true;
        event.chart.isPanning = true;
        this.zoomChartInstance = event.chart;
      }
    }
    this.options.plugins.zoom.pan.onPanComplete = (event) => {
      const {min, max} = event.chart.scales['x-axis-0'];
      this.zoomChartInstance = event.chart;
      event.chart.options.plugins.streaming.pause = true;
      this.liveMode = false;
      event.chart.isPanning = false;
      this.$emit("getChartData", min, max, event.chart, false);
    }

    // STREAMING
    this.options.plugins.streaming.onRefresh = this.onRefresh;
    this.options.annotation = {
      drawTime: "afterDatasetsDraw",
      annotations: [
        {
          type: "line",
          scaleID: "bacteria",
          mode: "horizontal",
          value: 25,
          borderColor: "red",
          borderWidth: 0
        }
      ]
    };
    this.renderChart(this.chartData, this.options);
    this.chart = this.$data._chart;
    this.defaultPanAndZoomLimits();
  },
  data() {
    return {
      liveMode: true,
      options: {},
      chart: null
    }
  }
}
</script>