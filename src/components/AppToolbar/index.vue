<template>
  <VToolbar fixed app class="elevation-1">
    <VToolbarSideIcon @click.stop="toggleDrawer()"></VToolbarSideIcon>
    <VSpacer></VSpacer>
    <VToolbarItems class="hidden-sm-and-down">
      <VBtn icon> <VIcon small>help_outline</VIcon> </VBtn>

      <VBtn icon> <VIcon small>notifications_none</VIcon> </VBtn>
      <VMenu transition="slide-y-transition" offset-y>
        <span slot="activator" class="body-1 pl-3">{{ user.email }}</span>
        <VList dense>
          <VListTile
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.to"
          >
            <VListTileAction>
              <VIcon>{{ item.icon }}</VIcon>
            </VListTileAction>
            <VListTileContent>
              <VListTileTitle>{{ $t(item.title) }}</VListTileTitle>
            </VListTileContent>
          </VListTile>
        </VList>
      </VMenu>
    </VToolbarItems>
  </VToolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
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
        { icon: 'account_circle', to: '/profile', title: 'navbar.profile' },
        { icon: 'settings', to: '/setting', title: 'navbar.setting' },
        {
          icon: 'power_settings_new',
          to: '/auth/logout',
          title: 'navbar.logout',
        },
      ],
    },
    user: {
      type: Object,
      required: false,
      default: () => ({
        email: localStorage.getItem('username'),
      }),
    },
  },
  methods: {
    toggleDrawer() {
      this.isDrawer = !this.isDrawer
      this.$emit('toggleDrawer', this.isDrawer)
    },
  },
}
</script>
