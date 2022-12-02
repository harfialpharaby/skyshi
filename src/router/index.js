import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: 'Dashboard' */ '../views/ActivityDashboard.vue')
  },
  {
    path: '/detail/:id',
    name: 'activity-detail',
    component: () => import(/* webpackChunkName: 'ActivityDetail' */ '../views/ActivityDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

export default router