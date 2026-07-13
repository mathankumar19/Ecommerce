import { CART_DATA } from '../constants/appConstants';

export function cartInitState() {
  return { type: CART_DATA.INITSTATE };
}

export function cartInit(data) {
  return {
    type: CART_DATA.INIT,
    payload: data
  };
}

export function cart(data) {
  return {
    type: CART_DATA.START,
    payload: data,
  };
}

export function cartFailure(data) {
  return {
    type: CART_DATA.REJECTED,
    payload: data,
  };
}

export function cartSuccess(data) {
  return {
    type: CART_DATA.FULFILLED,
    payload: data,
  };
}

export function addToCart(product, quantity = 1) {
  return {
    type: CART_DATA.ADD_TO_CART,
    payload: { product, quantity },
  };
}

export function removeFromCart(productId) {
  return {
    type: CART_DATA.REMOVE_FROM_CART,
    payload: productId,
  };
}

export function updateQuantity(productId, quantity) {
  return {
    type: CART_DATA.UPDATE_QUANTITY,
    payload: { id: productId, quantity },
  };
}

export function clearCart() {
  return {
    type: CART_DATA.CLEAR_CART,
  };
}