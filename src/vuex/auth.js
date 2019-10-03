import { firebase } from '@/plugins/firebase';
import { reject } from 'q';

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
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then((loginResult) => {
            if (loginResult.user.emailVerified) {
              console.log(loginResult)
              localStorage.setItem('user', JSON.stringify(loginResult.user.refreshToken));
              commit('setLogin', user);
              resolve()
            } else {
              console.log('This account is not activate . Please verify')
            }
          })
          .catch((error) => {
            window.alert(error.message);
          })
      })
    },
    async logout({ commit }) {
      localStorage.removeItem('user');
      commit('setLogout');
    },
    async register(context, user) {
      console.log(user)
      return new Promise((resolve, rejcet) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then((registerResult) => {
            console.log(registerResult)
            registerResult.user.updateProfile({
              displayName: user.fullName,
            });
            registerResult.user.sendEmailVerification();
            resolve()
          })
          .catch((error) => {
            console.log(error)
          });
      })
    }
  },

};
