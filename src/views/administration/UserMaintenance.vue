<template>
  <VLayout row wrap>
    <ContentHeaderWithBreadcrumb
      :content-title="contentTitle"
    ></ContentHeaderWithBreadcrumb>
    <VContainer fluid>
      <VLayout row wrap class="white">
        <VFlex xs12 md3 class="settingMenuList">
          <VList dense>
            <VListTile v-for="item in items" :key="item.title" :to="item.to">
              <VListTileContent>
                <VListTileTitle>{{ item.title }}</VListTileTitle>
              </VListTileContent>
            </VListTile>
          </VList>
        </VFlex>
        <VFlex xs12 md9>
          <RouterView :key="$route.fullPath"></RouterView>
        </VFlex>
      </VLayout>
    </VContainer>
  </VLayout>
</template>

<script>
import ContentHeaderWithBreadcrumb from '@/components/ContentHeaderWithBreadcrumb'

export default {
  name: 'UserMaintenance',
  components: {
    ContentHeaderWithBreadcrumb,
  },
  data: function() {
    return {
      contentTitle: 'route.userMaintenance',
      items: [
        {
          title: this.$t('navbar.user'),
          to: '/administration/user-maintenance/users',
        },
        // {
        //   title: this.$t('navbar.role'),
        //   to: '/administration/user-maintenance/role',
        // },
      ],
    }
  },
}
</script>
