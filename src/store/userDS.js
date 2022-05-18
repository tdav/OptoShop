import axios from 'axios';
import ss from '../service/storage';
import SysConf from '../utils/staticConfig';
import toForm from '../utils/jsonToFormData';

export default {
  state: {
    user: null,
    logged: false,
    token: ''
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    setUserlogged(state, payload) {
      state.logged = payload;
    },

    setUserToken(state, payload) {
      state.token = payload;
    }
  },

  actions: {
    AUTOLOGIN: ({
      commit
    }, payload) => {
      commit('setUser', payload);
      commit('setUserlogged', payload.token != '');
      commit('setUserToken', payload.token);
    },

    REG_USER: async ({
      commit
    }, payload) => {
      try {
        let u = await axios.post(
          SysConf.ServerUrl + '/api/v1/register',
          payload, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        commit('setUser', u.data);
        commit('setUserlogged', u.data.token != '');
        commit('setUserToken', u.data.token);
        ss.setLocalStorage('user', u.data);
      } catch (e) {
        console.log(e);
      }
    },

    LOGINAC: async ({
      commit
    }, payload) => {

      return new Promise((resolve, reject) => {

        axios.post(SysConf.ServerUrl + '/api/v1/login', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(u => {

          ss.setLocalStorage('user', u.data);

          commit('setUser', u.data);
          commit('setUserlogged', u.data.token != '');
          commit('setUserToken', u.data.token);
          resolve(u);

        }, error => {
          reject(error);
        })
      })
    },

    LOGOUTAC: async ({
      commit
    }) => {
      try {
        //await axios.get(SysConf.ServerUrl + '/api/v1/logout'); //TODO 500 (Internal Server Error)

        commit('setUser', null);
        commit('setUserlogged', false);
        commit('setUserToken', '');

        ss.delLocalStorage('user');
        ss.delLocalStorage('basket');
        ss.delLocalStorage('fav-list');
      } catch (e) {
        console.log(e);
      }
    },

    USER_SUPPORT: async ({
      state
    }, payload) => {
      try {
        debugger;
        const formData = toForm(payload);
        await axios.post(SysConf.ServerUrl + '/api/v1/support', formData, {
          headers: {
            Authorization: `Bearer ${state.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    user(state) {
      return state.user;
    },

    userlogged(state) {
      return state.logged;
    },

    userToken(state) {
      return state.token;
    }
  }
};