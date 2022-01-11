<template>
  <VForm @submit.prevent="validateBeforeSubmit">
    <VContainer grid-list-xl>
      <div class="title">{{ $t('navbar.currency') }} : {{ mode }}</div>
      <BaseNotification
        :display="msgDisplayInfo"
        :type="msgType"
        :text="msgText"
      ></BaseNotification>
      <VLayout wrap justify-space-between>
        <VFlex xs12>
          <div class="form-group">
            <BaseButton
              type="submit"
              :text="$t('button.saveButton')"
              :loading="loading"
            >
            </BaseButton>
            <BaseCancelModal
              class="d-inline"
              to-url="/administration/global-setting/currency"
            ></BaseCancelModal>
          </div>
          <BaseInput
            v-model="currency.code"
            v-validate="'required'"
            :error-messages="errors.collect($t('label.currency'))"
            :data-vv-name="$t('label.currency')"
            :label="$t('label.currency')"
            :disabled="disableField"
            input-type="text"
            name="currency"
            required
          ></BaseInput>
          <BaseInput
            v-model="currency.name"
            v-validate="'required'"
            :error-messages="errors.collect($t('label.currencyname'))"
            :label="$t('label.currencyname')"
            :data-vv-name="$t('label.currencyname')"
            input-type="text"
            name="currencyname"
          ></BaseInput>
        </VFlex>
      </VLayout>
    </VContainer>
  </VForm>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseNotification from '@/components/BaseNotification'
import BaseCancelModal from '@/components/BaseCancelModal'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'BaseUtilFormCurrency',
  $_veeValidate: {
    validator: 'new',
  },
  components: {
    BaseInput,
    BaseButton,
    BaseCancelModal,
    BaseNotification,
  },
  props: {
    mode: {
      type: String,
      default: '',
    },
    modeDescription: {
      type: String,
      default: '',
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      currency: {
        code: '',
        name: '',
      },
      dataId: '',
      disableField: false,
      loading: false,
    }
  },
  computed: {
    ...mapGetters([
      'getRowSeleted',
      'getAction',
      'msgDisplayInfo',
      'msgText',
      'msgType',
    ]),
  },
  mounted() {
    if (this.getAction === 'new') {
      this.currency.code = ''
      this.currency.name = ''
    } else if (this.getAction === 'update') {
      this.currency.code = this.getRowSeleted[0].code
      this.currency.name = this.getRowSeleted[0].name
      this.dataId = this.getRowSeleted[0]['@id'].slice(12)
      this.disableField = true
    } else if (this.getAction === 'copy') {
      this.currency.code = this.getRowSeleted[0].code
      this.currency.name = this.getRowSeleted[0].name
    }
  },
  methods: {
    ...mapActions([
      'currencyNew',
      'updateRowSeleted',
      'currencyUpdate',
      'msgNotification',
    ]),

    addNew: function() {
      this.currencyNew(this.currency)
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    updateData: function() {
      this.currencyUpdate({
        id: this.dataId,
        code: this.currency.code,
        name: this.currency.name,
      })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    validateBeforeSubmit() {
      this.loading = true
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.getAction === 'new') {
            this.addNew()
          } else if (this.getAction === 'update') {
            if (this.getRowSeleted[0].name !== this.currency.name) {
              this.updateData()
            } else {
              var msg = {
                text: this.$t('message.noChange'),
                type: 'success',
                display: true,
              }
              this.msgNotification(msg)
              this.$router.go(-1)
            }
          } else if (this.getAction === 'copy') {
            this.loading = false
            if (this.currency.code === this.getRowSeleted[0].code) {
              msg = {
                text: this.$t('message.recordExisted'),
                type: 'error',
                display: true,
              }
              this.msgNotification(msg)
            } else {
              this.addNew()
            }
          }
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
