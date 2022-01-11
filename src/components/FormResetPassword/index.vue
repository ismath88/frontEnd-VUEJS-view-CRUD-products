<template>
  <VForm @submit.prevent="validateBeforeSubmit">
    <VCard class="elevation-12">
      <VToolbar light class="elevation-0">
        <VToolbarTitle>{{ $t('title.requestPasswordReset') }}</VToolbarTitle>
        <VSpacer></VSpacer>
        <img
          id="logo"
          alt="logo"
          src=""
        />
      </VToolbar>
      <template v-if="requestSuccess">
        <VCardText>
          <p
            ><b>{{ $t('message.success') }}</b
            >: {{ $t('message.yourPasswordReset') }}
          </p>
        </VCardText>
      </template>
      <template v-else>
        <VCardText>
          <BaseInput
            v-model.trim="user.username"
            v-validate="'required|email'"
            :error-messages="errors.collect($t('label.email'))"
            :label="$t('label.email')"
            :data-vv-name="$t('label.email')"
            name="email"
            input-type="email"
            prepend-icon="mail"
            required
          ></BaseInput>
        </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <BaseButton
            type="submit"
            :text="$t('label.resetPassword')"
            :loading="loading"
          >
          </BaseButton>
        </VCardActions>
      </template>
    </VCard>
    <VSnackbar
      v-model="notification.snackbar"
      :timeout="notification.timeout"
      :color="notification.color"
      top
    >
      {{ notification.text }}
      <VBtn dark flat @click="notification.snackbar = false">
        {{ $t('button.close') }}
      </VBtn>
    </VSnackbar>
  </VForm>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'FormResetPassword',
  $_veeValidate: {
    validator: 'new',
  },
  components: {
    BaseInput: () => import('@/components/BaseInput'),
    BaseButton: () => import('@/components/BaseButton'),
  },
  data: () => ({
    notification: {
      snackbar: false,
      timeout: 5000,
      color: '',
      text: '',
    },
    loading: false,
    requestSuccess: false,
    user: {
      username: '',
      email: '',
    },
  }),
  methods: {
    ...mapActions(['forgetPassword']),
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading = true
          this.forgetPassword(this.user)
            .then(() => {})
            .catch(() => {})
            .finally(() => {
              this.loading = false
            })
          this.requestSuccess = true
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
a.link {
  text-decoration: none;
}
</style>
