<template>
  <VApp>
    <VContent app>
      <VContainer fluid fill-height>
        <RouterView :key="$route.fullPath"></RouterView>
      </VContainer>
    </VContent>
    <AppFooter transparent />
  </VApp>
</template>

<script>
import AppFooter from '@/components/AppFooter'

export default {
  name: 'LoginLayout',
  components: {
    AppFooter,
  },
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
