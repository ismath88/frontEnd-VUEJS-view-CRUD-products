import AdminLayout from '@/views/layout/AdminLayout'

const administrationRouter = {
  path: '/administration',
  component: AdminLayout,
  children: [
    {
      path: '',
      component: () => import('@/views/administration/Administration'),
      name: 'administration',
      meta: {
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'route.administration',
            to: '/administration',
            disabled: false,
          },
        ],
      },
    },
    {
      path: 'global-setting',
      component: () => import('@/views/administration/GlobalSetting'),
      name: 'global_settting',
      meta: {
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'route.administration',
            disabled: false,
            to: '/administration',
          },
          {
            text: 'route.administration',
            to: '/administration',
            disabled: false,
          },
          {
            text: 'route.globalSetting',
            to: '/administration/global-setting',
            disabled: true,
          },
        ],
      },
      children: [
        {
          path: 'central-system-setting',
          component: () =>
            import('@/views/administration/central-system-setting/CentralSystemSetting'),
          name: 'central_system_setting',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.centralSetting',
                to: '/administration/global-setting/central-system-setting',
                disabled: false,
              },
              {
                text: 'route.view',
                to: '/administration/global-setting/central-system-setting',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'currency',
          component: () => import('@/views/administration/currency/Currency'),
          name: 'currency',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.currency',
                to: '/administration/global-setting/currency',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'region',
          component: () => import('@/views/administration/region/Region'),
          name: 'region',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.region',
                to: '/administration/global-setting/region',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'region/new',
          component: () => import('@/views/administration/region/RegionNew'),
          name: 'new-region',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.region',
                to: '/administration/global-setting/region',
                disabled: false,
              },
              {
                text: 'route.addNew',
                to: '/administration/global-setting/region',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'region/update',
          component: () => import('@/views/administration/region/RegionEdit'),
          name: 'update-region',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.region',
                to: '/administration/global-setting/region',
                disabled: false,
              },
              {
                text: 'route.updateRow',
                to: '/administration/global-setting/region',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'region/copy',
          component: () => import('@/views/administration/region/RegionCopy'),
          name: 'copy-region',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.region',
                to: '/administration/global-setting/region',
                disabled: false,
              },
              {
                text: 'route.copyRow',
                to: '/administration/global-setting/region',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'product',
          component: () => import('@/views/administration/product/Product'),
          name: 'product',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.product',
                to: '/administration/global-setting/product',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'product/new',
          component: () => import('@/views/administration/product/ProductNew'),
          name: 'new-product',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.product',
                to: '/administration/global-setting/product',
                disabled: false,
              },
              {
                text: 'route.addNew',
                to: '/administration/global-setting/product',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'currency/new',
          component: () => import('@/views/administration/currency/AddNew'),
          name: 'newcurrency',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.currency',
                to: '/administration/global-setting/currency',
                disabled: false,
              },
              {
                text: 'route.addNew',
                to: '/administration/global-setting/currency/new',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'product/update',
          component: () => import('@/views/administration/product/ProductEdit'),
          name: 'update',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.product',
                to: '/administration/global-setting/product',
                disabled: false,
              },
              {
                text: 'route.updateRow',
                to: '/administration/global-setting/product/new',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'currency/update',
          component: () => import('@/views/administration/currency/UpdateRow'),
          name: 'updatecurrency',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.product',
                to: '/administration/global-setting/product',
                disabled: false,
              },
              {
                text: 'route.updateRow',
                to: '/administration/global-setting/currency/update',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'product/copy',
          component: () => import('@/views/administration/product/ProductCopy'),
          name: 'copy',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.product',
                to: '/administration/global-setting/product',
                disabled: false,
              },
              {
                text: 'route.copyRow',
                to: '/administration/global-setting/currency/new',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'currency/copy',
          component: () => import('@/views/administration/currency/CopyRow'),
          name: 'copycurrency',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.currency',
                to: '/administration/global-setting/currency',
                disabled: false,
              },
              {
                text: 'route.copyRow',
                to: '/administration/global-setting/currency/copy',
                disabled: true,
              },
            ],
          },
        },

        {
          path: 'holiday',
          component: () => import('@/views/administration/holiday/Holiday'),
          name: 'holiday-calender',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.holidayCalendar',
                to: '/administration/global-setting/holiday',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'holiday/new',
          component: () => import('@/views/administration/holiday/HolidayNew'),
          name: 'new-holiday-calender',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.holidayCalendar',
                to: '/administration/global-setting/holiday',
                disabled: false,
              },
              {
                text: 'New',
                to: '',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'holiday/view',
          component: () => import('@/views/administration/holiday/HolidayView'),
          name: 'view-holiday-calender',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.holidayCalendar',
                to: '/administration/global-setting/holiday',
                disabled: false,
              },
              {
                text: 'View',
                to: '',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'holiday/update',
          component: () => import('@/views/administration/holiday/HolidayEdit'),
          name: 'update-holiday-calender',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.holidayCalendar',
                to: '/administration/global-setting/holiday',
                disabled: false,
              },
              {
                text: 'Edit',
                to: '',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'holiday/copy',
          component: () => import('@/views/administration/holiday/HolidayCopy'),
          name: 'copy-holiday-calender',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.holidayCalendar',
                to: '/administration/global-setting/holiday',
                disabled: false,
              },
              {
                text: 'Copy',
                to: '',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'measurement',
          component: () =>
            import('@/views/administration/measurement/Measurement'),
          name: 'measurement',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.measurement',
                to: '/administration/global-setting/measurement',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'measurement/new',
          component: () => import('@/views/administration/measurement/AddNew'),
          name: 'newmeasurement',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.measurement',
                to: '/administration/global-setting/measurement',
                disabled: false,
              },
              {
                text: 'route.addNew',
                to: '/administration/global-setting/measurement/new',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'measurement/update',
          component: () =>
            import('@/views/administration/measurement/UpdateRow'),
          name: 'updatemeasurement',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.measurement',
                to: '/administration/global-setting/measurement',
                disabled: false,
              },
              {
                text: 'route.updateRow',
                to: '/administration/global-setting/measurement/update',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'measurement/copy',
          component: () => import('@/views/administration/measurement/CopyRow'),
          name: 'copymeasurement',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.measurement',
                to: '/administration/global-setting/measurement',
                disabled: false,
              },
              {
                text: 'route.copyRow',
                to: '/administration/global-setting/measurement/copy',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'calendar',
          component: () => import('@/views/administration/calendar/Calendar'),
          name: 'calendar',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.calendar',
                to: '/administration/global-setting/calendar',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'calendar/new',
          component: () =>
            import('@/views/administration/calendar/CalendarNew'),
          name: 'new-calendar',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.calendar',
                to: '/administration/global-setting/calendar',
                disabled: false,
              },
              {
                text: 'route.addNew',
                to: '/administration/global-setting/calendar',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'calendar/update',
          component: () =>
            import('@/views/administration/calendar/CalendarEdit'),
          name: 'update-calendar',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.calendar',
                to: '/administration/global-setting/calendar',
                disabled: false,
              },
              {
                text: 'route.updateRow',
                to: '/administration/global-setting/calendar',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'calendar/view',
          component: () =>
            import('@/views/administration/calendar/CalendarView'),
          name: 'view-calendar',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.calendar',
                to: '/administration/global-setting/calendar',
                disabled: false,
              },
              {
                text: 'route.view',
                to: '/administration/global-setting/calendar/view',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'calendar/copy',
          component: () =>
            import('@/views/administration/calendar/CalendarCopy'),
          name: 'copy-calendar',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.globalSetting',
                to: '/administration/global-setting',
                disabled: false,
              },
              {
                text: 'route.calendar',
                to: '/administration/global-setting/calendar',
                disabled: false,
              },
              {
                text: 'route.copyRow',
                to: '/administration/global-setting/calendar/copy',
                disabled: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: 'user-maintenance',
      component: () => import('@/views/administration/UserMaintenance'),
      name: 'user_maintenance',
      meta: {
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'route.administration',
            disabled: false,
            to: '/administration',
          },
          {
            text: 'route.administration',
            to: '/administration',
            disabled: false,
          },
          {
            text: 'route.userMaintenance',
            to: '/administration/user-maintenance',
            disabled: true,
          },
        ],
      },
      children: [
        {
          path: 'users',
          component: () => import('@/views/administration/user-mainusers/User'),
          name: 'users',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.userMaintenance',
                to: '/administration/user-maintenance',
                disabled: false,
              },
              {
                text: 'route.user',
                to: '/administration/user-maintenance/users',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'users/new',
          component: () =>
            import('@/views/administration/user-mainusers/AddNew'),
          name: 'users_new',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.userMaintenance',
                to: '/administration/user-maintenance',
                disabled: false,
              },
              {
                text: 'route.user',
                to: '/administration/user-maintenance/users',
                disabled: false,
              },
              {
                text: 'route.addNew',
                to: '/administration/user-maintenance/users/new',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'users/view',
          component: () =>
            import('@/views/administration/user-mainusers/ViewRow'),
          name: 'users_view',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.userMaintenance',
                to: '/administration/user-maintenance',
                disabled: false,
              },
              {
                text: 'route.user',
                to: '/administration/user-maintenance/users',
                disabled: false,
              },
              {
                text: 'route.view',
                to: '/administration/user-maintenance/users/view',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'users/update',
          component: () =>
            import('@/views/administration/user-mainusers/UpdateRow'),
          name: 'users_update',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.userMaintenance',
                to: '/administration/user-maintenance',
                disabled: false,
              },
              {
                text: 'route.user',
                to: '/administration/user-maintenance/users',
                disabled: false,
              },
              {
                text: 'route.updateRow',
                to: '/administration/user-maintenance/users/update',
                disabled: true,
              },
            ],
          },
        },
        {
          path: 'users/copy',
          component: () =>
            import('@/views/administration/user-mainusers/CopyRow'),
          name: 'users_copy',
          meta: {
            requiresAuth: true,
            breadcrumb: [
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.administration',
                to: '/administration',
                disabled: false,
              },
              {
                text: 'route.userMaintenance',
                to: '/administration/user-maintenance',
                disabled: false,
              },
              {
                text: 'route.user',
                to: '/administration/user-maintenance/users',
                disabled: false,
              },
              {
                text: 'route.copyRow',
                to: '/administration/user-maintenance/users/copy',
                disabled: true,
              },
            ],
          },
        },
      ],
    },
  ],
}

export default administrationRouter
