<template>
  <VForm @submit.prevent="validateBeforeSubmit('contractForm')">
    <VContainer class="white">
      <VLayout row wrap>
        <VFlex xs12>
          <BaseNotification
            :display="msgDisplayInfo"
            :type="msgType"
            :text="msgText"
          ></BaseNotification>
          <BaseButton
            v-if="hideReveseBtn"
            :on-click="reverseEvent"
            :text="$t('button.reverseButton')"
          ></BaseButton>
          <BaseButton
            v-if="!disableSaveBtn"
            type="submit"
            :text="$t('button.saveButton')"
            :loading="loading"
          >
          </BaseButton>
          <BaseButton
            v-if="disableSaveBtn"
            :on-click="editEvent"
            :text="$t('button.updateButton')"
          ></BaseButton>
          <BaseCancelModal
            class="d-inline"
            to-url="/customer-care/contract/select"
          ></BaseCancelModal>
        </VFlex>
      </VLayout>
      <VLayout row wrap>
        <VFlex md2>
          <VAutocomplete
            v-model="contract.customer"
            v-validate="'required'"
            :data-vv-name="$t('label.customerNumber')"
            :items="getCustomer"
            :label="$t('label.customerNumber')"
            item-text="customerNumber"
            item-value="@id"
            :value="contract.customer"
            disabled
            required
            :error-messages="
              errors.collect('contractForm.' + $t('label.customerNumber'))
            "
            data-vv-scope="contractForm"
          >
          </VAutocomplete>
        </VFlex>
        <VFlex xs4 md2>
          <BaseButton
            :on-click="searchCustomer"
            :text="$t('button.searchButton')"
            :disabled="disableSearch"
          ></BaseButton>
        </VFlex>
        <VFlex md2>
          <VAutocomplete
            v-model="contract.premise"
            v-validate="'required'"
            :data-vv-name="$t('label.premiseNumber')"
            :items="getPremise"
            :label="$t('label.premiseNumber')"
            item-text="premiseNumber"
            item-value="@id"
            :value="contract.premise"
            disabled
            required
            :error-messages="
              errors.collect('contractForm.' + $t('label.premiseNumber'))
            "
            data-vv-scope="contractForm"
          >
          </VAutocomplete>
        </VFlex>
        <VFlex xs4 md2>
          <BaseButton
            :on-click="searchPremise"
            :text="$t('button.searchButton')"
            :disabled="disableSearch"
          ></BaseButton>
        </VFlex>
        <VFlex md4>
          <BaseInput
            v-model="contract.contractNumber"
            v-validate="'required|max:12'"
            :data-vv-name="$t('label.contractNumber')"
            :label="$t('label.contractNumber')"
            :disabled="disableContractNumber"
            input-type="text"
            name="contractNumber"
            :error-messages="
              errors.collect('contractForm.' + $t('label.contractNumber'))
            "
            data-vv-scope="contractForm"
          >
          </BaseInput>
        </VFlex>
        <VFlex md4>
          <VAutocomplete
            v-model="contract.company"
            v-validate="'required'"
            :error-messages="
              errors.collect('contractForm.' + $t('label.company'))
            "
            data-vv-scope="contractForm"
            clearable
            :data-vv-name="$t('label.company')"
            :items="getCompanies"
            :label="$t('label.company')"
            item-text="companyName"
            item-value="@id"
            disabled
            @change="setBranch()"
          >
          </VAutocomplete>
        </VFlex>
        <VFlex md4>
          <VAutocomplete
            v-model="contract.branch"
            v-validate="'required'"
            :error-messages="
              errors.collect('contractForm.' + $t('label.branch'))
            "
            data-vv-scope="contractForm"
            clearable
            :data-vv-name="$t('label.branch')"
            :items="getBranchByCompany"
            :label="$t('label.branch')"
            :disabled="disableFieldView"
            item-text="name"
            item-value="@id"
          >
          </VAutocomplete>
        </VFlex>
        <VFlex md4>
          <VAutocomplete
            v-model="contract.service"
            v-validate="'required'"
            :data-vv-name="$t('label.service')"
            :items="getServiceByCompany"
            :label="$t('label.service')"
            item-text="code"
            item-value="@id"
            clearable
            :disabled="disableService"
            :error-messages="
              errors.collect('contractForm.' + $t('label.service'))
            "
            data-vv-scope="contractForm"
            @click:clear="$nextTick(() => (contract.service = ''))"
            @change="changeService"
          >
          </VAutocomplete>
        </VFlex>
      </VLayout>
      <VFlex xs12>
        <VTabs>
          <VTab :class="generalTab" ripple> {{ $t('label.general') }}</VTab>
          <VTab :class="billingTab" ripple> {{ $t('label.billing') }} </VTab>
          <VTab :class="parameterTab" ripple>
            {{ $t('label.parameter') }}
          </VTab>
          <VTab
            v-if="showMRTab"
            :class="meterReadingTab"
            ripple
            @change="getMeterReadingData"
            >{{ $t('label.meterReading') }}</VTab
          >
          <VTab
            v-if="showBillDocTab"
            :class="billDocumentTab"
            ripple
            @change="getBillDocumentData"
            >{{ $t('label.billDocument') }}</VTab
          >
          <!-- General -->
          <VTabItem>
            <VCard class="mt-3">
              <VCardTitle class="primary">
                <span class="title white--text">{{
                  $t('label.basicInfo')
                }}</span>
              </VCardTitle>
              <VCardText>
                <VContainer fluid grid-list-xl>
                  <VLayout row wrap>
                    <VFlex xs12 md6>
                      <BaseInput
                        v-model="contract.customerName"
                        :label="$t('label.customerName')"
                        input-type="text"
                        :disabled="true"
                        name="customerName"
                      >
                      </BaseInput>
                    </VFlex>
                    <VFlex xs12 md6>
                      <BaseInput
                        v-model="contract.premiseAddress"
                        :label="$t('label.premiseAddress')"
                        input-type="text"
                        :disabled="true"
                        name="premiseAddress"
                      >
                      </BaseInput>
                    </VFlex>
                    <VFlex md4>
                      <VMenu
                        v-model="requestDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        :disabled="disableRequestDate"
                        min-width="290px"
                      >
                        <VTextField
                          slot="activator"
                          v-model="requestDateText"
                          readonly
                          :error-messages="
                            errors.collect($t('label.requestDate'))
                          "
                          :data-vv-name="$t('label.requestDate')"
                          :label="$t('label.requestDate')"
                          :disabled="disableRequestDate"
                          format="yyyy-mm-dd"
                        >
                        </VTextField>
                        <VDatePicker
                          v-model="contract.requestDate"
                          :min="minDate.toISOString().split('T')[0]"
                          @input="requestDate = false"
                        >
                        </VDatePicker>
                      </VMenu>
                    </VFlex>
                    <VFlex xs12 md4>
                      <VAutocomplete
                        v-model="contract.contractClass"
                        :disabled="disableFieldView"
                        :items="contractClassInfo"
                        :label="$t('label.contractClass')"
                        item-text="description"
                        item-value="@id"
                        clearable
                      >
                      </VAutocomplete>
                    </VFlex>
                    <VFlex xs12 md4>
                      <VAutocomplete
                        v-model="contract.accountKey"
                        v-validate="'required'"
                        :error-messages="
                          errors.collect(
                            'contractForm.' + $t('label.accountKey')
                          )
                        "
                        :data-vv-name="$t('label.accountKey')"
                        :label="$t('label.accountKey')"
                        :items="getContractAccountKeyInfo"
                        item-text="description"
                        item-value="@id"
                        name="accountKey"
                        :disabled="disableFieldView"
                        data-vv-scope="contractForm"
                      >
                      </VAutocomplete>
                    </VFlex>
                    <VFlex md4>
                      <VAutocomplete
                        v-model="contract.status"
                        clearable
                        :items="contractStatus"
                        :label="$t('label.status')"
                        item-text="name"
                        item-value="id"
                        :disabled="disableStatus"
                      >
                      </VAutocomplete>
                    </VFlex>
                    <VFlex md4>
                      <BaseInput
                        v-model="contract.migrationReference"
                        v-validate="'max:12'"
                        :data-vv-name="$t('label.migrationReference')"
                        :label="$t('label.migrationReference')"
                        input-type="text"
                        name="migrationReference"
                        :disabled="disableFieldView"
                        :error-messages="
                          errors.collect(
                            'contractForm.' + $t('label.migrationReference')
                          )
                        "
                        data-vv-scope="contractForm"
                      >
                      </BaseInput>
                    </VFlex>
                    <VFlex md4>
                      <VMenu
                        v-model="activationDateInPreviousSystem"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        :disabled="disableFieldView"
                        min-width="290px"
                      >
                        <VTextField
                          slot="activator"
                          v-model="activationDateInPreviousSystemText"
                          readonly
                          :error-messages="
                            errors.collect(
                              $t('label.activationDateInPreviousSystem')
                            )
                          "
                          :data-vv-name="
                            $t('label.activationDateInPreviousSystem')
                          "
                          :label="$t('label.activationDateInPreviousSystem')"
                          :disabled="disableFieldView"
                          format="yyyy-mm-dd"
                        >
                        </VTextField>
                        <VDatePicker
                          v-model="contract.activationDateInPreviousSystem"
                          @input="activationDateInPreviousSystem = false"
                        >
                        </VDatePicker>
                      </VMenu>
                    </VFlex>
                    <VFlex xs12 md4>
                      <BaseInput
                        v-model="contract.description"
                        v-validate="'required|max:30'"
                        :data-vv-name="$t('label.description')"
                        :label="$t('label.description')"
                        input-type="text"
                        name="description"
                        :disabled="disableFieldView"
                        :error-messages="
                          errors.collect(
                            'contractForm.' + $t('label.description')
                          )
                        "
                        data-vv-scope="contractForm"
                      >
                      </BaseInput>
                    </VFlex>
                    <VFlex xs12 md4>
                      <VAutocomplete
                        v-model="contract.meterReadingCycle"
                        v-validate="'required'"
                        :data-vv-name="$t('label.mrCycle')"
                        :items="getMeterReadingCycleData"
                        :label="$t('label.mrCycle')"
                        item-text="description"
                        item-value="@id"
                        clearable
                        :error-messages="
                          errors.collect('contractForm.' + $t('label.mrCycle'))
                        "
                        data-vv-scope="contractForm"
                        :disabled="disableFieldView"
                      >
                      </VAutocomplete>
                    </VFlex>
                  </VLayout>
                </VContainer>
              </VCardText>
            </VCard>
            <VCard class="mt-3">
              <VCardTitle class="primary">
                <span class="title white--text">{{
                  $t('label.dateInformation')
                }}</span>
              </VCardTitle>
              <VCardText>
                <VContainer fluid grid-list-xl>
                  <VLayout row wrap>
                    <VFlex xs12 sm6 md6>
                      <VMenu
                        v-model="requestedActivationDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                        :disabled="disableRequestedActivationDate"
                      >
                        <VTextField
                          slot="activator"
                          v-model="requestedActivationDateText"
                          v-validate="'required'"
                          :disabled="disableRequestedActivationDate"
                          readonly
                          :error-messages="
                            errors.collect(
                              'contractForm.' +
                                $t('label.requestedActivationDate')
                            )
                          "
                          :data-vv-name="$t('label.requestedActivationDate')"
                          :label="$t('label.requestedActivationDate')"
                          format="yyyy-mm-dd"
                          data-vv-scope="contractForm"
                        >
                        </VTextField>
                        <VDatePicker
                          v-model="contract.requestedActivationDate"
                          :disabled="disableRequestedActivationDate"
                          @input="requestedActivationDate = false"
                        >
                        </VDatePicker>
                      </VMenu>
                    </VFlex>
                    <VFlex xs12 sm6 md6>
                      <VMenu
                        v-model="actualActivationDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                        :disabled="disableActualActivationDate"
                      >
                        <VTextField
                          slot="activator"
                          v-model="actualActivationDateText"
                          :disabled="disableActualActivationDate"
                          readonly
                          :error-messages="
                            errors.collect($t('label.actualActivationDate'))
                          "
                          :data-vv-name="$t('label.actualActivationDate')"
                          :label="$t('label.actualActivationDate')"
                          format="yyyy-mm-dd"
                        >
                        </VTextField>
                        <VDatePicker
                          v-model="contract.actualActivationDate"
                          :disabled="disableActualActivationDate"
                          @input="
                            ;(actualActivationDate = false),
                              changeActualActivationDate()
                          "
                        >
                        </VDatePicker>
                      </VMenu>
                    </VFlex>
                    <VFlex xs12 sm6 md6>
                      <VMenu
                        v-model="requestedTerminationDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                        :disabled="disableRequestedTerminationDate"
                      >
                        <VTextField
                          slot="activator"
                          v-model="requestedTerminationDateText"
                          :disabled="disableRequestedTerminationDate"
                          readonly
                          :error-messages="
                            errors.collect($t('label.requestedTerminationDate'))
                          "
                          :data-vv-name="$t('label.requestedTerminationDate')"
                          :label="$t('label.requestedTerminationDate')"
                          format="yyyy-mm-dd"
                        >
                        </VTextField>
                        <VDatePicker
                          v-model="contract.requestedTerminationDate"
                          :disabled="disableRequestedTerminationDate"
                          @input="
                            ;(requestedTerminationDate = false),
                              changeRequestedTerminationDate()
                          "
                        >
                        </VDatePicker>
                      </VMenu>
                    </VFlex>
                    <VFlex xs12 sm6 md6>
                      <VMenu
                        v-model="actualTerminationDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                        :disabled="disableActualTerminationDate"
                      >
                        <VTextField
                          slot="activator"
                          v-model="actualTerminationDateText"
                          :disabled="disableActualTerminationDate"
                          readonly
                          :error-messages="
                            errors.collect($t('label.actualTerminationDate'))
                          "
                          :data-vv-name="$t('label.actualTerminationDate')"
                          :label="$t('label.actualTerminationDate')"
                          format="yyyy-mm-dd"
                        >
                        </VTextField>
                        <VDatePicker
                          v-model="contract.actualTerminationDate"
                          :min="minDate.toISOString().split('T')[0]"
                          :disabled="disableActualTerminationDate"
                          @input="
                            ;(actualTerminationDate = false),
                              changeActualTerminationDate()
                          "
                        >
                        </VDatePicker>
                      </VMenu>
                    </VFlex>
                  </VLayout>
                </VContainer>
              </VCardText>
            </VCard>
          </VTabItem>
          <!-- General END -->
          <!-- Billing -->
          <VTabItem>
            <VCard class="mt-3">
              <VCardTitle class="primary">
                <span class="title white--text">{{
                  $t('label.billingInformation')
                }}</span>
              </VCardTitle>
              <VCardText>
                <VContainer fluid grid-list-xl>
                  <VLayout row wrap>
                    <!-- <VFlex xs12 md4>
                      <BaseInput
                        v-model="
                          contract.billingDialogInfo.billingValidationRule
                        "
                        :label="$t('label.billingValidationRule')"
                        input-type="text"
                        name="billingValidationRule"
                        :disabled="disableFieldView"
                      >
                      </BaseInput>
                    </VFlex> -->
                    <VFlex xs12 md4>
                      <BaseInput
                        v-model="contract.billingDialogInfo.billForm"
                        :label="$t('label.billForm')"
                        input-type="text"
                        name="billForm"
                        :disabled="disableFieldView"
                      >
                      </BaseInput>
                    </VFlex>
                    <VFlex xs12 md4>
                      <VCheckbox
                        v-model="
                          contract.billingDialogInfo.consolidatedBillPrint
                        "
                        class="d-inline"
                        :label="$t('label.consolidatedBillPrint')"
                        :disabled="disableFieldView"
                      >
                      </VCheckbox>
                    </VFlex>
                    <VFlex xs12 md4>
                      <VAutocomplete
                        v-model="contract.billingDialogInfo.billingCurrency"
                        v-validate="'required'"
                        :data-vv-name="$t('label.currency')"
                        data-vv-scope="contractForm"
                        :error-messages="
                          errors.collect('contractForm.' + $t('label.currency'))
                        "
                        :items="getCurrency"
                        :label="$t('label.currency')"
                        :disabled="disableFieldView"
                        item-text="code"
                        item-value="@id"
                        clearable
                        @click:clear="
                          $nextTick(
                            () =>
                              (contract.billingDialogInfo.billingCurrency = '')
                          )
                        "
                      >
                      </VAutocomplete>
                    </VFlex>
                    <VFlex xs12 md4>
                      <VAutocomplete
                        v-model="contract.prLocks.lockReason"
                        :items="getBillingLockData"
                        :label="$t('label.billingLock')"
                        :disabled="disableFieldView"
                        item-text="reasonCode"
                        item-value="reasonCode"
                        clearable
                        @click:clear="
                          $nextTick(() => (contract.prLocks.lockReason = ''))
                        "
                        @change="setBillingRequiredFields()"
                      >
                      </VAutocomplete>
                    </VFlex>
                    <VFlex xs12 md4>
                      <VMenu
                        v-model="plValidFrom"
                        :disabled="disableFieldView"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <VTextField
                          slot="activator"
                          v-model="plValidFromText"
                          v-validate="isRequired"
                          :disabled="disableFieldView"
                          readonly
                          :error-messages="
                            errors.collect(
                              'contractForm.' + $t('label.plValidFrom')
                            )
                          "
                          :data-vv-name="$t('label.plValidFrom')"
                          :label="$t('label.plValidFrom')"
                          format="yyyy-mm-dd"
                          data-vv-scope="contractForm"
                          required
                        >
                        </VTextField>
                        <VDatePicker
                          v-model="contract.prLocks.plValidFrom"
                          @input="plValidFrom = false"
                        >
                        </VDatePicker>
                      </VMenu>
                    </VFlex>
                    <VFlex xs12 md4>
                      <VMenu
                        v-model="plValidTo"
                        :disabled="disableFieldView"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <VTextField
                          slot="activator"
                          v-model="plValidToText"
                          v-validate="isRequired"
                          :disabled="disableFieldView"
                          readonly
                          :error-messages="
                            errors.collect(
                              'contractForm.' + $t('label.plValidTo')
                            )
                          "
                          :data-vv-name="$t('label.plValidTo')"
                          :label="$t('label.plValidTo')"
                          format="yyyy-mm-dd"
                          data-vv-scope="contractForm"
                          required
                        >
                        </VTextField>
                        <VDatePicker
                          v-model="contract.prLocks.plValidTo"
                          @input="plValidTo = false"
                        >
                        </VDatePicker>
                      </VMenu>
                    </VFlex>
                  </VLayout>
                </VContainer>
                <VToolbar flat color="white">
                  <VSpacer></VSpacer>
                  <VDialog
                    v-model="billingDialog"
                    persistent
                    max-width="900px"
                    max-height="100%"
                  >
                    <template v-slot:activator="{ on }">
                      <VBtn
                        v-if="!disableFieldView"
                        dark
                        class="mb-2"
                        :class="productBtn"
                        @click="addProductInfo()"
                        >{{ $t('title.addProduct') }}
                      </VBtn>
                    </template>
                    <VCard>
                      <VCardTitle class="primary">
                        <span class="title white--text">{{ formTitle }}</span>
                      </VCardTitle>
                      <VCardText>
                        <VAlert v-model="billingAlert" type="error">
                          {{ $t('message.invalidParamDates') }}
                        </VAlert>
                        <VContainer grid-list-md>
                          <VLayout wrap>
                            <VFlex md6>
                              <VAutocomplete
                                v-model="billingDialogItem.productCategory"
                                v-validate="'required'"
                                :data-vv-name="$t('label.productCategory')"
                                data-vv-scope="billingForm"
                                :error-messages="
                                  errors.collect(
                                    'billingForm.' + $t('label.productCategory')
                                  )
                                "
                                :items="productCategoryInfo"
                                :label="$t('label.productCategory')"
                                :disabled="disablePopView"
                                item-text="code"
                                item-value="@id"
                                clearable
                                @click:clear="
                                  $nextTick(
                                    () =>
                                      (billingDialogItem.productCategory = '')
                                  )
                                "
                                @change="setProduct()"
                              >
                              </VAutocomplete>
                            </VFlex>
                            <VFlex md6>
                              <VAutocomplete
                                v-model="billingDialogItem.product"
                                v-validate="'required'"
                                :data-vv-name="$t('label.product')"
                                data-vv-scope="billingForm"
                                :error-messages="
                                  errors.collect(
                                    'billingForm.' + $t('label.product')
                                  )
                                "
                                :items="getProductByProductCategory"
                                :label="$t('label.product')"
                                :disabled="disablePopView"
                                item-text="code"
                                item-value="@id"
                                clearable
                                @click:clear="
                                  $nextTick(
                                    () => (billingDialogItem.product = null)
                                  )
                                "
                              >
                              </VAutocomplete>
                            </VFlex>
                            <VFlex md6>
                              <VMenu
                                v-model="billingValidFrom"
                                :disabled="disableBillingValidFrom"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                              >
                                <VTextField
                                  slot="activator"
                                  v-model="billingValidFromText"
                                  v-validate="'required'"
                                  :disabled="disableBillingValidFrom"
                                  required
                                  :data-vv-name="$t('label.validFrom')"
                                  data-vv-scope="billingForm"
                                  :error-messages="
                                    errors.collect(
                                      'billingForm.' + $t('label.validFrom')
                                    )
                                  "
                                  readonly
                                  :label="$t('label.validFrom')"
                                  format="dd/mm/yyyy"
                                >
                                </VTextField>
                                <VDatePicker
                                  v-model="billingDialogItem.billingValidFrom"
                                  :min="billingValidFromCondition"
                                  @input="billingValidFrom = false"
                                >
                                </VDatePicker>
                              </VMenu>
                            </VFlex>
                            <VFlex md6>
                              <VMenu
                                v-model="billingValidTo"
                                disabled
                                :close-on-content-click="false"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                              >
                                <VTextField
                                  slot="activator"
                                  v-model="billingValidToText"
                                  disabled
                                  readonly
                                  :error-messages="
                                    errors.collect($t('label.validTo'))
                                  "
                                  :data-vv-name="$t('label.validTo')"
                                  :label="$t('label.validTo')"
                                  format="dd/mm/yyyy"
                                >
                                </VTextField>
                                <VDatePicker
                                  v-model="billingDialogItem.billingValidTo"
                                  :min="minDate.toISOString().split('T')[0]"
                                  @input="billingValidTo = false"
                                >
                                </VDatePicker>
                              </VMenu>
                            </VFlex>
                          </VLayout>
                        </VContainer>
                      </VCardText>
                      <VCardActions>
                        <VSpacer></VSpacer>
                        <VBtn
                          color="grey"
                          outline
                          dark
                          @click="closeBillingInfo"
                          >Cancel</VBtn
                        >
                        <VBtn
                          v-show="hideSaveBtn"
                          color="primary"
                          @click="saveBillingInfo"
                          >Save</VBtn
                        >
                      </VCardActions>
                    </VCard>
                  </VDialog>
                </VToolbar>
                <VDataTable
                  :headers="billingDialogHeaders"
                  :items="contract.contractBillings"
                  disable-initial-sort
                  class="elevation-1"
                >
                  <template v-slot:items="props">
                    <td class="text-xs-center">{{
                      props.item.productCategory
                        ? props.item.productCategory.code
                        : null
                    }}</td>
                    <td class="text-xs-center">{{
                      props.item.product ? props.item.product.description : null
                    }}</td>
                    <td class="text-xs-center">{{
                      covertDate(props.item.billingValidFrom)
                    }}</td>
                    <td class="text-xs-center">{{
                      covertDate(props.item.billingValidTo)
                    }}</td>
                    <td class="justify-center layout px-0">
                      <VIcon
                        small
                        class="mr-2"
                        title="View"
                        @click="viewBillingInfo(props.item)"
                        >visibility</VIcon
                      >
                      <VIcon
                        v-if="
                          (props.item.newItem === true ||
                            props.item['@id'].length !== 0) &&
                            displayAREQButtons
                        "
                        small
                        class="mr-2"
                        title="Edit"
                        @click="editBillingInfo(props.item)"
                        >edit</VIcon
                      >
                      <VIcon
                        v-if="
                          (props.item.newItem === true ||
                            props.item['@id'].length !== 0) &&
                            displayAREQButtons
                        "
                        small
                        title="Delete"
                        @click="deleteBillingInfo(props.item)"
                        >delete</VIcon
                      >
                      <VIcon
                        v-if="props.item.newItem === true && displayButtons"
                        small
                        class="mr-2"
                        title="Edit"
                        @click="editBillingInfo(props.item)"
                        >edit</VIcon
                      >
                      <VIcon
                        v-if="props.item.newItem === true && displayButtons"
                        small
                        title="Delete"
                        @click="deleteBillingInfo(props.item)"
                        >delete</VIcon
                      >
                    </td>
                  </template>
                  <template v-slot:no-data>
                    <VCardText class="text-xs-center">{{
                      $t('noDataText')
                    }}</VCardText>
                  </template>
                </VDataTable>
              </VCardText>
            </VCard>
          </VTabItem>
          <!-- Billing END -->
          <!-- Parameter-->
          <VTabItem>
            <VCard class="mt-3">
              <VCardTitle class="primary">
                <span class="title white--text">{{
                  $t('label.contractParameters')
                }}</span>
              </VCardTitle>
              <VCardText>
                <VContainer fluid grid-list-xl>
                  <VToolbar flat color="white">
                    <VSpacer></VSpacer>
                    <VDialog
                      v-model="parameterDialog"
                      persistent
                      max-width="80%"
                    >
                      <template v-slot:activator="{ on }">
                        <VBtn
                          v-if="!disableFieldView"
                          color="primary"
                          dark
                          class="mb-2"
                          @click="addParameter()"
                          >{{ $t('title.addParameter') }}</VBtn
                        >
                      </template>
                      <VCard>
                        <VCardTitle class="primary">
                          <span class="title white--text">{{
                            parameterTitle
                          }}</span>
                        </VCardTitle>
                        <VCardText>
                          <VAlert v-model="parameterAlert" type="error">
                            {{ $t('message.invalidParamDates') }}
                          </VAlert>
                          <VContainer grid-list-md>
                            <VLayout row wrap>
                              <VFlex md4>
                                <VAutocomplete
                                  v-model="parameterItem.parameter"
                                  v-validate="'required'"
                                  required
                                  :data-vv-name="$t('label.parameterId')"
                                  data-vv-scope="parameterForm"
                                  :error-messages="
                                    errors.collect(
                                      'parameterForm.' + $t('label.parameterId')
                                    )
                                  "
                                  :items="getParameterByService"
                                  :label="$t('label.parameterId')"
                                  :disabled="disablePopView"
                                  item-text="code"
                                  item-value="@id"
                                  clearable
                                  @click:clear="
                                    $nextTick(
                                      () => (parameterItem.parameter = '')
                                    )
                                  "
                                  @change="setParameterValues()"
                                >
                                </VAutocomplete>
                              </VFlex>
                              <VFlex md8>
                                <BaseInput
                                  v-model="parameterItem.description"
                                  :label="$t('label.description')"
                                  disabled
                                  input-type="text"
                                  name="description"
                                >
                                </BaseInput>
                              </VFlex>
                              <VFlex md4>
                                <VAutocomplete
                                  v-model="parameterItem.uom"
                                  :error-messages="
                                    errors.collect($t('label.uom'))
                                  "
                                  :data-vv-name="$t('label.uom')"
                                  :items="getUnitMeasurement"
                                  :label="$t('label.uom')"
                                  disabled
                                  item-text="value.unitCode"
                                  item-value="@id"
                                  clearable
                                  @click:clear="
                                    $nextTick(() => (parameterItem.uom = ''))
                                  "
                                >
                                </VAutocomplete>
                              </VFlex>
                              <VFlex md4>
                                <VAutocomplete
                                  v-model="parameterItem.category"
                                  v-validate="'required'"
                                  data-vv-scope="parameterForm"
                                  :error-messages="
                                    errors.collect(
                                      'parameterForm.' + $t('label.category')
                                    )
                                  "
                                  :data-vv-name="$t('label.category')"
                                  :items="parameterItemCategories"
                                  :label="$t('label.category')"
                                  disabled
                                  item-text="name"
                                  item-value="code"
                                  clearable
                                  @click:clear="
                                    $nextTick(
                                      () => (parameterItem.category = '')
                                    )
                                  "
                                >
                                </VAutocomplete>
                              </VFlex>
                              <VFlex md4>
                                <VAutocomplete
                                  v-model="parameterItem.usage"
                                  v-validate="'required'"
                                  :data-vv-name="$t('label.usage')"
                                  data-vv-scope="parameterForm"
                                  :error-messages="
                                    errors.collect(
                                      'parameterForm.' + $t('label.usage')
                                    )
                                  "
                                  :items="parameterItemUsages"
                                  :label="$t('label.usage')"
                                  disabled
                                  item-text="name"
                                  item-value="code"
                                  @click:clear="
                                    $nextTick(() => (parameterItem.usage = ''))
                                  "
                                >
                                </VAutocomplete>
                              </VFlex>
                              <VFlex v-if="priceList" md4>
                                <VAutocomplete
                                  v-model="parameterItem.priceValue"
                                  v-validate="'required'"
                                  required
                                  :data-vv-name="$t('label.Value')"
                                  data-vv-scope="parameterForm"
                                  :error-messages="
                                    errors.collect(
                                      'parameterForm.' + $t('label.Value')
                                    )
                                  "
                                  :label="$t('label.Value')"
                                  :items="priceInfo"
                                  :disabled="disablePopView"
                                  item-text="code"
                                  item-value="code"
                                  clearable
                                  @click:clear="
                                    $nextTick(
                                      () => (parameterItem.priceValue = '')
                                    )
                                  "
                                >
                                </VAutocomplete>
                              </VFlex>
                              <VFlex v-if="valueCheckBox" md4>
                                <VCheckbox
                                  v-model="parameterItem.valueCheckBox"
                                  v-validate="'required'"
                                  required
                                  :data-vv-name="$t('label.Value')"
                                  data-vv-scope="parameterForm"
                                  :error-messages="
                                    errors.collect(
                                      'parameterForm.' + $t('label.Value')
                                    )
                                  "
                                  :label="$t('label.Value')"
                                  class="d-inline"
                                  :disabled="disablePopView"
                                >
                                </VCheckbox>
                              </VFlex>
                              <VFlex v-if="paramValue" md4>
                                <BaseInput
                                  v-model="parameterItem.value"
                                  v-validate="'required'"
                                  required
                                  :data-vv-name="$t('label.Value')"
                                  data-vv-scope="parameterForm"
                                  :error-messages="
                                    errors.collect(
                                      'parameterForm.' + $t('label.Value')
                                    )
                                  "
                                  :label="$t('label.Value')"
                                  :disabled="disablePopView"
                                  input-type="text"
                                  name="value"
                                >
                                </BaseInput>
                              </VFlex>
                              <VFlex md4>
                                <VMenu
                                  v-model="parameterValidFrom"
                                  :disabled="disablePopView"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  lazy
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <VTextField
                                    slot="activator"
                                    v-model="parameterValidFromText"
                                    v-validate="'required'"
                                    required
                                    :data-vv-name="$t('label.validFrom')"
                                    data-vv-scope="parameterForm"
                                    :error-messages="
                                      errors.collect(
                                        'parameterForm.' + $t('label.validFrom')
                                      )
                                    "
                                    :disabled="disablePopView"
                                    readonly
                                    :label="$t('label.validFrom')"
                                    format="yyyy-mm-dd"
                                    name="parameterValidFrom"
                                  >
                                  </VTextField>
                                  <VDatePicker
                                    v-model="parameterItem.parameterValidFrom"
                                    :min="minValidFrom"
                                    :max="maxValidTo"
                                    @input="parameterValidFrom = false"
                                  >
                                  </VDatePicker>
                                </VMenu>
                              </VFlex>
                              <VFlex md4>
                                <VMenu
                                  v-model="parameterValidTo"
                                  :disabled="disablePopView"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  lazy
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <VTextField
                                    slot="activator"
                                    v-model="parameterValidToText"
                                    v-validate="'required'"
                                    required
                                    :data-vv-name="$t('label.validTo')"
                                    data-vv-scope="parameterForm"
                                    :error-messages="
                                      errors.collect(
                                        'parameterForm.' + $t('label.validTo')
                                      )
                                    "
                                    :disabled="disablePopView"
                                    readonly
                                    :label="$t('label.validTo')"
                                    format="yyyy-mm-dd"
                                  >
                                  </VTextField>
                                  <VDatePicker
                                    v-model="parameterItem.parameterValidTo"
                                    :min="minValidFrom"
                                    :max="maxValidTo"
                                    @input="parameterValidTo = false"
                                  >
                                  </VDatePicker>
                                </VMenu>
                              </VFlex>
                            </VLayout>
                          </VContainer>
                        </VCardText>
                        <VCardActions>
                          <VSpacer></VSpacer>
                          <VBtn
                            color="grey"
                            outline
                            dark
                            @click="closeParameter"
                            >Cancel</VBtn
                          >
                          <VBtn
                            v-show="hideSaveBtn"
                            color="primary"
                            @click="saveParameter"
                            >Save</VBtn
                          >
                        </VCardActions>
                      </VCard>
                    </VDialog>
                  </VToolbar>
                </VContainer>
                <VDataTable
                  :headers="parameterHeaders"
                  :items="contract.contractParameters"
                  disable-initial-sort
                  class="elevation-1"
                >
                  <template v-slot:items="props">
                    <td class="text-xs-center">{{
                      props.item.parameter ? props.item.parameter.code : null
                    }}</td>
                    <td class="text-xs-center">{{
                      props.item.parameter.description
                    }}</td>
                    <td class="text-xs-center">{{
                      props.item.parameter.category
                    }}</td>
                    <td class="text-xs-center">{{
                      props.item.parameter.usage
                    }}</td>
                    <td class="text-xs-center">{{
                      props.item.parameter.unitMeasurement
                        ? props.item.parameter.unitMeasurement.value.unitCode
                        : null
                    }}</td>
                    <td
                      v-if="props.item.parameter.category === 'FLG'"
                      class="text-xs-center"
                    >
                      <VCheckbox
                        v-model="props.item.value"
                        :disabled="true"
                      ></VCheckbox>
                    </td>
                    <td v-else class="text-xs-center">{{
                      props.item.value
                    }}</td>
                    <td class="text-xs-center">{{
                      covertDate(props.item.parameterValidFrom)
                    }}</td>
                    <td class="text-xs-center">{{
                      covertDate(props.item.parameterValidTo)
                    }}</td>
                    <td class="justify-center layout px-0">
                      <VIcon
                        small
                        class="mr-2"
                        title="View"
                        @click="viewParameter(props.item)"
                        >visibility</VIcon
                      >
                      <VIcon
                        v-if="!disableFieldView"
                        small
                        class="mr-2"
                        title="Edit"
                        @click="editParameter(props.item)"
                        >edit</VIcon
                      >
                      <VIcon
                        v-if="!disableFieldView"
                        small
                        title="Delete"
                        @click="deleteParameter(props.item)"
                        >delete</VIcon
                      >
                    </td>
                  </template>
                  <template v-slot:no-data>
                    <VCardText class="text-xs-center">
                      {{ $t('noDataText') }}
                    </VCardText>
                  </template>
                </VDataTable>
              </VCardText>
            </VCard>
          </VTabItem>
          <!-- Parameter END -->
          <!-- Meter Reading -->
          <VTabItem v-if="showMRTab">
            <VCard class="mt-3">
              <VCardTitle class="primary">
                <span class="title white--text">{{ $t('label.mrInfo') }} </span>
              </VCardTitle>
              <VCardText>
                <VContainer fluid grid-list-xl>
                  <VLayout row wrap>
                    <VFlex md4>
                      <VAutocomplete
                        v-model="contract.meterReading.lockReason"
                        :data-vv-name="$t('label.mrLock')"
                        :items="getMeterReadingLockInfo"
                        :label="$t('label.mrLock')"
                        item-text="reason"
                        item-value="reason"
                        clearable
                        :disabled="disableFieldView"
                        @click:clear="
                          $nextTick(
                            () => (contract.meterReading.lockReason = '')
                          )
                        "
                        @change="setMRRequiredFields()"
                      >
                      </VAutocomplete>
                    </VFlex>
                    <VFlex md4>
                      <VMenu
                        v-model="mrValidFrom"
                        :disabled="disableFieldView"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <VTextField
                          slot="activator"
                          v-model="mrValidFromText"
                          v-validate="isMRRequired"
                          :disabled="disableFieldView"
                          readonly
                          :error-messages="
                            errors.collect(
                              'contractForm.' + $t('label.mrValidFrom')
                            )
                          "
                          :data-vv-name="$t('label.mrValidFrom')"
                          :label="$t('label.mrValidFrom')"
                          format="yyyy-mm-dd"
                          data-vv-scope="contractForm"
                          required
                        >
                        </VTextField>
                        <VDatePicker
                          v-model="contract.meterReading.mrValidFrom"
                          @input="mrValidFrom = false"
                        >
                        </VDatePicker>
                      </VMenu>
                    </VFlex>
                    <VFlex md4>
                      <VMenu
                        v-model="mrValidTo"
                        :disabled="disableFieldView"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <VTextField
                          slot="activator"
                          v-model="mrValidToText"
                          v-validate="isMRRequired"
                          :disabled="disableFieldView"
                          readonly
                          :error-messages="
                            errors.collect(
                              'contractForm.' + $t('label.mrValidTo')
                            )
                          "
                          :data-vv-name="$t('label.mrValidTo')"
                          :label="$t('label.mrValidTo')"
                          format="yyyy-mm-dd"
                          data-vv-scope="contractForm"
                          required
                        >
                        </VTextField>
                        <VDatePicker
                          v-model="contract.meterReading.mrValidTo"
                          @input="mrValidTo = false"
                        >
                        </VDatePicker>
                      </VMenu>
                    </VFlex>
                  </VLayout>
                </VContainer>
                <VDataTable
                  :headers="meterReadingHeaders"
                  :items="meterReadingItems"
                  disable-initial-sort
                  class="elevation-1"
                >
                  <template v-slot:items="props">
                    <td>{{ covertDate(props.item.meterReadingDate) }}</td>
                    <td>{{
                      props.item.deviceType
                        ? deviceTypes[props.item.deviceType]
                        : ''
                    }}</td>
                    <td>{{
                      props.item.serialNumber ? props.item.serialNumber : ''
                    }}</td>
                    <td>{{
                      props.item.register ? props.item.register : ''
                    }}</td>
                    <td>{{
                      props.item.meterReadingReason
                        ? props.item.meterReadingReason
                        : ''
                    }}</td>
                    <td>{{
                      props.item.meterReadingType
                        ? meterReadingTypes[props.item.meterReadingType]
                        : ''
                    }}</td>
                    <td>{{
                      props.item.meterReading ? props.item.meterReading : ''
                    }}</td>
                    <td>{{
                      props.item.objectStatuses
                        ? props.item.objectStatuses[0]['systemStatus']
                        : ''
                    }}</td>
                  </template>
                  <template v-slot:no-data>
                    <VCardText class="text-xs-center">
                      {{ $t('noDataText') }}
                    </VCardText>
                  </template>
                </VDataTable>
              </VCardText>
            </VCard>
          </VTabItem>
          <!-- Meter Reading END -->
          <!-- BILL DOCUMENTS -->
          <VTabItem v-if="showBillDocTab">
            <VCard class="mt-3">
              <VCardTitle class="primary">
                <span class="title white--text"
                  >{{ $t('label.billDocument') }}
                </span>
              </VCardTitle>
              <VCardText>
                <VDataTable
                  :headers="billDocumentHeaders"
                  :items="billDocumentItems"
                  class="elevation-1"
                >
                  <template v-slot:items="props">
                    <td class="text-xs-center">{{
                      props.item.billDocNo ? props.item.billDocNo : ''
                    }}</td>
                    <td class="text-xs-center">{{
                      covertDate(props.item.billDate)
                    }}</td>
                    <td class="text-xs-center">{{
                      covertDate(props.item.billPeriodStart)
                    }}</td>
                    <td class="text-xs-center">{{
                      covertDate(props.item.billPeriodEnd)
                    }}</td>
                    <td class="text-xs-center">{{
                      props.item.billingType ? props.item.billingType : ''
                    }}</td>
                    <td class="text-xs-center">{{
                      props.item.billedConsumption
                        ? props.item.billedConsumption
                        : ''
                    }}</td>
                    <td class="text-xs-center">{{
                      props.item.billedAmount
                        ? props.item.billedAmount.toFixed(2)
                        : ''
                    }}</td>
                  </template>
                  <template v-slot:no-data>
                    <VCardText class="text-xs-center">
                      {{ $t('noDataText') }}
                    </VCardText>
                  </template>
                </VDataTable>
              </VCardText>
            </VCard>
          </VTabItem>
          <!-- BILL DOCUMENTS END-->
        </VTabs>
      </VFlex>
    </VContainer>
    <VLayout row>
      <VDialog v-model="reverseDialog" max-width="290" persistent>
        <VCard>
          <VCardTitle class="headline">
            {{ $t('message.confirmReverse') }}
          </VCardTitle>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn color="error" flat="flat" @click="confirmReverse()">{{
              $t('button.yes')
            }}</VBtn>
            <VBtn color="primary" flat="flat" @click="noReverse()">{{
              $t('button.no')
            }}</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VLayout>
    <VLayout row>
      <VDialog v-model="metertedActivationDialog" max-width="290" persistent>
        <VCard>
          <VCardTitle class="headline">
            {{ $t('message.confirmActivate') }}
          </VCardTitle>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn color="error" flat="flat" @click="confirmActivate()">{{
              $t('button.yes')
            }}</VBtn>
            <VBtn color="primary" flat="flat" @click="noActivation()">{{
              $t('button.no')
            }}</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VLayout>
    <VLayout row>
      <VDialog v-model="metertedTerminationDialog" max-width="290" persistent>
        <VCard>
          <VCardTitle class="headline">
            {{ $t('message.confirmTerminate') }}
          </VCardTitle>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn color="error" flat="flat" @click="confirmTerminate()"
              >Yes</VBtn
            >
            <VBtn color="primary" flat="flat" @click="noTermination()">
              No
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VLayout>
  </VForm>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseNotification from '@/components/BaseNotification'
