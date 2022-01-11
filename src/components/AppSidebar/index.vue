<template>
  <VNavigationDrawer v-model="isDrawer" fixed app width="250">
    <VToolbar flat class="transparent">
      <RouterLink to="/" tag="span" style="cursor: pointer; font-weight: bold">
        <img id="logo" alt="logo" src="" />
      </RouterLink>
    </VToolbar>
    <VDivider></VDivider>
    <VList dense>
      <template v-for="(item, index) in menuItems">
        <VSubheader v-if="item.header" :key="index">
          {{ $t(item.header) }}
        </VSubheader>
        <VDivider v-else-if="item.divider" :key="index"></VDivider>
        <VListTile v-else :key="index" :to="item.to" avatar>
          <VListTileAvatar tile size="16">
            <img :src="require(`@assets/img/nav-img/${item.icon}`)" />
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>{{ $t(item.title) }}</VListTileTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>
  </VNavigationDrawer>
</template>

<script>
export default {
  name: 'AppSidebar',
  components: {},
  props: {
    isDrawer: {
      type: Boolean,
      required: false,
      default: true,
    },
    menuItems: {
      type: Array,
      required: false,
      default: () => [
        { icon: 'home_icon.png', to: '/dashboard', title: 'navbar.dashboard' },
        {
          icon: 'customer_care_icon.png',
          to: '/customer-care',
          title: 'navbar.customerCare',
        },
        // {
        //   icon: 'service_management_icon.png',
        //   to: '/service-management',
        //   title: 'navbar.serviceManagement',
        // },
        {
          icon: 'device_management_icon.png',
          to: '/device-management',
          title: 'navbar.deviceManagement',
        },
        { icon: 'billing_icon.png', to: '/billing', title: 'navbar.billing' },
        {
          icon: 'customer_financial_icon.png',
          to: '/customer-financial',
          title: 'navbar.customerFinancial',
        },
        {
          icon: 'enterprise_icon.png',
          to: '/enterprise',
          title: 'navbar.enterprise',
        },
        {
          icon: 'administrator_icon.png',
          to: '/administration',
          title: 'navbar.administration',
        },
        // { divider: true },
        // {
        //   icon: 'power_settings_new',
        //   to: '/auth/logout',
        //   title: 'navbar.logout'
        // }
      ],
    },
  },
}
</script>

<style lang="scss" scoped>
#logo {
  width: 160px;
}
</style>
