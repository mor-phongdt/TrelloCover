import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);


export default {
  namespaced: true,
  state: {
    loggedIn: false,
    userInfo: null,
    keepIdPassFlag: false,
  },
  getters: {
  },
  mutations: {
    setLogin: (state, user) => {
      state.loggedIn = true;
      state.userInfo = user;
    },
    setLogout: (state) => {
      state.loggedIn = false;
      state.userInfo = null;
    },
  },
  actions: {
    async login({ commit }, user) {
      const result = await axios.post('http://jsonplaceholder.typicode.com/users', {
        id: user.id,
        password: user.password,
      });
      if (result) {
        localStorage.setItem('user', JSON.stringify(user));
        commit('setLogin', user);
      }
    },
    async logout({ commit }) {
      await localStorage.removeItem('user');
      commit('setLogout');
    },
  },

};
