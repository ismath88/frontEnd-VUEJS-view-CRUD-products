import AdminLayout from '@/views/layout/AdminLayout'

const dashboardRouter = {
  path: '/',
  component: AdminLayout,
  redirect: 'dashboard',
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard'),
      name: 'dashboard',
      meta: {
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'route.dashboard',
            to: 'dashboard',
            disabled: false,
          },
        ],
        title: 'dashboard',
        icon: 'home',
      },
    },
  ],
}

export default dashboardRouter
