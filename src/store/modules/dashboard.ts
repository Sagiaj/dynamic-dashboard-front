import * as types from "@/store/mutation-types";

export enum DashboardModes {
    InLine = "inline",
    Lab = "lab"
};

type DashboardState = {
  dashboard_mode: DashboardModes;
};

const state: DashboardState = {
  dashboard_mode: DashboardModes.InLine
};

const mutations = {
  [types.SET_DASHBOARD_MODE_STATE](state: DashboardState, dashboard_mode: DashboardModes) {
    state.dashboard_mode = dashboard_mode;
  }
};

const actions = {
  setDashboardMode({ commit }: any, dashboard_mode: DashboardModes) {
    commit(types.SET_DASHBOARD_MODE_STATE, dashboard_mode);
  }
};

const getters = {
  dashboard_mode(state: DashboardState) {
    return state.dashboard_mode;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
