import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '@/components/Manage'
import MainContent from '../components/MainContent'
// import VueGoodTablePlugin from 'vue-good-table'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'

// Vue.use(VueMaterial)

Vue.use(VueRouter)
// Vue.use(VueGoodTablePlugin)
// Vue.use(VueMaterial)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'mainContent',
      component: MainContent
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      meta: {
        requiresAuth: true,
      }
    },
  ]
})
