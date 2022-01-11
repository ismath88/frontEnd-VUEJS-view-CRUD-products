<template>
  <VForm @submit.prevent="validateBeforeSubmit">
    <VCard class="elevation-12">
      <VToolbar light class="elevation-0">
        <VToolbarTitle>{{ $t('title.welcome') }}</VToolbarTitle>
        <VSpacer></VSpacer>
        <img
          id="logo"
          alt="logo"
          src=""
        />
      </VToolbar>
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
        <BasePasswordInput
          v-model.trim="user.password"
          v-validate="'required|min:8'"
          :error-messages="errors.collect($t('label.password'))"
          :label="$t('label.password')"
          :data-vv-name="$t('label.password')"
          name="password"
          prepend-icon="lock"
          required
        ></BasePasswordInput>
      </VCardText>
      <VCardActions>
        <a
          href="javascript:void(0)"
          class="body-2 primary--text link"
          @click="forgetPassword"
          >{{ $t('label.forgetPassword') }}</a
        >

          <a
          href="javascript:void(0)"
          class="body-2 primary--text link"
          @click="newRegister"
          >{{ $t('label.newRegister') }}</a
        >
        <VSpacer></VSpacer>
        <BaseSubmitButton
          :loading="loading"
          :text="$t('label.loginSubmitButton')"
        ></BaseSubmitButton>
      </VCardActions>
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
  name: 'FormLogin',
  $_veeValidate: {
    validator: 'new',
  },
  components: {
    BaseInput: () => import('@/components/BaseInput'),
    BasePasswordInput: () => import('@/components/BasePasswordInput'),
    BaseSubmitButton: () => import('@/components/BaseSubmitButton'),
  },
  data: () => ({
    notification: {
      snackbar: false,
      timeout: 5000,
      color: '',
      text: '',
    },
    loading: false,
    user: {
      username: '',
      password: '',
    },
  }),
  methods: {
    ...mapActions('auth', ['login']),

    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.tryLogin()
        }
      })
    },

    tryLogin() {
      this.loading = true
      this.login(this.user)
        .then(() => {
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 1000)
        })
        .catch((error) => {
          this.notification.text = error
          this.notification.color = 'error'
          setTimeout(() => {
            this.notification.snackbar = true
            this.loading = false
          }, 1000)
        })
    },

    forgetPassword() {
      this.$router.push('/forget-password')
    },
      newRegister(){
      this.$router.push('/administration/user-maintenance/users')
    },
  },
}
</script>

<style lang="scss" scoped>
a.link {
  text-decoration: none;
}
</style>
