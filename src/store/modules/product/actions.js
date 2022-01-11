import { apiClient } from '@/api'
import types from './mutations/types'
import router from '@/router'
import i18n from '@/i18n'

export default {
  getProductList({ commit }) {
    apiClient
      .get('products')
      .then((response) => {
        commit(
          types.GET_PRODUCT_LIST,
          Object.values(response.data['hydra:member'])
        )
      })
      .catch(() => {})
  },
  postProductDetail({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      apiClient
        .post('products', {
            name: payload.productField,
          price: payload.product_price,
          upc: payload.product_upc,
          status: payload.product_status,
          prodimg:payload.product_prodimg,
        })
        .then((response) => {
          resolve(response)
          if (response.status === 201) {
            let msg = {
              text: i18n.t('message.dataSaved'),
              type: 'success',
              display: true,
            }
            dispatch('msgNotification', msg)
            router.push('/administration/global-setting/product')
          }
        })
        .catch((error) => {
          reject(error)
          if (error.response.status === 400) {
            let msg = {
              text: i18n.t('message.recordExisted'),
              type: 'error',
              display: true,
            }
            dispatch('msgNotification', msg)
          } else {
            let msg1 = {
              text: error.response.data['hydra:description'],
              type: 'error',
              display: true,
            }
            dispatch('msgNotification', msg1)
          }
        })
    })
  },
  productUpdate({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      apiClient
        .put('products/' + payload.id, {
          name: payload.name,
          price: payload.price,
          upc: payload.upc,
          status: payload.status,
          prodimg: payload.prodimg,
        })
        .then((response) => {
          resolve(response)
          if (response.status === 200) {
            var msg = {
              text: i18n.t('message.dataSaved'),
              type: 'success',
              display: true,
            }
            dispatch('msgNotification', msg)
            setTimeout(() => {
              router.push('/administration/global-setting/product')
            }, 1000)
          }
        })
        .catch((error) => {
          reject(error)
          var msg = {
            text: error.response.data['hydra:description'],
            type: 'error',
            display: true,
          }
          commit(types.MSG_NOTIFICATION, msg)
        })
    })
  },

  productDelete({ commit, dispatch }, payload) {
    payload.map((id) => {
      const productJson = id['@id']
      const res = productJson.split('/')
      const productId = res[res.length - 1]

      apiClient
        .delete('products/' + productId)
        .then((response) => {
          if (response.status === 204) {
            var msg = {
              text: i18n.t('message.dataSaved'),
              type: 'success',
              display: true,
            }
            dispatch('msgNotification', msg)
            commit(types.DELETE_PRODUCT_DATA, id['@id'])
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            var msg = {
              text: i18n.t('message.cannotDelete'),
              type: 'error',
              display: true,
            }
            dispatch('msgNotification', msg)
          }
        })
    })
  },
}
