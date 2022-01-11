<template>
  <VContainer>
    <VLayout row>
      <VFlex xs12>
        <BaseUtilForm
          :mode="$t('title.modeView')"
          :mode-description="$t('title.modeViewDescription')"
        ></BaseUtilForm>
      </VFlex>
    </VLayout>
  </VContainer>
</template>
<script>
import BaseUtilForm from '@/components/UtilFormUserMainUsers'

export default {
  name: 'ViewRow',
  components: {
    BaseUtilForm,
  },
}
</script>
