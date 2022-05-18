import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  actions: {
    GETSHIPPINGACCEPTSTATUS: async ({ orderIndex }) => {
      try {
        return await http.get(`/api/v1/shipping-accept?order=${orderIndex}`);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
