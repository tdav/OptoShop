import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  state: {
    driverOrders: null
  },

  mutations: {
    setDriverOrders(state, payload) {
      state.driverOrders = payload;
    }
  },

  actions: {
    GETDRIVERORDERLIST: async ({ commit }) => {
      try {
        let o = await http.get('/api/v1/driver/orders?status=in_the_supplier');

        commit('setDriverOrders', o.data);
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    driverOrders(state) {
      return state.driverOrders;
    }
  }
};
