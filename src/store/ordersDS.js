import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  // namespaced: true,
  state: {
    orders: [],
    orderProducts: []
  },

  mutations: {
    setOrders(state, payload) {
      state.orders = payload;
    },

    setOrderProducts(state, payload) {
      state.orderProducts = payload;
    }
  },

  actions: {
    GETORDERLIST: async ({
      commit
    }) => {
      try {
        let o = await http.get('/api/v1/orders');
        commit('setOrders', o.data);
        return true;
      } catch (e) {
        commit('setOrders', undefined);
        console.log(e);
      }
    },

    GET_PRODUCTS_FROM_ORDER: async ({
      commit
    }, id) => {
      try {
        commit('setOrderProducts', []);
        let o = await http.get(`/api/v1/order-items?order=${id}`);
        commit('setOrderProducts', o.data);
        return true;
      } catch (e) {
        console.log(e);
      }
    },

    SET_ORDER_CANCEL: async ({
      commit
    }, id) => {
      try {
        let o = await http.get(`/api/v1/order-cancel?order=${id}`);
        return o;
      } catch (e) {
        console.log(e);
      }
    },

    SET_ORDER_DELIVERED: async ({
      commit
    }, id) => {
      try {
        let o = await http.get(`/api/v1/shipping-accept?order=${id}`);
        return o;
      } catch (e) {
        console.log(e);
      }
    },

    SET_ORDER_ACCEPT_ADJUSTMENT: async ({
      commit
    }, id) => {
      try {
        debugger;
        let o = await http.get(`/api/v1/order-accept?order=${id}`);
        return o;
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    orders(state) {
      return state.orders;
    },

    productsFromOrder(state) {
      return state.orderProducts;
    }
  }
};