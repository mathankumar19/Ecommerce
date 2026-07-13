import { takeLatest, put, call, all } from 'redux-saga/effects';
import { USER_DATA } from '../constants/appConstants';
import {
  userSuccess,
  userFailure,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logoutSuccess,
  logoutFailure
} from '../actions/userActions';
import supabase from '../utils/supabaseClient';

// Worker Sagas
function* fetchUserSaga(action) {
  try {
    // Get current session from Supabase
    const { data, error } = yield call([supabase.auth, 'getSession']);
    
    if (error) {
      yield put(userFailure(error.message));
      return;
    }
    
    if (!data.session) {
      yield put(userFailure('No active session'));
      return;
    }
    
    // Get user profile data if needed
    const { data: profileData } = yield call(
      [supabase, 'from'],
      'profiles'
    ).select('*').eq('id', data.session.user.id).single();
    
    const userData = {
      ...data.session.user,
      profile: profileData || {}
    };
    
    yield put(userSuccess(userData));
  } catch (error) {
    yield put(userFailure(error.message));
  }
}

function* loginSaga(action) {
  try {
    // Sign in with Supabase
    const { data, error } = yield call(
      [supabase.auth, 'signInWithPassword'],
      {
        email: action.payload.email,
        password: action.payload.password
      }
    );
    
    if (error) {
      yield put(loginFailure(error.message));
      return;
    }
    
    // Get user profile data if needed
    const { data: profileData } = yield call(
      [supabase, 'from'],
      'profiles'
    ).select('*').eq('id', data.user.id).single();
    
    const userData = {
      ...data.user,
      profile: profileData || {}
    };
    
    yield put(loginSuccess(userData));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* registerSaga(action) {
  try {
    // Sign up with Supabase
    const { data, error } = yield call(
      [supabase.auth, 'signUp'],
      {
        email: action.payload.email,
        password: action.payload.password,
        options: {
          data: {
            name: action.payload.name
          }
        }
      }
    );
    
    if (error) {
      yield put(registerFailure(error.message));
      return;
    }
    
    // Create a profile record
    if (data.user) {
      yield call(
        [supabase, 'from'],
        'profiles'
      ).insert([
        {
          id: data.user.id,
          name: action.payload.name,
          email: action.payload.email
        }
      ]);
    }
    
    yield put(registerSuccess(data.user));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* logoutSaga() {
  try {
    // Sign out with Supabase
    const { error } = yield call([supabase.auth, 'signOut']);
    
    if (error) {
      yield put(logoutFailure(error.message));
      return;
    }
    
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

// Watcher Sagas
function* watchUserActions() {
  yield takeLatest(USER_DATA.START, fetchUserSaga);
  yield takeLatest(USER_DATA.LOGIN_START, loginSaga);
  yield takeLatest(USER_DATA.REGISTER_START, registerSaga);
  yield takeLatest(USER_DATA.LOGOUT_START, logoutSaga);
}

// Root User Saga
export default function* userSagas() {
  yield all([
    call(watchUserActions),
  ]);
}