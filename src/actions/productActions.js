import { PRODUCT_DATA } from '../constants/appConstants';

export function productInitState() {
  return { type: PRODUCT_DATA.INITSTATE };
}

export function productInit(data) {
  return {
    type: PRODUCT_DATA.INIT,
    payload: data
  };
}

export function product(data) {
  console.log('Action creator: product');
  return {
    type: PRODUCT_DATA.START,
    payload: data,
  };
}

export function productFailure(data) {
  console.log('Action creator: productFailure with error:', data);
  return {
    type: PRODUCT_DATA.REJECTED,
    payload: data,
  };
}

export function productSuccess(data) {
  console.log('Action creator: productSuccess with products:', data);
  return {
    type: PRODUCT_DATA.FULFILLED,
    payload: data,
  };
}

export function fetchProductDetail(productId) {
  return {
    type: PRODUCT_DATA.FETCH_DETAIL_START,
    payload: productId,
  };
}

export function fetchProductDetailSuccess(product) {
  return {
    type: PRODUCT_DATA.FETCH_DETAIL_FULFILLED,
    payload: product,
  };
}

export function fetchProductDetailFailure(error) {
  return {
    type: PRODUCT_DATA.FETCH_DETAIL_REJECTED,
    payload: error,
  };
}

export function fetchSearchProducts(query) {
  return {
    type: PRODUCT_DATA.FETCH_SEARCH_START,
    payload: query,
  };
}

export function fetchSearchProductsSuccess(products) {
  return {
    type: PRODUCT_DATA.FETCH_SEARCH_FULFILLED,
    payload: products,
  };
}

export function fetchSearchProductsFailure(error) {
  return {
    type: PRODUCT_DATA.FETCH_SEARCH_REJECTED,
    payload: error,
  };
}
