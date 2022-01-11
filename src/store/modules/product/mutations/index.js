import types from './types'

export default {
  [types.GET_PRODUCT_LIST](state, payload) {
    state.produstsList = payload
  },
  [types.INSERT_PRODUCT_DATA](state, payload) {
    state.produstsList.concat(payload)
  },
  [types.UPDATE_PRODUCT_DATA](state, payload) {
    state.produstsList.map((data) => {
      if (data.id['@id'] === payload.id) {
        data.name = payload.name
        data.price = payload.price
        data.upc = payload.upc
        data.status = payload.status
        data.prodimg payload.prodimg
        
      }
    })
  },
  [types.DELETE_PRODUCT_DATA](state, payload) {
    let atIndex = state.produstsList.findIndex(
      (data) => data['@id'] === payload
    )
    state.produstsList.splice(atIndex, 1)
  },
}
