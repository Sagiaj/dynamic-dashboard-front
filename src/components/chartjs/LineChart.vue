<script>
import Chart from "chart.js";
import { Line, mixins } from 'vue-chartjs';
import { GlobalChartConfig } from '@/models/config';
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
import "chartjs-plugin-zoom";
import 'chartjs-plugin-streaming';
import { annotationsConfig } from '@/models/config/chartjs/annotations';

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
      this.$data._chart.update();
    },
    reset: function (newval, oldval) {
      this.resetZoom();
    }
  },
  methods: {
    onRefresh(chart) {
      if (this.liveMode) {
        // console.log(this.options.plugins.annotation.annotations[0])
        this.$emit("updateSeries");
      }
    },
    setOnRefresh() {
      this.liveMode = true;
      this.options.plugins.streaming.onRefresh = this.onRefresh;
    },
    setZoomPluginEvents() {
      this.options.plugins.zoom.zoom.onZoom = (event) => {
        if (!event.chart.isZooming) {
          // event.chart.options.scales.xAxes[0].realtime.duration = 3600 * 1000;
          this.liveMode = true;
          event.chart.isZooming = true;
        }
      };
      this.options.plugins.zoom.zoom.onZoomComplete = (event) => {
        const {min, max} = event.chart.scales['x-axis-0'];
        this.liveMode = false;
        event.chart.isZooming = false;
        this.$emit("getChartData", min, max, event.chart, false);
      };
      this.options.plugins.zoom.pan.onPan = (event) => {
        if (!event.chart.isPanning) {
          this.liveMode = true;
          event.chart.isPanning = true;
        }
      }
      this.options.plugins.zoom.pan.onPanComplete = (event) => {
        const {min, max} = event.chart.scales['x-axis-0'];
        event.chart.options.plugins.streaming.pause = true;
        this.liveMode = false;
        event.chart.isPanning = false;
        this.$emit("getChartData", min, max, event.chart, false);
      }
    },
    updateChartStyles() {
      this.chart.options.plugins.annotation = annotationsConfig;
    },
    resetZoom() {
      this.chart.resetZoom();
    }
  },
  mounted() {
    Chart.plugins.register([chartjsPluginAnnotation]);
    this.addPlugin([chartjsPluginAnnotation]);
    this.options = this.chartOptions || GlobalChartConfig.chartjs.options;

    // ZOOM
    this.setZoomPluginEvents();

    // STREAMING
    this.options.plugins.streaming.onRefresh = this.onRefresh;

    // ANNOTATION
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