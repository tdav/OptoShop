import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  state: {
    list: []
  },

  mutations: {
    setList(state, payload) {
      state.list = payload;
    }
  },

  actions: {
    GET_SUBCATEGORIES: async ({ commit, state }) => {
      try {
        if (state.list.length > 0) return;
        let o = await http.get('/api/v1/getSubs');

        commit('setList', o.data);
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    subCategories(state) {
      return state.list;
    },

    subCategoriesByParentId: state => id => {
      if (state.list.length != 0)
        return state.list.filter(x => x.parent_id == id);
      else return null;
    }
  }
};
