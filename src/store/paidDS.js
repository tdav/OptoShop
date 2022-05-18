import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  state: {
    paid: null
  },

  mutations: {
    setPaid(state, payload) {
      state.paid = payload;
    }
  },

  actions: {
    GETPAIDLIST: async ({ commit }) => {
      try {
        let o = await http.get('/api/v1/orders');

        commit('setPaid', o.data);
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    paid(state) {
      return state.paid;
    }
  }
};
