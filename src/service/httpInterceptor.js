import axios from 'axios';
import SysConf from '../utils/staticConfig';
import storage from './storage';

export default function() {
  const baseURL = SysConf.ServerUrl;
  let instance = axios.create({ baseURL });

  instance.interceptors.request.use(
    function(config) {
      //Vue.bus.emit('LOADER', true);
      let user = storage.getSessionStorage('user');
      if (user) {
        const token = user.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },

    function(error) {
      //Vue.bus.emit('LOADER', false);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function(response) {
      //  Vue.bus.emit('LOADER', false);
      return response;
    },
    function(error) {
      //Vue.bus.emit('LOADER', false);
      return Promise.reject(error);
    }
  );

  debugger;
  return instance;
}
