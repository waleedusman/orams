import {
  ACTION_SET_SUPPLIER_SEARCH,
  ACTION_SET_SUPPLIER_SEARCH_TERM,
  SENDING_REQUEST,
  SET_ERROR_MESSAGE
} from 'orams/constants/constants'
import { GENERAL_ERROR } from 'orams/constants/messageConstants'
import dmapi from 'orams/services/apiClient'

export const sendingRequest = sending => ({ type: SENDING_REQUEST, sending })

const setErrorMessage = errorMessage => ({
  type: SET_ERROR_MESSAGE,
  errorMessage
})

const setSupplierSearchResult = searchResult => ({
  type: ACTION_SET_SUPPLIER_SEARCH,
  supplierSearchResult: searchResult
})

export const setSupplierSearchTerm = searchTerm => ({
  type: ACTION_SET_SUPPLIER_SEARCH_TERM,
  supplierSearchTerm: searchTerm
})

export const searchSupplier = searchTerm => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({
    url: '/search/suppliers',
    params: {
      supplier_name_prefix: searchTerm
    }
  }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setSupplierSearchResult(response.data))
    }

    dispatch(sendingRequest(false))
  })
}
