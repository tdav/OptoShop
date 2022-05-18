import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    location: []
  },

  mutations: {
    setLocation(state, payload) {
      state.location = payload;
    }
  },

  actions: {
    SET_LOCATION: async ({ commit }, payload) => {
      commit('setLocation', payload);
    }
  },

  getters: {
    getMyLocation(state) {
      return state.location;
    }
  }
};
