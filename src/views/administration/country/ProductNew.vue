<template>
  <div id="app" class="container">
    <div class="row justify-content-center">
      <div class="col-xs-12 col-sm-10 col-md-6">
        <div class="title">{{ $t('navbar.product') }} : {{ mode }}</div>
        <AppForm />
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/components/BaseProductForm/index.vue'

export default {
  name: 'ProductNew',
  components: {
    AppForm: Form,
  },
  data() {
    return {
      mode: 'New',
    }
  },
}
</script>

<style lang="scss" scoped>
h1.title {
  margin-bottom: 30px;
}

#app {
  padding: 20px;
}
</style>
