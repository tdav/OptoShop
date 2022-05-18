import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VModal from 'vue-js-modal';

import ss from './service/storage';
import './utils/arrayUtils';
import 'babel-polyfill';
import './filters/status';
import './plugins/vuetify.plugin';
import './registerServiceWorker';
import './assets/css/style.css';
import 'vuetify/dist/vuetify.min.css';
import http from "./service/axios_init";

import './assets/css/style.css';
import ToggleButton from 'vue-js-toggle-button';

Vue.config.productionTip = true;
Vue.prototype.$http = http;

Vue.use(ToggleButton);
Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true
});

window.vue = new Vue({
  store,
  router,
  render: h => h(App),
  beforeMount: function () {



    const u = ss.getLocalStorage('user');
    if (u) {
      this.$store.dispatch('AUTOLOGIN', u);
    }
  },

  // mounted() {
  //   if (this.$store.getters.userlogged) this.$router.push('/');
  // }
}).$mount('#app');