import Vue from "vue";
import "./components";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueApexCharts from 'vue-apexcharts';
// import VueCompositionApi from '@vue/composition-api';
// import { Chart } from 'chart.js';
const VueFusionCharts = require("vue-fusioncharts");
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
Vue.config.productionTip = false;
// Vue.use(VueCompositionApi);
Vue.use(VueFusionCharts, FusionCharts, TimeSeries);
Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
}).$mount("#app");
//# sourceMappingURL=main.js.map