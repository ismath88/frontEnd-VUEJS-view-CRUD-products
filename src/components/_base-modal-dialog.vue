<template>
  <VLayout row>
    <VBtn :disabled="disabled" color="primary" @click="dialog = true"
      >{{ text }}
    </VBtn>

    <VDialog v-model="dialog" v-bind="$attrs" persistent max-width="290">
      <VCard>
        <VCardTitle class="headline">{{ title }}</VCardTitle>
        <VCardText>{{ message }}</VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color="green darken-1" flat @click="handler(onYesDialog)">
            {{ $t('button.yes') }}
          </VBtn>
          <VBtn color="primary" flat @click="dialog = false">
            {{ $t('button.no') }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VLayout>
</template>
<script>
export default {
  name: 'BaseModalDialog',
  props: {
    text: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    onYesDialog: {
      type: Function,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    handler: function() {
      this.onYesDialog()
      this.dialog = false
    },
  },
}
</script>
