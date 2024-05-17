import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  state: {
    banners: 1
  },

  mutations: {
    setBanners(state, payload) {
      state.banners = payload;
    }
  },

  actions: {
    GET_BANNERLIST: async ({
      commit
    }) => {
      try {
        //if (state.banners) {
        let o = await http.get('/banners.json');
        commit('setBanners', o.data);
        return o.data;
        // } else {
        //   return state.banners;
        // }
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    banners(state) {
      return state.banners;
    }
  }
};