import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import showDialog from './showDialog';

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    auth,
    showDialog,
  },
});
