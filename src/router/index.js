import Vue from 'vue'
import Router from 'vue-router'
import store from '@store'
import administrationRouter from './modules/administration'
import authRouter from './modules/auth'
import dashboardRouter from './modules/dashboard'
import resetRouter from './modules/reset-password'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    administrationRouter
  ],
})

router.beforeEach((to, from, next) => {
  let loggedIn = localStorage.getItem('token') || ''
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn'] || loggedIn) {
      next()
      return
    }
    next('/auth/login')
  } else {
    next()
  }
})

export default router
