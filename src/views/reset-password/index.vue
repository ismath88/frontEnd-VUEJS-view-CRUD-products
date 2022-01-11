<template>
  <VLayout align-center justify-center>
    <VFlex xs12 sm8 md4> <FormLogin /> </VFlex>
  </VLayout>
</template>

<script>
import FormLogin from '@/components/FormResetPassword'

export default {
  name: 'ForgetPassword',
  components: {
    FormLogin,
  },
  data: () => ({}),
}
</script>
