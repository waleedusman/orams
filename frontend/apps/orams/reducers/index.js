/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'

import appReducer from './appReducer'
import userReducer from './userReducer'
import sellersCatalogueReducer from './sellersCatalogueReducer'
import editPricingReducer from './editPricingReducer'
import priceHistoryReducer from './priceHistoryReducer'
import errorMessage from './errorMessage'
import form_options from './form_options'

export default combineReducers({
  app: appReducer,
  user: userReducer,
  sellersCatalogue: sellersCatalogueReducer,
  editPricing: editPricingReducer,
  priceHistory: priceHistoryReducer,
  form_options,
  errorMessage,
  options: (state = {}) => state,
  ...createForms({
    resetPasswordEmailForm: {},
    resetPasswordForm: {},
    businessDetailsForm: {},
    businessInfoForm: {},
    yourInfoForm: {},
    toolsForm: {},
    awardsForm: {},
    submitStepForm: {},
    loginForm: {},
    editPriceForm: {},
    contractVariationForm: {},
    providerHistoryForm: {},
    signupForm: {},
    createUserPasswordForm: {}
  })
})
