import types from './mutation/types'
import { apiClient, apiUser } from '@/api'
import router from '@/router'
import i18n from '@/i18n'

export default {
  getUser({ commit }) {
    apiClient
      .get('/users')
      .then((response) => {
        commit(types.GET_DATA_USER, response.data['hydra:member'])
      })
      .catch()
  },
  addUser({ dispatch }, payload) {
    const idpayload = {
      username: payload.username,
      company: payload.company,
      firstname: payload.firstname,
      lastname: payload.lastname,
      mobile: payload.prefix + ' ' + payload.mobile,
      validFrom: new Date(payload.validFrom),
      status: payload.status,
      password: payload.password,
      mobileUser: payload.mobileUser,
      webUser: payload.webUser,
    }
    return new Promise((resolve, reject) => {
      apiClient
        .post('/users', idpayload)
        .then((response) => {
          resolve(response)
          if (response.status === 201) {
            let msg = {
              text: i18n.t('message.dataSaved'),
              type: 'success',
              display: true,
            }
            dispatch('msgNotification', msg)
            router.push('/administration/user-maintenance/users')
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
  updateUser({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      apiClient
        .put('/users/' + payload.id, payload)
        .then((response) => {
          resolve(response)
          if (response.status === 200) {
            let msg = {
              text: i18n.t('message.dataSaved'),
              type: 'success',
              display: true,
            }
            dispatch('msgNotification', msg)
            setTimeout(() => {
              router.push('/administration/user-maintenance/users')
            }, 1000)
          }
        })
        .catch((error) => {
          reject(error)
          let msg = {
            text: error.response.data['hydra:description'],
            type: 'error',
            display: true,
          }
          dispatch('msgNotification', msg)
        })
    })
  },
  deleteUser({ commit, dispatch }, payload) {
    payload.map((id) => {
      apiClient
        .delete(id['@id'])
        .then(() => {
          let msg = {
            text: i18n.t('message.dataSaved'),
            type: 'success',
            display: true,
          }
          dispatch('msgNotification', msg)
          commit(types.DELETE_DATA_USER, id['@id'])
        })
        .catch((error) => {
          if (error.response.status === 500) {
            let msg = {
              text: i18n.t('message.cannotDelete'),
              type: 'error',
              display: true,
            }
            dispatch('msgNotification', msg)
          }
        })
    })
  },
  forgetPassword({ commit }, payload) {
    apiUser.post('reset_password/', {
      username: payload.username,
    })
  },
  resetPassword({ commit }, payload) {
    apiUser.post('reset_password/' + payload.token, {
      password: payload.password,
    })
  },
  getResetToken({ commit }, payload) {
    apiUser
      .get('reset_password/' + payload.token)
      .then((response) => {})
      .catch()
  },
}
