import { projectCollection,userCollection } from '@/plugins/firebase';

export default {
  namespaced: true,
  state: {
    user : {},
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
  },
  actions: {
    async requestUser({commit}, userId) {
      let response = await userCollection.doc(userId).get()
      if(response) {
        commit('setUser',{
          ...response.data(),
          id: response.id
        })
      }
    },
    async updateUserInfo({commit}, user) {
      console.log(user)
      try {
        let response = await userCollection.doc(user.id).update({
          ...user
        })
        commit('setUser',user)
      } catch(err) {
        console.log(err)
        Promise.reject(err)
      }
    }
  }
}
