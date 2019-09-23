export default {
  state: {
    show: false,
  },
  getters: {

  },
  mutations: {
    showDialog(state) {
      state.show = true;
    },
    closeDialog(state) {
      state.show = false;
    },
  },
};
