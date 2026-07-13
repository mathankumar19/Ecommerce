import { takeLatest, put, call, all } from 'redux-saga/effects';
import { CART_DATA } from '../constants/appConstants';
import { cartSuccess, cartFailure } from '../actions/cartActions';
import { fetchCart, addProductToCart, updateCartItem, removeCartItem } from '../API/cartAPI';

// Worker Sagas
function* fetchCartSaga(action) {
  try {
    // Call the cart API to get cart data
    const data = yield call(fetchCart);
    console.log('Saga: Cart data fetched:', data);
    
    // Transform the data to match our app's structure if needed
    const transformedData = {
      items: data.carts && data.carts.length > 0 ?
        data.carts[0].products.map(product => ({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: product.quantity,
          thumbnail: product.thumbnail || 'https://via.placeholder.com/100'
        })) : []
    };
    
    yield put(cartSuccess(transformedData));
  } catch (error) {
    console.error('Saga: Error fetching cart:', error);
    yield put(cartFailure(error.message));
  }
}

function* addToCartSaga(action) {
  try {
    const { product, quantity } = action.payload;
    
    // Call the API to add the product to the cart
    yield call(addProductToCart, 1, product.id, quantity);
    
    console.log('Saga: Item added to cart:', action.payload);
    
    // Note: We're not dispatching cartSuccess here because that would overwrite
    // the entire cart state. The reducer already handles the ADD_TO_CART action.
  } catch (error) {
    console.error('Saga: Error adding to cart:', error);
    yield put(cartFailure(error.message));
  }
}

function* updateQuantitySaga(action) {
  try {
    const { id, quantity } = action.payload;
    
    // Call the API to update the cart item
    yield call(updateCartItem, 1, id, quantity);
    
    console.log('Saga: Item quantity updated:', action.payload);
    
    // The reducer will handle the UPDATE_QUANTITY action
  } catch (error) {
    console.error('Saga: Error updating quantity:', error);
    yield put(cartFailure(error.message));
  }
}

function* removeFromCartSaga(action) {
  try {
    const productId = action.payload;
    
    // Call the API to remove the item from the cart
    yield call(removeCartItem, 1, productId);
    
    console.log('Saga: Item removed from cart:', productId);
    
    // The reducer will handle the REMOVE_FROM_CART action
  } catch (error) {
    console.error('Saga: Error removing from cart:', error);
    yield put(cartFailure(error.message));
  }
}

// Watcher Sagas
function* watchCartActions() {
  yield takeLatest(CART_DATA.START, fetchCartSaga);
  yield takeLatest(CART_DATA.ADD_TO_CART, addToCartSaga);
  yield takeLatest(CART_DATA.UPDATE_QUANTITY, updateQuantitySaga);
  yield takeLatest(CART_DATA.REMOVE_FROM_CART, removeFromCartSaga);
}

// Root Cart Saga
export default function* cartSagas() {
  yield all([
    call(watchCartActions),
  ]);
}