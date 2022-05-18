import Vue from 'vue';
import Vuex from 'vuex';
import ss from '../service/storage';

Vue.use(Vuex);

export default {
  state: {
    fav: [],
    isShowList: false
  },

  mutations: {
    loadFav(state) {
      let ls = ss.getLocalStorage('fav-list');
      if (ls) {
        state.fav = ls;
      }
    },

    toFav(state, payload) {
      let ls = state.fav;
      if (ls) {
        const ax = ls.indexOf(payload);
        if (ax != -1) {
          ls.splice(ax, 1);
        } else {
          ls.push(payload);
        }
      } else {
        ls = [];
        ls.push(payload);
      }

      ss.setLocalStorage('fav-list', ls);
    }
  },

  actions: {
    FAV_LIST: async ({ commit }, payload) => {
      commit('toFav', payload);
    },

    FAV_LOAD: async ({ commit }, payload) => {
      commit('loadFav', payload);
    }
  },

  getters: {
    favList(state) {
      return state.fav;
    },

    favCount(state) {
      return state.fav.length;
    },

    fabById: state => id => {
      return state.fav.find(x => x == id);
    }
  }
};
