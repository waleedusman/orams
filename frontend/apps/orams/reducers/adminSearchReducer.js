import {
  ACTION_SET_SUPPLIER_SEARCH,
  ACTION_SET_SUPPLIER_SEARCH_TERM,
  ACTION_SET_USER_SEARCH,
  ADMIN_SEARCH_TYPE_SUPPLIER,
  ADMIN_SEARCH_TYPE_USER
} from 'orams/constants/constants'

const initialState = {
  searchType: '',
  supplierSearchResult: [],
  userSearchResult: [],
  currentlySending: false,
  errorMessage: null
}

const adminSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_SUPPLIER_SEARCH:
      return {
        ...state,
        searchType: ADMIN_SEARCH_TYPE_SUPPLIER,
        supplierSearchResult: action.supplierSearchResult,
        userSearchResult: [],
        userSearchTerm: ''
      }

    case ACTION_SET_SUPPLIER_SEARCH_TERM:
      return {
        ...state,
        searchType: ADMIN_SEARCH_TYPE_SUPPLIER,
        supplierSearchTerm: action.supplierSearchTerm
      }

    case ACTION_SET_USER_SEARCH:
      return {
        ...state,
        searchType: ADMIN_SEARCH_TYPE_USER,
        supplierSearchResult: [],
        supplierSearchTerm: '',
        userSearchResult: action.userSearchResult
      }

    default:
      return state
  }
}

export default adminSearchReducer
