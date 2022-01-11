import types from './types'

export default {
  [types.GET_DATA_USER](state, payload) {
    state.userData = payload
  },
  [types.DELETE_DATA_USER](state, payload) {
    let atIndex = state.userData.findIndex((data) => data['@id'] === payload)
    state.userData.splice(atIndex, 1)
    state.rowSeleted.length = 0
  },
}
