<template>
  <RouterView :key="$route.fullPath"></RouterView>
</template>

<script>
import appConfig from '@src/app.config'
export default {
  name: 'App',
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
}
</script>

// Global CSS
<style lang="scss">
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

.settingMenuList {
  border-right-color: rgba(0, 0, 0, 0.12);
  border-right-style: solid;
  border-right-width: 1px;
}
</style>
