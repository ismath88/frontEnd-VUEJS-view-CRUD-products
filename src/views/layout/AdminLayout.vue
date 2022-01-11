<template>
  <VApp>
    <AppSidebar :is-drawer="drawer" />
    <AppToolbar @toggleDrawer="drawer = $event" />
    <AppContent />
    <AppFooter />
  </VApp>
</template>

<script>
import AppToolbar from '@/components/AppToolbar'
import AppSidebar from '@/components/AppSidebar'
import AppFooter from '@/components/AppFooter'
import AppContent from '@/components/AppContent'

export default {
  name: 'AdminLayout',
  components: {
    AppToolbar,
    AppSidebar,
    AppFooter,
    AppContent,
  },
  data: () => ({
    drawer: true,
  }),
}
</script>
