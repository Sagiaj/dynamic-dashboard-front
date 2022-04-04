<script>
import { Line, mixins } from 'vue-chartjs';
import { GlobalChartConfig } from '@/models/config';
import "chartjs-plugin-annotation";
import "chartjs-plugin-zoom";
import 'chartjs-plugin-streaming';

export default {
  extends:  Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    chartOptions: {
      type: Object,
      default: null,
    },
    threshold: {
      type: Number,
      default: 0,
    }
  },
  watch: {
    liveMode(newVal) {
      if (!newVal) {
        this.$emit("stopLiveUpdate");
      }
    },
    chartData () {
      this.$data._chart.update();
    }
  },
  methods: {
    onRefresh(chart) {
      if (this.liveMode) {
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
        this.liveMode = false;
        event.chart.isPanning = false;
        this.$emit("getChartData", min, max, event.chart, false);
      }
    },
    updateChartStyles() {
      return;
    },
    resetZoom() {
      this.chart.resetZoom();
    }
  },
  mounted() {
    this.options = this.chartOptions || GlobalChartConfig.chartjs;

    // ZOOM
    this.setZoomPluginEvents();

    // STREAMING
    this.options.plugins.streaming.onRefresh = this.onRefresh;
    this.renderChart(this.chartData, this.options);
    this.chart = this.$data._chart;
    const that = this;
    setInterval(function () {
      Chart.Annotation.defaults = {
        drawTime: 'afterDatasetsDraw',
        dblClickSpeed: 350, // ms
        events: [],
        annotations: [
            {
              type: "line",
              scaleID: "bacteria",
              mode: "horizontal",
              value: Number(that.threshold),
              borderColor: "red",
              borderWidth: 0
            }
          ]
      };
    }, 200);
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