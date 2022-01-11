<template>
  <VContainer>
    <VLayout row>
      <VFlex xs12>
        <BaseUtilForm
          :mode="$t('title.modeUpdate')"
          :mode-description="$t('title.modeUpdateDescription')"
        ></BaseUtilForm>
      </VFlex>
    </VLayout>
  </VContainer>
</template>
<script>
import BaseUtilForm from '@/components/UtilFormUserMainUsers'

export default {
  name: 'UpdateRow',
  components: {
    BaseUtilForm,
  },
}
</script>
