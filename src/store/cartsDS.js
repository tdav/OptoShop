import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import SysConf from '../utils/staticConfig';
import http from '../service/axios_init';
import ss from '../service/storage';
import sysUtils from '../utils/sysutils';
import toForm from '../utils/jsonToFormData';

Vue.use(Vuex);

export default {
  state: {
    carts: []
  },

  mutations: {
    setCarts(state, payload) {
      state.carts = payload;
    },

    addCarts(state, payload) {
      const o = payload;

      const di = state.carts.filter(x => x.id == o.distributor.id);
      if (di.length != 0) {
        let po = di[0].product.filter(x => x.id == o.id);
        if (po.length != 0) {
          po[0].qty = o.qy;
        } else {
          if (!di[0].product) di[0].product = [];

          di[0].qty++;
          di[0].product.push({
            id: payload.id,
            price: o.price,
            qty: payload.qy,
            image: o.image,
            name: o.productName,
            isBlock: o.isBlock,
            c_type: o.c_type,
            c_type_count: o.c_type_count
          });
        }

        let ts = 0;
        di[0].product.forEach(x => (ts = ts + +x.price * x.qty));
        di[0].total = ts;
      } else {
        let ds = {};
        ds.id = payload.distributor.id;
        ds.name = payload.distributor.name;
        ds.min_sum = payload.distributor.min_sum;
        ds.shipdate = payload.distributor.shipdate;
        ds.shipdays = payload.distributor.shipdays;
        ds.total_sale = payload.distributor.total_sale;
        ds.sale_sum = payload.distributor.sale_sum;
        ds.sale_percentage = payload.distributor.sale_percentage;

        ds.qty = 1;
        ds.total = payload.to;
        ds.min_error = true;
        ds.product = [];
        ds.product.push({
          id: payload.id,
          price: o.price,
          qty: payload.qy,
          isBlock: o.isBlock,
          image: o.image,
          name: o.productName,
          c_type: o.c_type,
          c_type_count: o.c_type_count
        });

        state.carts.push(ds);
      }
    },

    del_product(state, payload) {
      for (var i = 0; i < state.carts.length; i++)
        for (var j = 0; j < state.carts[i].product.length; j++) {
          if (
            state.carts[i].id === payload.did &&
            state.carts[i].product[j].id === payload.id
          ) {
            //delete product
            state.carts[i].product.splice(j, 1);

            //delete distibuter
            if (state.carts[i].product.length == 0) {
              state.carts.splice(i, 1);
            }

            // re calc
            if (state.carts.length > 0) {
              let sum = 0;
              state.carts[i].product.forEach(el => {
                sum += el.price * el.qty;
              });

              state.carts[i].total = sum;
              state.carts[i].qty = state.carts[i].product.length;
            } else {
              ss.delLocalStorage('basket');
            }

            if (state.carts.length > 0)
              ss.setLocalStorage('basket', state.carts);
            return;
          }
        }
    },

    del_distribut(state, payload) {
      for (var i = 0; i < state.carts.length; i++) {
        if (state.carts[i].id === payload.id) {
          state.carts.splice(i, 1);
          if (state.carts.length > 0) ss.setLocalStorage('basket', state.carts);
          else ss.delLocalStorage('basket');
          return;
        }
      }
    },

    change_ctype(state, payload) {
      const o = payload;
      const di = state.carts.filter(x => x.id == o.distributorId);
      if (di.length != 0) {
        let po = di[0].product.filter(x => x.id == o.id);
        if (po.length != 0) {


          let qty = 0;
          if (o.isBlock) {
            qty = o.qty * o.c_type_count;
          } else {
            qty = o.qty / o.c_type_count;
          }

          po[0].qty = qty;

          // recalc
          let sum = 0;
          di[0].product.forEach(el => {
            sum += el.price * el.qty;
          });

          di[0].total = sum;
          di[0].qty = di[0].product.length;

        }
      }
    },

    saveBasket(state) {
      if (state.carts.length > 0) ss.setLocalStorage('basket', state.carts);
    },

    loadLastBasket(state) {
      let rl = ss.getLocalStorage('basket');
      if (rl) state.carts = rl;
      else rl = [];
    }
  },

  actions: {
    GETCARDLIST: async ({
      commit
    }) => {
      try {
        let o = await http.get('/api/v1/carts');

        commit('setCarts', o.data);
      } catch (e) {
        console.log(e);
      }
    },

    ADD_PRODUCT: async ({
      commit
    }, p) => {
      commit('addCarts', p);
      commit('saveBasket', p);
    },

    SET_CHANGE_CTYPE: ({
      commit
    }, p) => {

      commit('change_ctype', p);
      commit('saveBasket', p);
    },

    UPD_PRODUCT: async ({
      commit
    }, p) => {
      commit('updCarts', p);
    },

    SEND_ORDER: async ({
      commit
    }, p) => {
      let so = {};
      so.distributor = p.id;
      so.shipdate = sysUtils.toTimeStamp(p.shipdate);
      so.type_pay = p.type_pay;
      so.products = [];
      p.product.forEach(function (el) {
        so.products.push({
          id: el.id,
          qty: el.qty
        });
      });

      const user = ss.getLocalStorage('user');

      var formData = toForm(so);

      return await axios
        .post(SysConf.ServerUrl + '/api/v1/add-order', formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function (resp) {
          if (resp.status == 201) {
            commit('del_distribut', p);
          }
        })
        .catch(function (resp) {
          console.error(resp);
        });
    },

    DEL_PRODUCT: async ({
      commit
    }, p) => {
      commit('del_product', p);
    },

    DEL_DISTRIBUT: async ({
      commit
    }, p) => {
      commit('del_distribut', p);
    },

    SAVE_BASKET: ({
      commit
    }) => {
      commit('saveBasket');
    },

    LOAD_LAST_BASKET: ({
      commit
    }) => {
      commit('loadLastBasket');
    }
  },

  getters: {
    cart(state) {
      return state.carts;
    },

    cartProductsCount(state) {
      let count = 0;
      if (state.carts)
        state.carts.forEach(el => {
          count += el.qty;
        });

      return count;
    },

    productInList: state => id => {
      let res = false;
      state.carts.forEach(x => {
        if (x.product.findIndex(z => z.id == id) > -1) {
          res = true;
          return;
        }
      });

      return res;
    },

    getProductById: state => id => {
      let res = undefined;
      for (const dis of state.carts) {
        res = dis.product.find(z => z.id == id);

        if (res != undefined) break;
      }

      return res;
    }
  }
};