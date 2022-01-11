import VueI18n from 'vue-i18n'
import Vue from 'vue'

import en from './en'
import zh from './zh'
import kh from './kh'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  messages: {
    zh,
    en,
    kh
  }
})
