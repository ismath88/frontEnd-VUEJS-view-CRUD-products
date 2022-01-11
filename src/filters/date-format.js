import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm:ss A')
  }
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('formatPickerDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD')
  }
})
Vue.filter('formatPickerDateZulu', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
  }
})
