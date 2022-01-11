<template>
  <VContainer>
    <VLayout row>
      <VFlex xs12>
        <BaseUtilForm
          :mode="$t('title.modeNew')"
          :mode-description="$t('title.modeNewDescription')"
        ></BaseUtilForm>
      </VFlex>
    </VLayout>
  </VContainer>
</template>
<script>
import BaseUtilForm from '@/components/UtilFormUserMainUsers'

export default {
  name: 'AddNew',
  components: {
    BaseUtilForm,
  },
}
</script>
