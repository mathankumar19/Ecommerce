import { PRODUCT_DATA } from '../constants/appConstants';

const initialState = {
  products: [],
  selectedProduct: null,
  fetching: false,
  fetched: false,
  error: null
};

function productsReducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    case PRODUCT_DATA.INITSTATE: {
      return initialState;
    }
    case PRODUCT_DATA.INIT: {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: false
      };
    }
    case PRODUCT_DATA.START: {
      console.log('Direct reducer: PRODUCT_DATA.START');
      return {
        ...state,
        fetching: true,
        error: null
      };
    }
    case PRODUCT_DATA.REJECTED: {
      console.log('Direct reducer: PRODUCT_DATA.REJECTED with error:', action.payload);
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload
      };
    }
    case PRODUCT_DATA.FULFILLED: {
      console.log('Direct reducer: PRODUCT_DATA.FULFILLED with payload:', action.payload);
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        products: action.payload
      };
    }
    case PRODUCT_DATA.FETCH_DETAIL_START: {
      return {
        ...state,
        fetching: true,
        error: null
      };
    }
    case PRODUCT_DATA.FETCH_DETAIL_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        selectedProduct: action.payload
      };
    }
    case PRODUCT_DATA.FETCH_DETAIL_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload
      };
    }
    case PRODUCT_DATA.FETCH_SEARCH_START: {
      return {
        ...state,
        fetching: true,
        error: null
      };
    }
    case PRODUCT_DATA.FETCH_SEARCH_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        products: action.payload
      };
    }
    case PRODUCT_DATA.FETCH_SEARCH_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload
      };
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

export default productsReducer;