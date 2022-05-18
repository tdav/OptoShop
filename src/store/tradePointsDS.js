import http from '../service/axios_init';

export default {
  state: {
    tradePoints: null
  },

  mutations: {
    setTradePoints(state, payload) {
      state.tradePoints = payload;
    }
  },

  actions: {
    GETTRADEPOINTLIST: async ({ commit }, { value }) => {
      try {
        let o = await http.get(`/api/v1/trade-points?search=${value}`);

        commit('setTradePoints', o.data);
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    tradePoints(state) {
      return state.tradePoints;
    }
  }
};
