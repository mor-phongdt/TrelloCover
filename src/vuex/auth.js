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
              localStorage.setItem('id',JSON.stringify(loginResult.user.uid))
              commit('setLogin', user.email);
              resolve()
            } else {
              reject(new Error('This account is not activate . Please verify'))
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async logout({ commit }) {
      localStorage.removeItem('id')
    },
    async register(context, user) {
      return new Promise((resolve, rejcet) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then((registerResult) => {
            registerResult.user.updateProfile({
              displayName: user.fullName
            });
            userCollection.doc(registerResult.user.uid).set({
              avatarUrl:'https://firebasestorage.googleapis.com/v0/b/kma-board.appspot.com/o/avatar%2Fblank-avatar-300x300.png?alt=media&token=9e2029b4-d75e-484b-8407-834c66e91135',
              email : user.email,
              fullName : user.fullName,
              job: '',
              description: ''
            })
            .then(()=>{
              registerResult.user.sendEmailVerification();
              resolve()
            })
            .catch((error)=>{
              rejcet(error)
              console.log(error)
            })  
          })
          .catch((error) => {
            rejcet(error)
            console.log(error)
          });
      })
    }
  },

};
