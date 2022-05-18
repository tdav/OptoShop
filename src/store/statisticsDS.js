import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  state: {
    statistics: null
  },

  mutations: {
    setStatistics(state, payload) {
      state.statistics = payload;
    }
  },

  actions: {
    GETSTATISTICS: async ({ commit }) => {
      try {
        let o = await http.get('/api/v1/statistics');
        commit('setStatistics', o.data);
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    statistics(state) {
      return state.statistics;
    }
  }
};
