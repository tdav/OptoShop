import manifest from '../../public/manifest'

export default {
  state: {
    loading: false,
    loadingState: 0,
    error: null,
    message: null,
    dialogValue: {}
  },

  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },

    setMessage(state, payload) {
      state.message = payload;
    },
    clearMessage(state) {
      state.message = null;
    },

    setDialogValue(state, payload) {
      state.dialogValue = payload;
    },

    setLoadingState(state, payload) {
      state.loadingState = payload;
    }
  },

  actions: {
    SETLOADING({
      commit
    }, payload) {
      commit('setLoading', payload);
    },

    SET_LOADING_STATE({
      commit
    }, payload) {
      commit('setLoadingState', payload);
    },

    SETERROR({
      commit
    }, payload) {
      commit('setError', payload);
    },

    CLEARERROR({
      commit
    }) {
      commit('clearError');
    },

    SET_MES({
      commit
    }, payload) {
      commit('setMessage', payload);
    },

    CLEAR_MES({
      commit
    }) {
      commit('clearMessage');
    },

    SET_DIALOG_VALUE({
      commit
    }, payload) {
      commit('setDialogValue', payload);
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    message(state) {
      return state.message;
    },

    getDialogValue(state) {
      return state.dialogValue;
    },

    getLoadingState(state) {
      return state.loadingState;
    },

    version(state) {
      return manifest.version
    }
  }
};