import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  state: {
    categories: null
  },

  mutations: {
    setCategory(state, payload) {
      state.categories = payload;
    }
  },

  actions: {
    GET_CATEGORIES: ({ commit }) => {
      return http.get('/categories.json').then(da => {
        commit('setCategory', da.data);
        return da.data;
      });
    }
  },

  getters: {
    categoriesList(state) {
      return state.categories;
    }
  }
};
