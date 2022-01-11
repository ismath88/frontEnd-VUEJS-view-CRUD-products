<template>
  <VFooter :class="transparent ? 'transparent' : ''" app inset>
    <div class="pa-3">
      {{ this.$clientName }} &copy;
      {{ new Date().getFullYear() + ' Powered by ' + this.$poweredBy }}
    </div>
  </VFooter>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AppFooter',
  components: {},
  props: {
    transparent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mounted() {
    this.getCentralSettingData()
  },
  methods: {
    ...mapActions('centralDateConfig', ['getCentralSettingData']),
  },
}
</script>
