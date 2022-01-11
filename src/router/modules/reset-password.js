import LoginLayout from '@/views/layout/LoginLayout'

const resetRouter = {
  path: '',
  component: LoginLayout,
  children: [
    {
      path: 'forget-password',
      component: () => import('@/views/reset-password'),
      name: 'forget_password',
    },
    {
      path: 'reset_password',
      component: () => import('@/views/reset-password/ResetPass'),
      name: 'reset_password',
    },
  ],
}

export default resetRouter
