export default {
  state: {
    snack: '',
    color: '',
  },
  mutations: {
    setSnack(state, { snack, color }) {
      state.snack = snack;
      state.color = color;
    },
  },
};
