import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  state: {
    distributors: []
  },

  mutations: {
    setDistributors(state, payload) {
      state.distributors = payload;
    }
  },

  actions: {
    GET_DISTRIBUTORS: async ({ commit }) => {
      try {
        let o = await http.get('/api/v1/distributors');
        commit('setDistributors', o.data);
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    distributors(state) {
      return state.distributors;
    },

    distributorById: state => id => {
      if (state.distributors.length != 0)
        return state.distributors.find(x => x.id == id);
      else return null;
    }
  }
};
