<template>
  <VContainer>
    <VLayout row>
      <VFlex xs12>
        <BaseUtilForm
          :mode="$t('title.modeCopy')"
          :mode-description="$t('title.modeCopyDescription')"
        ></BaseUtilForm>
      </VFlex>
    </VLayout>
  </VContainer>
</template>
<script>
import BaseUtilForm from '@/components/UtilFormUserMainUsers'

export default {
  name: 'CopyRow',
  components: {
    BaseUtilForm,
  },
}
</script>
