import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import VueGoodTablePlugin from 'vue-good-table'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

Vue.use(Router)
Vue.use(VueGoodTablePlugin)
Vue.use(VueMaterial)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
