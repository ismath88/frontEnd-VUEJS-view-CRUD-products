<template>
  <VContainer fluid>
    <VLayout row>
      <VFlex xs12>
        <div class="title">
          {{ $t('navbar.product') }} : {{ $t('title.modeOverview') }}
        </div>
        <BaseList
          :table-headers="tableheader"
          :table-items="productsInfo"
          :export-event="onExport"
          :delete-event="onDelete"
          :copy-event="onCopy"
          :update-event="onUpdate"
          :add-event="onAdd"
          add-btn
          update-btn
          delete-btn
          copy-btn
        ></BaseList>
      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
import BaseList from '@/components/BaseListCountry/index'

import { mapGetters, mapActions } from 'vuex'
import i18n from '@/i18n'
export default {
  name: 'Product',
  components: {
    BaseList,
  },
  data: () => ({
    tableheader: [
      { text: i18n.t('label.product'), value: 'code' },
      { text: i18n.t('label.product_name'), value: 'name' },
      { text: i18n.t('label.product_price'), value: 'price' },
        { text: i18n.t('label.product_upc'), value: 'upc' },
        { text: i18n.t('label.product_status'), value: 'status' },
        { text: i18n.t('label.product_img'), value: 'prodimg' },
    ],
  }),
  computed: {
    ...mapGetters(['productsInfo', 'getTableData']),
  },
  mounted() {
    this.getProductList()
  },

  methods: {
    ...mapActions(['getProductList', 'updateActionState']),
    onAdd() {
      this.updateActionState('new').then()
    },
    onUpdate() {
      this.updateActionState('update').then()
    },
    onDelete() {
      alert('Delete!!')
    },
    onCopy() {
      this.updateActionState('copy').then()
    },
    onExport() {
      alert('Export!!!')
    },
  },
}
</script>
