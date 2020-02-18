import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import '@babel/polyfill'
import { sync } from 'vuex-router-sync'
// import VeeValidate from 'vee-validate'
// import App from './App.vue'
// import router from './routes/_router'
// import store from './store/index'
import './registerServiceWorker'
import './plugins/vuetify'
import './plugins/vueMediaEmbed'

Vue.use(Vuex)
// sync(store, router)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState()
  ],
  modules: {
    auth
  }
})
