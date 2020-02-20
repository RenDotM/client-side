// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store';
// import routes from './routes'
import VueGoodTablePlugin from 'vue-good-table'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'

Vue.config.productionTip = false
Vue.use(VueMaterial)
// Vue.use(Router)
Vue.use(VueGoodTablePlugin)
// sync(store, router);

/* eslint-disable no-new */
new Vue({
  store,
  router,
  vuetify,

  // template: '<App/>',
  // components: { App }
  render: h => h(App)
}).$mount('#app');
