import { all, fork } from 'redux-saga/effects';
import productSagas from './productSagas';
import cartSagas from './cartSagas';
import userSagas from './userSagas';
import { departmentSagas } from './departmentSagas';
import categorySagas from './categorySagas';

export default function* rootSaga() {
  yield all([
    fork(productSagas),
    fork(cartSagas),
    fork(userSagas),
    fork(departmentSagas),
    fork(categorySagas),
  ]);
}