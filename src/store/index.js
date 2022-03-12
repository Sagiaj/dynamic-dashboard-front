import Vue from "vue";
import Vuex from "vuex";
import globalError from "./modules/global-error";
// import flags from ".modules/flags";
// import flags from ".modules/flags";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        globalError
    }
});
//# sourceMappingURL=index.js.map