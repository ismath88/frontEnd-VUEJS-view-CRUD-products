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
  name: 'GlobalSetting',
  components: {
    ContentHeaderWithBreadcrumb,
  },
  data: function() {
    return {
      contentTitle: 'route.globalSetting',
      items: [
        {
          title: this.$t('navbar.centralSetting'),
          to: '/administration/global-setting/central-system-setting',
        },
        {
          title: this.$t('navbar.currency'),
          to: '/administration/global-setting/currency',
        },
        // {
        //   title: this.$t('navbar.language'),
        //   to: '/administration/global-setting/language'
        // },
        {
          title: this.$t('navbar.country'),
          to: '/administration/global-setting/country',
        },
        {
          title: this.$t('navbar.region'),
          to: '/administration/global-setting/region',
        },
        {
          title: this.$t('navbar.calendar'),
          to: '/administration/global-setting/calendar',
        },
        {
          title: this.$t('navbar.holidayCalendar'),
          to: '/administration/global-setting/holiday',
        },
        {
          title: this.$t('navbar.measurement'),
          to: '/administration/global-setting/measurement',
        },
      ],
    }
  },
}
</script>
