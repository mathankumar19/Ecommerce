import { takeLatest, put, call } from 'redux-saga/effects';
import { 
  FETCH_DEPARTMENT_REQUEST,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE
} from '../actions/types';
import { fetchDepartmentData } from '../API/departmentAPI';

// Worker saga: will be fired on FETCH_DEPARTMENT_REQUEST actions
function* fetchDepartment(action) {
  try {
    const departmentType = action.payload.departmentType;
    const data = yield call(fetchDepartmentData, departmentType);
    yield put({ type: FETCH_DEPARTMENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: FETCH_DEPARTMENT_FAILURE, payload: error.message });
  }
}

// Watcher saga: watches for actions dispatched to the store, starts worker saga
export function* departmentSagas() {
  yield takeLatest(FETCH_DEPARTMENT_REQUEST, fetchDepartment);
}