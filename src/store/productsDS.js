import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';
import ss from '../service/storage';
import SysConf from '../utils/staticConfig';

Vue.use(Vuex);

export default {
  state: {
    selectedProduct: {},
    disableLoadProducts: false,
    products: [],
    query: '',
    config: {
      current_page: 1,
      total_count: 0,
      total_page: 0
    }
  },

  mutations: {
    insProductsInfinite(state, payload) {
      let pl = state.products;
      state.products = pl.concat(payload);
    },

    setProducts(state, payload) {
      state.products = payload;
    },

    setConfig(state, payload) {
      state.config = payload;
    },

    setSelectedProduct(state, payload) {
      state.selectedProduct = payload;
    },

    setDisableLoadProducts(state, payload) {
      state.disableLoadProducts = payload;
    },

    setQuery(state, payload) {
      state.query = payload;
    }
  },

  actions: {
    FIND_PRODUCT: async ({
      commit
    }, payload) => {
      try {

        let pi = [];
        for (let i = 0; i < 20; i++) {
          pi.push({
            loading: true
          });
        }
        commit('setProducts', pi);

        let o = await http.get(`/api/v1/products?search=${payload}`);

        let config = {
          current_page: o.data.current_page,
          per_page: SysConf.product_per_page,
          total_count: o.data.total_count,
          total_page: o.data.total_page
        };

        commit('setConfig', config);
        commit('setProducts', o.data.products);
      } catch (e) {
        console.log(e);
      }
    },

    GET_PRODUCTLIST: async ({
      commit,
      state
    }) => {
      try {
        if (state.disableLoadProducts) {
          commit('setDisableLoadProducts', false);
          return;
        }

        let o = await http.get(
          `/products.json`
          //`/products.json?home=1&per_page=${SysConf.product_per_page}`
        );

        let config = {
          current_page: o.data.current_page,
          total_count: o.data.total_count,
          total_page: o.data.total_page
        };

        commit('setConfig', config);
        commit('setProducts', o.data.products);
      } catch (e) {
        console.log(e);
      }
    },

    GET_PRODUCT_INFINITE: async ({
      commit,
      state
    }) => {
      try {
        let cg = state.config;
        cg.current_page++;

        let o = await http.get(
          `/api/v1/products?&per_page=${SysConf.product_per_page}&page=${
            cg.current_page
          }&${state.query}`
        );

        let config = {
          current_page: o.data.current_page,
          total_count: o.data.total_count,
          total_page: o.data.total_page
        };

        commit('setConfig', config);
        commit('insProductsInfinite', o.data.products);
      } catch (e) {
        console.log(e);
      }
    },

    GET_PRODUCTLIST_BYPARAM: async ({
      commit,
    }, param) => {
      try {

        let pi = [];
        for (let i = 0; i < 20; i++) {
          pi.push({
            loading: true
          });
        }
        commit('setProducts', pi);


        let o = await http.get(
          `/api/v1/products?${param}&per_page=${SysConf.product_per_page}`
        );

        let config = {
          current_page: o.data.current_page,
          total_count: o.data.total_count,
          total_page: o.data.total_page
        };

        if (o.data.length == 0) {
          commit('setProducts', undefined);
        }

        commit('setQuery', param);
        commit('setConfig', config);
        commit('setProducts', o.data.products);

      } catch (e) {
        console.log(e);

        commit('setProducts', undefined);
      }
    },

    GET_PROMOTIONLIST: async ({
      commit
    }) => {
      try {
        commit('setProducts', undefined);

        await http
          .get(`/api/v1/products?sale=1&per_page=${SysConf.product_per_page}`)
          .then(o => {
            if (o) {
              let config = {
                current_page: o.data.current_page,
                total_count: o.data.total_count,
                total_page: o.data.total_page
              };

              commit('setConfig', config);
              commit('setProducts', o.data.products);
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    },

    GET_FAVLIST: async ({
      commit
    }) => {
      try {
        commit('setProducts', undefined);

        let ls = ss.getLocalStorage('fav-list');
        if (ls && ls.length > 0) {
          const param = ls.join(',');

          let o = await http.get(`/api/v1/products?ids=${param}`);

          if (o) {
            let config = {
              current_page: o.data.current_page,
              total_count: o.data.total_count,
              total_page: o.data.total_page
            };

            commit('setConfig', config);
            commit('setProducts', o.data.products);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    SET_SELECTEDPRODUCT: async ({
      commit
    }, payload) => {
      commit('setSelectedProduct', payload);
    },

    SET_DISABLE_LOAD_PRODUCTS: ({
      commit
    }, payload) => {
      commit('setDisableLoadProducts', payload);
    }
  },

  getters: {
    products(state) {
      return state.products;
    },

    getConfig(state) {
      return state.config;
    },

    getSelectedProduct(state) {
      return state.selectedProduct;
    }
  }
};