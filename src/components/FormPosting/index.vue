<template>
  <VForm @submit.prevent="validateBeforeSubmit('postingForm')">
    <VContainer class="white">
      <VLayout row>
        <VFlex xs12>
          <BaseNotification
            :display="msgDisplayInfo"
            :type="msgType"
            :text="msgText"
          ></BaseNotification>
          <BaseButton
            type="submit"
            :text="$t('button.saveButton')"
            :loading="loading"
          >
          </BaseButton>
          <BaseCancelModal
            class="d-inline"
            to-url="/customer-financial/posting/select"
          ></BaseCancelModal>
        </VFlex>
      </VLayout>
      <VCard class="mt-3">
        <VCardTitle class="primary">
          <span class="title white--text">
            {{ $t('title.header') }}
          </span>
        </VCardTitle>
        <VContainer fluid grid-list-xl>
          <VLayout row wrap>
            <VFlex xs12 md4>
              <VMenu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                :disabled="disableAccountDocument"
                min-width="290px"
              >
                <VTextField
                  slot="activator"
                  v-model="postingDateText"
                  v-validate="'required'"
                  readonly
                  :error-messages="
                    errors.collect('postingForm.' + $t('label.postingDate'))
                  "
                  :data-vv-name="$t('label.postingDate')"
                  :label="$t('label.postingDate')"
                  :disabled="disableAccountDocument"
                  format="yyyy-mm-dd"
                  data-vv-scope="postingForm"
                  clearable
                  @click:clear="
                    $nextTick(
                      () => (accountDocument.postingDate = ''),
                      validatePostingPeriod()
                    )
                  "
                ></VTextField>
                <VDatePicker
                  v-model="accountDocument.postingDate"
                  :disabled="disableAccountDocument"
                  @input="menu = false"
                  @change="validatePostingPeriod"
                ></VDatePicker>
              </VMenu>
            </VFlex>
            <VFlex xs12 md4>
              <VMenu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                :disabled="disableAccountDocument"
                min-width="290px"
              >
                <VTextField
                  slot="activator"
                  v-model="documentDateText"
                  v-validate="'required'"
                  readonly
                  :error-messages="
                    errors.collect('postingForm.' + $t('label.documentDate'))
                  "
                  :data-vv-name="$t('label.documentDate')"
                  :label="$t('label.documentDate')"
                  :disabled="disableAccountDocument"
                  format="yyyy-mm-dd"
                  clearable
                  data-vv-scope="postingForm"
                ></VTextField>
                <VDatePicker
                  v-model="accountDocument.documentDate"
                  :disabled="disableAccountDocument"
                  @input="menu1 = false"
                ></VDatePicker>
              </VMenu>
            </VFlex>
            <VFlex xs12 md4>
              <BaseInput
                v-model="accountDocument.documentNumber"
                v-validate="'required|max:20'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.documentNumber'))
                "
                :data-vv-name="$t('label.documentNumber')"
                :label="$t('label.documentNumber')"
                input-type="text"
                name="documentNumber"
                required
                :disabled="disableDocumentNumber"
                data-vv-scope="postingForm"
              ></BaseInput>
            </VFlex>
            <VFlex xs8 md2>
              <VAutocomplete
                v-model="accountDocument.customer"
                v-validate="'required'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.customerNumber'))
                "
                :data-vv-name="$t('label.customerNumber')"
                :items="getCustomer"
                :label="$t('label.customerNumber')"
                item-text="customerNumber"
                item-value="@id"
                clearable
                data-vv-scope="postingForm"
                :disabled="disableField"
                @click:clear="
                  $nextTick(
                    () => (accountDocument.customer = null),
                    (accountDocument.contract = null)
                  )
                "
              ></VAutocomplete>
            </VFlex>
            <VFlex xs4 md2>
              <BaseButton
                :on-click="searchEvent"
                :disabled="disableAccountDocument"
                text="Search"
              >
              </BaseButton>
            </VFlex>
            <VFlex xs12 md4>
              <VAutocomplete
                v-model="accountDocument.contract"
                v-validate="'required'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.contractNumber'))
                "
                :data-vv-name="$t('label.contractNumber')"
                :items="getContract"
                :label="$t('label.contractNumber')"
                item-text="contractNumber"
                item-value="@id"
                clearable
                data-vv-scope="postingForm"
                :disabled="disableAccountDocument"
                @change="setContractInformation"
                @click:clear="
                  $nextTick(() => (accountDocument.contract = null))
                "
              ></VAutocomplete>
            </VFlex>
            <VFlex xs12 md4>
              <VAutocomplete
                v-model="accountDocument.documentType"
                v-validate="'required'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.documentType'))
                "
                :data-vv-name="$t('label.documentType')"
                :items="getAllDocumentType"
                :label="$t('label.documentType')"
                item-text="type"
                item-value="@id"
                data-vv-scope="postingForm"
                @change="validateDocumentType"
                @click:clear="
                  $nextTick(
                    () => (
                      (accountDocument.documentType = null),
                      validateDocumentType()
                    )
                  )
                "
              ></VAutocomplete>
            </VFlex>
            <VFlex xs12 md4>
              <VAutocomplete
                v-model="accountDocument.documentCurrency"
                v-validate="'required'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.documentCurrency'))
                "
                :data-vv-name="$t('label.documentCurrency')"
                :items="getCurrency"
                :label="$t('label.documentCurrency')"
                item-text="code"
                item-value="@id"
                clearable
                data-vv-scope="postingForm"
                :disabled="disableAccountDocument"
                @change="setExchangeRate"
                @click:clear="
                  $nextTick(() => (accountDocument.documentCurrency = null))
                "
              ></VAutocomplete>
            </VFlex>
            <VFlex xs12 md4>
              <BaseInput
                v-validate="'required|max:30'"
                :value="accountDocument.totalInDocumentCurrency | currency"
                :error-messages="
                  errors.collect(
                    'postingForm.' + $t('label.totalInDocumentCurrency')
                  )
                "
                :data-vv-name="$t('label.totalInDocumentCurrency')"
                :label="$t('label.totalInDocumentCurrency')"
                input-type="text"
                name="totalInDocumentCurrency"
                data-vv-scope="postingForm"
                required
                :disabled="disableField"
                @input="
                  (value) =>
                    (accountDocument.totalInDocumentCurrency = Number(value))
                "
              ></BaseInput>
            </VFlex>
            <VFlex xs12 md4>
              <BaseInput
                v-model.number="accountDocument.exchangeRate"
                v-validate="'required|max:30'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.exchangeRate'))
                "
                :data-vv-name="$t('label.exchangeRate')"
                :label="$t('label.exchangeRate')"
                input-type="text"
                name="exchangeRate"
                data-vv-scope="postingForm"
                required
                :disabled="disableField"
              ></BaseInput>
            </VFlex>
            <VFlex xs12 md4>
              <VAutocomplete
                v-model="accountDocument.companyCurrency"
                v-validate="'required'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.companyCurrency'))
                "
                :data-vv-name="$t('label.companyCurrency')"
                :items="getCurrency"
                :label="$t('label.companyCurrency')"
                item-text="code"
                item-value="@id"
                data-vv-scope="postingForm"
                required
                :disabled="disableField"
              ></VAutocomplete>
            </VFlex>
            <VFlex xs12 md4>
              <BaseInput
                v-validate="'required|max:30'"
                :value="accountDocument.totalInCompanyCurrency | currency"
                :error-messages="
                  errors.collect(
                    'postingForm.' + $t('label.totalInCompanyCurrency')
                  )
                "
                :data-vv-name="$t('label.totalInCompanyCurrency')"
                :label="$t('label.totalInCompanyCurrency')"
                input-type="text"
                name="totalInCompanyCurrency"
                data-vv-scope="postingForm"
                required
                :disabled="disableField"
                @input="
                  (value) =>
                    (accountDocument.totalInCompanyCurrency = Number(value))
                "
              ></BaseInput>
            </VFlex>
            <VFlex xs12 md4>
              <VAutocomplete
                v-model="accountDocument.branch"
                v-validate="'required'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.branch'))
                "
                :data-vv-name="$t('label.branch')"
                :items="getBranch"
                :label="$t('label.branch')"
                item-text="code"
                item-value="@id"
                data-vv-scope="postingForm"
                required
                :disabled="disableField"
              ></VAutocomplete>
            </VFlex>
            <VFlex xs12 md4>
              <VAutocomplete
                v-model="accountDocument.company"
                v-validate="'required'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.company'))
                "
                :data-vv-name="$t('label.company')"
                :items="getCompany"
                :label="$t('label.company')"
                item-text="code"
                item-value="@id"
                data-vv-scope="postingForm"
                required
                :disabled="disableField"
              ></VAutocomplete>
            </VFlex>
            <VFlex xs12 md4>
              <VAutocomplete
                v-model="accountDocument.service"
                v-validate="'required'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.service'))
                "
                :data-vv-name="$t('label.service')"
                :items="getService"
                :label="$t('label.service')"
                item-text="name"
                item-value="@id"
                data-vv-scope="postingForm"
                required
                :disabled="disableField"
              ></VAutocomplete>
            </VFlex>
            <VFlex xs12 md4>
              <VAutocomplete
                v-model="accountDocument.accountKey"
                v-validate="'required'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.accountKey'))
                "
                :data-vv-name="$t('label.accountKey')"
                :items="getAccountKey"
                :label="$t('label.accountKey')"
                item-text="accountKey"
                item-value="@id"
                data-vv-scope="postingForm"
                required
                :disabled="disableField"
              ></VAutocomplete>
            </VFlex>
            <VFlex xs12 md4>
              <BaseInput
                v-model="accountDocument.reference"
                v-validate="'max:20'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.reference'))
                "
                :data-vv-name="$t('label.reference')"
                :label="$t('label.reference')"
                input-type="text"
                name="reference"
                data-vv-scope="postingForm"
              ></BaseInput>
            </VFlex>
            <VFlex xs12 md8>
              <BaseInput
                v-model="accountDocument.headerText"
                v-validate="'max:50'"
                :error-messages="
                  errors.collect('postingForm.' + $t('label.headerText'))
                "
                :data-vv-name="$t('label.headerText')"
                :label="$t('label.headerText')"
                input-type="text"
                name="headerText"
                data-vv-scope="postingForm"
              ></BaseInput>
            </VFlex>
          </VLayout>
        </VContainer>
      </VCard>
      <VCard class="mt-3">
        <VCardTitle class="primary">
          <span class="title white--text">
            {{ $t('title.customerItem') }}
          </span>
          <VSpacer></VSpacer>
        </VCardTitle>
        <VToolbar flat color="white">
          <VSpacer></VSpacer>
          <VDialog
            v-model="dialog"
            persistent
            max-width="900px"
            max-height="100%"
          >
            <template v-slot:activator="{ on }">
              <VBtn
                :disabled="disableAddCustomerItemButton"
                color="primary"
                dark
                class="mb-2"
                @click="addItem()"
                >{{ $t('title.addCustomerItem') }}</VBtn
              >
            </template>
            <VCard>
              <VCardTitle class="primary">
                <span class="title white--text">
                  {{ formTitle }}
                </span>
                <VSpacer></VSpacer>
              </VCardTitle>
              <BaseNotification
                :display="msgDisplayInfo"
                :type="msgType"
                :text="msgText"
              ></BaseNotification>
              <VCardText>
                <VContainer grid-list-md>
                  <VLayout wrap>
                    <VFlex xs12 sm6 md4>
                      <VAutocomplete
                        v-model="editedItem.transactionType"
                        v-validate="'required'"
                        :error-messages="
                          errors.collect(
                            'customerItemForm.' + $t('label.transactionType')
                          )
                        "
                        :data-vv-name="$t('label.transactionType')"
                        clearable
                        :items="getTransactionType"
                        :label="$t('label.transactionType')"
                        item-text="type"
                        item-value="@id"
                        data-vv-scope="customerItemForm"
                        @change="
                          setChargeCode(),
                            (editedItem.chargeCode = null),
                            (editedItem.dueDate = ''),
                            (editedItem.amountInDocumentCurrency = ''),
                            resetCustomerItemForm()
                        "
                        @click:clear="
                          $nextTick(
                            () => (editedItem = Object.assign({}, defaultItem))
                          )
                        "
                      >
                      </VAutocomplete>
                    </VFlex>
                    <VFlex xs12 sm6 md4>
                      <VAutocomplete
                        v-model="editedItem.chargeCode"
                        v-validate="'required'"
                        :error-messages="
                          errors.collect(
                            'customerItemForm.' + $t('label.chargeCode')
                          )
                        "
                        :data-vv-name="$t('label.chargeCode')"
                        clearable
                        :items="getChargeCodeByTransactionType"
                        :label="$t('label.chargeCode')"
                        item-text="code"
                        item-value="@id"
                        data-vv-scope="customerItemForm"
                        @change="
                          dueDateDetermination(),
                            (editedItem.amountInDocumentCurrency = ''),
                            resetCustomerItemForm()
                        "
                        @click:clear="
                          $nextTick(
                            () => (
                              (editedItem.chargeCode = null),
                              (editedItem.amountInDocumentCurrency = ''),
                              (editedItem.dueDate = ''),
                              resetCustomerItemForm()
                            )
                          )
                        "
                      >
                      </VAutocomplete>
                    </VFlex>
                    <VFlex xs12 sm6 md4>
                      <VTextField
                        v-model="editedItem.amountInDocumentCurrency"
                        v-validate="'required|decimal:2|max:15'"
                        :error-messages="
                          errors.collect(
                            'customerItemForm.' +
                              $t('label.amountInDocumentCurrency')
                          )
                        "
                        :data-vv-name="$t('label.amountInDocumentCurrency')"
                        :label="$t('label.amountInDocumentCurrency')"
                        :disabled="
                          editedItem.chargeCode === null ||
                            editedItem.transactionType === null
                        "
                        data-vv-scope="customerItemForm"
                        type="number"
                        required
                        @blur="taxAndGLAccountDetermination()"
                      ></VTextField>
                    </VFlex>
                    <VFlex xs12 sm6 md4>
                      <BaseInput
                        v-validate="'required'"
                        :value="editedItem.amountInCompanyCurrency | currency"
                        :error-messages="
                          errors.collect(
                            'customerItemForm.' +
                              $t('label.amountInCompanyCurrency')
                          )
                        "
                        :data-vv-name="$t('label.amountInCompanyCurrency')"
                        :label="$t('label.amountInCompanyCurrency')"
                        data-vv-scope="customerItemForm"
                        :disabled="disableField"
                        input-type="number"
                        name="amountInCompanyCurrency"
                        required
                        @input="
                          (value) =>
                            (editedItem.amountInCompanyCurrency = Number(value))
                        "
                      ></BaseInput>
                    </VFlex>
                    <VFlex xs12 sm6 md4>
                      <VMenu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        :disabled="disableField && disableFieldDueDate"
                        min-width="290px"
                      >
                        <VTextField
                          slot="activator"
                          v-model="dueDateText"
                          v-validate="'required'"
                          readonly
                          :error-messages="
                            errors.collect(
                              'customerItemForm.' + $t('label.dueDate')
                            )
                          "
                          :data-vv-name="$t('label.dueDate')"
                          :label="$t('label.dueDate')"
                          :disabled="disableField && disableFieldDueDate"
                          format="yyyy-mm-dd"
                          data-vv-scope="customerItemForm"
                        ></VTextField>
                        <VDatePicker
                          v-model="editedItem.dueDate"
                          :disabled="disableField && disableFieldDueDate"
                          @input="menu2 = false"
                        ></VDatePicker>
                      </VMenu>
                    </VFlex>
                    <VFlex xs12 sm6 md4>
                      <VAutocomplete
                        v-model="editedItem.glAccount"
                        v-validate="'required'"
                        :error-messages="
                          errors.collect(
                            'customerItemForm.' + $t('label.glAccount')
                          )
                        "
                        :data-vv-name="$t('label.glAccount')"
                        :items="editedItem.getGLAccount"
                        :label="$t('label.glAccount')"
                        item-text="accountNumber"
                        item-value="@id"
                        data-vv-scope="customerItemForm"
                        :disabled="disableField"
                      >
                      </VAutocomplete>
                    </VFlex>
                    <VFlex xs12 sm6 md4>
                      <VAutocomplete
                        v-model="editedItem.taxCode"
                        v-validate="'required'"
                        :error-messages="
                          errors.collect(
                            'customerItemForm.' + $t('label.taxCode')
                          )
                        "
                        :data-vv-name="$t('label.taxCode')"
                        :items="editedItem.getTaxCode"
                        :label="$t('label.taxCode')"
                        item-text="code"
                        item-value="@id"
                        data-vv-scope="customerItemForm"
                        :disabled="disableField"
                      >
                      </VAutocomplete>
                    </VFlex>

                    <VFlex xs12 sm6 md4>
                      <BaseInput
                        v-validate="'required'"
                        :value="editedItem.taxRate | currency"
                        :error-messages="
                          errors.collect(
                            'customerItemForm.' + $t('label.taxRate')
                          )
                        "
                        :data-vv-name="$t('label.taxRate')"
                        :label="$t('label.taxRate')"
                        data-vv-scope="customerItemForm"
                        :disabled="disableField"
                        input-type="number"
                        name="taxRate"
                        required
                        @input="(value) => (editedItem.taxRate = Number(value))"
                      ></BaseInput>
                    </VFlex>
                    <VFlex xs12 sm6 md4>
                      <BaseInput
                        v-validate="'required'"
                        :value="editedItem.taxInDocumentCurrency | currency"
                        :error-messages="
                          errors.collect(
                            'customerItemForm.' +
                              $t('label.taxInDocumentCurrency')
                          )
                        "
                        :data-vv-name="$t('label.taxInDocumentCurrency')"
                        :label="$t('label.taxInDocumentCurrency')"
                        data-vv-scope="customerItemForm"
                        :disabled="disableField"
                        input-type="number"
                        name="taxInDocumentCurrency"
                        required
                        @input="
                          (value) =>
                            (editedItem.taxInDocumentCurrency = Number(value))
                        "
                      ></BaseInput>
                    </VFlex>
                    <VFlex xs12 sm6 md4>
                      <BaseInput
                        v-validate="'required'"
                        :value="editedItem.taxInCompanyCurrency | currency"
                        :error-messages="
                          errors.collect(
                            'customerItemForm.' +
                              $t('label.taxInCompanyCurrency')
                          )
                        "
                        :data-vv-name="$t('label.taxInCompanyCurrency')"
                        :label="$t('label.taxInCompanyCurrency')"
                        data-vv-scope="customerItemForm"
                        :disabled="disableField"
                        input-type="number"
                        name="taxInCompanyCurrency"
                        required
                        @input="
                          (value) =>
                            (editedItem.taxInCompanyCurrency = Number(value))
                        "
                      ></BaseInput>
                    </VFlex>
                    <VFlex xs12 md4>
                      <BaseInput
                        v-model="editedItem.itemText"
                        v-validate="'max:50'"
                        :error-messages="
                          errors.collect(
                            'customerItemForm.' + $t('label.itemText')
                          )
                        "
                        :data-vv-name="$t('label.itemText')"
                        data-vv-scope="customerItemForm"
                        :label="$t('label.itemText')"
                        input-type="text"
                        name="itemText"
                      ></BaseInput>
                    </VFlex>
                  </VLayout>
                </VContainer>
              </VCardText>
              <VCardActions>
                <VSpacer></VSpacer>
                <VBtn color="grey" outline dark @click="close">Cancel </VBtn>
                <VBtn
                  :disabled="editedItem.glAccount === null"
                  color="primary"
                  @click="save"
                  >Save
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
        </VToolbar>
        <VDataTable
          :headers="tableHeaders"
          :items="accountDocumentList"
          item-key="@id"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">
              {{ props.index + 1 }}
            </td>
            <td class="text-xs-left">
              {{
                props.item.getTransactionType.length
                  ? props.item.getTransactionType[0].type
                  : ''
              }}
            </td>
            <td class="text-xs-left">
              {{
                props.item.getChargeCode.length
                  ? props.item.getChargeCode[0].code
                  : ''
              }}
            </td>
            <td class="text-xs-left">
              {{ props.item.amountInDocumentCurrency | currency }}
            </td>
            <td class="text-xs-left">
              {{ props.item.amountInCompanyCurrency | currency }}
            </td>
            <td class="text-xs-left">
              {{ covertDate(props.item.dueDate) }}
            </td>
            <td class="text-xs-left">
              {{
                props.item.getGLAccount.length
                  ? props.item.getGLAccount[0].accountNumber
                  : ''
              }}
            </td>
            <td class="text-xs-left">
              {{
                props.item.getTaxCode.length
                  ? props.item.getTaxCode[0].code
                  : ''
              }}
            </td>
            <td class="text-xs-left">
              {{ props.item.taxRate | currency }}
            </td>
            <td class="text-xs-left">
              {{ props.item.taxInDocumentCurrency | currency }}
            </td>
            <td class="text-xs-left">
              {{ props.item.taxInCompanyCurrency | currency }}
            </td>
            <td class="justify-center layout px-0">
              <VIcon
                small
                class="mr-2"
                title="Edit"
                @click="editItem(props.item)"
              >
                edit
              </VIcon>
              <VIcon small title="Delete" @click="deleteItem(props.item)">
                delete
              </VIcon>
            </td>
          </template>
        </VDataTable>
      </VCard>
    </VContainer>
  </VForm>
