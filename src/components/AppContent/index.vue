<template>
  <VContent app>
    <RouterView :key="$route.fullPath"></RouterView>
  </VContent>
</template>

<script>
export default {
  name: 'AppContent',
}
</script>
