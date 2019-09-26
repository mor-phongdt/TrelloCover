import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import project from './project';
import task from './task'
import showDialog from './showDialog';

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    auth,
    project,
    task,
    showDialog,
  },
});
