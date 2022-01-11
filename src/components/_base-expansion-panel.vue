<template>
  <VLayout row wrap class="mb-1">
    <VFlex xs12 class="white">
      <VCard class="card--flex-toolbar" tile flat>
        <VToolbar card light dense class="white">
          <VBtn icon @click="isExpand = !isExpand">
            <VIcon>{{ isExpand ? expandIcon : collapsIcon }}</VIcon>
          </VBtn>
          <VToolbarTitle class="body-2 font-weight-bold card-toolbar-title">{{
            $t(title)
          }}</VToolbarTitle>
        </VToolbar>

        <VContainer v-if="isExpand" fluid grid-list-xl>
          <VLayout row wrap> <slot /> </VLayout>
        </VContainer>
      </VCard>
    </VFlex>
  </VLayout>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'title.administration',
    },
  },
  data: () => ({
    expandIcon: 'keyboard_arrow_down',
    collapsIcon: 'keyboard_arrow_right',
    isExpand: true,
  }),
}
</script>
