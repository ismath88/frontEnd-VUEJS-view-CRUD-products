import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import app from './modules/app'
import billingExecution from './modules/billingExecution'
import idtype from './modules/idtype'
import martialstatus from './modules/martialstatus'
import region from './modules/region'
import nationality from './modules/nationality'
import nameformat from './modules/nameformat'
import chartofaccount from './modules/chartofaccount'
import currency from './modules/currency'
import costcentercategory from './modules/costcentercategory'
import country from './modules/country'
import discount from './modules/discount'
import holidaycalender from './modules/holidaycalender'
import ccAccountCategory from './modules/account-category'
import salutation from './modules/salutation'
import accountGroup from './modules/accountgroup'
import centralSystemSetting from './modules/centralSystemSetting'
import transactiontype from './modules/transactiontype'
import calendar from './modules/calendar'
import measurement from './modules/measurement'
import reversalReason from './modules/reversalreason'
import taxcode from './modules/taxcode'
import paymentterm from './modules/paymentterm'
import exchangerate from './modules/exchangerate'
import numberRange from './modules/numberrange'
import documentType from './modules/documenttype'
import premisecategory from './modules/premisecategory'
import premisetype from './modules/premisetype'
import company from './modules/company'
import chargeCode from './modules/chargecode'
import customer from './modules/customer'
import contract from './modules/contract'
import registertype from './modules/registertype'
import defaultDocumentType from './modules/defaultdocumenttype'
import customerNumberRange from './modules/customernumberrange'
import postingLock from './modules/postinglock'
import fiscalYear from './modules/fiscalyear'
import billingReversalReason from './modules/billingreversalreason'
import premiseNumberRange from './modules/premisenumberrange'
import customerCarenumberRange from './modules/customerCarenumberRange'
import meterReadingLock from './modules/meterReadingLock'
import meterReadingType from './modules/meterReadingType'
import postingPeriod from './modules/postingperiod'
import service from './modules/service'
import costCenter from './modules/costCenter'
import contractAccountKey from './modules/contractAccountKey'
import warehouse from './modules/warehouse'
import meterReadingNumberRange from './modules/meterReadingNumberRange'
import premise from './modules/premise'
import roundingRules from './modules/roundingRules'
import billingPrintNumberRange from './modules/billingprintnumberrange'
import billingDocnumberRange from './modules/billingdocnumberrange'
import billingLock from './modules/billinglock'
import branch from './modules/branch'
import generalLedger from './modules/generalLedger'
import numberRangeAssignment from './modules/numberRangeAssignment'
import serialNoNumberRange from './modules/serialNoNumberRange'
import billingDocType from './modules/billingdocumenttype'
import device from './modules/device'
import billingUnit from './modules/billingUnit'
import contractClass from './modules/contractClass'
import auth from './modules/auth'
import registerGroup from './modules/registerGroup'
import jobMonitoring from './modules/jobMonitoring'
import lineItemType from './modules/lineItemType'
import deviceType from './modules/deviceType'
import meterReadingCycle from './modules/meterReadingCycle'
import accountDetermination from './modules/accountdetermination'
import ratestrucfunction from './modules/ratestrucfunction'
import rateStructureParameter from './modules/rateStructureParameter'
import rate from './modules/rate'
import productCategory from './modules/productCategory'
import correspondence from './modules/correspondence'
import deviceActivity from './modules/deviceactivity'
import billingCorrespondence from './modules/billingcorrespondence'
import price from './modules/price'
import user from './modules/user'
import paymentMethod from './modules/paymentMethod'
import returnReasons from './modules/returnReasons'
import product from './modules/product'
import allocationRule from './modules/allocationRule'
import posting from './modules/posting'
import meterReading from './modules/meterReading'
import accountBalance from './modules/account-balance'
import payment from './modules/payment'
import massProcesses from './modules/massProcesses'
import billPrint from './modules/billPrint'
import customerBillingReport from './modules/customerBillingReport'
import centralDateConfig from './modules/centralDateConfig'
import customerAgingReport from './modules/customerAgingReport'
import preferredContactMethod from './modules/preferredContactMethod'
import relationshipType from './modules/relationshipType'
import socialMediaType from './modules/socialMediaType'
import industryType from './modules/industryType'
import manufacturer from './modules/manufacturer'
import warrantyType from './modules/warrantyType'
import advancedMeteringSystem from './modules/advancedMeteringSystem'
import supplyGuaranteeReason from './modules/supplyGuaranteeReason'
import premiseGroupingType from './modules/premiseGroupingType'
import meterReadingValidation from './modules/meterReadingValidation'
import clearingRule from './modules/clearingRule'
import clearingreversalreason from './modules/clearingreversalreason'
import clearingMethod from './modules/clearingMethod'
import clearing from './modules/clearing'
import meterReadingReport from './modules/meterReadingReport'
import customerBalanceReport from './modules/customerBalanceReport'
import SecureLS from 'secure-ls'

Vue.use(Vuex)

let ls = new SecureLS({ isCompression: false })

export default new Vuex.Store({
  modules: {
    accountBalance,
    accountDetermination,
    accountGroup,
    advancedMeteringSystem,
    allocationRule,
    app,
    auth,
    billingCorrespondence,
    billingDocnumberRange,
    billingDocType,
    billingExecution,
    billingLock,
    billingPrintNumberRange,
    billingReversalReason,
    billingUnit,
    billPrint,
    branch,
    calendar,
    ccAccountCategory,
    centralDateConfig,
    centralSystemSetting,
    chargeCode,
    chartofaccount,
    clearing,
    clearingMethod,
    clearingreversalreason,
    clearingRule,
    company,
    contract,
    contractAccountKey,
    contractClass,
    correspondence,
    costCenter,
    costcentercategory,
    country,
    currency,
    customer,
    customerAgingReport,
    customerBalanceReport,
    customerBillingReport,
    customerCarenumberRange,
    customerNumberRange,
    defaultDocumentType,
    device,
    deviceActivity,
    deviceType,
    discount,
    documentType,
    exchangerate,
    fiscalYear,
    generalLedger,
    holidaycalender,
    idtype,
    industryType,
    jobMonitoring,
    lineItemType,
    manufacturer,
    martialstatus,
    massProcesses,
    measurement,
    meterReading,
    meterReadingCycle,
    meterReadingLock,
    meterReadingNumberRange,
    meterReadingReport,
    meterReadingType,
    meterReadingValidation,
    nameformat,
    nationality,
    numberRange,
    numberRangeAssignment,
    payment,
    paymentMethod,
    paymentterm,
    posting,
    postingLock,
    postingPeriod,
    preferredContactMethod,
    premise,
    premisecategory,
    premiseGroupingType,
    premiseNumberRange,
    premisetype,
    price,
    product,
    productCategory,
    rate,
    ratestrucfunction,
    rateStructureParameter,
    region,
    registerGroup,
    registertype,
    relationshipType,
    returnReasons,
    reversalReason,
    roundingRules,
    salutation,
    serialNoNumberRange,
    service,
    socialMediaType,
    supplyGuaranteeReason,
    taxcode,
    transactiontype,
    user,
    warehouse,
    warrantyType,
  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      key: 'um2c-vuex',
      reducer: (state) => ({
        app: state.app,
        auth: state.auth,
        centralDateConfig: state.centralDateConfig,
        centralSystemSetting: state.centralSystemSetting,
      }),
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
})
