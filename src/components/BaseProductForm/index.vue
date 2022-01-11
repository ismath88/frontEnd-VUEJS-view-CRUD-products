<template>
  <div>
    <BaseNotification
      :display="msgDisplayInfo"
      :type="msgType"
      :text="msgText"
    ></BaseNotification>
    <VForm @submit.prevent="validateBeforeSubmit">
      <div class="form-group">
        <BaseButton
          type="submit"
          :text="$t('button.saveButton')"
          :loading="loading"
        >
        </BaseButton>

        <BaseCancelModal
          class="d-inline"
          to-url="/administration/global-setting/product"
        ></BaseCancelModal>
      </div>
      
      <div class="form-group">
        <BaseInput
          v-model="productForm.productField"
          v-validate="'required|max:50'"
          :error-messages="errors.collect($t('label.product_name'))"
          :data-vv-name="$t('label.product_name')"
          :label="$t('label.product_name')"
          input-type="text"
          name="product"
          required
        ></BaseInput>
      </div>

    <div class="form-group">
            <BaseInput
              v-model="productForm.product_price"
              v-validate="'required|max:50'"
              :error-messages="errors.collect($t('label.product_price'))"
              :data-vv-price="$t('label.product_price')"
              :label="$t('label.product_price')"
              input-type="text"
              price="product"
              required
            ></BaseInput>
          </div>

      <div class="form-group">
        <BaseInput
          v-model="productForm.product_upc"
          v-validate="'required|max:50'"
          :error-messages="errors.collect($t('label.product_upc'))"
          :data-vv-upc="$t('label.product_upc')"
          :label="$t('label.product_upc')"
          input-type="text"
          upc="product"
          required
        ></BaseInput>
      </div>

<div class="form-group">
        <BaseInput
          v-model="productForm.product_status"
          v-validate="'required|max:50'"
          :error-messages="errors.collect($t('label.product_status'))"
          :data-vv-status="$t('label.product_status')"
          :label="$t('label.product_status')"
          input-type="text"
          status="product"
          required
        ></BaseInput>
      </div>
<div class="form-group">
        <BaseInput
          v-model="productForm.product_prodimg"
          v-validate="'required|max:50'"
          :error-messages="errors.collect($t('label.product_prodimg'))"
          :data-vv-prodimg="$t('label.product_prodimg')"
          :label="$t('label.product_prodimg')"
          input-type="file"
          prodimg="product"
          required
        ></BaseInput>
      </div>

    </VForm>
  </div>
</template>
<script>
import BaseInput from '@/components/BaseInput'
import BaseCancelModal from '@/components/BaseCancelModal'
import BaseNotification from '@/components/BaseNotification'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AppForm',

  components: {
    BaseInput,
    BaseButton: () => import('@/components/BaseButton'),
    BaseCancelModal,
    BaseNotification,
  },
  data() {
    return {
      productForm: {
        productField: '',
        product_codeField: '',
        product_phone_codeField: '',
      },
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
      //
    } else if (this.getAction === 'update') {
      const productName = this.getRowSeleted[0].name
        const productPrice = this.getRowSeleted[0].price
        const productUpc = this.getRowSeleted[0].upc
        const productStatus = this.getRowSeleted[0].status
        const productProdimg = this.getRowSeleted[0].prodimg
      const productJson = this.getRowSeleted[0]['@id']
      const res = productJson.split('/')
      const productId = res[res.length - 1]

      this.productForm.productField = productName
      this.productForm.product_price = this.getRowSeleted[0].price
        this.productForm.product_upc = this.getRowSeleted[0].upc
     this.productForm.product_status = this.getRowSeleted[0].status
this.productForm.product_prodimg = this.getRowSeleted[0].prodimg
      this.dataId = productId
      this.disableField = true
    } else if (this.getAction === 'copy') {
      const productName = this.getRowSeleted[0].name
      this.productForm.productField = productName
      this.productForm.product_price = this.getRowSeleted[0].price
        this.productForm.product_upc = this.getRowSeleted[0].upc
     this.productForm.product_status = this.getRowSeleted[0].status
this.productForm.product_prodimg = this.getRowSeleted[0].prodimg
    }
  },

  methods: {
    ...mapActions(['postProductDetail', 'productUpdate', 'msgNotification']),
    addNew: function() {
      this.postProductDetail(this.productForm)
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    updateProductData: function() {
      this.productUpdate({
        id: this.dataId,
        name: this.productForm.productField,
        price: this.productForm.product_price,
      upc: this.productForm.product_upc,
      status: this.productForm.product_status,
      prodimg: this.productForm.product_prodimg,
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
            this.addNew(this.productForm)
          } else if (this.getAction === 'update') {
            // this.getRowSeleted[0].name this.productForm.productField
            //  this.getRowSeleted[0].phoneCode this.productForm.product_phone_codeField

            if (
              this.getRowSeleted[0].name === this.productForm.productField &&
              this.getRowSeleted[0].price === this.productForm.product_price &&
                this.getRowSeleted[0].upc === this.productForm.product_upc &&
                this.getRowSeleted[0].status === this.productForm.product_status &&
                this.getRowSeleted[0].prodimg === this.productForm.product_prodimg
                
            ) {
              var msg = {
                text: this.$t('message.noChange'),
                type: 'success',
                display: true,
              }
              this.msgNotification(msg)
              this.$router.go(-1)
              // if (this.getRowSeleted[0].description !== this.idType.description) {
            } else {
              this.updateProductData()
            }
          } else if (this.getAction === 'copy') {
            this.loading = false
            this.addNew(this.productForm)
          }
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
