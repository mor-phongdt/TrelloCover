/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Loading from 'vue-loading-overlay';
import App from './App.vue';
import { router } from './helpers/index';
import store from './vuex/store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import 'vue-loading-overlay/dist/vue-loading.css';


Vue.use(Loading);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>',
  render: h => h(App),
}).$mount('#app');
