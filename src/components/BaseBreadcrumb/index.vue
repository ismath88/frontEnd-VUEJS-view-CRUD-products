<template>
  <VBreadcrumbs :items="breadcrumb">
    <template slot="item" slot-scope="props">
      <RouterLink
        :to="props.item.to"
        :class="[props.item.disabled && 'disabled', 'link']"
        tag="a"
        >{{ props.item.text }}</RouterLink
      >
    </template>
  </VBreadcrumbs>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BaseBreadcrumb',
  computed: {
    ...mapState({
      breadcrumb: (state) => state.app.breadcrumb,
    }),
  },
  watch: {
    $route: {
      handler: 'updateList',
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['setBreadcrumb']),

    updateList() {
      let breadcrumbList = []
      this.$route.meta.breadcrumb.forEach((item) => {
        let temp = {
          text: '',
          to: '',
          disabled: false,
        }
        temp.text = this.$t(item.text)
        temp.to = item.to
        temp.disabled = item.disabled
        breadcrumbList.push(temp)
      })
      this.setBreadcrumb(breadcrumbList)
    },
  },
}
</script>
<style lang="scss" scoped>
.disabled {
  color: grey;
  pointer-events: none;
}
a.link {
  text-decoration: none;
}
</style>
