import * as types from "@/store/mutation-types";
const state = {
    currentError: {
        error: "",
        timestamp: 0
    }
};
const mutations = {
    [types.SET_CURRENT_ERROR](state, error) {
        state.currentError.error = error;
        state.currentError.timestamp = +new Date();
    }
};
const actions = {
    propagateError({ commit }, error) {
        commit(types.SET_CURRENT_ERROR, error);
    }
};
const getters = {
    currentError(state) {
        return state.currentError;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};
//# sourceMappingURL=global-error.js.map