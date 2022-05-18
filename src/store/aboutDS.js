import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/axios_init';

Vue.use(Vuex);

export default {
  actions: {
    GETABOUT: async () => {
      try {
        return await http.get('/api/v1/about');
      } catch (e) {
        console.log(e);
      }
    }
  }
};