</template>

<script>
import _ from 'lodash'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseNotification from '@/components/BaseNotification'
import BaseCancelModal from '@/components/BaseCancelModal'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FormPosting',
  $_veeValidate: {
    validator: 'new',
  },
  components: {
    BaseButton,
    BaseInput,
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
    tableHeaders: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      dueDateText: null,
      documentDateText: null,
      postingDateText: null,
      disableField: true,
      disableDocumentNumber: true,
      accountDocument: {
        postingDate: null,
        documentDate: null,
        documentNumber: '',
        customer: null,
        contract: null,
        documentType: null,
        documentCurrency: null,
        totalInDocumentCurrency: 0,
        exchangeRate: 0,
        companyCurrency: null,
        totalInCompanyCurrency: 0,
        branch: null,
        company: null,
        service: null,
        accountKey: null,
        reference: '',
        headerText: '',
        transferStatus: null,
        accountDocumentItems: [],
        automaticOnly: true,
        postingPeriod: false,
      },
      editedIndex: -1,
      editedItem: {
        transactionType: null,
        chargeCode: null,
        amountInDocumentCurrency: '',
        amountInCompanyCurrency: '',
        dueDate: '',
        glAccount: null,
        taxCode: null,
        taxRate: '',
        taxInDocumentCurrency: '',
        taxInCompanyCurrency: '',
        itemText: '',
        getTransactionType: [],
        getChargeCode: [],
        getGLAccount: [],
        getTaxCode: [],
        offsetGLAccount: null,
        taxGLAccount: null,
        costCenter: null,
        debitCredit: '',
        unbilled: null,
        blockGLAccount: false,
        blockCostCenter: false,
      },
      defaultItem: {
        transactionType: null,
        chargeCode: null,
        amountInDocumentCurrency: '',
        amountInCompanyCurrency: '',
        dueDate: '',
        glAccount: null,
        taxCode: null,
        taxRate: '',
        taxInDocumentCurrency: '',
        taxInCompanyCurrency: '',
        itemText: '',
        getTransactionType: [],
        getChargeCode: [],
        getGLAccount: [],
        getTaxCode: [],
        offsetGLAccount: null,
        taxGLAccount: null,
        costCenter: null,
        debitCredit: '',
        unbilled: null,
        blockGLAccount: false,
        blockCostCenter: false,
      },
      menu: false,
      menu1: false,
      menu2: false,
      dialog: false,
      accountDocumentList: [],
      getCustomer: [],
      getCompany: [],
      getService: [],
      getChargeCodeByTransactionType: [],
      transactionTypeList: [],
      chargeCodeList: [],
      disableFieldDueDate: true,
    }
  },
  computed: {
    ...mapGetters(['getAction', 'msgDisplayInfo', 'msgText', 'msgType']),
    ...mapGetters('centralDateConfig', ['getDateTimeFormat']),
    ...mapGetters('posting', [
      'getCurrency',
      'getDocumentType',
      'getAllDocumentType',
      'getContract',
      'getBranch',
      'getAccountKey',
      'getTransactionType',
      'getChargeCode',
      'getPrevRouteName',
    ]),
    ...mapGetters('customer', ['getSelectedCustomerItem']),
    disableAccountDocument: function() {
      return this.accountDocumentList.length !== 0
    },
    disableAddCustomerItemButton: function() {
      return this.accountDocumentList.length >= 10
    },
    formTitle() {
      return this.editedIndex === -1
        ? this.$t('title.addCustomerItem')
        : this.$t('title.editCustomerItem')
    },
  },
  watch: {
    'accountDocument.postingDate': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.postingDateText = re[0]
      })
    },
    'accountDocument.documentDate': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.documentDateText = re[0]
      })
    },
    'editedItem.dueDate': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.dueDateText = re[0]
      })
    },
    getDocumentType: function() {
      this.accountDocument.documentType = this.getDocumentType.length
        ? this.getDocumentType[0]['@id']
        : null
      this.validateDocumentType()
    },
    getAllDocumentType: function() {
      this.validateDocumentType()
    },
    getTransactionType: function() {
      this.transactionTypeList = Object.assign(
        {},
        ...this.getTransactionType.map((item) => ({
          [item['@id']]: item.type,
        }))
      )
    },
    getChargeCode: function() {
      this.chargeCodeList = Object.assign(
        {},
        ...this.getChargeCode.map((item) => ({
          [item['@id']]: item.code,
        }))
      )
    },
  },
  beforeMount() {
    this.chargeCodeData()
    this.transactionTypeData()
    this.getBranchList()
    this.defaultDocumentTypeData()
    this.getContractAccountKeyList()
    this.fetchCurrency()
    this.documentTypeData()
  },
  mounted() {
    this.accountDocument.documentNumber = 'INTERNAL'
    this.setCustomerInformation()
    this.accountDocument.postingDate = new Date().toISOString().split('T')[0]
    this.accountDocument.documentDate = new Date().toISOString().split('T')[0]
  },
  methods: {
    ...mapActions('posting', [
      'fetchCurrency',
      'fetchContract',
      'addAccountDocument',
      'fetchApiData',
    ]),
    ...mapActions('centralDateConfig', ['convertDateTimeFormat']),
    ...mapActions('customer', ['selectCustomerItemForPosting']),
    ...mapActions([
      'getCompanyList',
      'getServiceList',
      'chargeCodeData',
      'transactionTypeData',
      'defaultDocumentTypeData',
      'getBranchList',
      'getContractAccountKeyList',
      'msgNotification',
      'updateActionState',
      'documentTypeData',
    ]),
    searchEvent() {
      this.$router.push({
        path: '../../customer-care/customer/search',
      })
    },
    formatDate: function(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    validateBlockedGLAccountAndCostCenter: function() {
      if (this.editedItem.blockGLAccount) {
        let msg = {
          text: this.$t('message.blockedGLAccount'),
          type: 'error',
          display: true,
        }
        this.msgNotification(msg)
      } else if (this.editedItem.blockCostCenter) {
        let msg = {
          text: this.$t('message.blockedCostCenter'),
          type: 'error',
          display: true,
        }
        this.msgNotification(msg)
      }
    },
    validateDocumentType: function() {
      let documentType = this.getAllDocumentType.filter(
        (range) => range['@id'] === this.accountDocument.documentType
      )
      this.accountDocument.automaticOnly = documentType.length
        ? documentType[0].automaticOnly
        : true
      if (
        this.accountDocument.documentType !== null &&
        this.accountDocument.automaticOnly &&
        documentType.length !== 0
      ) {
        let msg = {
          text: this.$t('message.notPermittedManualPosting'),
          type: 'error',
          display: true,
        }
        this.msgNotification(msg)
      }
    },
    resetCustomerItemForm: function() {
      this.editedItem.amountInCompanyCurrency = ''
      this.editedItem.glAccount = null
      this.editedItem.taxCode = null
      this.editedItem.taxRate = ''
      this.editedItem.taxInDocumentCurrency = ''
      this.editedItem.taxInCompanyCurrency = ''
      this.editedItem.offsetGLAccount = null
      this.editedItem.taxGLAccount = null
      this.editedItem.costCenter = null
    },
    setExchangeRate: function() {
      if (
        this.accountDocument.documentCurrency ===
        this.accountDocument.companyCurrency
      ) {
        this.accountDocument.exchangeRate = '1.00000'
      } else if (
        this.accountDocument.documentCurrency !== null &&
        this.accountDocument.documentCurrency !== undefined
      ) {
        let payload = {
          iri: 'currency_exchage_rates',
          fromCurrency: this.accountDocument.documentCurrency,
          toCurrency: this.accountDocument.companyCurrency,
        }
        this.fetchApiData(payload)
          .then((response) => {
            this.accountDocument.exchangeRate = response.data.exchangeRate
          })
          .catch((error) => {
            this.accountDocument.exchangeRate = ''
            let msg = {
              text: error.response.data.message,
              type: 'error',
              display: true,
            }
            this.msgNotification(msg)
          })
      } else {
        this.accountDocument.exchangeRate = ''
      }
    },
    setChargeCode: function() {
      this.getChargeCodeByTransactionType = this.getChargeCode.filter(
        (range) =>
          range.transactionType['@id'] === this.editedItem.transactionType
      )
    },
    disableEnableDueDate: function() {
      this.disableFieldDueDate = !(
        this.transactionTypeList[this.editedItem.transactionType] === '9999' &&
        (this.chargeCodeList[this.editedItem.chargeCode] === '0010' ||
          this.chargeCodeList[this.editedItem.chargeCode] === '0015')
      )
    },
    dueDateDetermination: function() {
      if (
        this.editedItem.chargeCode !== null &&
        this.editedItem.chargeCode !== undefined
      ) {
        this.disableEnableDueDate()
        let payloadDueDateDetermination = {
          iri: 'due_date_determination',
          customer: this.accountDocument.customer,
          chargeCode: this.editedItem.chargeCode,
          transactionType: this.editedItem.transactionType,
          postingDate: this.accountDocument.postingDate,
          documentDate: this.accountDocument.documentDate,
        }

        this.fetchApiData(payloadDueDateDetermination)
          .then((response) => {
            this.editedItem.dueDate = this.formatDate(response.data.dueDate)
            this.editedItem.debitCredit = response.data.debitCredit
            this.editedItem.unbilled = response.data.unbilled
          })
          .catch((error) => {
            this.editedItem.dueDate = ''
            this.editedItem.amountInDocumentCurrency = ''
            this.resetCustomerItemForm()
            let msg = {
              text: error.response.data.message,
              type: 'error',
              display: true,
            }
            this.msgNotification(msg)
          })
      }
    },
    taxAndGLAccountDetermination: function() {
      this.resetCustomerItemForm()
      if (
        this.editedItem.chargeCode !== null &&
        this.editedItem.transactionType !== null &&
        this.editedItem.amountInDocumentCurrency !== ''
      ) {
        this.editedItem.amountInDocumentCurrency =
          this.editedItem.debitCredit === 'C'
            ? -Math.abs(this.editedItem.amountInDocumentCurrency)
            : this.editedItem.amountInDocumentCurrency
        this.editedItem.amountInCompanyCurrency = Number(
          (
            this.editedItem.amountInDocumentCurrency *
            this.accountDocument.exchangeRate
          ).toFixed(2)
        )
        let payloadTaxAndGLAccountDetermination = {
          iri: 'tax_determination',
          contract: this.accountDocument.contract,
          transactionType: this.editedItem.transactionType,
          chargeCode: this.editedItem.chargeCode,

          amountInDocumentCurrency: this.editedItem.amountInDocumentCurrency,
          amountInCompanyCurrency: this.editedItem.amountInCompanyCurrency,
        }
        this.fetchApiData(payloadTaxAndGLAccountDetermination)
          .then((response) => {
            this.editedItem.amountInDocumentCurrency =
              response.data.amountInDocumentCurrency
            this.editedItem.amountInCompanyCurrency =
              response.data.amountInCompanyCurrency
            this.editedItem.glAccount = response.data.cusGLAccount['@id']
            this.editedItem.taxCode = response.data.taxCode['@id']
            this.editedItem.getGLAccount =
              this.editedItem.glAccount === null
                ? []
                : [response.data.cusGLAccount]
            this.editedItem.getTaxCode =
              this.editedItem.taxCode === null ? [] : [response.data.taxCode]
            this.editedItem.taxRate = response.data.taxRate
            this.editedItem.taxInDocumentCurrency =
              response.data.taxInDocumentCurrency
            this.editedItem.taxInCompanyCurrency =
              response.data.taxInCompanyCurrency
            this.editedItem.offsetGLAccount =
              response.data.offsetGLAccount['@id']
            this.editedItem.taxGLAccount = response.data.taxGLAccount['@id']
            this.editedItem.costCenter = response.data.costCenter['@id']
            this.editedItem.blockGLAccount = response.data.blockGLAccount
            this.editedItem.blockCostCenter = response.data.blockCostCenter
            this.validateBlockedGLAccountAndCostCenter()
          })
          .catch((error) => {
            this.resetCustomerItemForm()
            let msg = {
              text: error.response.data.message,
              type: 'error',
              display: true,
            }
            this.msgNotification(msg)
          })
      }
    },
    validatePostingPeriod: function() {
      if (
        this.accountDocument.postingDate !== '' &&
        this.accountDocument.contract !== null &&
        this.accountDocument.contract !== undefined
      ) {
        let payload = {
          iri: 'posting_period_check',
          contract: this.accountDocument.contract,
          postingDate: this.accountDocument.postingDate,
        }

        this.fetchApiData(payload)
          .then((response) => {
            if (!response.data.status) {
              let msg = {
                text: this.$t('message.postingClosed'),
                type: 'error',
                display: true,
              }
              this.msgNotification(msg)
              this.accountDocument.postingPeriod = false
            } else {
              this.accountDocument.postingPeriod = true
            }
          })
          .catch((error) => {
            let msg = {
              text: error.response.data.message,
              type: 'error',
              display: true,
            }
            this.msgNotification(msg)
            this.accountDocument.postingPeriod = false
          })
      } else {
        this.accountDocument.postingPeriod = false
      }
    },
    setContractInformation: function(contractId) {
      let contract = this.getContract.filter((value, key) => {
        return value['@id'] === contractId
      })
      this.getCompany =
        contract.length && contract[0].company !== null
          ? [contract[0].company]
          : []
      this.getService =
        contract.length && contract[0].service !== null
          ? [contract[0].service]
          : []
      this.accountDocument.company =
        contract.length > 0 && contract[0].company !== null
          ? contract[0].company['@id']
          : null
      this.accountDocument.service =
        contract.length && contract[0].service !== null
          ? contract[0].service['@id']
          : null
      this.accountDocument.branch = contract.length ? contract[0].branch : null
      this.accountDocument.accountKey = contract.length
        ? contract[0].accountKey
        : null
      this.accountDocument.companyCurrency =
        contract.length && contract[0].company !== null
          ? contract[0].company.currency
          : null
      this.accountDocument.documentCurrency =
        contract.length && contract[0].contractBillings.length
          ? contract[0].contractBillings[0].billingCurrency
          : null
      this.setExchangeRate()
      this.validatePostingPeriod()
    },
    setCustomerInformation: function() {
      this.$nextTick(() => {
        if (
          this.getPrevRouteName === 'customer_search_result' &&
          this.getSelectedCustomerItem.length !== 0
        ) {
          this.getCustomer = this.getSelectedCustomerItem
          this.accountDocument.customer = this.getSelectedCustomerItem.length
            ? this.getSelectedCustomerItem[0]['@id']
            : null
          this.fetchContract({
            customer: { id: this.accountDocument.customer },
          })
        } else {
          this.fetchContract({
            customer: { id: null },
          })
          this.selectCustomerItemForPosting([])
        }
      })
    },
    validateBeforeSubmit: function(scope) {
      this.$validator.validateAll(scope).then((result) => {
        if (result && this.accountDocument.automaticOnly === true) {
          let msg = {
            text: this.$t('message.notPermittedManualPosting'),
            type: 'error',
            display: true,
          }
          this.msgNotification(msg)
        } else if (result && this.accountDocument.postingPeriod === false) {
          let msg = {
            text: this.$t('message.postingClosed'),
            type: 'error',
            display: true,
          }
          this.msgNotification(msg)
        } else if (result && this.accountDocumentList.length === 0) {
          let msg = {
            text: this.$t('message.noCustomerItem'),
            type: 'error',
            display: true,
          }
          this.msgNotification(msg)
        } else if (result) {
          const accountDocument = _.pick(this.accountDocument, [
            'documentNumber',
            'documentType',
            'postingDate',
            'documentDate',
            'documentCurrency',
            'companyCurrency',
            'exchangeRate',
            'customer',
            'contract',
            'reference',
            'headerText',
            'totalInDocumentCurrency',
            'totalInCompanyCurrency',
            'company',
            'branch',
            'service',
            'accountKey',
            'transferStatus',
            'accountDocumentItems',
          ])
          accountDocument.exchangeRate = accountDocument.exchangeRate.toString()
          accountDocument.totalInDocumentCurrency = accountDocument.totalInDocumentCurrency.toString()
          accountDocument.totalInCompanyCurrency = accountDocument.totalInCompanyCurrency.toString()
          const accountDocumentItems = []
          this.accountDocumentList.forEach((item, key) => {
            let flagSecurityDeposit =
              this.transactionTypeList[item.transactionType] === '9999' &&
              this.chargeCodeList[item.chargeCode] === '0090'
            let itemNumber = (key + 1).toString()
            let cusItem = {
              documentNumber: 'INTERNAL',
              itemNumber: itemNumber,
              itemType: 'CUS',
              subItemNumber: null,
              customer: accountDocument.customer,
              contract: accountDocument.contract,
              company: accountDocument.company,
              branch: accountDocument.branch,
              service: accountDocument.service,
              accountKey: accountDocument.accountKey,
              transactionType: item.transactionType,
              chargeCode: item.chargeCode,
              amountInDocumentCurrency: (
                item.amountInDocumentCurrency + item.taxInDocumentCurrency
              ).toFixed(2),
              amountInCompanyCurrency: (
                item.amountInCompanyCurrency + item.taxInCompanyCurrency
              ).toFixed(2),
              dueDate: item.dueDate,
              deferredDueDate: null,
              unbilled: item.unbilled ? 'X' : null,
              itemText: item.itemText,
              billDocument: null,
              glAccount: item.glAccount,
              costCenter: item.costCenter,
              taxCode: item.taxCode,
              taxRate: item.taxRate.toString(),
              taxInDocumentCurrency: item.taxInDocumentCurrency.toString(),
              taxInCompanyCurrency: item.taxInCompanyCurrency.toString(),
              clearingStatus: flagSecurityDeposit ? 'C' : 'O',
              clearingAmount: flagSecurityDeposit
                ? (
                    item.amountInDocumentCurrency + item.taxInDocumentCurrency
                  ).toFixed(2)
                : null,
              clearingDate: flagSecurityDeposit
                ? accountDocument.postingDate
                : null,
              clearingReason: flagSecurityDeposit ? 'PAY' : null,
            }

            let offsetItem = {
              documentNumber: 'INTERNAL',
              itemNumber: itemNumber,
              itemType: 'OFF',
              subItemNumber: null,
              customer: accountDocument.customer,
              contract: accountDocument.contract,
              company: accountDocument.company,
              branch: accountDocument.branch,
              service: accountDocument.service,
              accountKey: accountDocument.accountKey,
              transactionType: item.transactionType,
              chargeCode: item.chargeCode,
              amountInDocumentCurrency: (-item.amountInDocumentCurrency).toString(),
              amountInCompanyCurrency: (-item.amountInCompanyCurrency).toString(),
              dueDate: item.dueDate,
              deferredDueDate: null,
              unbilled: item.unbilled ? 'X' : null,
              itemText: item.itemText,
              billDocument: null,
              glAccount: item.offsetGLAccount,
              costCenter: item.costCenter,
              taxCode: item.taxCode,
              taxRate: item.taxRate.toString(),
              taxInDocumentCurrency: (-item.taxInDocumentCurrency).toString(),
              taxInCompanyCurrency: (-item.taxInCompanyCurrency).toString(),
              clearingStatus: 'O',
            }
            let taxItem = {
              documentNumber: 'INTERNAL',
              itemNumber: itemNumber,
              itemType: 'TAX',
              subItemNumber: null,
              customer: accountDocument.customer,
              contract: accountDocument.contract,
              company: accountDocument.company,
              branch: accountDocument.branch,
              service: accountDocument.service,
              accountKey: accountDocument.accountKey,
              transactionType: item.transactionType,
              chargeCode: item.chargeCode,
              amountInDocumentCurrency: (-item.taxInDocumentCurrency).toString(),
              amountInCompanyCurrency: (-item.taxInCompanyCurrency).toString(),
              dueDate: item.dueDate,
              deferredDueDate: null,
              unbilled: item.unbilled ? 'X' : null,
              itemText: item.itemText,
              billDocument: null,
              glAccount: item.taxGLAccount,
              costCenter: item.costCenter,
              taxCode: item.taxCode,
              taxRate: item.taxRate.toString(),
              taxInDocumentCurrency: (-item.taxInDocumentCurrency).toString(),
              taxInCompanyCurrency: (-item.taxInCompanyCurrency).toString(),
              clearingStatus: 'O',
            }
            accountDocumentItems.push(cusItem)
            accountDocumentItems.push(offsetItem)
            accountDocumentItems.push(taxItem)
          })
          accountDocument.accountDocumentItems = accountDocumentItems
          this.loading = true
          this.addAccountDocument(accountDocument)
            .then(() => {})
            .catch(() => {})
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    addItem() {
      this.$validator.validateAll('postingForm').then((result) => {
        if (result && this.accountDocument.automaticOnly === true) {
          let msg = {
            text: this.$t('message.notPermittedManualPosting'),
            type: 'error',
            display: true,
          }
          this.msgNotification(msg)
        } else if (result && this.accountDocument.postingPeriod === false) {
          let msg = {
            text: this.$t('message.postingClosed'),
            type: 'error',
            display: true,
          }
          this.msgNotification(msg)
        } else {
          if (result) {
            this.$validator.reset()
            this.getChargeCodeByTransactionType = []
            this.disablePopView = false
            this.dialog = true
          }
        }
      })
    },
    editItem(item) {
      this.editedIndex = this.accountDocumentList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.setChargeCode()
      this.disableEnableDueDate()
    },
    close() {
      this.$validator.reset()
      this.getChargeCodeByTransactionType = []
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },
    save() {
      if (this.editedItem.blockGLAccount || this.editedItem.blockCostCenter) {
        this.validateBlockedGLAccountAndCostCenter()
      } else {
        this.$validator.validateAll('customerItemForm').then((result) => {
          if (result) {
            let totalInCompanyCurrency = 0
            let totalInDocumentCurrency = 0
            if (this.editedIndex > -1) {
              this.editedItem.getChargeCode = this.getChargeCode.filter(
                (range) => range['@id'] === this.editedItem.chargeCode
              )
              this.editedItem.getTransactionType = this.getTransactionType.filter(
                (range) => range['@id'] === this.editedItem.transactionType
              )
              Object.assign(
                this.accountDocumentList[this.editedIndex],
                this.editedItem
              )
            } else {
              this.editedItem.getChargeCode = this.getChargeCode.filter(
                (range) => range['@id'] === this.editedItem.chargeCode
              )
              this.editedItem.getTransactionType = this.getTransactionType.filter(
                (range) => range['@id'] === this.editedItem.transactionType
              )
              this.accountDocumentList.push(this.editedItem)
            }
            this.accountDocumentList.forEach((value, key) => {
              totalInCompanyCurrency += value.amountInCompanyCurrency
              totalInCompanyCurrency += value.taxInCompanyCurrency
              totalInDocumentCurrency += value.amountInDocumentCurrency
              totalInDocumentCurrency += value.taxInDocumentCurrency
            })
            this.accountDocument.totalInCompanyCurrency = Number(
              totalInCompanyCurrency
            ).toFixed(2)

            this.accountDocument.totalInDocumentCurrency = Number(
              totalInDocumentCurrency
            ).toFixed(2)

            this.close()
          }
        })
      }
    },
    deleteItem(item) {
      let totalInCompanyCurrency = 0
      let totalInDocumentCurrency = 0
      const index = this.accountDocumentList.indexOf(item)
      this.accountDocumentList.splice(index, 1)
      this.accountDocumentList.forEach((value) => {
        totalInCompanyCurrency += value.amountInCompanyCurrency
        totalInCompanyCurrency += value.taxInCompanyCurrency
        totalInDocumentCurrency += value.amountInDocumentCurrency
        totalInDocumentCurrency += value.taxInDocumentCurrency
      })
      this.accountDocument.totalInCompanyCurrency = Number(
        totalInCompanyCurrency
      ).toFixed(2)

      this.accountDocument.totalInDocumentCurrency = Number(
        totalInDocumentCurrency
      ).toFixed(2)
    },
    covertDate(value) {
      if (value) {
        return moment(String(value)).format(
          this.getDateTimeFormat[0].dateFormat
        )
      }
    },
  },
}
</script>
