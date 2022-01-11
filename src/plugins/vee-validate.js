import Vue from 'vue'
import VeeValidate from 'vee-validate'
import i18n from '../i18n'

const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: {
    en: {
      custom: {
        [i18n.t('label.transactionType')]: {
          min_value: i18n.t('message.notPermittedSeries'),
          max_value: i18n.t('message.notPermittedSeries'),
        },
      },
    },
  },
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',
  validity: false,
}

Vue.use(VeeValidate, config)
