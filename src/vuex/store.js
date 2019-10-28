import Vue from 'vue';
import Vuex from 'vuex';
import snackBar from './snackBar';
import auth from './auth'
import user from './user'
import project from './project'
import task from './task'
import showDialog from './showDialog'
import comment from './comment'

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    auth,
    snackBar,
    user,
    project,
    task,
    showDialog,
    comment
  },
});
