<template>
  <VBtn
    v-bind="$attrs"
    :block="block"
    :color="color"
    :flat="flat"
    :loading="loading"
    @click="onClick"
  >
    {{ text }}
  </VBtn>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: {
      type: String,
      required: true,
    },
    block: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: 'primary',
      validator: function(value) {
        return (
          ['success', 'warning', 'error', 'primary', 'info', ''].indexOf(
            value
          ) !== -1
        )
      },
    },
    flat: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
}
</script>
