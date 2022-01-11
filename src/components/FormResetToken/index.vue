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
            >: {{ $t('message.yourPasswordSuccess') }}
          </p>
          <p
            >{{ $t('message.youMayProceedTo') }}
            <VBtn to="/auth/login">Log In</VBtn></p
          >
        </VCardText>
      </template>
      <template v-else>
        <VCardText>
          <BaseInput
            ref="password"
            v-model="user.password"
            v-validate="'required|min:8|max:10'"
            :error-messages="errors.collect($t('label.password'))"
            :label="$t('label.password')"
            :data-vv-name="$t('label.password')"
            name="password"
            input-type="password"
            required
          ></BaseInput>
          <BaseInput
            v-model="user.repeatPassword"
            v-validate="'required|min:8|max:10|confirmed:password'"
            :error-messages="errors.collect($t('label.repeatPassword'))"
            :label="$t('label.repeatPassword')"
            :data-vv-name="$t('label.repeatPassword')"
            name="repeatPassword"
            input-type="password"
            required
          ></BaseInput>
        </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <BaseSubmitButton :loading="loading"></BaseSubmitButton>
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
  name: 'FormResetToken',
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
      token: '',
      password: '',
      repeatPassword: '',
    },
  }),
  methods: {
    ...mapActions(['resetPassword']),
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.user.token = this.$router.currentRoute.query.token
          this.loading = true
          this.resetPassword(this.user)
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
