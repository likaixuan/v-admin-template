import Vue from 'vue'
import Router from 'vue-router'

const welcome = () => import('./pages/welcome/index.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    }
  ]
})
