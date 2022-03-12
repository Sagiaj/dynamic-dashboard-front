import * as types from "@/store/mutation-types";
export var DashboardModes;
(function (DashboardModes) {
    DashboardModes["InLine"] = "inline";
    DashboardModes["Lab"] = "lab";
})(DashboardModes || (DashboardModes = {}));
;
const state = {
    dashboard_mode: DashboardModes.InLine
};
const mutations = {
    [types.SET_DASHBOARD_MODE_STATE](state, dashboard_mode) {
        state.dashboard_mode = dashboard_mode;
    }
};
const actions = {
    setDashboardMode({ commit }, dashboard_mode) {
        commit(types.SET_DASHBOARD_MODE_STATE, dashboard_mode);
    }
};
const getters = {
    dashboard_mode(state) {
        return state.dashboard_mode;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};
//# sourceMappingURL=dashboard.js.map