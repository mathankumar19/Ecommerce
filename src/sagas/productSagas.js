import { takeLatest, put, call, all } from 'redux-saga/effects';
import { PRODUCT_DATA } from '../constants/appConstants';
import {
  productSuccess,
  productFailure,
  fetchProductDetailSuccess,
  fetchProductDetailFailure,
  fetchSearchProductsSuccess,
  fetchSearchProductsFailure
} from '../actions/productActions';
import { fetchAllProducts, fetchProductById, fetchProductsBySearch } from '../API/productAPI';

// Worker Sagas
function* fetchProductsSaga(action) {
  try {
    console.log('Saga: fetchProductsSaga - Fetching products from API...');
    const data = yield call(fetchAllProducts);

    if (data && data.products) {
      yield put(productSuccess(data.products));
    } else {
      yield put(productFailure('Invalid API response format'));
    }
  } catch (error) {
    yield put(productFailure(error.message));
  }
}

function* fetchProductDetailSaga(action) {
  try {
    const productId = action.payload;
    const data = yield call(fetchProductById, productId);
    yield put(fetchProductDetailSuccess(data));
  } catch (error) {
    yield put(fetchProductDetailFailure(error.message));
  }
}

function* fetchSearchProductsSaga(action) {
  try {
    const query = action.payload;
    const data = yield call(fetchProductsBySearch, query);
    yield put(fetchSearchProductsSuccess(data.products));
  } catch (error) {
    yield put(fetchSearchProductsFailure(error.message));
  }
}

// Watcher Sagas
function* watchProductActions() {
  yield takeLatest(PRODUCT_DATA.START, fetchProductsSaga);
  yield takeLatest(PRODUCT_DATA.FETCH_DETAIL_START, fetchProductDetailSaga);
  yield takeLatest(PRODUCT_DATA.FETCH_SEARCH_START, fetchSearchProductsSaga);
}

// Root Product Saga
export default function* productSagas() {
  yield all([
    call(watchProductActions),
  ]);
}