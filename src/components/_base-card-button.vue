<template>
  <VFlex class="cardButton" align-center justify-center row fill-height>
    <VCard
      :to="url"
      :disabled="disable"
      :hover="!disable"
      :class="[{ disabledCard: disable }, 'card--flex-toolbar']"
    >
      <VToolbar card prominent dense>
        <VToolbarTitle class="body-2 cardToolbarTitle">
          {{ $t(cardTitle) }}
        </VToolbarTitle>
      </VToolbar>
      <VDivider></VDivider>
      <VCardText>
        <VLayout row wrap>
          <VFlex xs12>
            <VImg
              :alt="$t(cardTitle)"
              :src="require(`@assets/img/button-img/${image}`)"
              contain
              width="100"
              class="buttonImage"
            ></VImg>
          </VFlex>
        </VLayout>
      </VCardText>
    </VCard>
  </VFlex>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
      default: '/',
    },
    image: {
      type: String,
      require: true,
      default: 'AD Global Settings.png',
    },
    cardTitle: {
      type: String,
      required: true,
      default: 'title.globalSetting',
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.cardButton {
  min-width: 196px;
  max-width: 196px;
}
.cardToolbarTitle {
  margin: 0 auto;
}
.buttonImage {
  position: relative;
  left: 50%;
  margin-left: -50px;
}
.disabledCard {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