import BaseCancelModal from '@/components/BaseCancelModal'
import _ from 'lodash'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import i18n from '@/i18n'
import { setTimeout } from 'timers'

export default {
  name: 'FormContract',
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
  },
  data() {
    return {
      loading: false,
      selectedService: '',
      showMRTab: false,
      activationDateInPreviousSystemText: null,
      requestedActivationDateText: null,
      actualActivationDateText: null,
      requestedTerminationDateText: null,
      actualTerminationDateText: null,
      billingValidFromText: null,
      billingValidToText: null,
      plValidFromText: null,
      plValidToText: null,
      requestDateText: null,
      parameterValidFromText: null,
      parameterValidToText: null,
      mrValidFromText: null,
      mrValidToText: null,
      showBillDocTab: true,
      billingValidFromCondition: new Date().toISOString().split('T')[0],
      reverseDialog: false,
      disableBillingValidFrom: true,
      isRequired: '',
      isMRRequired: '',
      metertedActivationDialog: false,
      metertedTerminationDialog: false,
      meterMessage: '',
      disableActualActivationDate: false,
      disableSearch: true,
      billingAlert: false,
      parameterAlert: false,
      validateReqActDate: '',
      getPremise: [],
      getCustomer: [],
      minDate: new Date(),
      minValidFrom: '',
      maxValidTo: '',
      disableCompany: false,
      disableRequestedTerminationDate: false,
      disableActualTerminationDate: false,
      disableContractNumber: false,
      disableRequestedActivationDate: false,
      disableService: false,
      generalTab: '',
      billingTab: '',
      productBtn: 'primary',
      parameterTab: '',
      meterReadingTab: '',
      billDocumentTab: '',
      disableRequestDate: true,
      disablePOView: false,
      disableStatus: true,
      disableFieldView: false,
      hideReveseBtn: false,
      disableSaveBtn: false,
      hideSaveBtn: true,
      getBranchByCompany: [],
      getServiceByCompany: [],
      getParameterByService: [],
      getProductByProductCategory: [],
      requestedActivationDate: null,
      actualActivationDate: null,
      requestedTerminationDate: null,
      activationDateInPreviousSystem: null,
      actualTerminationDate: null,
      plValidFrom: null,
      plValidTo: null,
      mrValidFrom: null,
      mrValidTo: null,
      billingValidFrom: null,
      billingValidTo: null,
      parameterValidFrom: null,
      parameterValidTo: null,
      requestDate: false,
      billingType: false,
      billDocument: false,
      disablePopView: false,
      valueCheckBox: false,
      paramValue: true,
      priceList: false,
      formTitle: i18n.t('title.addProduct'),
      parameterTitle: i18n.t('title.addParameter'),
      billDocumentFormTitle: i18n.t('title.addIdentification'),
      configuredValidFrom: null,
      configuredValidTo: null,
      parameterItemUsages: [
        { code: 'REG', name: 'Register relevant' },
        { code: 'NREG', name: 'Non-register relevant' },
      ],
      parameterItemCategories: [
        { code: 'AMT', name: 'Amount' },
        { code: 'NUM', name: 'Number' },
        { code: 'DEM', name: 'Demand' },
        { code: 'FLG', name: 'Flag' },
        { code: 'PRC', name: 'Price' },
        { code: 'QTY', name: 'Quantity' },
      ],
      contract: {
        contractNumber: '',
        customer: '',
        premise: '',
        requestDate: null,
        status: 'AREQ',
        contractClass: null,
        accountKey: null,
        customerName: '',
        premiseAddress: '',
        requestedActivationDate: null,
        actualActivationDate: null,
        requestedTerminationDate: null,
        actualTerminationDate: null,
        migrationReference: '',
        activationDateInPreviousSystem: null,
        description: '',
        company: null,
        branch: null,
        service: null,
        meterReadingCycle: null,
        contractBillings: [],
        billingDialogInfo: {
          billingValidationRule: null,
          billForm: '',
          consolidatedBillPrint: 0,
          billingCurrency: '',
        },
        processLocks: [],
        prLocks: {
          id: null,
          lockReason: '',
          plValidFrom: null,
          plValidTo: null,
          removed: null,
          objectType: 'CONTRACT',
          objectNumber: '',
          processType: 'BIL',
        },
        contractParameters: [],
        meterReading: {
          id: null,
          lockReason: '',
          mrValidFrom: null,
          mrValidTo: null,
          plValidFrom: null,
          plValidTo: null,
          removed: null,
          objectNumber: '',
          objectType: 'CONTRACT',
          processType: 'MTR',
        },
        billDocuments: {
          billDate: null,
          billPeriodStart: '',
          billPeriodEnd: null,
          billingType: null,
          billDocument: null,
          billedConsumption: null,
          billedAmount: null,
        },
        objectStatuses: [],
        objectStatus: {
          id: null,
          objectType: 'CONTRACT',
          changeNumber: '001',
          objectNumber: '',
          systemStatus: null,
          userStatus: null,
        },
      },
      contractStatus: [
        { id: 'AREQ', name: 'AREQ' },
        { id: 'ACTV', name: 'ACTV' },
        { id: 'TREQ', name: 'TREQ' },
        { id: 'TERM', name: 'TERM' },
        { id: 'REV', name: 'REV' },
      ],

      /** ** BILLING INFO TAB ****/
      billingDialog: false,
      billingDialogHeaders: [
        {
          text: i18n.t('label.productCategory'),
          value: 'productCategory',
          sortable: false,
        },
        { text: i18n.t('label.product'), value: 'product', sortable: false },
        {
          text: i18n.t('label.billingValidFrom'),
          value: 'billingValidFrom',
          sortable: false,
        },
        {
          text: i18n.t('label.billingValidTo'),
          value: 'billingValidTo',
          sortable: false,
        },
        { text: '', value: '', sortable: false },
      ],
      billingDialogIndex: -1,
      billingDialogItem: {
        newItem: true,
        productCategory: null,
        product: null,
        billingValidFrom: null,
        billingValidTo: null,
      },
      defaultDialogItem: {
        newItem: true,
        productCategory: null,
        product: null,
        billingValidFrom: null,
        billingValidTo: null,
      },
      /** ** BILLING INFO TAB ENDS ****/

      /** ** PARAMETER INFO TAB ****/
      parameterDialog: false,
      parameterHeaders: [
        {
          text: i18n.t('label.parameter'),
          value: 'parameter',
          sortable: false,
        },
        {
          text: i18n.t('label.description'),
          value: 'description',
          sortable: false,
        },
        { text: i18n.t('label.category'), value: 'category', sortable: false },
        { text: i18n.t('label.usage'), value: 'usage', sortable: false },
        { text: i18n.t('label.uom'), value: 'uom', sortable: false },
        { text: i18n.t('label.Value'), value: 'value', sortable: false },
        {
          text: i18n.t('label.validFrom'),
          value: 'parameterValidFrom',
          sortable: false,
        },
        {
          text: i18n.t('label.validTo'),
          value: 'parameterValidTo',
          sortable: false,
        },
        { text: '', value: '', sortable: false },
      ],
      parameterIndex: -1,
      parameterItem: {
        parameter: '',
        description: '',
        category: '',
        usage: '',
        uom: '',
        value: '',
        priceValue: null,
        valueCheckBox: 0,
        parameterValidFrom: '',
        parameterValidTo: '',
      },
      parameterItems: {
        parameter: '',
        description: '',
        category: '',
        usage: '',
        uom: '',
        value: '',
        priceValue: null,
        valueCheckBox: 0,
        parameterValidFrom: '',
        parameterValidTo: '',
      },
      /** ** PARAMETER INFO TAB ENDS ****/

      /** ** METER READING TAB ****/
      meterReading: false,
      meterReadingHeaders: [
        { text: i18n.t('label.mrDate'), value: 'meterReadingDate' },
        { text: i18n.t('label.deviceType'), value: 'deviceType' },
        { text: i18n.t('label.serialNo'), value: 'serialNumber' },
        { text: i18n.t('label.register'), value: 'register' },
        { text: i18n.t('label.mrReason'), value: 'meterReadingReason' },
        { text: i18n.t('label.mrType'), value: 'meterReadingType' },
        { text: i18n.t('label.meterReading'), value: 'meterReading' },
        {
          text: i18n.t('label.status'),
          value: 'objectStatuses[0].systemStatus',
        },
      ],
      meterReadingIndex: -1,
      meterReadingItems: [],
      deviceTypes: [],
      meterReadingTypes: [],
      defaultMRDialogItem: {
        mrDate: null,
        deviceType: '',
        serialNo: '',
        register: '',
        mrReason: '',
        mrType: '',
        meterReading: '',
        status: '',
      },
      /** ** METER READING TAB ENDS ****/

      billDocumentDialog: false,
      billDocumentHeaders: [
        { text: i18n.t('label.billingDocument'), value: 'billDocument' },
        { text: i18n.t('label.billDate'), value: 'billDate' },
        { text: i18n.t('label.billPeriodStart'), value: 'billPeriodStart' },
        { text: i18n.t('label.billPeriodEnd'), value: 'billPeriodEnd' },
        { text: i18n.t('label.billingType'), value: 'billingType' },
        { text: i18n.t('label.billedConsumption'), value: 'billedConsumption' },
        { text: i18n.t('label.billedAmount'), value: 'billedAmount' },
      ],
      billDocumentIndex: -1,
      billDocumentItems: [],
      billDocumentDefaultItem: {
        billDate: null,
        billPeriodStart: '',
        billPeriodEnd: '',
        billingType: null,
        billDocument: null,
      },
    }
  },
  computed: {
    ...mapGetters([
      'getAction',
      'msgDisplayInfo',
      'msgText',
      'msgType',
      'servicesInfo',
      'parametersInfo',
      'contractClassInfo',
      'getContractAccountKeyInfo',
      'productCategoryInfo',
      'getBillingLockData',
      'priceInfo',
      'getMeterReadingLockInfo',
      'getNumberRangeAssignmentInfo',
      'getMeterReadingList',
      'deviceTypeInfo',
      'getMeterReadingTypeInfo',
    ]),
    ...mapGetters('centralDateConfig', ['getDateTimeFormat']),
    ...mapGetters('contract', [
      'getNumberRange',
      'getRegion',
      'getSelectedContractItem',
      'getCompanies',
      'getBranch',
      'getPrevRouteName',
      'getContractObjectStatus',
      'getConfiguredParamters',
      'getBillDocStatus',
    ]),
    ...mapGetters('product', ['getProductGroupsInfo']),
    ...mapGetters('device', ['getCurrency']),
    ...mapGetters('premise', ['getSelectedPremiseItem', 'getUnitMeasurement']),
    ...mapGetters('customer', ['getSelectedCustomerItem']),
    ...mapGetters('meterReadingCycle', ['getMeterReadingCycleData']),
    ...mapGetters('billingExecution', ['getBillDocumentsList']),
    displayAREQButtons: function() {
      if (
        (this.getAction === 'new' || this.getAction === 'update') &&
        this.contract.status === 'AREQ'
      ) {
        return true
      } else {
        return false
      }
    },

    displayButtons: function() {
      if (
        (this.getAction === 'new' || this.getAction === 'update') &&
        (this.contract.status === 'ACTV' || this.contract.status === 'TREQ')
      ) {
        return true
      } else {
        return (
          (this.getAction === 'view' || this.getAction === 'update') &&
          this.contract.status === 'REV'
        )
      }
    },
  },
  watch: {
    'contract.requestDate': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.requestDateText = re[0]
      })
    },
    'contract.activationDateInPreviousSystem': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.activationDateInPreviousSystemText = re[0]
      })
    },
    'contract.requestedActivationDate': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.requestedActivationDateText = re[0]
      })
    },
    'contract.actualActivationDate': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.actualActivationDateText = re[0]
      })
    },
    'contract.requestedTerminationDate': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.requestedTerminationDateText = re[0]
      })
    },
    'contract.actualTerminationDate': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.actualTerminationDateText = re[0]
      })
    },
    'contract.prLocks.plValidFrom': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.plValidFromText = re[0]
      })
    },
    'contract.prLocks.plValidTo': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.plValidToText = re[0]
      })
    },
    'billingDialogItem.billingValidFrom': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.billingValidFromText = re[0]
      })
    },
    'billingDialogItem.billingValidTo': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.billingValidToText = re[0]
      })
    },
    'parameterItem.parameterValidFrom': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.parameterValidFromText = re[0]
      })
    },
    'parameterItem.parameterValidTo': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.parameterValidToText = re[0]
      })
    },
    'contract.meterReading.mrValidFrom': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.mrValidFromText = re[0]
      })
    },
    'contract.meterReading.mrValidTo': function(datePicker) {
      this.convertDateTimeFormat(datePicker).then((re) => {
        this.mrValidToText = re[0]
      })
    },
    getBranch: function() {
      this.setBranch()
    },
    servicesInfo: function() {
      this.setService()
    },
    parametersInfo: function() {
      this.setParameter()
    },
    getServiceByCompany: function() {
      this.toggleMRTab()
    },
  },
  beforeMount() {
    this.getRegionList()
    this.fetchNumberRange()
    this.fetchCompanies()
    this.fetchBranch()
    this.getServiceList()
    this.getContractClassList()
    this.getContractAccountKeyList()
    this.fetchCurrency()
    this.getProductCategoryList()
    this.fetchUnitMeasurement()
    this.getParametersList()
    this.getBillingLock()
    this.getMeterReadingLockList()
    this.getPriceList()
    this.getProductList()
    this.getNumberRangeAssignmentList()
    this.getMeterReadingCycleList()
    this.getDeviceTypeList()
    this.getMeterReadingTypeList()
  },
  mounted() {
    if (this.getAction === 'new') {
      this.contract.requestDate = new Date().toISOString()
      this.disableSearch = false
      this.disableActualActivationDate = true
      this.disableRequestedTerminationDate = true
      this.disableActualTerminationDate = true
      this.setPremiseInformation()
      this.setCustomerInformation()
      this.showBillDocTab = false
    } else if (this.getAction === 'update') {
      this.disableContractNumber = true
      this.disableService = true
      this.setContractOnLoad()
      this.disableFormFields()
      this.setContractBillingInfoOnLoad()
      this.setProcessLocksOnLoad()
      this.setContractMeterReadingOnLoad()
      this.setContractParametersOnLoad()
    } else if (this.getAction === 'view') {
      if (
        this.getSelectedContractItem[0].objectStatuses[0].systemStatus === 'REV'
      ) {
        this.hideReveseBtn = false
      } else {
        this.hideReveseBtn = true
      }
      this.disableFieldView = true
      this.disableSaveBtn = true
      this.disablePopView = true
      this.disableContractNumber = true
      this.disableService = true
      this.hideSaveBtn = false
      this.disableContractNumber = true
      this.disableRequestedActivationDate = true
      this.disableRequestedTerminationDate = true
      this.disableActualActivationDate = true
      this.disableActualTerminationDate = true

      this.setContractOnLoad()
      this.setContractBillingInfoOnLoad()
      this.setProcessLocksOnLoad()
      this.setContractMeterReadingOnLoad()
      this.setContractParametersOnLoad()
    }
  },
  methods: {
    ...mapActions('product', ['getProductList']),
    ...mapActions('centralDateConfig', ['convertDateTimeFormat']),
    ...mapActions('contract', [
      'addContract',
      'fetchNumberRange',
      'updateContract',
      'fetchCompanies',
      'fetchBranch',
      'fetchObjectStatus',
      'fetchConfiguredParamters',
      'fetchBillDocumentStatus',
    ]),
    ...mapActions([
      'getRegionList',
      'msgNotification',
      'updateActionState',
      'getServiceList',
      'getContractClassList',
      'getContractAccountKeyList',
      'getProductCategoryList',
      'getParametersList',
      'getBillingLock',
      'getMeterReadingLockList',
      'getPriceList',
      'getNumberRangeAssignmentList',
      'getMeterReading',
      'getDeviceTypeList',
      'getMeterReadingTypeList',
    ]),
    ...mapActions('device', ['fetchCurrency']),
    ...mapActions('premise', [
      'selectPremiseItemForContract',
      'fetchUnitMeasurement',
    ]),
    ...mapActions('customer', ['selectCustomerItemForContract']),
    ...mapActions('meterReadingCycle', ['getMeterReadingCycleList']),
    ...mapActions('billingExecution', ['fetchBillDocuments']),
    changeActualActivationDate: function() {
      if (
        this.contract.actualActivationDate !== null &&
        this.contract.actualActivationDate !== ''
      )
        this.metertedActivationDialog = true
    },
    changeActualTerminationDate: function() {
      if (
        this.contract.actualTerminationDate !== null &&
        this.contract.actualTerminationDate !== undefined
      )
        this.metertedTerminationDialog = true
    },
    changeRequestedTerminationDate: function() {
      if (
        this.contract.requestedTerminationDate !== null &&
        this.contract.requestedTerminationDate !== undefined
      )
        this.contract.status = 'TREQ'
    },
    hideReveseButtonForMetered: function() {
      if (
        (this.getSelectedContractItem[0].objectStatuses[0].systemStatus ===
          'ACTV' ||
          this.getSelectedContractItem[0].objectStatuses[0].systemStatus ===
            'TERM') &&
        (this.selectedService === 'ELE' || this.selectedService === 'WTR')
      ) {
        this.hideReveseBtn = false
      }
    },
    disableFormFields: function() {
      if (this.getAction === 'new') {
        this.hideReveseBtn = false
      }
      if (this.contract.status === 'AREQ') {
        this.disableRequestedActivationDate = false
        this.disableRequestedTerminationDate = true
        this.disableActualTerminationDate = true

        if (this.selectedService === 'MGT' || this.selectedService === 'CPR') {
          this.disableActualActivationDate = false
        } else {
          this.disableActualActivationDate = true
        }

        // show only for update
        if (this.getAction === 'update') {
          this.hideReveseBtn = true
        }
      } else if (this.contract.status === 'ACTV') {
        this.disableRequestedActivationDate = true
        this.disableRequestedTerminationDate = false
        this.disableActualActivationDate = true
        this.disableActualTerminationDate = true

        if (this.selectedService === 'MGT' || this.selectedService === 'CPR') {
          this.hideReveseBtn = true
        } else {
          this.hideReveseBtn = false
        }
      } else if (this.contract.status === 'TREQ') {
        this.disableRequestedActivationDate = true
        this.disableRequestedTerminationDate = false
        this.disableActualActivationDate = true

        if (this.selectedService === 'MGT' || this.selectedService === 'CPR') {
          this.disableActualTerminationDate = false
        } else {
          this.disableActualTerminationDate = true
        }
        this.hideReveseBtn = true
      } else if (this.contract.status === 'TERM') {
        this.disableFieldView = true
        this.disableRequestedActivationDate = true
        this.disableRequestedTerminationDate = true
        this.disableActualActivationDate = true
        this.disableActualTerminationDate = true

        if (this.selectedService === 'MGT' || this.selectedService === 'CPR') {
          this.hideReveseBtn = true
        } else {
          this.hideReveseBtn = false
        }
      } else if (this.contract.status === 'REV') {
        this.disableFieldView = true
        this.disableRequestedActivationDate = true
        this.disableRequestedTerminationDate = true
        this.disableActualActivationDate = true
        this.disableActualTerminationDate = true
        this.hideReveseBtn = false
      }
    },
    setBillingRequiredFields: function() {
      if (this.contract.prLocks.lockReason !== undefined) {
        this.isRequired = 'required'
      } else if (this.contract.prLocks.lockReason === undefined) {
        this.isRequired = ''
        this.contract.prLocks.plValidFrom = null
        this.contract.prLocks.plValidTo = null
      }
    },
    setMRRequiredFields: function() {
      if (this.contract.meterReading.lockReason !== undefined) {
        this.isMRRequired = 'required'
      } else if (this.contract.meterReading.lockReason === undefined) {
        this.isMRRequired = ''
        this.contract.meterReading.mrValidFrom = null
        this.contract.meterReading.mrValidTo = null
      }
    },
    confirmActivate: function() {
      this.contract.status = 'ACTV'
      this.metertedActivationDialog = false
    },
    confirmTerminate: function() {
      this.contract.status = 'TERM'
      this.metertedTerminationDialog = false
    },
    noActivation: function() {
      this.contract.actualActivationDate = null
      this.metertedActivationDialog = false
    },
    noTermination: function() {
      this.contract.actualTerminationDate = null
      this.metertedTerminationDialog = false
    },
    searchPremise() {
      this.$router.push({
        path: '../../customer-care/premise/search',
      })
    },
    searchCustomer() {
      this.$router.push({
        path: '../../customer-care/customer/search',
      })
    },
    setPremiseInformation: function() {
      this.$nextTick(() => {
        if (
          (this.getPrevRouteName === 'premise_search_result' ||
            this.getPrevRouteName === 'customer_search_result') &&
          this.getSelectedPremiseItem.length !== 0
        ) {
          this.getPremise = this.getSelectedPremiseItem
          this.contract.premise = this.getSelectedPremiseItem[0]['@id']
          this.contract.premiseAddress = this.getFullAddress(
            this.getSelectedPremiseItem[0]
          )
        } else {
          this.selectPremiseItemForContract([])
        }
      })
    },
    setCustomerInformation: function() {
      this.$nextTick(() => {
        if (
          (this.getPrevRouteName === 'customer_search_result' ||
            this.getPrevRouteName === 'premise_search_result') &&
          this.getSelectedCustomerItem.length !== 0
        ) {
          this.getCustomer = this.getSelectedCustomerItem
          this.contract.customer = this.getSelectedCustomerItem[0]['@id']
          if (
            this.getSelectedCustomerItem[0]['customerCategory'] ===
            'Organization'
          ) {
            this.contract.customerName = this.getSelectedCustomerItem[0][
              'organizationName'
            ]
          } else {
            this.contract.customerName = this.getSelectedCustomerItem[0][
              'fullName'
            ]
          }
          if (this.getSelectedCustomerItem[0].customerAccounts.length !== 0) {
            this.contract.company = this.getSelectedCustomerItem[0].customerAccounts[
              'company'
            ]
            this.setBranch()
          }
        } else {
          this.selectCustomerItemForContract([])
        }
      })
    },
    getFullAddress(item) {
      return (
        (item.unitNumber ? item.unitNumber + ', ' : '') +
        (item.floor ? item.floor + ', ' : '') +
        (item.houseBuildingNumber ? item.houseBuildingNumber + ', ' : '') +
        (item.streetOne ? item.streetOne + ', ' : '') +
        (item.streetTwo ? item.streetTwo + ', ' : '') +
        (item.postalCode ? item.postalCode + ', ' : '') +
        (item.city ? item.city : '')
      )
    },
    addNew: function() {
      const contract = this.setContractDataBeforeSubmit()
      this.addContract(contract)
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    setProduct: function() {
      let productId = this.billingDialogItem.productCategory
        ? _.isObject(this.billingDialogItem.productCategory)
          ? this.billingDialogItem.productCategory['@id']
          : this.billingDialogItem.productCategory
        : null

      this.getProductByProductCategory = this.getProductGroupsInfo
        ? this.getProductGroupsInfo.filter(
            (range) => range.productCategory['@id'] === productId
          )
        : []

      if (productId === null) {
        this.billingDialogItem.product = null
      }
    },
    updateData: function() {
      const contract = this.setContractDataBeforeSubmit()
      this.updateContract({
        id: this.getSelectedContractItem[0]['@id'].slice(11),
        ...contract,
      })
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    editEvent: function() {
      this.updateActionState('update').then(
        this.$router.push({
          path: 'update',
        })
      )
    },
    /** * REVERSE ***/
    reverseEvent: function() {
      if (this.getBillDocStatus.length !== 0) {
        if (
          (this.getBillDocStatus.reversalDate !== null ||
            this.getBillDocStatus.reversalReason !== null) &&
          this.contract.status === 'ACTV' &&
          (this.selectedService === 'MGT' || this.selectedService === 'CPR')
        ) {
          let msg = {
            text: this.$t('message.noReverse'),
            type: 'error',
            display: true,
          }
          this.msgNotification(msg)
        } else {
          this.reverseDialog = true
        }
      } else {
        this.reverseDialog = true
      }
    },
    confirmReverse: function() {
      this.reverseDialog = false
      if (
        this.getSelectedContractItem[0].objectStatuses[0].systemStatus ===
        'AREQ'
      ) {
        this.contract.status = 'REV'
      } else if (
        this.getSelectedContractItem[0].objectStatuses[0].systemStatus ===
        'ACTV'
      ) {
        this.contract.status = 'AREQ'
        this.contract.actualActivationDate = null
      } else if (
        this.getSelectedContractItem[0].objectStatuses[0].systemStatus ===
        'TREQ'
      ) {
        this.contract.status = 'ACTV'
        this.contract.requestedTerminationDate = null
      } else if (
        this.getSelectedContractItem[0].objectStatuses[0].systemStatus ===
        'TERM'
      ) {
        this.contract.status = 'TREQ'
        this.contract.actualTerminationDate = null
      }
      this.updateData()
    },
    noReverse: function() {
      this.reverseDialog = false
    },
    /** * END REVERSE ***/
    setBranch: function() {
      this.getBranchByCompany = this.getBranch
        ? this.getBranch.filter(
            (range) => range.company['@id'] === this.contract.company
          )
        : []

      // Reset branch if Company changes
      if (this.contract.company === undefined) {
        this.contract.branch = null
      }
      this.setService()
    },
    setService: function() {
      this.getServiceByCompany = this.servicesInfo
        ? this.servicesInfo.filter(
            (range) => range.company['@id'] === this.contract.company
          )
        : []

      // Reset branch if Company changes
      if (this.contract.company === undefined) {
        this.contract.service = null
      }
    },
    setParameter: function() {
      this.getParameterByService = this.parametersInfo
        ? this.parametersInfo.filter(
            (range) => range.service['@id'] === this.contract.service
          )
        : []
    },
    async setParameterValues() {
      let paramterId = this.parameterItem.parameter
      if (paramterId !== undefined && paramterId !== null) {
        await this.fetchConfiguredParamters(paramterId)
        if (!_.isEmpty(this.getConfiguredParamters)) {
          let parametersInfo = this.getConfiguredParamters
          this.parameterItem.description = parametersInfo.description
          this.parameterItem.usage = parametersInfo.usage
          this.parameterItem.uom = parametersInfo.unitMeasurement
            ? parametersInfo.unitMeasurement['@id']
            : null
          this.parameterItem.category = parametersInfo.category
          this.configuredValidFrom = parametersInfo.validFrom
          this.configuredValidTo = parametersInfo.validThrough
          if (
            this.parameterItem.category !== undefined &&
            this.parameterItem.category !== null
          ) {
            this.toggleValueField()
          }
          this.validateContractParamDates()
        }
      }
    },
    toggleValueField: function() {
      if (this.parameterItem.category === 'FLG') {
        this.valueCheckBox = true
        this.paramValue = false
        this.priceList = false
        // this.parameterItem.value = ''
        // this.parameterItem.priceValue = null
      } else if (this.parameterItem.category === 'PRC') {
        this.priceList = true
        this.paramValue = false
        this.valueCheckBox = false
        // this.parameterItem.value = ''
        // this.parameterItem.valueCheckBox = 0
      } else {
        this.paramValue = true
        this.priceList = false
        this.valueCheckBox = false
        // this.parameterItem.priceValue = null
        // this.parameterItem.valueCheckBox = 0
      }
    },
    getSelectedNumberRange: function(service) {
      const serviceSelected = this.servicesInfo
        ? this.servicesInfo.filter((range) => range['@id'] === service)
        : []
      const numberRangeValue = _.get(
        serviceSelected[0],
        'internalNumberRange',
        ''
      )
      return this.getNumberRange
        ? this.getNumberRange.filter(
            (range) => range.numberRangeValue === numberRangeValue.toString()
          )
        : []
    },
    setContractOnLoad: function() {
      let contractInfo = _.cloneDeep(this.getSelectedContractItem[0])
      this.getCustomer = [contractInfo.customer]
      this.contract.customer = contractInfo.customer['@id']

      this.getPremise = [contractInfo.premise]
      this.contract.premise = contractInfo.premise['@id']
      this.contract.premiseAddress = this.getFullAddress(contractInfo.premise)

      if (contractInfo.customer.customerCategory === 'Organization') {
        this.contract.customerName = contractInfo.customer.organizationName
      } else {
        this.contract.customerName = contractInfo.customer.fullName
      }

      this.contract.contractNumber = contractInfo.contractNumber
      this.contract.company = contractInfo.company
        ? contractInfo.company['@id']
        : null
      this.setBranch()
      this.contract.service = contractInfo.service
        ? contractInfo.service['@id']
        : null
      this.contract.contractClass = contractInfo.contractClass
        ? contractInfo.contractClass
        : null
      this.contract.accountKey = contractInfo.accountKey
        ? contractInfo.accountKey
        : null

      this.contract.meterReadingCycle = contractInfo.meterReadingCycle
        ? contractInfo.meterReadingCycle
        : null
      this.contract.requestedActivationDate = contractInfo.requestedActivationDate
        ? contractInfo.requestedActivationDate.split('T')[0]
        : null
      this.contract.actualActivationDate = contractInfo.actualActivationDate
        ? contractInfo.actualActivationDate.split('T')[0]
        : null
      this.contract.activationDateInPreviousSystem = contractInfo.activationDateInPreviousSystem
        ? contractInfo.activationDateInPreviousSystem.split('T')[0]
        : null
      this.contract.requestedTerminationDate = contractInfo.requestedTerminationDate
        ? contractInfo.requestedTerminationDate.split('T')[0]
        : null
      this.contract.actualTerminationDate = contractInfo.actualTerminationDate
        ? contractInfo.actualTerminationDate.split('T')[0]
        : null
      this.contract.requestDate = contractInfo.requestDate
        ? contractInfo.requestDate.split('T')[0]
        : null
      this.contract.migrationReference = contractInfo.migrationReference
      this.contract.description = contractInfo.description
      this.contract.branch = contractInfo.branch ? contractInfo.branch : null
      this.contract.status = !_.isEmpty(contractInfo.objectStatuses)
        ? contractInfo.objectStatuses[0].systemStatus
        : null
      this.contract.objectStatus.id = !_.isEmpty(contractInfo.objectStatuses)
        ? contractInfo.objectStatuses[0]['@id']
        : null

      this.setParameter()
      this.toggleMRTab()
      this.fetchBillDocumentStatus(
        this.getSelectedContractItem[0]['@id'].slice(11)
      )
    },
    setContractBillingInfoOnLoad: function() {
      if (!_.isEmpty(this.getSelectedContractItem[0].contractBillings)) {
        let contractBillingInfo = _.cloneDeep(
          this.getSelectedContractItem[0].contractBillings[0]
        )
        // this.contract.billingDialogInfo.billingValidationRule = contractBillingInfo.billingValidationRule
        //   ? contractBillingInfo.billingValidationRule
        //   : ''
        this.contract.billingDialogInfo.billForm = contractBillingInfo.billForm
          ? contractBillingInfo.billForm
          : ''
        this.contract.billingDialogInfo.consolidatedBillPrint = contractBillingInfo.consolidatedBillPrint
          ? Boolean(Number(contractBillingInfo.consolidatedBillPrint))
          : 0
        this.contract.billingDialogInfo.billingCurrency = contractBillingInfo.billingCurrency
          ? contractBillingInfo.billingCurrency
          : ''
        this.contract.contractBillings = JSON.parse(
          JSON.stringify(this.getSelectedContractItem[0].contractBillings)
        )
      }
    },
    setProcessLocksOnLoad: function() {
      let self = this
      _.forEach(this.getSelectedContractItem[0].processLocks, function(
        prValue,
        prKey
      ) {
        if (prValue.processType === 'BIL') {
          self.contract.prLocks.id = prValue['@id']
          self.contract.prLocks.lockReason = prValue.lockReason
            ? prValue.lockReason
            : ''
          self.contract.prLocks.plValidFrom = prValue.plValidFrom
            ? prValue.plValidFrom.split('T')[0]
            : null
          self.contract.prLocks.plValidTo = prValue.plValidTo
            ? prValue.plValidTo.split('T')[0]
            : null

          self.contract.prLocks.objectNumber = prValue.objectNumber
            ? prValue.objectNumber
            : ''
          self.contract.prLocks.objectType = prValue.objectType
            ? prValue.objectType
            : ''
          self.contract.prLocks.processType = prValue.processType
            ? prValue.processType
            : ''
          self.contract.prLocks.removed = prValue.removed
            ? prValue.removed
            : null
        }
      })
    },
    setContractMeterReadingOnLoad: function() {
      let self = this
      _.forEach(this.getSelectedContractItem[0].processLocks, function(
        mrValue,
        mrKey
      ) {
        if (mrValue.processType === 'MTR') {
          self.contract.meterReading.id = mrValue['@id']
          self.contract.meterReading.lockReason = mrValue.lockReason
            ? mrValue.lockReason
            : ''
          self.contract.meterReading.mrValidFrom = mrValue.plValidFrom
            ? mrValue.plValidFrom.split('T')[0]
            : null
          self.contract.meterReading.mrValidTo = mrValue.plValidTo
            ? mrValue.plValidTo.split('T')[0]
            : null

          self.contract.meterReading.objectNumber = mrValue.objectNumber
            ? mrValue.objectNumber
            : ''
          self.contract.meterReading.objectType = mrValue.objectType
            ? mrValue.objectType
            : ''
          self.contract.meterReading.processType = mrValue.processType
            ? mrValue.processType
            : ''
          self.contract.meterReading.removed = mrValue.removed
            ? mrValue.removed
            : null
        } else {
          self.contract.meterReading.lockReason = ''
        }
      })
    },
    setContractParametersOnLoad: function() {
      this.contract.contractParameters = JSON.parse(
        JSON.stringify(this.getSelectedContractItem[0].contractParameters)
      )
    },
    changeService: function(service) {
      if (this.getAction === 'new') {
        let numberRangeAssignment = this.getNumberRangeAssignmentInfo.filter(
          (value, key) => {
            return (
              value.serviceKey['@id'] === this.contract.service &&
              value.companyKey['@id'] === this.contract.company
            )
          }
        )
        if (service === '' || service === undefined) {
          this.contract.contractNumber = ''
          this.disableContractNumber = true
        } else {
          if (
            numberRangeAssignment[0] &&
            numberRangeAssignment[0].numberRange.externalIndicator === true
          ) {
            this.contract.contractNumber =
              this.getAction === 'copy' ? this.contract.contractNumber : ''
            this.disableContractNumber = false
            this.contract.contractNumber = ''
          } else {
            this.contract.contractNumber = 'INTERNAL'
            this.disableContractNumber = true
          }
        }
      }

      if (service !== '' && service !== undefined && service !== null) {
        this.setParameter()
        this.toggleMRTab()
        this.disableFormFields()
      } else {
        this.getParameterByService = []
      }
    },
    toggleMRTab: function() {
      for (var i = 0; i < this.getServiceByCompany.length; i++) {
        if (this.getServiceByCompany[i]['@id'] === this.contract.service) {
          this.selectedService = this.getServiceByCompany[i].code
        }
      }
      if (this.selectedService === 'ELE' || this.selectedService === 'WTR') {
        this.showMRTab = true
      } else if (
        this.selectedService === 'MGT' ||
        this.selectedService === 'CPR'
      ) {
        this.showMRTab = false
      }
      if (this.getAction !== 'new') this.hideReveseButtonForMetered()
    },
    setContractDataBeforeSubmit: function() {
      const contract = JSON.parse(JSON.stringify(this.contract))

      _.forEach(contract.contractBillings, function(pcValue, pcKey) {
        pcValue.productCategory = pcValue.productCategory
          ? pcValue.productCategory['@id']
          : null
        contract.contractBillings[pcKey] = pcValue
      })

      _.forEach(contract.contractBillings, function(pdValue, pdKey) {
        pdValue.product = pdValue.product ? pdValue.product['@id'] : null
        contract.contractBillings[pdKey] = pdValue
      })

      _.forEach(contract.contractParameters, function(paramValue, paramKey) {
        paramValue.parameter = paramValue.parameter
          ? paramValue.parameter['@id']
          : null
        contract.contractParameters[paramKey] = paramValue
      })

      _.forEach(contract.contractBillings, function(val, key) {
        // contract.contractBillings[key].billingValidationRule =
        //   contract.billingDialogInfo.billingValidationRule
        contract.contractBillings[key].billForm =
          contract.billingDialogInfo.billForm
        contract.contractBillings[key].consolidatedBillPrint = Boolean(
          Number(contract.billingDialogInfo.consolidatedBillPrint)
        )
        contract.contractBillings[key].billingCurrency =
          contract.billingDialogInfo.billingCurrency
      })

      // Used in both NEW / UPDATE & No need to assign dates separately.
      if (contract.prLocks.lockReason !== '') {
        contract.prLocks.removed = null
        contract.prLocks.objectNumber = this.contract.contractNumber
        contract.processLocks.push(contract.prLocks)
      }

      if (
        contract.prLocks.id !== null &&
        this.getAction === 'update' &&
        contract.prLocks.lockReason === '' &&
        contract.prLocks.processType === 'BIL'
      ) {
        contract.prLocks.id = this.contract.prLocks.id
        contract.prLocks.objectType = this.contract.prLocks.objectType
        contract.prLocks.objectNumber = this.contract.contractNumber
        contract.prLocks.processType = this.contract.prLocks.processType
        contract.prLocks.lockReason = ''
        contract.prLocks.plValidFrom = null
        contract.prLocks.plValidTo = null
        contract.prLocks.removed = 'X'
        contract.processLocks.push(contract.prLocks)
      }

      // Meter reading will be there only for ELE & WTR Services.
      if (this.selectedService === 'ELE' || this.selectedService === 'WTR') {
        // Used in both NEW / UPDATE.
        if (contract.meterReading.lockReason !== '') {
          contract.meterReading.removed = null
          contract.meterReading.plValidFrom = contract.meterReading.mrValidFrom
          contract.meterReading.plValidTo = contract.meterReading.mrValidTo
          contract.meterReading.objectNumber = this.contract.contractNumber
          contract.processLocks.push(contract.meterReading)
        }
        if (
          contract.meterReading.id !== null &&
          this.getAction === 'update' &&
          contract.meterReading.lockReason === '' &&
          contract.meterReading.processType === 'MTR'
        ) {
          contract.meterReading.id = this.contract.meterReading.id
          contract.meterReading.objectType = this.contract.meterReading.objectType
          contract.meterReading.objectNumber = this.contract.contractNumber
          contract.meterReading.processType = this.contract.meterReading.processType
          contract.meterReading.lockReason = ''
          contract.meterReading.plValidFrom = null
          contract.meterReading.plValidTo = null
          contract.meterReading.removed = 'X'
          contract.processLocks.push(contract.meterReading)
        }
      }

      contract.customer = this.contract.customer || null
      contract.premise = this.contract.premise || null

      contract.service = this.contract.service
        ? _.isObject(this.contract.service)
          ? this.contract.service['@id']
          : this.contract.service
        : null

      contract.objectStatus.systemStatus = contract.status
      contract.objectStatus.objectNumber = this.contract.contractNumber

      if (this.getAction === 'new') {
        contract.objectStatuses.push(contract.objectStatus)
      }

      if (
        (this.getAction === 'update' || this.getAction === 'view') &&
        this.getSelectedContractItem[0].objectStatuses[0].systemStatus !==
          this.contract.status
      ) {
        let changeNumber =
          parseInt(
            this.getSelectedContractItem[0].objectStatuses[0].changeNumber,
            10
          ) + 1
        changeNumber = ('0000' + changeNumber).substr(-3)
        contract.objectStatus.changeNumber = changeNumber
        contract.objectStatus.id = this.getSelectedContractItem[0].objectStatuses[0][
          '@id'
        ]
        contract.objectStatuses.push(contract.objectStatus)
      } else if (
        (this.getAction === 'update' || this.getAction === 'view') &&
        this.getSelectedContractItem[0].objectStatuses[0].systemStatus ===
          this.contract.status
      ) {
        contract.objectStatuses.push(contract.objectStatus)
      }
      delete contract.prLocks
      delete contract.meterReading
      delete contract.billingDialogInfo

      if (this.contract.status === 'REV') {
        this.hideReveseBtn = false
      } else {
        this.hideReveseBtn = true
      }
      return contract
    },
    validateBeforeSubmit: function(scope) {
      this.generalTab = ''
      this.billingTab = ''
      this.meterReadingTab = ''
      this.billDocumentTab = ''

      /* ---- GENERAL TAB TAB VALIDATION ---- */
      if (
        this.contract.customer === '' ||
        this.contract.description === '' ||
        this.contract.service === null ||
        this.contract.requestedActivationDate === null ||
        this.contract.meterReadingCycle === null ||
        this.contract.accountKey === null
      ) {
        this.generalTab = 'red--text'
      }
      /* ---- END GENERAL TAB TAB VALIDATION ---- */

      /* ---- BILL DOCUMENTS TAB VALIDATION ---- */
      if (this.contract.billingDialogInfo.billingCurrency === '') {
        this.billingTab = 'red--text'
      }
      /* ---- END BILL DOCUMENTS TAB VALIDATION ---- */
      if (
        this.contract.requestDate === null ||
        this.contract.requestDate === '' ||
        this.contract.requestDate === undefined
      ) {
        this.contract.requestDate = null
      }
      this.loading = true
      this.$validator.validateAll(scope).then((result) => {
        if (result) {
          if (this.contract.contractBillings.length === 0) {
            this.billingTab = 'red--text'
            this.productBtn = 'red'
            let msg = {
              text: this.$t('message.noProducts'),
              type: 'error',
              display: true,
            }
            this.msgNotification(msg)
            return false
          }
          if (
            this.contract.requestedTerminationDate <
            this.contract.actualActivationDate
          ) {
            let msg = {
              text: this.$t('message.errorReqTerminationDate'),
              type: 'error',
              display: true,
            }
            this.msgNotification(msg)
            return false
          }
          if (this.getAction === 'new') {
            this.addNew()
          } else if (this.getAction === 'update') {
            // if (
            //   _.isEqual(
            //     this.contract.accountKey,
            //     this.getSelectedContractItem[0].accountKey
            //   ) &&
            //   _.isEqual(
            //     this.contract.contractBillings,
            //     this.getSelectedContractItem[0].contractBillings
            //   ) &&
            //   _.isEqual(
            //     this.contract.branch,
            //     this.getSelectedContractItem[0].branch
            //   ) &&
            //   _.isEqual(
            //     this.contract.contractClass,
            //     this.getSelectedContractItem[0].contractClass
            //   ) &&
            //   _.isEqual(
            //     this.contract.migrationReference,
            //     this.getSelectedContractItem[0].migrationReference
            //   ) &&
            //   _.isEqual(
            //     this.contract.description,
            //     this.getSelectedContractItem[0].description
            //   ) &&
            //   _.isEqual(
            //     this.contract.meterReadingCycle,
            //     this.getSelectedContractItem[0].meterReadingCycle
            //   ) &&
            //   _.isEqual(
            //     this.contract.activationDateInPreviousSystem,
            //     this.getSelectedContractItem[0].activationDateInPreviousSystem
            //   ) &&
            //   _.isEqual(
            //     this.contract.contractParameters,
            //     this.getSelectedContractItem[0].contractParameters
            //   )
            // ) {
            //   let msg = {
            //     text: this.$t('message.noChange'),
            //     type: 'success',
            //     display: true,
            //   }
            //   this.msgNotification(msg)
            //   this.updateActionState('view').then(
            //     this.$router.push({
            //       path: 'view',
            //     })
            //   )
            // } else {
            this.updateData()
            // }
          }
        } else {
          this.loading = false
        }
      })
    },
    /* -------- Parameter Tab actions -------- */
    /* -------- Contract BillingInfo Tab actions END -------- */
    addProductInfo() {
      this.formTitle = i18n.t('title.addProduct')
      this.disablePopView = false
      this.billingDialog = true
      this.hideSaveBtn = true

      // If at least one product is there enable valid from, valid to for input.
      if (this.contract.contractBillings.length !== 0) {
        this.disableBillingValidFrom = false

        // Add 1 day to the New Valid from date
        let dateInfo = moment(
          this.contract.contractBillings[
            Object.keys(this.contract.contractBillings).length - 1
          ].billingValidFrom
        ).format('YYYY-MM-DD')
        let addOneDay = moment(dateInfo).add(1, 'day')
        let dateObj = new Date(addOneDay)
        let momentObj = moment(dateObj)
        this.billingDialogItem.billingValidFrom = this.billingValidFromCondition = momentObj.format(
          'YYYY-MM-DD'
        )
      } else {
        this.billingDialogItem.billingValidFrom = this.contract.requestedActivationDate
      }
      this.billingDialogItem.billingValidTo = new Date(9999, 11, 32)
        .toISOString()
        .split('T')[0]
    },
    editBillingInfo(item) {
      this.formTitle = i18n.t('title.editProduct')
      this.disableBillingValidFrom = true
      this.hideSaveBtn = true
      this.disablePopView = false
      this.billingDialogIndex = this.contract.contractBillings.indexOf(item)
      let itemCopy = Object.assign({}, item)
      itemCopy.billingValidFrom = itemCopy.billingValidFrom
        ? itemCopy.billingValidFrom.split('T')[0]
        : null
      itemCopy.billingValidTo = itemCopy.billingValidTo
        ? itemCopy.billingValidTo.split('T')[0]
        : null
      this.billingDialogItem = itemCopy
      this.setProduct()
      this.billingDialog = true
    },
    viewBillingInfo(item) {
      this.formTitle = i18n.t('title.viewProduct')
      this.hideSaveBtn = false
      this.disableBillingValidFrom = true
      this.disablePopView = true
      this.billingDialogIndex = this.contract.contractBillings.indexOf(item)
      let itemCopy = Object.assign({}, item)
      itemCopy.billingValidFrom = itemCopy.billingValidFrom
        ? itemCopy.billingValidFrom.split('T')[0]
        : null
      itemCopy.billingValidTo = itemCopy.billingValidTo
        ? itemCopy.billingValidTo.split('T')[0]
        : null
      this.billingDialogItem = itemCopy
      this.setProduct()
      this.billingDialog = true
    },
    closeBillingInfo() {
      this.billingDialog = false
      this.billingDialogItem = Object.assign({}, this.defaultDialogItem)
      this.billingDialogIndex = -1
    },
    saveBillingInfo() {
      this.$validator.validateAll('billingForm').then((result) => {
        if (result) {
          this.productBtn = 'primary'
          if (this.billingDialogIndex > -1) {
            // Edit existing record
            this.billingDialogItem.productCategory = this.billingDialogItem
              .productCategory
              ? !_.isObject(this.billingDialogItem.productCategory)
                ? _.filter(this.productCategoryInfo, [
                    '@id',
                    this.billingDialogItem.productCategory,
                  ])[0]
                : this.billingDialogItem.productCategory
              : null

            this.billingDialogItem.product = this.billingDialogItem.product
              ? !_.isObject(this.billingDialogItem.product)
                ? _.filter(this.getProductGroupsInfo, [
                    '@id',
                    this.billingDialogItem.product,
                  ])[0]
                : this.billingDialogItem.product
              : null

            let dataChanged = true
            let previousFromDate = moment(
              this.contract.contractBillings[
                Object.keys(this.contract.contractBillings).length - 1
              ].billingValidFrom
            ).format('YYYY-MM-DD')
            let previousToDate = moment(
              this.contract.contractBillings[
                Object.keys(this.contract.contractBillings).length - 1
              ].billingValidTo
            ).format('YYYY-MM-DD')
            if (
              previousFromDate === this.billingDialogItem.billingValidFrom &&
              this.billingDialogItem.productCategory['@id'] ===
                this.contract.contractBillings[
                  Object.keys(this.contract.contractBillings).length - 1
                ].productCategory['@id'] &&
              this.billingDialogItem.product['@id'] ===
                this.contract.contractBillings[
                  Object.keys(this.contract.contractBillings).length - 1
                ].product['@id'] &&
              previousToDate === this.billingDialogItem.billingValidTo
            ) {
              dataChanged = false
              this.closeBillingInfo()
            }
            if (dataChanged) {
              if (
                previousFromDate === this.billingDialogItem.billingValidFrom &&
                this.billingDialogItem.productCategory['@id'] ===
                  this.contract.contractBillings[
                    Object.keys(this.contract.contractBillings).length - 1
                  ].productCategory['@id'] &&
                this.billingDialogItem.product['@id'] ===
                  this.contract.contractBillings[
                    Object.keys(this.contract.contractBillings).length - 1
                  ].product['@id']
              ) {
                this.billingAlert = true
                let self = this
                setTimeout(function() {
                  self.billingAlert = false
                }, 3000)
              } else {
                Object.assign(
                  this.contract.contractBillings[this.billingDialogIndex],
                  this.billingDialogItem
                )
                this.closeBillingInfo()
              }
            }
          } else {
            // Save new record
            let emptyForm = this.isEmptyObject(this.billingDialogItem)
            if (!emptyForm) {
              this.billingDialogItem.productCategory = this.billingDialogItem
                .productCategory
                ? !_.isObject(this.billingDialogItem.productCategory)
                  ? _.filter(this.productCategoryInfo, [
                      '@id',
                      this.billingDialogItem.productCategory,
                    ])[0]
                  : this.billingDialogItem.productCategory
                : null

              this.billingDialogItem.product = this.billingDialogItem.product
                ? !_.isObject(this.billingDialogItem.product)
                  ? _.filter(this.getProductGroupsInfo, [
                      '@id',
                      this.billingDialogItem.product,
                    ])[0]
                  : this.billingDialogItem.product
                : null

              let checkEmpty = this.isEmptyObject(
                this.contract.contractBillings
              )
              if (checkEmpty) {
                this.contract.contractBillings.push(this.billingDialogItem)
                this.closeBillingInfo()
              } else {
                let previousDate = moment(
                  this.contract.contractBillings[
                    Object.keys(this.contract.contractBillings).length - 1
                  ].billingValidFrom
                ).format('YYYY-MM-DD')
                if (
                  previousDate === this.billingDialogItem.billingValidFrom &&
                  this.billingDialogItem.productCategory['@id'] ===
                    this.contract.contractBillings[
                      Object.keys(this.contract.contractBillings).length - 1
                    ].productCategory['@id'] &&
                  this.billingDialogItem.product['@id'] ===
                    this.contract.contractBillings[
                      Object.keys(this.contract.contractBillings).length - 1
                    ].product['@id']
                ) {
                  this.billingAlert = true
                  let self = this
                  setTimeout(function() {
                    self.billingAlert = false
                  }, 3000)
                } else {
                  // Previous Billing ValidFrom = (Active Billing - 1 day)
                  let subtractOneDay = moment(
                    this.billingDialogItem.billingValidFrom
                  ).subtract(1, 'day')
                  let dateObj = new Date(subtractOneDay)
                  let momentObj = moment(dateObj)
                  this.contract.contractBillings[
                    Object.keys(this.contract.contractBillings).length - 1
                  ].billingValidTo = momentObj.format('YYYY-MM-DD')
                  this.contract.contractBillings.push(this.billingDialogItem)
                  this.closeBillingInfo()
                }
              }
            }
          }
        } else {
          this.loading = false
        }
      })
    },
    deleteBillingInfo(item) {
      if (this.contract.contractBillings.length === 1) {
        let msg = {
          text: this.$t('message.deleteNotAllowed'),
          type: 'error',
          display: true,
        }
        this.msgNotification(msg)
        return false
      }
      const index = this.contract.contractBillings.indexOf(item)
      this.contract.contractBillings.splice(index, 1)
      const delPO = [...this.contract.contractBillings]
      this.contract.contractBillings = undefined
      this.contract.contractBillings = delPO
      this.$forceUpdate()

      if (this.contract.contractBillings.length === 0) {
        this.productBtn = 'red'
        let msg = {
          text: this.$t('message.noProducts'),
          type: 'error',
          display: true,
        }
        this.msgNotification(msg)
      }
    },
    /* -------- Contract BillingInfo Tab actions END -------- */

    /* -------- Contract Parameter Tab actions END -------- */
    addParameter() {
      this.parameterTitle = i18n.t('title.addParameter')
      this.disablePopView = false
      this.hideSaveBtn = true

      this.parameterItem.parameter = ''
      this.parameterItem.category = ''
      this.parameterItem.value = ''
      this.parameterItem.description = ''
      this.parameterItem.usage = ''
      this.parameterItem.uom = ''
      this.parameterItem.priceValue = ''
      this.parameterItem.valueCheckBox = ''
      this.parameterItem.parameterValidFrom = ''
      this.parameterItem.parameterValidTo = ''

      this.parameterDialog = true
    },
    editParameter(item) {
      this.parameterTitle = i18n.t('title.editParameter')
      document.querySelector('input[name=parameterValidFrom]').style.border =
        'none'
      this.hideSaveBtn = true
      this.disablePopView = false
      this.parameterIndex = this.contract.contractParameters.indexOf(item)
      this.parameterItem.parameter = item.parameter
        ? item.parameter['@id']
        : null
      this.parameterItem.category = item.parameter
        ? item.parameter.category
        : null
      this.parameterItem.value = item.parameter ? item.value : null
      this.parameterItem.description = item.parameter
        ? item.parameter.description
        : null
      this.parameterItem.usage = item.parameter ? item.parameter.usage : null
      this.parameterItem.uom = item.parameter.unitMeasurement
        ? item.parameter.unitMeasurement['@id']
        : null
      this.parameterItem.parameterValidTo = item.parameterValidTo
        ? item.parameterValidTo.split('T')[0]
        : null
      this.parameterItem.parameterValidFrom = item.parameterValidFrom
        ? item.parameterValidFrom.split('T')[0]
        : null
      this.setParameterValues()
      this.toggleValueField()
      if (item.parameter.category === 'FLG') {
        this.parameterItem.valueCheckBox = item.value
      } else if (item.parameter.category === 'PRC') {
        this.parameterItem.priceValue = item.value
      } else {
        this.parameterItem.value = item.value
      }
      this.parameterDialog = true
    },
    viewParameter(item) {
      this.parameterTitle = i18n.t('title.viewParameter')
      this.hideSaveBtn = false
      this.disablePopView = true
      this.parameterIndex = this.contract.contractParameters.indexOf(item)
      this.parameterItem.parameter = item.parameter
        ? item.parameter['@id']
        : null
      this.parameterItem.category = item.parameter
        ? item.parameter.category
        : null
      // this.parameterItem.value = item.parameter ? item.value : null
      this.parameterItem.description = item.parameter
        ? item.parameter.description
        : null
      this.parameterItem.usage = item.parameter ? item.parameter.usage : null
      this.parameterItem.uom = item.parameter.unitMeasurement
        ? item.parameter.unitMeasurement['@id']
        : null
      this.parameterItem.parameterValidTo = item.parameterValidTo
        ? item.parameterValidTo.split('T')[0]
        : null
      this.parameterItem.parameterValidFrom = item.parameterValidFrom
        ? item.parameterValidFrom.split('T')[0]
        : null
      this.setParameterValues()
      this.toggleValueField()

      if (item.parameter.category === 'FLG') {
        this.parameterItem.valueCheckBox = item.value
      } else if (item.parameter.category === 'PRC') {
        this.parameterItem.priceValue = item.value
      } else {
        this.parameterItem.value = item.value
      }
      this.parameterDialog = true
    },
    closeParameter() {
      this.parameterDialog = false
      this.parameterItem = Object.assign({}, this.parameterItem)
      this.parameterIndex = -1
    },
    validateContractParamDates() {
      this.minValidFrom = this.configuredValidFrom
        ? this.configuredValidFrom.split('T')[0]
        : null
      this.maxValidTo = this.configuredValidTo
    },
    saveParameter() {
      this.$validator.validateAll('parameterForm').then((result) => {
        /* ########## Compare Parameter valid from with Requested Activation Date. ########## */
        if (
          this.parameterItem.parameterValidFrom !== '' &&
          this.parameterItem.parameterValidFrom <
            this.contract.requestedActivationDate
        ) {
          this.parameterAlert = true
          document.querySelector(
            'input[name=parameterValidFrom]'
          ).style.border = 'dashed #FF0000'
          let self = this
          setTimeout(function() {
            self.parameterAlert = false
          }, 3000)
          this.validateReqActDate = false
        } else {
          document.querySelector(
            'input[name=parameterValidFrom]'
          ).style.border = 'none'
          this.validateReqActDate = true
        }
        // ########## END. ########## */

        /* ########## Compare Parameter valid from with Parameter valid to. ########## */
        if (
          this.parameterItem.parameterValidTo <
          this.parameterItem.parameterValidFrom
        ) {
          this.parameterAlert = true
          let self = this
          setTimeout(function() {
            self.parameterAlert = false
          }, 3000)
          this.validateReqActDate = false
        }
        // ########## END. ########## */

        if (result && this.validateReqActDate) {
          if (this.parameterIndex > -1) {
            // Edit existing record
            this.parameterItem.uom = this.parameterItem.uom
              ? !_.isObject(this.parameterItem.uom)
                ? _.filter(this.getUnitMeasurement, [
                    '@id',
                    this.parameterItem.uom,
                  ])[0]
                : this.parameterItem.uom
              : null
            this.parameterItem.parameter = this.parameterItem.parameter
              ? !_.isObject(this.parameterItem.parameter)
                ? _.filter(this.parametersInfo, [
                    '@id',
                    this.parameterItem.parameter,
                  ])[0]
                : this.parameterItem.parameter
              : null

            if (this.parameterItem.category === 'FLG') {
              this.parameterItem.value = this.parameterItem.valueCheckBox
                ? this.parameterItem.valueCheckBox.toString()
                : ''
            } else if (this.parameterItem.category === 'PRC') {
              this.parameterItem.value = this.parameterItem.priceValue
                ? this.parameterItem.priceValue
                : null
            } else {
              this.parameterItem.value = this.parameterItem.value
            }
            // Check if data exisits
            let self = this
            let filteredData = _.filter(
              self.contract.contractParameters,
              function(duplicateValue) {
                return (
                  duplicateValue.parameterValidFrom.split('T')[0] ===
                    self.parameterItem.parameterValidFrom &&
                  duplicateValue.parameterValidTo.split('T')[0] ===
                    self.parameterItem.parameterValidTo &&
                  duplicateValue.parameter['@id'] ===
                    self.parameterItem.parameter['@id']
                )
              }
            )
            if (filteredData.length !== 0) {
              let msg = {
                text: this.$t('message.recordExisted'),
                type: 'error',
                display: true,
              }
              this.msgNotification(msg)
            } else {
              this.contract.contractParameters[
                this.parameterIndex
              ] = this.parameterItem
              const clonePO = [...this.contract.contractParameters]
              this.contract.contractParameters = undefined
              this.contract.contractParameters = clonePO
            }
          } else {
            let validateParameter = _.every(
              _.omit(this.parameterItem, [
                'parameterValidFrom',
                'parameterValidTo',
              ]),
              _.isEmpty
            )
            if (!validateParameter) {
              // Save new record
              let emptyForm = this.isEmptyObject(this.parameterItem)
              if (!emptyForm) {
                this.parameterItem.uom = this.parameterItem.uom
                  ? _.filter(this.getUnitMeasurement, [
                      '@id',
                      this.parameterItem.uom,
                    ])[0]
                  : null
                this.parameterItem.parameter = this.parameterItem.parameter
                  ? _.filter(this.parametersInfo, [
                      '@id',
                      this.parameterItem.parameter,
                    ])[0]
                  : null

                if (this.parameterItem.category === 'FLG') {
                  this.parameterItem.value = this.parameterItem.valueCheckBox
                    ? this.parameterItem.valueCheckBox.toString()
                    : ''
                } else if (this.parameterItem.category === 'PRC') {
                  this.parameterItem.value = this.parameterItem.priceValue
                    ? this.parameterItem.priceValue
                    : null
                } else {
                  this.parameterItem.value = this.parameterItem.value
                }
                const newPO = [...this.contract.contractParameters]
                this.contract.contractParameters = undefined
                if (newPO.length !== 0) {
                  // Check if data exisits
                  let self = this
                  let filteredData = _.filter(newPO, function(duplicateValue) {
                    return (
                      duplicateValue.parameterValidFrom.split('T')[0] ===
                        self.parameterItem.parameterValidFrom &&
                      duplicateValue.parameterValidTo.split('T')[0] ===
                        self.parameterItem.parameterValidTo &&
                      duplicateValue.parameter['@id'] ===
                        self.parameterItem.parameter['@id']
                    )
                  })

                  if (filteredData.length !== 0) {
                    let msg = {
                      text: this.$t('message.recordExisted'),
                      type: 'error',
                      display: true,
                    }
                    this.msgNotification(msg)
                  } else {
                    newPO.push(this.parameterItem)
                  }
                } else {
                  // if no data existis push the new data
                  newPO.push(this.parameterItem)
                }
                this.contract.contractParameters = newPO
              }
            }
          }
          this.closeParameter()
        }
      })
    },

    deleteParameter(item) {
      const index = this.contract.contractParameters.indexOf(item)
      this.contract.contractParameters.splice(index, 1)
      const delPO = [...this.contract.contractParameters]
      this.contract.contractParameters = undefined
      this.contract.contractParameters = delPO
      this.$forceUpdate()
    },
    /* -------- Contract Parameter Tab actions END -------- */

    /* -------- Validates the empty object -------- */
    isEmptyObject(contractObject) {
      for (var key in contractObject) {
        if (contractObject[key] !== null && contractObject[key] !== '')
          return false
      }
      return true
    },
    /* -------- Parameter Tab actions end -------- */

    /* -------- BILL DOCUMENT Tab actions -------- */
    viewbillDocumentItem(item) {
      this.billDocumentFormTitle = i18n.t('title.viewBillDocument')
      this.hideSaveBtn = false
      this.disablePopView = true
      this.billDocumentIndex = this.contract.billDocuments.indexOf(item)
      let itemCopy = Object.assign({}, item)
      itemCopy.billingType = itemCopy.billingType
        ? itemCopy.billingType.split('T')[0]
        : null
      itemCopy.billDocument = itemCopy.billingType
        ? itemCopy.billingType.split('T')[0]
        : null
      this.billDocumentItem = itemCopy
      this.billDocumentDialog = true
    },
    billDocumentClose() {
      this.$validator.reset()
      this.billDocumentDialog = false
      this.billDocumentItem = Object.assign({}, this.billDocumentDefaultItem)
      this.billDocumentIndex = -1
    },
    /* -------- BILL DOCUMENT Tab end -------- */

    // Get the Meter readings of the  CONTRACT.
    async getMeterReadingData() {
      if (this.getAction !== 'new') {
        let params = {
          contract: this.getSelectedContractItem[0]['@id'].slice(11),
          'order[meterReadingDate]': 'desc',
          'objectStatuses.systemStatus': ['02', '03', '04', '05', '06'],
          'objectStatuses.objectType': 'MRR',
        }
        await this.getMeterReading(params)
        // Get device types.
        this.deviceTypes = Object.assign(
          {},
          ...this.deviceTypeInfo.map((item) => ({
            [item['@id']]: item.code,
          }))
        )
        // Get meter reading types.
        this.meterReadingTypes = Object.assign(
          {},
          ...this.getMeterReadingTypeInfo.map((item) => ({
            [item['@id']]: item.type,
          }))
        )
        this.meterReadingItems = this.getMeterReadingList
      }
    },
    // Get the Bill Documents of the CONTRACT.
    async getBillDocumentData() {
      this.billDocumentItems = []
      if (this.getAction !== 'new') {
        let params = {
          contract: this.getSelectedContractItem[0]['@id'].slice(11),
        }
        await this.fetchBillDocuments(params)
        this.billDocumentItems = this.getBillDocumentsList.data
      }
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
