import { firebase,userCollection } from '@/plugins/firebase';

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
            console.log(loginResult.user)
            if (loginResult.user.emailVerified) {
              localStorage.setItem('user', JSON.stringify(loginResult.user.refreshToken));
              localStorage.setItem('account',JSON.stringify({email:loginResult.user.email, fullName:loginResult.user.displayName, avatarUrl:loginResult.user.photoURL, id:loginResult.user.uid}))
              commit('setLogin', user.email);
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
      localStorage.removeItem('email')
      commit('setLogout');
    },
    async register(context, user) {
      return new Promise((resolve, rejcet) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then((registerResult) => {
            registerResult.user.updateProfile({
              displayName: user.fullName,
            });
            userCollection.doc(registerResult.user.uid).set({
              email : user.email,
              fullName : user.fullName
            })
            .then(()=>{
              registerResult.user.sendEmailVerification();
              resolve()
            })
            .catch((error)=>{
              console.log(error)
            })  
          })
          .catch((error) => {
            console.log(error)
          });
      })
    }
  },

};
