import Vue from "vue";
import "./components";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueApexCharts from 'vue-apexcharts';
import ApiDataService from "./api/services/data-service";
Vue.config.productionTip = false;
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
new Vue({
    router,
    store,
    vuetify,
    async beforeMount() {
        let route = "/inline";
        try {
            const system_mode = await ApiDataService.getSystemMode();
            if (system_mode === "LAB") {
                route = "/lab";
            }
        }
        catch (err) {
            console.log("Failed getting system mode. Error=", err);
            route = "/inline";
        }
        this.$router.push({
            path: route,
        });
    },
    render: (h) => h(App)
}).$mount("#app");
//# sourceMappingURL=main.js.map