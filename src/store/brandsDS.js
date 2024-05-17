import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  state: {
    brands: null
  },

  mutations: {
    setBrands(state, payload) {
      state.brands = payload;
    }
  },

  actions: {
    GET_BRANDS: async ({ commit }) => {
      try {
        let o = await http.get('/brands.json');

        commit('setBrands', o.data);
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    brands(state) {
      return state.brands;
    }
  }
};
