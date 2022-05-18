import axios from 'axios';
import api_config from '../utils/staticConfig';
import store from '../store/index';

export default {
  request(method, url, params, data, formdata = false) {
    let axios_config = {
      baseURL: api_config.ServerUrl,
      method: method,
      url: url
    };

    const token = store.getters.userToken;
    if (token) {
      if (formdata)
        axios_config.headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        };
      else axios_config.headers = { Authorization: `Bearer ${token}` };
    }

    if (params) {
      axios_config.params = params;
    }

    if (data) {
      axios_config.data = data;
    }

    axios.interceptors.request.use(
      function(config) {
        if (config.url.indexOf('/api/v1/products') > -1) {
          store.dispatch('SETLOADING', true);
        }

        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        if (response.config.url.indexOf('/api/v1/products') > -1) {
          store.dispatch('SETLOADING', false);

          window.vue.$root.$emit('evtShowFabMain', 3);
        }

        switch (response.status) {
          case 201:
            if (response.data.msg) store.dispatch('SET_MES', response.data.msg);
            break;
        }

        return response;
      },
      error => {
        if (error.config.url.indexOf('/api/v1/products') > -1) {
          store.dispatch('SETLOADING', false);
          window.vue.$root.$emit('evtShowFabMain', 3);
        }

        if (error.response) {
          switch (error.response.status) {
            case 401:
              this.$router.push({ path: '/login' });
              break;

            case 404:
              if (error.response.data) {
                if (error.response.data.msg)
                  store.dispatch('SETERROR', error.response.data.msg);
                else store.dispatch('SETERROR', 'Данные не найдены.');
              }
              break;

            case 500:
              // if (error.response.data)
              store.dispatch('SETERROR', 'Ошибка соединения.');
              break;
          }

          return Promise.reject(error);
        }
      }
    );

    return axios(axios_config);
  },

  get(url) {
    return this.request('get', url, null, null);
  },

  post(url, data) {
    data = data || {};
    return this.request('post', url, null, data);
  },

  post_formdata(url, data) {
    data = data || {};
    return this.request('post', url, null, data, true);
  },

  put(url, data) {
    data = data || {};
    return this.request('put', url, null, data);
  },

  remove(url) {
    return this.request('delete', url, null, null);
  }
};
