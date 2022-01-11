import LoginLayout from '@/views/layout/LoginLayout'
import store from '@store'

const authRouter = {
  path: '/auth',
  component: LoginLayout,
  children: [
    {
      path: 'login',
      component: () => import('@/views/login/Login'),
      name: 'login',
    },
    {
      path: 'logout',
      beforeEnter: (to, from, next) => {
        store.dispatch('auth/logout')
        next({
          path: '/auth/login',
        })
      },
    },
  ],
}

export default authRouter
